# template


[![Build Status][travis-image]][travis-url]
[![Coverage][coveralls-image]][coveralls-url]

A tiny JavaScript templates.


## Usage

use the old render function.

    const template = require('../lib/template');
    const html =
      'My skills:' +
      '<% if(showSkills) { %>' +
      '<% for(var index in skills) { %>' +
      '<a href="#"><% skills[index] %></a>' +
      '<% } %>' +
      '<% } else { %>' +
      '<p>none</p>' +
      '<% } %>';

    const data = {
      skills: ['js', 'html', 'css'],
      showSkills: true
    };

    template.render(html, data);
    // 'My skills:<a href="#">js</a><a href="#">html</a><a href="#">css</a>';

use the new render function.

    const template = require('../lib/template');
    const html =
      'My skills:' +
      '<% if(@showSkills) { %>' +
      '<% for(var index in @skills) { %>' +
      '<a href="#"><% @skills[index] %></a>' +
      '<% } %>' +
      '<% } else { %>' +
      '<p>none</p>' +
      '<% } %>';

    const data = {
      skills: ['js', 'html', 'css'],
      showSkills: true
    };

    template.newRender(html, data);
    // 'My skills:<a href="#">js</a><a href="#">html</a><a href="#">css</a>';

## License

[MIT](LICENSE)


[travis-image]: https://travis-ci.org/yannliao/cogito.svg?branch=master
[travis-url]: https://travis-ci.org/yannliao/cogito
[coveralls-image]: https://coveralls.io/repos/github/yannliao/cogito/badge.svg
[coveralls-url]: https://coveralls.io/github/yannliao/cogito
