console.time('time')
process.on('beforeExit', ()=> console.timeEnd('time'))

const esbuild = require('esbuild')
const path = require("path")
const babel = require("babel-core");
const fs = require('fs');

const root = path.resolve();
const outdir = path.join(root, '.jsx');

async function render(filepath) {
    const text = fs.readFileSync(filepath).toString();

    const outFile = path.join(root, '.jsx', path.basename(filepath).slice(0, -1))
    const jsx = babel.transform(text, {
        ast: true,
        "plugins": [
            [
                "@babel/plugin-transform-react-jsx",
                {
                    "throwIfNamespace": true, // defaults to true
                    "runtime": "automatic", // defaults to classic
                    "importSource": path.join(root, 'bin', 'lib')
                }
            ]
        ]
    })

    const { code , ast  } = jsx;
    const transformed = babel.transform(code, {
        "plugins": [
            ["@babel/plugin-transform-modules-commonjs", {
                "allowTopLevelThis": true
            }]
        ]
    })
    fs.writeFileSync(outFile, transformed.code);
    console.log({ast});
    // fs.writeFileSync(outFile, code);
    // return { code };
}

function _createElement() {

}

module.exports = {
    render,
    _createElement
}