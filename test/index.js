const assert = require('assert');
const temp = require('../lib/template');

describe('template', () => {
  it('compile should return a function', function () {
    const template = '';
    assert.equal(typeof temp.compile(template), 'function');
  });

  it('render should return a valid string', function () {
    const template =
      'My skills:' +
      '<%if(this.showSkills) {%>' +
      '<%for(var index in this.skills) {%>' +
      '<a href="#"><%this.skills[index]%></a>' +
      '<%}%>' +
      '<%} else {%>' +
      '<p>none</p>' +
      '<%}%>';
    const data = {
      skills: ['js', 'html', 'css'],
      showSkills: true
    };
    const result = 'My skills:<a href="#">js</a><a href="#">html</a><a href="#">css</a>';
    assert.equal(temp.render(template, data), result);
  });
});

