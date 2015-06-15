var compile, quote;

quote = function(str) {
  return (str + '').replace(new RegExp('[.\\\\+*?\\[\\^\\]${}=!<>:\\-]', 'g'), '\\$&');
};

compile = function(str) {
  var re;
  re = quote(str).replace(/^\\\*\\\*\//g, '(?:[^/]*(?:/[^/]+)*/)?').replace(/\\\*\\\*\//g, '(?:[^/]+(?:/[^/]+)*/)?').replace(/\\\*\\\*/g, '[^/]*(?:/[^/]*)*').replace(/\\\*/g, '[^/]*').replace(/\\\?/g, '[^/]');
  return new RegExp("^" + re + "$");
};

module.exports.tester = function(str) {
  var re;
  re = compile(str);
  return function(p) {
    return re.test(p);
  };
};

module.exports.matcher = function(str) {
  var re;
  re = compile(str);
  return function(p) {
    var result;
    result = p.match(re);
    if (result != null) {
      return [].concat(result);
    }
    return null;
  };
};

module.exports.transformer = function(str, pattern) {
  var re;
  re = compile(str);
  return function(p) {
    return p.replace(re, pattern);
  };
};
