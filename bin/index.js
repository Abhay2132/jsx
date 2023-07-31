const swc = require('@swc/core')
const fsp = require("node:fs/promises");
const fs = require('node:fs')
const path = require("node:path")

const root = path.resolve();
const jsxDir = path.join(root, '.jsx')
if(fs.existsSync(jsxDir)) fs.rmSync(jsxDir, {recursive: true});
if(!fs.existsSync(jsxDir)) fs.mkdirSync(jsxDir, {recursive: true});

async function transform(){
    // const file = module.filename;
    const file = path.join(path.resolve(), 'app', 'pages', 'layout.jsx');
    const source = (await fsp.readFile(file)).toString();

    const options = {
        filename: file,
        // sourceMaps: true,
        isModule: true,
        jsc: {
            parser: {
                syntax: "ecmascript",
                jsx: true,
            },
            transform: {},
        },
    }
    const output = await swc.transform(source, options)
    // console.log(output.code);
    fs.writeFileSync(path.join(jsxDir, 'layout.js'), output.code);
    return output.code;
}

if(module.id === '.') transform();

module.exports = transform;