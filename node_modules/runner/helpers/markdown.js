var marked = require('marked'),
    fs = require('fs'),
    path = require('path'),
    URI = require('URIjs'),
    renderer = new marked.Renderer();

// Set Marked's rendereer to the custom renderer
// optional `localVideoPath` option will be used to to find fallback videos for `.webm`. Defaults to ''
marked.setOptions({
  'renderer': renderer,
  'gfm': true,
  'tables': true,
  'breaks': true,
  'pedantic': false,
  'sanitize': false,
  'smartLists': false,
  'smartypants': true,
  'langPrefix': 'language-'
});

renderer.image = function (href, title, text) {
  var ext = path.extname(href),
      uri = URI(href),
      localPath = this.options.localVideoPath ? this.options.localVideoPath : '',
      out = '',
      alt;



  // YouTube Embed
  if (uri.hostname() === '.www.youtube.com') {
    if (title) {
      out += '<div class="video--' + title + '">';
    }

    out += '<iframe width="560" height="315" src="//.www.youtube.com/embed/' + uri.query().substring(2) + '" frameborder="0" allowfullscreen></iframe>';

    if (title) {
      out += '</div>';
    }
  }
  // Vimeo Embed
  else if (uri.hostname() === 'vimeo.com') {
    if (title) {
      out += '<div class="video--' + title + '">';
    }

    out += '<iframe src="//player.vimeo.com/video/' + uri.path().split('/').pop() + '" width="560" height="315" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'

    if (title) {
      out += '</div>';
    }
  }
  // Image output
  else if (ext !== '.webm' && ext !== '.mp4') {
    out = '<img src="' + href + '" alt="' + text + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += this.options.xhtml ? '/>' : '>';
  }
  // Video Output
  else {
    out = '<video controls';
    // If a poster exists, add it
    if (title) {
      out += ' poster="' + title + '"';
    }
    out += '>';
    // Video Source
    out += '<source src="' + href + '" type="video/' + ext.replace('.', '') + '">'
    // If the file is local /and/ it's a .webm, see if the .mp4 version is available
    if (uri.protocol() === '' && ext === '.webm') {
      alt = href.slice(0, -5) + '.mp4';
      if (fs.existsSync(localPath + alt)) {
        out += '<source src="' + alt + '" type="video/mp4">'
      }
    }
    // Fallback Text
    if (text) {
      out += text;
    }
    out += '</video>';
  }

  return out;
}

//////////////////////////////
// Export Marked with correct settings
//////////////////////////////
module.exports = marked;
