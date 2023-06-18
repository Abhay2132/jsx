const reservedAttributes = {
    'className': 'class'
}

const openTags = ['br', 'hr', 'img']

function parseChildren(children = []) {
    let body = ''
    for (let child of children) {
        if (child) {
            if (typeof child == "function") {
                body += child();
            } else if (typeof child == 'string') {
                body += child;
            } else if (Array.isArray(child)) {
                body += parseChildren(child);
            }
        }
    }
    return body;
}

function jsx(name = "", options = {}) {
    if (typeof name == 'function') return name(options);
    const { children = '' } = options;
    if (options.hasOwnProperty('children')) delete options.children;
    let attrStr = ''
    for (let key in options) {
        if (typeof options[key] !== 'string') continue;
        let value = options[key].toString();
        if (reservedAttributes.hasOwnProperty(key)) key = reservedAttributes[key];
        attrStr += ` ${key}='${value}'`;
    }
    let body = parseChildren([children]);

    if(openTags.includes(name)) return `<${name}${attrStr}/>`
    return `<${name}${attrStr}>${body}</${name}>`
}
module.exports = {
    jsx,
    jsxs: jsx
}