/*! @ryanmorr/css-selector-parser v0.1.0 | https://github.com/ryanmorr/css-selector-parser */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.parse = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parse;
// Adapted from https://github.com/fb55/css-what
var cache = Object.create(null);
var nameRe = /^(?:\\.|[\w\-\u00c0-\uFFFF])+/;
var escapeRe = /\\(?:([0-9a-f]{1,6} ?)|(.))/ig;
var pseudoRe = /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/;
/* eslint-disable-next-line max-len */

var atttributeRe = /^\[((?:\\.|[\w\u00c0-\uFFFF\-])+)\s*(?:(\S?=)\s*(?:(['"])([^]*?)\3|(#?(?:\\.|[\w\u00c0-\uFFFF\-])*)|)|)\s*(i)?\]/;

function parse(selector) {
  selector = selector.trim();

  if (selector in cache) {
    return cache[selector];
  }

  var groups = [];
  var tokens = [],
      hasWhitespace = false,
      token;

  function getName() {
    var name = selector.match(nameRe)[0];
    reduceSelector(name.length);
    return unescapeCSS(name);
  }

  function reduceSelector(index) {
    selector = selector.substring(index);
  }

  function stripWhitespace(start) {
    while (isWhitespace(selector.charAt(start))) {
      start++;
    }

    reduceSelector(start);
  }

  function isWhitespace(c) {
    return c === ' ' || c === '\n' || c === '\t' || c === '\f' || c === '\r';
  }

  function unescapeCSS(str) {
    return str.replace(escapeRe, function (match, hex, char) {
      if (hex) {
        return String.fromCharCode(parseInt(hex, 16));
      }

      return char;
    });
  }

  function resetToken() {
    token = {
      attributes: [],
      pseudos: []
    };
  }

  resetToken();

  while (selector !== '') {
    var char = selector.charAt(0);

    if (isWhitespace(char)) {
      hasWhitespace = true;
      stripWhitespace(1);
    } else if (char === '>' || char === '<' || char === '~' || char === '+') {
      if (token.nodeName || token.attributes.length > 0 || token.pseudos.length > 0) {
        tokens.push(token);
      }

      tokens.push(char);
      resetToken();
      hasWhitespace = false;
      stripWhitespace(1);
    } else if (char === ',') {
      tokens.push(token);
      groups.push(tokens);
      resetToken();
      tokens = [];
      hasWhitespace = false;
      stripWhitespace(1);
    } else {
      if (hasWhitespace) {
        tokens.push(token);
        tokens.push(' ');
        resetToken();
        hasWhitespace = false;
      }

      if (char === '*') {
        reduceSelector(1);
        token.nodeName = '*';
      } else if (char === '#') {
        reduceSelector(1);
        token.attributes.push({
          name: 'id',
          operator: '=',
          value: getName(),
          ignoreCase: false
        });
      } else if (char === '.') {
        reduceSelector(1);
        token.attributes.push({
          name: 'class',
          operator: '~=',
          value: getName(),
          ignoreCase: false
        });
      } else if (char === '[') {
        var data = selector.match(atttributeRe);
        reduceSelector(data[0].length);
        var name = unescapeCSS(data[1]).toLowerCase();
        token.attributes.push({
          name: name,
          operator: data[2] || '',
          value: unescapeCSS(data[4] || data[5] || ''),
          ignoreCase: !!data[6]
        });
      } else if (char === ':') {
        var _data = selector.match(pseudoRe);

        reduceSelector(_data[0].length);

        var _name = unescapeCSS(_data[1]).toLowerCase();

        token.pseudos.push({
          name: _name,
          value: unescapeCSS(_data[3] || '')
        });
      } else if (nameRe.test(selector)) {
        token.nodeName = getName().toLowerCase();
      }
    }
  }

  tokens.push(token);
  groups.push(tokens);
  cache[selector] = groups;
  return groups;
}

module.exports = exports.default;

},{}]},{},[1])(1)
});

