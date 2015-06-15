"use strict";

var utils     = require("./lib/utils");

function RespModifier (opts) {

    // options
    opts           = opts || {};
    opts.blacklist = utils.toArray(opts.blacklist)   || [];
    opts.whitelist = utils.toArray(opts.whitelist)   || [];
    opts.rules     = opts.rules                      || [];
    opts.ignore    = opts.ignore || opts.excludeList || utils.defaultIgnoreTypes;

    // helper functions
    opts.regex = (function () {
        var matches = opts.rules.map(function (item) {
            return item.match.source;
        }).join("|");
        return new RegExp(matches);
    })();

    var respMod        = this;

    respMod.opts       = opts;
    respMod.middleware = respModifierMiddleware;
    respMod.update = function (key, value) {
        if (respMod.opts[key]) {
            respMod.opts[key] = value;
        }
        return respMod;
    };

    function respModifierMiddleware(req, res, next) {

        if (res._respModifier) {
            return next();
        }

        res._respModifier = true;

        var writeHead = res.writeHead;
        var write = res.write;
        var end = res.end;
        var singlerules = utils.isWhiteListedForSingle(req.url, respMod.opts.rules);
        var withoutSingle = respMod.opts.rules.filter(function (rule) {
            if (rule.paths) {
                return false;
            }
            return true;
        });

        if (singlerules.length) {
            modifyResponse(singlerules, true);
        } else {
            if (utils.isWhitelisted(req.url, respMod.opts.whitelist)) {
                modifyResponse(withoutSingle, true);
            } else {
                if (!utils.hasAcceptHeaders(req) || utils.inBlackList(req.url, respMod.opts)) {
                    return next();
                } else {
                    modifyResponse(withoutSingle);
                }
            }
        }

        next();

        /**
         * Actually do the overwrite
         * @param {boolean} [force] - if true, will perform an overwrite even regardless of whether it's HTML or not.
         */
        function modifyResponse(rules, force) {

            req.headers["accept-encoding"] = "identity";

            function restore() {
                res.writeHead = writeHead;
                res.write = write;
                res.end = end;
            }

            res.push = function (chunk) {
                res.data = (res.data || "") + chunk;
            };

            res.inject = res.write = function (string, encoding) {
                if (string !== undefined) {
                    var body = string instanceof Buffer ? string.toString(encoding) : string;
                    if (force || (utils.isHtml(body) || utils.isHtml(res.data))) {
                        if (utils.exists(body, opts.regex) && !utils.snip(res.data)) {
                            var newString = utils.overwriteBody(rules, body);
                            res.push(newString);
                        } else {
                            res.push(body);
                        }
                        return true;
                    } else {
                        restore();
                        return write.call(res, string, encoding);
                    }
                }
                return true;
            };

            res.writeHead = function () {
                var headers = arguments[arguments.length - 1];
                if (headers && typeof headers === "object") {
                    for (var name in headers) {
                        if (/content-length/i.test(name)) {
                            delete headers[name];
                        }
                    }
                }

                var header = res.getHeader("content-length");
                if (header) {
                    res.removeHeader("content-length");
                }

                writeHead.apply(res, arguments);
            };

            res.end = function (string, encoding) {

                restore();

                var result = res.inject(string, encoding);

                if (!result) {
                    return end.call(res, string, encoding);
                }

                if (res.data !== undefined && !res._header) {
                    res.setHeader("content-length", Buffer.byteLength(res.data, encoding));
                }

                res.end(res.data, encoding);
            };
        }
    }

    return respMod;
}

module.exports = function (opts) {
    var resp = new RespModifier(opts);
    return resp.middleware;
};

module.exports.create = function (opts) {
    var resp = new RespModifier(opts);
    return resp;
};

module.exports.utils = utils;
