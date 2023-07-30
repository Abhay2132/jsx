const esbuild = require('esbuild')
const path = require("path");
const fs = require("fs")
const plugin = require('./plugin')
const { format } = require("prettier")

const root = path.resolve();
const outdir = path.join(root, '.jsx');
if (fs.existsSync(outdir)) fs.rmSync(outdir, {
    recursive: true
});
const {ls} = require('./lib/utils.js')

const entryPoints = ls(path.join(root, 'app', 'pages'));
console.time('html');

(async () => {

    const options = {
        entryPoints,
        // jsxFactory: '_createElement',
        outdir,
        jsx: 'automatic',
        // loader: {
        //     '.js': 'jsx'
        // },
        jsxImportSource: path.join(root, 'bin', 'lib'),
        platform: 'node',
        target: ['es2020', 'chrome90', 'node20'],
        format: 'cjs',
        // format: 'esm',

        plugins: [plugin()],
        // bundle: true,
        // external : [path.join(root, 'bin', 'lib', 'jsx-runtime.js')],
    }
    await esbuild.build(options)

    // return
    // Render the HTML
    const {
        default: layout
    } = require("../.jsx/layout");
    const html = layout({
        data: "ABHAY"
    });
    console.timeEnd("html")
    // console.log({ html })
    const htm = await format(html, {
        parser: 'html'
    })

    fs.writeFileSync(path.join(root, '.jsx', 'index.html'), htm);
    console.log(htm)


})()