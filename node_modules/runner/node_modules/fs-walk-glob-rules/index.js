var AbstractMethodError, AsyncTransformer, AsyncWalker, BaseAsync, BaseRules, BaseSync, BaseWalker, FilteringRules, SyncTransformer, SyncWalker, TransformRules, fs, glob_rules, path,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

fs = require("fs");

path = require("path");

glob_rules = require("glob-rules");

AbstractMethodError = (function(_super) {
  __extends(AbstractMethodError, _super);

  function AbstractMethodError(name) {
    this.name = "AbstractMethodError";
    this.message = "Calling abstract method `" + name + "` detected.";
  }

  return AbstractMethodError;

})(Error);

BaseRules = (function() {
  function BaseRules() {}

  BaseRules.prototype._check = function(_path) {
    throw new AbstractMethodError("_check");
  };

  BaseRules.prototype._process = function(_path, _normalized) {
    throw new AbstractMethodError("_process");
  };

  return BaseRules;

})();

FilteringRules = (function(_super) {
  __extends(FilteringRules, _super);

  function FilteringRules(options) {
    var test, _i, _len, _ref, _ref1;
    this.excludes = [];
    _ref1 = (_ref = options.excludes) != null ? _ref : [];
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      test = _ref1[_i];
      this.excludes.push(glob_rules.tester(test));
    }
  }

  FilteringRules.prototype._check = function(_path) {
    var rule, _i, _len, _ref;
    _ref = this.excludes;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      rule = _ref[_i];
      if (rule(_path)) {
        return false;
      }
    }
    return true;
  };

  FilteringRules.prototype._process = function(_path, _normalized) {
    var data;
    data = {
      path: _path,
      relative: _normalized
    };
    return data;
  };

  return FilteringRules;

})(BaseRules);

TransformRules = (function(_super) {
  __extends(TransformRules, _super);

  function TransformRules(options) {
    var pattern, test, _ref;
    TransformRules.__super__.constructor.call(this, options);
    if (options.rules == null) {
      throw Error("Required `rules`");
    }
    this.rules = [];
    _ref = options.rules;
    for (test in _ref) {
      pattern = _ref[test];
      this.rules.push({
        test: test,
        pattern: pattern,
        tester: glob_rules.tester(test),
        matcher: glob_rules.matcher(test),
        transformer: glob_rules.transformer(test, pattern)
      });
    }
  }

  TransformRules.prototype._check = function(_path) {
    var rule, _i, _len, _ref;
    _ref = this.excludes;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      rule = _ref[_i];
      if (rule(_path)) {
        return false;
      }
    }
    return true;
  };

  TransformRules.prototype._process = function(_path, _normalized) {
    var data, rule, _i, _len, _ref;
    _ref = this.rules;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      rule = _ref[_i];
      if (rule.tester(_normalized)) {
        data = {
          path: _path,
          relative: _normalized,
          result: rule.transformer(_normalized),
          match: rule.matcher(_normalized)
        };
        return data;
      }
    }
  };

  return TransformRules;

})(FilteringRules);

BaseWalker = (function() {
  function BaseWalker(options) {
    if (options.root == null) {
      throw Error("Required `root`");
    }
    this.root = options.root;
  }

  BaseWalker.prototype.normalize = function(p) {
    return './' + path.relative(this.root, p).split(path.sep).join('/');
  };

  return BaseWalker;

})();

BaseAsync = (function(_super) {
  __extends(BaseAsync, _super);

  function BaseAsync(options) {
    BaseAsync.__super__.constructor.call(this, options);
    this.callback = options.callback;
    this.complete = options.complete;
    this.error = options.error;
    this.rules = new this.Rules(options);
    this._dirs = [];
    this._files = [];
    this._paths = [];
  }

  BaseAsync.prototype.finished = function() {
    if (this._dirs.length > 0) {
      return false;
    }
    if (this._files.length > 0) {
      return false;
    }
    return true;
  };

  BaseAsync.prototype._step = function() {
    var data, dir, _normalized, _path;
    if (this._paths.length > 0) {
      _path = this._paths.shift();
      fs.stat(_path, (function(_this) {
        return function(err, stat) {
          if (err != null) {
            return _this.error(err);
          }
          if (stat == null) {
            return;
          }
          if (stat.isDirectory()) {
            _this._dirs.push(_path);
          }
          if (stat.isFile()) {
            _this._files.push(_path);
          }
          return _this._step();
        };
      })(this));
      return;
    }
    while (this._files.length > 0) {
      _path = this._files.shift();
      _normalized = this.normalize(_path);
      data = this.rules._process(_path, _normalized);
      if (data != null) {
        this.callback(data, (function(_this) {
          return function() {
            return _this._step();
          };
        })(this));
        return;
      }
      this._step();
      return;
    }
    if (this._dirs.length > 0) {
      dir = this._dirs.shift();
      fs.readdir(dir, (function(_this) {
        return function(err, files) {
          if (err != null) {
            return _this.error(err);
          }
          files.forEach(function(file) {
            _path = path.join(dir, file);
            _normalized = _this.normalize(_path);
            if (!_this.rules._check(_normalized)) {
              return;
            }
            return _this._paths.push(_path);
          });
          return _this._step();
        };
      })(this));
      return;
    }
    return this.complete();
  };

  BaseAsync.prototype.walk = function() {
    this._dirs.push(this.root);
    this._step();
  };

  return BaseAsync;

})(BaseWalker);

BaseSync = (function(_super) {
  __extends(BaseSync, _super);

  function BaseSync(options) {
    BaseSync.__super__.constructor.call(this, options);
    this.rules = new this.Rules(options);
    this._dirs = [];
    this._files = [];
  }

  BaseSync.prototype._step = function(_path) {
    var data, stat, _normalize;
    _normalize = this.normalize(_path);
    if (!this.rules._check(_normalize)) {
      return;
    }
    stat = fs.statSync(_path);
    if (stat == null) {
      return;
    }
    if (stat.isDirectory()) {
      this._dirs.push(_path);
    }
    if (!stat.isFile()) {
      return;
    }
    data = this.rules._process(_path, _normalize);
    if (data != null) {
      return this._files.push(data);
    }
  };

  BaseSync.prototype.walk = function() {
    var dir, file, _i, _len, _path, _ref;
    this._dirs.push(this.root);
    while (this._dirs.length > 0) {
      dir = this._dirs.shift();
      _ref = fs.readdirSync(dir);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        file = _ref[_i];
        _path = path.join(dir, file);
        this._step(_path);
      }
    }
    return this._files;
  };

  return BaseSync;

})(BaseWalker);

AsyncWalker = (function(_super) {
  __extends(AsyncWalker, _super);

  function AsyncWalker() {
    return AsyncWalker.__super__.constructor.apply(this, arguments);
  }

  AsyncWalker.prototype.Rules = FilteringRules;

  return AsyncWalker;

})(BaseAsync);

SyncWalker = (function(_super) {
  __extends(SyncWalker, _super);

  function SyncWalker() {
    return SyncWalker.__super__.constructor.apply(this, arguments);
  }

  SyncWalker.prototype.Rules = FilteringRules;

  return SyncWalker;

})(BaseSync);

AsyncTransformer = (function(_super) {
  __extends(AsyncTransformer, _super);

  function AsyncTransformer() {
    return AsyncTransformer.__super__.constructor.apply(this, arguments);
  }

  AsyncTransformer.prototype.Rules = TransformRules;

  return AsyncTransformer;

})(BaseAsync);

SyncTransformer = (function(_super) {
  __extends(SyncTransformer, _super);

  function SyncTransformer() {
    return SyncTransformer.__super__.constructor.apply(this, arguments);
  }

  SyncTransformer.prototype.Rules = TransformRules;

  return SyncTransformer;

})(BaseSync);

exports.AsyncWalker = AsyncWalker;

exports.SyncWalker = SyncWalker;

exports.AsyncTransformer = AsyncTransformer;

exports.SyncTransformer = SyncTransformer;

exports.walk = function(options) {
  var walker;
  walker = new AsyncWalker(options);
  return walker.walk();
};

exports.walkSync = function(options) {
  var walker;
  walker = new SyncWalker(options);
  return walker.walk();
};

exports.transform = function(options) {
  var transformer;
  transformer = new AsyncTransformer(options);
  return transformer.walk();
};

exports.transformSync = function(options) {
  var transformer;
  transformer = new SyncTransformer(options);
  return transformer.walk();
};
