// Adapted from https://github.com/fb55/css-what

const nameRe = /^(?:\\.|[\w\-\u00c0-\uFFFF])+/;
const escapeRe = /\\([\da-f]{1,6}\s?|(\s)|.)/ig;
/* eslint-disable-next-line max-len */
const atttributeRe = /^\s*((?:\\.|[\w\u00c0-\uFFFF\-])+)\s*(?:(\S?=)\s*(?:(['"])([^]*?)\3|(#?(?:\\.|[\w\u00c0-\uFFFF\-])*)|)|)\s*(i)?\]/;

// Adapted from https://github.com/jquery/sizzle/blob/master/src/sizzle.js#L139
function unescapeCSS(str) {
    return str.replace(escapeRe, (all, escaped, escapedWhitespace) => {
        const high = '0x' + escaped - 0x10000;
        /* eslint-disable-next-line no-self-compare */
        if (high !== high || escapedWhitespace) {
            return escaped;
        } else if (high < 0) {
            return String.fromCharCode(high + 0x10000);
        }
        return String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
    });
}

export default function parse(selector) {
    const groups = [];
    let tokens = [], sawWS = false, token, data, char, name, quot;

    function getName() {
        const sub = selector.match(nameRe)[0];
        selector = selector.substr(sub.length);
        return unescapeCSS(sub);
    }

    function stripWhitespace(start) {
        while (isWhitespace(selector.charAt(start))) start++;
        selector = selector.substr(start);
    }

    function isWhitespace(c) {
        return c === ' ' || c === '\n' || c === '\t' || c === '\f' || c === '\r';
    }

    function isEscaped(pos) {
        let slashCount = 0;
        while (selector.charAt(--pos) === '\\') slashCount++;
        return (slashCount & 1) === 1;
    }

    function isQuote(c) {
        return c === '"' || c === '\'';
    }

    function resetToken() {
        token = {
            attributes: [],
            pseudos: []
        };
    }

    resetToken();
    selector = selector.trim();

    while (selector !== '') {
        char = selector.charAt(0);
        if (isWhitespace(char)) {
            sawWS = true;
            stripWhitespace(1);
        } else if (char === '>' || char === '~' || char === '+') {
            tokens.push(token);
            tokens.push(char);
            resetToken();
            sawWS = false;
            stripWhitespace(1);
        } else if (char === ',') {
            tokens.push(token);
            groups.push(tokens);
            resetToken();
            tokens = [];
            sawWS = false;
            stripWhitespace(1);
        } else {
            if (sawWS) {
                tokens.push(token);
                tokens.push(' ');
                resetToken();
                sawWS = false;
            }
            if (char === '*') {
                selector = selector.substr(1);
                token.nodeName = '*';
            } else if (char === '#') {
                selector = selector.substr(1);
                token.attributes.push({
                    name: 'id',
                    operator: '=',
                    value: getName()
                });
            } else if (char === '.') {
                selector = selector.substr(1);
                token.attributes.push({
                    name: 'class',
                    operator: '~=',
                    value: getName()
                });
            } else if (char === '[') {
                selector = selector.substr(1);
                data = selector.match(atttributeRe);
                selector = selector.substr(data[0].length);
                name = unescapeCSS(data[1]).toLowerCase();
                token.attributes.push({
                    name,
                    operator: data[2] || '',
                    value: unescapeCSS(data[4] || data[5] || '')
                });
            } else if (char === ':') {
                selector = selector.substr(1);
                name = getName().toLowerCase();
                data = '';
                if (selector.charAt(0) === '(') {
                    let pos = 1, counter = 1;
                    for (; counter > 0 && pos < selector.length; pos++) {
                        if (selector.charAt(pos) === '(' && !isEscaped(pos)) counter++;
                        else if (selector.charAt(pos) === ')' && !isEscaped(pos)) counter--;
                    }
                    data = selector.substr(1, pos - 2);
                    selector = selector.substr(pos);
                    quot = data.charAt(0);
                    if (quot === data.slice(-1) && isQuote(quot)) {
                        data = data.slice(1, -1);
                    }
                    data = unescapeCSS(data);
                }
                token.pseudos.push({name, value: data});
            } else if (nameRe.test(selector)) {
                token.nodeName = getName().toLowerCase();
            }
        }
    }
    tokens.push(token);
    groups.push(tokens);
    return groups;
}
