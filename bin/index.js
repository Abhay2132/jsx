const esbuild = require('esbuild')
const path = require("path")
const root = path.resolve();
const fs = require("fs")

esbuild.buildSync({
    entryPoints: [path.join(root, "app", "pages", "layout.jsx")],
    bundle: true,
    jsxFactory: '_createElement',
    // jsxFragment: 'Fragment',
    outdir: path.join(root, '.jsx'),
    jsx: 'automatic',
    loader: {'.js': 'jsx'},
    jsxImportSource: path.join(root, 'bin', 'lib'),

    platform: 'node',
    target : ['node10.4'],
})

const {default: layout} = require("../.jsx/layout");
const html = layout({data: "ABHAY"});
console.log({html})

// console.log({layout})
