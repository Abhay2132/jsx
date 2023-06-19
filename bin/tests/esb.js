// testing my 'esbuild' plugin

import * as esbuild from 'esbuild'
import * as path from "node:path"
import * as fs from 'fs';

const root = path.resolve();
const jsxDir = path.join(root, '.jsx')
const pagesDir = path.join(root, 'app', 'pages');

function ls(dir) {
    if (!fs.statSync(dir).isDirectory()) return [dir];
    let items = [];
    fs.readdirSync(dir).forEach((item) => {
        items = [...items, ...ls(path.join(dir, item))];
    });
    return items.filter(Boolean);
}

const jsxRuntimeDir = path.join(root, 'bin', 'lib')
const jsxRuntime = path.join(jsxRuntimeDir, 'jsx-runtime');

let addJSinImports = {
    name: 'file',
    setup(build) {
        console.log("SETUP")
        const i = {value : 1}
        build.onLoad({ filter: /.*/ }, args => {
            console.log(i.value ++ , { args })
            return { }
        })

    },
};

(async () => {
    const files = ls(pagesDir)//.filter(file => file.endsWith('jsx'))

    // transform all jsx files -> ~/.jsx/*.js
    esbuild.buildSync ({
        entryPoints: files,
        outdir: jsxDir,
        jsxFactory: '_jsx',
        jsxImportSource: jsxRuntimeDir,
        jsx: 'automatic'
    })

    await esbuild.build({
        entryPoints: ls(jsxDir).filter(file => file.endsWith('.js')),
        outdir: jsxDir,
        allowOverwrite: true,
        plugins: [addJSinImports]
    })
})()


