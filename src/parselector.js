// Adapted from https://github.com/fb55/css-what

const cache = new Map();
const NAME_RE = /^(?:\\.|[\w\-\u00c0-\uFFFF])+/;
const UNESCAPE_RE = /\\(?:([0-9a-f]{1,6} ?)|(.))/ig;
const PSEUDO_CLASS_RE = /:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]?)((?:\([^)]+\)|[^()]*)+)\2\))?/;
const ATTRIBUTE_RE = /^\[((?:\\.|[\w\u00c0-\uFFFF-])+)\s*(?:(\S?=)\s*(?:(['"])([^]*?)\3|(#?(?:\\.|[\w\u00c0-\uFFFF-])*)|)|)\s*(i)?\]/;

export default function parselector(selector) {
    selector = selector.trim();
    if (cache.has(selector)) {
        return cache.get(selector);
    }
    let token;
    let tokens = [];
    let hasWhitespace = false;
    const groups = [];

    const getName = () => {
        const name = selector.match(NAME_RE)[0];
        reduceSelector(name.length);
        return unescapeCSS(name);
    };

    const reduceSelector = (index) => {
        selector = selector.substring(index);
    };

    const stripWhitespace = (start) => {
        while (isWhitespace(selector.charAt(start))) start++;
        reduceSelector(start);
    };

    const isWhitespace = (c) => {
        return c === ' ' || c === '\n' || c === '\t' || c === '\f' || c === '\r';
    };

    const unescapeCSS = (str) => {
        return str.replace(UNESCAPE_RE, (match, hex, char) => {
            if (hex) {
                return String.fromCharCode(parseInt(hex, 16));
            }
            return char;
        });
    };

    const resetToken = () => {
        token = {
            attributes: [],
            pseudoClasses: [],
            pseudoElement: null
        };
    };

    resetToken();
    while (selector !== '') {
        const char = selector.charAt(0);
        if (isWhitespace(char)) {
            hasWhitespace = true;
            stripWhitespace(1);
        } else if (char === '>' || char === '<' || char === '~' || char === '+') {
            if (token.nodeName || token.attributes.length > 0 || token.pseudoClasses.length > 0) {
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
                const data = selector.match(ATTRIBUTE_RE);
                reduceSelector(data[0].length);
                const name = unescapeCSS(data[1]);
                token.attributes.push({
                    name,
                    operator: data[2] || '',
                    value: unescapeCSS(data[4] || data[5] || ''),
                    ignoreCase: !!data[6]
                });
            } else if (char === ':') {
                if (selector[1] === ':') {
                    reduceSelector(2);
                    token.pseudoElement = getName();
                } else {
                    const data = selector.match(PSEUDO_CLASS_RE);
                    reduceSelector(data[0].length);
                    const name = unescapeCSS(data[1]);
                    token.pseudoClasses.push({
                        name,
                        value: unescapeCSS(data[3] || '')
                    });
                }
            } else if (NAME_RE.test(selector)) {
                token.nodeName = getName().toLowerCase();
            }
        }
    }
    tokens.push(token);
    groups.push(tokens);
    cache.set(selector, groups);
    return groups;
}
