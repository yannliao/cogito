const assert = require('assert');
const template = require('../lib/template');

describe('template', () => {
  it('compile should return a function', function () {
    const html = '';
    assert.equal(typeof template.compile(html), 'function');
  });

  it('render should return a valid string', function () {
    const html =
      'My skills:' +
      '<%if(showSkills) {%>' +
      '<%for(var index in skills) {%>' +
      '<a href="#"><%skills[index]%></a>' +
      '<%}%>' +
      '<%} else {%>' +
      '<p>none</p>' +
      '<%}%>';
    const data = {
      skills: ['js', 'html', 'css'],
      showSkills: true
    };
    const result = 'My skills:<a href="#">js</a><a href="#">html</a><a href="#">css</a>';
    assert.equal(template.render(html, data), result);
  });

  it('compile should return excutable function', function () {
    const html =
      'My skills:' +
      '<%if(showSkills) {%>' +
      '<%for(var index in skills) {%>' +
      '<a href="#"><%skills[index]%></a>' +
      '<%}%>' +
      '<%} else {%>' +
      '<p>none</p>' +
      '<%}%>';
    const data = {
      skills: ['js', 'html', 'css'],
      showSkills: true
    };
    const result = 'My skills:<a href="#">js</a><a href="#">html</a><a href="#">css</a>';
    var temp = template.compile(html);
    assert.equal(temp(data), result, 'fail');
  });
});
