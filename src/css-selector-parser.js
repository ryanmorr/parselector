// Adapted from https://github.com/fb55/css-what

const cache = Object.create(null);
const nameRe = /^(?:\\.|[\w\-\u00c0-\uFFFF])+/;
const escapeRe = /\\([\da-f]{1,6}\s?|(\s)|.)/ig;
/* eslint-disable-next-line max-len */
const atttributeRe = /^\s*((?:\\.|[\w\u00c0-\uFFFF\-])+)\s*(?:(\S?=)\s*(?:(['"])([^]*?)\3|(#?(?:\\.|[\w\u00c0-\uFFFF\-])*)|)|)\s*(i)?\]/;

// Adapted from https://github.com/jquery/sizzle/blob/master/src/sizzle.js#L139
function unescapeCSS(str) {
    return str.replace(escapeRe, (all, escaped, escapedWhitespace) => {
        const high = '0x' + escaped - 0x10000;
        if (Number.isNaN(high) || escapedWhitespace) {
            return escaped;
        } else if (high < 0) {
            return String.fromCharCode(high + 0x10000);
        }
        return String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
    });
}

function isWhitespace(c) {
    return c === ' ' || c === '\n' || c === '\t' || c === '\f' || c === '\r';
}

function isQuote(c) {
    return c === '"' || c === '\'';
}

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

    function isEscaped(pos) {
        let slashCount = 0;
        while (selector.charAt(--pos) === '\\') slashCount++;
        return (slashCount & 1) === 1;
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
                    value: getName()
                });
            } else if (char === '.') {
                reduceSelector(1);
                token.attributes.push({
                    name: 'class',
                    operator: '~=',
                    value: getName()
                });
            } else if (char === '[') {
                reduceSelector(1);
                const data = selector.match(atttributeRe);
                reduceSelector(data[0].length);
                const name = unescapeCSS(data[1]).toLowerCase();
                token.attributes.push({
                    name,
                    operator: data[2] || '',
                    value: unescapeCSS(data[4] || data[5] || '')
                });
            } else if (char === ':') {
                reduceSelector(1);
                const name = getName().toLowerCase();
                let value = '';
                if (selector.charAt(0) === '(') {
                    let pos = 1, counter = 1;
                    for (; counter > 0 && pos < selector.length; pos++) {
                        if (selector.charAt(pos) === '(' && !isEscaped(pos)) counter++;
                        else if (selector.charAt(pos) === ')' && !isEscaped(pos)) counter--;
                    }
                    value = selector.substring(1, pos - 1);
                    reduceSelector(pos);
                    const quot = value.charAt(0);
                    if (quot === value.slice(-1) && isQuote(quot)) {
                        value = value.slice(1, -1);
                    }
                    value = unescapeCSS(value);
                }
                token.pseudos.push({name, value});
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
