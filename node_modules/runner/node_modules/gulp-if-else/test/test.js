/**
 * @name Unit tests of gulp-if-else
 * @requires gulp-util
 * @author Nicolas Tallefourtane <dev@nicolab.net>
 * @link https://github.com/Nicolab/gulp-if-else
 * @license MIT https://github.com/Nicolab/gulp-if-else/blob/master/LICENSE
 */

var test    = require('unit.js');
var ifElse  = require('../');
var gutil   = require('gulp-util');

function Proxy() {

  var _this = this;

  this.spy  = test.spy();

  this.proxy = function() {

    _this.spy();
    return gutil.noop()
  };
}


describe('gulp-if-else', function(){

  // setup
  var callback;
  var elseCallback;
  var firstPipe;
  var lastPipe;

  var createStream  = function() {
    return process.openStdin();
  };

  // reset before each tests case
  beforeEach(function() {
    callback      = new Proxy();
    elseCallback  = new Proxy();
    firstPipe     = new Proxy();
    lastPipe      = new Proxy();
  });

  // close stream after each tests case
  afterEach(function() {
    process.exit(0);
  });

  it('should call `callback` if `condition` is `true`', function(done){

    test
      .when(function() {
        
         createStream()
          .pipe(firstPipe.proxy())
          .pipe(ifElse(true, callback.proxy, elseCallback.proxy))
          .pipe(lastPipe.proxy())
        ;
      })
      .then(function() {
        test
          .bool(firstPipe.spy.calledOnce)
            .isTrue()

          .bool(lastPipe.spy.calledOnce)
            .isTrue()

          .bool(callback.spy.calledOnce)
            .isTrue()

          .bool(elseCallback.spy.called)
            .isFalse()
        ;
      })
    ;

    done();
  });
  
  it('should call `elseCallback` if `condition` is `false`', function(done){
    
    test
      .when(function() {
        
         createStream()
          .pipe(firstPipe.proxy())
          .pipe(ifElse(false, callback.proxy, elseCallback.proxy))
          .pipe(lastPipe.proxy())
        ;
      })
      .then(function() {
        test
          .bool(firstPipe.spy.calledOnce)
            .isTrue()

          .bool(lastPipe.spy.calledOnce)
            .isTrue()

          .bool(callback.spy.called)
            .isFalse()

          .bool(elseCallback.spy.calledOnce)
            .isTrue()
        ;
      })
    ;

    done();
  });

  it('`elseCallback` should be an optional argument', function(done){

    test
      .when(function() {
        
         createStream()
          .pipe(firstPipe.proxy())
          .pipe(ifElse(false, callback.proxy))
          .pipe(lastPipe.proxy())
        ;
      })
      .then(function() {
        test
          .bool(firstPipe.spy.calledOnce)
            .isTrue()

          .bool(lastPipe.spy.calledOnce)
            .isTrue()

          .bool(callback.spy.called)
            .isFalse()

          .bool(elseCallback.spy.called)
            .isFalse()
        ;
      })
    ;

    done();    
  });

  it('should throw an exception if `callback` is not a function', 
  function(done){
    
    test
      .exception(function(){

        createStream()
          .pipe(firstPipe.proxy())
          .pipe(ifElse(true))
          .pipe(lastPipe.proxy())
        ;
      })
      .contains(/gulp-if-else/)
    ;

    done();
  });
});