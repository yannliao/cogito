class Templete {
  constructor() {

  }
  tokenize(html) {
    const re = /<%(.+?)%>/g;
    let cursor = 0;
    let match;
    var cache = [];
    while (match = re.exec(html)) {
      const value = html.slice(cursor, match.index);
      const token = match[1];
      cache.push({
        expr: value,
        type: 'text'
      });
      if (/(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g.test(token)) {
        cache.push({
          expr: token,
          type: 'js'
        });
      } else {
        cache.push({
          expr: token,
          type: 'data'
        });
      }
      cursor = match.index + match[0].length;
      // cursor = re.lastIndex;
    }
    return cache;
  }
  parse(tokens) {
    const len = tokens.length;
    let token;
    let code = 'with(obj) { var ret=[];\n';

    for (let i = 0; i < len; i++) {
      token = tokens[i];
      if (token.type === 'text') {
        code += 'ret.push("' + token.expr.replace(/"/g, '\\"') + '");\n';
      } else if (token.type === 'data') {
        code += 'ret.push(' + token.expr + ');\n';
      } else {
        code += token.expr + '\n';
      }
    }
    code = (code + 'return ret.join(""); }').replace(/[\r\t\n]/g, ' ');
    // code += 'return ret.join(""); }';
    // console.log(code + '\n');
    return code;
  }
  exec(code, options) {
    let result;
    try {
      result = new Function('obj', code).apply(options, [options]);
    } catch (err) {
      console.error(err.message);
    }
    return result;
  }
  compile(html) {
    const tokens = this.tokenize(html);
    const code = this.parse(tokens);
    return new Function('obj', code);
  }
  render(html, options) {
    const tokens = this.tokenize(html);
    const code = this.parse(tokens);
    return this.exec(code, options);
  }
}
module.exports =  new Templete();
