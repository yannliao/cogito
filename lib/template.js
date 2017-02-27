(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["template"] = factory();
	else
		root["template"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var Templete = function Templete() {

};
Templete.prototype.tokenize = function tokenize (html) {
  var re = /<%(.+?)%>/g;
  var cursor = 0;
  var match;
  var cache = [];
  while (match = re.exec(html)) {
    var value = html.slice(cursor, match.index);
    var token = match[1];
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
};
Templete.prototype.parse = function parse (tokens) {
  var len = tokens.length;
  var token;
  var code = 'with(data) { var ret=[];\n';

  for (var i = 0; i < len; i++) {
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
};
Templete.prototype.newParse = function newParse (tokens) {
  // avalon2 like parser.
  var len = tokens.length;
  var token;
  var rguide = /(@)(?=[$\w])/g;

  var code = 'var ret=[];\n';

  for (var i = 0; i < len; i++) {
    token = tokens[i];
    if (token.type === 'text') {
      code += 'ret.push("' + token.expr.replace(/"/g, '\\"') + '");\n';
    } else if (token.type === 'data') {
      code += 'ret.push(' + token.expr.replace(rguide, 'data.') + ');\n';
    } else {
      code += token.expr.replace(rguide, 'data.') + '\n';
    }
  }
  // console.log(code);
  code = (code + 'return ret.join("");\n').replace(/[\r\t\n]/g, ' ');
  // code += 'return ret.join(""); }';
  // console.log(code + '\n');
  return code;
};
Templete.prototype.exec = function exec (code, options) {
  var result;
  try {
    result = new Function('data', code).apply(options, [options]);
  } catch (err) {
    console.error(err.message);
  }
  return result;
};
Templete.prototype.compile = function compile (html) {
  var tokens = this.tokenize(html);
  var code = this.parse(tokens);
  return new Function('data', code);
};
Templete.prototype.render = function render (html, options) {
  var tokens = this.tokenize(html);
  var code = this.parse(tokens);
  return this.exec(code, options);
};
Templete.prototype.newRender = function newRender (html, options) {
  var tokens = this.tokenize(html);
  var code = this.newParse(tokens);
  return this.exec(code, options);
};
module.exports = new Templete();


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var template = __webpack_require__(0);
module.exports =  template;


/***/ })
/******/ ]);
});
//# sourceMappingURL=template.js.map