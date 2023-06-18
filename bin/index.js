const esbuild = require('esbuild')
const path = require("path")
const { path: root } = module;
const fs = require("fs")

esbuild.buildSync({
    entryPoints: [path.join(root, "app", "pages", "layout.jsx")],
    bundle: true,
    jsxFactory: '_createElement',
    jsxFragment: 'Fragment',
    outdir: path.join(root, '.jsx'),
    minify: true,
})

fs.readFile('./.jsx/layout.js', (err, data)=>{
    if(err) return console.error(err);
    
    let text = data.toString();
    let component = `const {_createElement} = require('./lib/jsx'); module.exports = ${text.slice(6, -5)}`;
    console.log({component})
})
