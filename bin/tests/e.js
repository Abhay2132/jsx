const esbuild = require('esbuild')
const path = require('path')
const root = path.resolve();

esbuild.buildSync({
    entryPoints: [path.join(root, 'app', 'pages', 'layout.jsx')],
    bundle: true,
    // platform: 'node',
    // target : ['node10.4'],
    // packages: 'external',
    loader: { '.js': 'jsx' },
    outfile: path.join(root, '.jsx', 'layout.js'),
    jsxImportSource: path.join(root, 'bin', 'lib'),
    jsx: 'automatic',
    jsxFactory: '_jsx',
    // jsxFragment: 'Fragment',
  })