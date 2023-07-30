const reservedAttributes = {
    'className': 'class'
}

// const openTags = ['br', 'hr', 'img', 'link']
const openTags = new Set([
"area",
"base",
"br",
"col",
"embed",
"hr",
"img",
"input",
"link",
"meta",
"param",
"source",
"track",
"wbr",
"command",
"keygen",
"menuitem",
"frame",
])

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

function parseStyle (data={}){
    let style = ''
    for(let prop in data){
        let newProp = ''
        let re = /[A-Z]/g;
        let arr = []
        let lastPos = 0;
        while((arr = re.exec(prop)) !== null){
            let {lastIndex : end} = re;
            let {index: start} = arr
            newProp += prop.slice(lastPos, start) + '-' + arr[0]
            lastPos = end;
        }
        if(lastPos > 0) newProp += prop.slice(lastPos)
        style += `${newProp.toLowerCase()}:${data[prop]};`
    }
    return style;
}

function _jsx(name = "", options = {}) {
    if (typeof name == 'function') return name(options);
    const { children = '' } = options;
    if (options.hasOwnProperty('children')) delete options.children;
    let attrStr = ''
    for (let key in options) {
        if(key.toLowerCase() == 'style' && typeof options[key] == 'object') {
            // console.time('parseStyle')
            attrStr += ` style="${parseStyle(options[key])}"`;
            // console.timeEnd('parseStyle')
            continue;
        }
        if (typeof options[key] !== 'string') continue;
        let value = options[key].toString();
        if (reservedAttributes.hasOwnProperty(key)) key = reservedAttributes[key];
        attrStr += ` ${key}='${value}'`;
    }
    let body = parseChildren([children]);
    if(openTags.has(name)) return `<${name}${attrStr}/>`
    return `<${name}${attrStr}>${body}</${name}>`
}

// export const jsx =  _jsx;
// export const jsxs = _jsx;

module.exports = {
    jsxDEV  : _jsx,
    jsxs: _jsx
}