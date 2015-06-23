stream
======

Node.js streams in the browser.

Ported straight from the [Node.js core](https://github.com/joyent/node/blob/master/lib/stream.js) and adapted to [component/emitter](https://github.com/component/emitter)'s api.

A [testsuite](https://github.com/juliangruber/stream/blob/master/test.html) for the browser is there too. Just issue `npm install` after you've cloned this repo and then open the html file.

Installation
------------

```bash
$ component install juliangruber/stream
```

Usage example
-------------

```javascript
var Stream = require('stream');

var src = new Stream();
src.readable = true;

var dest = new Stream();
dest.writable = true;
dest.write = function(data) {
  assert(data == 'test');
};

src.pipe(dest);

src.emit('data', 'test');
```
