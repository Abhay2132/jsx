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
(async () => {
    const files = ls(pagesDir)//.filter(file => file.endsWith('jsx'))
    // return console.log(files)
    console.time('buildAsync')
    // buildin jsx
    await esbuild.build({
        entryPoints: files,
        outdir: jsxDir,
        jsxFactory: '_jsx',
        jsxImportSource: jsxRuntimeDir,
        jsx: 'automatic'
    })
    console.timeEnd('buildAsync')

    await esbuild.build({
        entryPoints: ls(jsxDir).filter(file => file.endsWith('.js')),
        outdir: jsxDir,
        allowOverwrite: true,
        plugins: [addJSinImports]
    })
})()


let addJSinImports = {
    name: 'file',
    setup(build) {
        console.log("SETUP")
        build.onResolve({ filter: /.*/ }, args => {
            console.log({ args })
            return { }
        })

    },
}
