"use stict";

var url = require("url");
var path = require("path");
var cookie = require("cookie");
var excludeList = require("./exclude");

/**
 * Remove Headers from a response, this allow
 * @param {Object} headers
 * @param {Array} items
 */
function removeHeaders(headers, items) {
    items.forEach(function (item) {
        if (headers.hasOwnProperty(item)) {
            delete headers[item];
        }
    });
}

/**
 * Get the proxy host with optional port
 */
function getProxyHost(opts) {
    if (opts.port && opts.port !== 80) {
        return opts.hostname + ":" + opts.port;
    }
    return opts.hostname;
}

/**
 * Remove the domain from any cookies.
 * @param rawCookie
 * @returns {string}
 */
function rewriteCookies(rawCookie) {

    var parsed = cookie.parse(rawCookie, {
        decode: function(val) {
            // Prevent values from being decodeURIComponent transformed
            return val;
        }
    });

    var pairs =
            Object.keys(parsed)
                .filter(function (item) {
                    return item !== "domain";
                })
                .map(function (key) {
                    return key + "=" + parsed[key];
                });

    if (rawCookie.match(/httponly/i)) {
        pairs.push("HttpOnly");
    }

    return pairs.join("; ");
}

/**
 * @param userServer
 * @param proxyUrl
 * @returns {{match: RegExp, fn: Function}}
 */
function rewriteLinks(userServer, proxyUrl) {

    var host   = userServer.hostname;
    var string = host;
    var port = userServer.port;

    if (host && port) {
        if (parseInt(port, 10) !== 80) {
            string = host + ":" + port;
        }
    }

    return {
        match: new RegExp("https?://" + string + "(.*?)(?=[ ,'\"\\s])|('|\")(https?://|/|\\.)?" + string + "(.*?)(?=[ ,'\"\\s])", "g"),
        fn:    function (match) {

            /**
             * Reject subdomains
             */
            if (match[0] === ".") {
                return match;
            }

            var captured = match[0] === "'" || match[0] === "\"" ? match[0] : "";

            /**
             * allow http https
             * @type {string}
             */
            var pre = "//";

            if (match[0] === "'" || match[0] === "\"") {
                match = match.slice(1);
            }

            /**
             * parse the url
             * @type {number|*}
             */
            var out = url.parse(match);

            /**
             * If host not set, just do a simple replace
             */
            if (!out.host) {
                string = string.replace(/^(\/)/, "");
                return captured + match.replace(string, proxyUrl);
            }

            /**
             * Finally append all of parsed url
             */
            return [
                captured,
                pre,
                proxyUrl,
                out.path || "",
                out.hash || ""
            ].join("");
        }
    };
}

/**
 * @param {Object} req
 * @returns {Object}
 */
function handleIe(req, res, next) {

    var ua = req.headers["user-agent"];
    var match = /MSIE (\d)\.\d/.exec(ua);

    if (match) {

        if (parseInt(match[1], 10) < 9) {

            var parsed = url.parse(req.url);
            var ext = path.extname(parsed.pathname);

            var excluded = excludeList.some(function (item) {
                return item === ext;
            });

            if (!excluded) {
                req.headers["accept"] = "text/html";
            }
        }
    }

    next();

    return req;
}

/**
 * @param config
 * @param host
 * @returns {*[]}
 */
function getRules(config, host) {
    var rules = [rewriteLinks(config.urlObj, host)];
    if (config.rules && config.rules.length) {
        var conf = config.rules;
        if (!Array.isArray(conf)) {
            conf = [conf];
        }
        conf.forEach(function (item) {
            rules.push(item);
        });
    }
    return rules;
}

/**
 * Remove 'domain' from any cookies
 * @param {Object} res
 * @param {Immutable.Map} config
 */
function checkCookies(res, config) {
    if (typeof(res.headers["set-cookie"]) !== "undefined") {
        if (config.cookies && config.cookies.stripDomain) {
            res.headers["set-cookie"] = res.headers["set-cookie"].map(function (item) {
                return rewriteCookies(item);
            });
        }
    }
}

/**
 * Perform any required transformations on the `res` object before it gets back to
 * the browser
 * @param config
 */
function proxyRes(config) {

    return function (res, req) {
        checkCookies(res, config);
        removeHeaders(res.headers, ["content-length", "content-encoding"]);
        handleRedirect(res, req, config);
    };
}

/**
 * If any redirects contain the HOST of the target or req, rewrite it,
 * otherwise let it through
 * @param config
 * @returns {Function}
 */
var redirectRegex     = /^30(1|2|7|8)$/;
function handleRedirect (proxyRes, req, config) {

    var whitelist = [
        config.urlObj.host,
        req.headers.host
    ];

    if (proxyRes.headers["location"] && redirectRegex.test(proxyRes.statusCode)) {
        var u = url.parse(proxyRes.headers["location"]);
        if (whitelist.indexOf(u.host) > -1) {
            u.host = req.headers.host;
            proxyRes.headers["location"] = u.format();
        }
    }
}

module.exports = {
    rewriteLinks:   rewriteLinks,
    rewriteCookies: rewriteCookies,
    getProxyHost:   getProxyHost,
    removeHeaders:  removeHeaders,
    handleIe:       handleIe,
    getRules:       getRules,
    proxyRes:       proxyRes,
    handleRedirect: handleRedirect
};
