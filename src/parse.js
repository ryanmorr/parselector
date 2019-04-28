// Adapted from https://github.com/fb55/css-what

const cache = Object.create(null);
const nameRe = /^(?:\\.|[\w\-\u00c0-\uFFFF])+/;
const escapeRe = /\\(?:([0-9a-f]{1,6} ?)|(.))/ig;
const pseudoRe = /:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]?)((?:\([^)]+\)|[^()]*)+)\2\))?/;
/* eslint-disable-next-line max-len */
const atttributeRe = /^\[((?:\\.|[\w\u00c0-\uFFFF-])+)\s*(?:(\S?=)\s*(?:(['"])([^]*?)\3|(#?(?:\\.|[\w\u00c0-\uFFFF-])*)|)|)\s*(i)?\]/;

export default function parse(selector) {
    selector = selector.trim();
    if (selector in cache) {
        return cache[selector];
    }

    const groups = [];
    let tokens = [], hasWhitespace = false, token;

    function getName() {
        const name = selector.match(nameRe)[0];
        reduceSelector(name.length);
        return unescapeCSS(name);
    }

    function reduceSelector(index) {
        selector = selector.substring(index);
    }

    function stripWhitespace(start) {
        while (isWhitespace(selector.charAt(start))) start++;
        reduceSelector(start);
    }

    function isWhitespace(c) {
        return c === ' ' || c === '\n' || c === '\t' || c === '\f' || c === '\r';
    }

    function unescapeCSS(str) {
        return str.replace(escapeRe, (match, hex, char) => {
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
        const char = selector.charAt(0);
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
                const data = selector.match(atttributeRe);
                reduceSelector(data[0].length);
                const name = unescapeCSS(data[1]).toLowerCase();
                token.attributes.push({
                    name,
                    operator: data[2] || '',
                    value: unescapeCSS(data[4] || data[5] || ''),
                    ignoreCase: !!data[6]
                });
            } else if (char === ':') {
                const data = selector.match(pseudoRe);
                reduceSelector(data[0].length);
                const name = unescapeCSS(data[1]).toLowerCase();
                token.pseudos.push({
                    name,
                    value: unescapeCSS(data[3] || '')
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
