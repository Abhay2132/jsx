// const esbuild = require('esbuild')
// const fs = require("fs")
// const path = require('path')
import * as esbuild from "esbuild"
import * as fs from 'fs'
import * as path from 'path';

export async function transform(jsx) {
    console.time('transform')
    let result = await esbuild.transform(jsx, {
        
        jsxFactory: '_jsx',
        // jsxImportSource: path.join(path.resolve(), 'bin', 'lib'),
        // jsxImportSource: 'jsx',
        // jsx: 'automatic',
        loader: 'jsx',
        // bundle: true
    })
    console.timeEnd('transform')

    result.code = `import {jsx as _jsx} from "${path.join(path.resolve(), 'bin', 'lib', 'jsx-runtime.js')}"; \n  ${result.code}`
    return result;
}

export function renderFile(filepath, options, callback) {
    if (typeof options == 'function') callback = options;
    if (!callback) throw new Error(`callback is not a function, but '${typeof callback}'`);

    const jsx = fs.readFileSync(filepath).toString();
    transform(jsx)
        .then(data => {
            data.code = `import {jsx as _jsx, jsxs as _jsxs} from "${path.join(path.resolve(), 'bin', 'lib', 'esbuild.js')}"; \n${data.code}`
            callback(null, data)
        })
}
