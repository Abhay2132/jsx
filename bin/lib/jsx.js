// const t = require('@babel/types')
// const esbuild = require('esbuild')
// const path = require("path")
// const babel = require("babel-core");
// const fs = require('fs');

import * as t from "@babel/types";
import * as esbuild from "esbuild";
import * as path from "node:path"
import * as fs from "fs"
import * as babel from "babel-core"

const root = path.resolve();
const outdir = path.join(root, '.jsx');

export async function renderFile(filepath) {
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
            ],
            JSadder
        ]
    })


    const { code, ast } = jsx;
    // const transformed = babel.transform(code, {
    //     "plugins": [JSadder]
    // })

    const outdir = outFile.slice(0, outFile.length - path.basename(outFile).length)
    if (!fs.existsSync(outdir)) fs.mkdirSync(outdir, { recursive: true })

    fs.writeFileSync(outFile, code);
}

function _createElement() {

}

const getExt = file => {
    let basename = file.split("/").at(-1);
    let name = basename.split("?")[0] || "";
    if (name.indexOf('.') < 0) return false;
    return name.split(".").at(-1);
    // return file?.split("/")?.at(-1)?.split('.')?.at(-1)?.split("?")?.at(0)
}

const JSadder = () => ({
    visitor: {
        ImportDeclaration: (path) => {
            const {specifiers, source} = path.node;
            if(!getExt(source.value))
            path.replaceWith(
                t.importDeclaration(
                    specifiers,
                    t.stringLiteral (source.value +".js")
                )
            )
        }
    }
})

// module.exports = {
//     renderFile,
//     _createElement
// }
