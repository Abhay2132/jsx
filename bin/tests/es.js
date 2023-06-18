// const { transformFile } = require('../lib/esbuild')
// const path = require('path')
// const fs = require('fs')

import { transform} from "../lib/esbuild.js"
import * as path from "path"
import * as fs from "fs"

const root = path.resolve();
const layoutFilePath = path.join(root, 'app', 'pages', 'layout.jsx');
const mainFilePath = path.join(root, 'app', 'pages', 'main.jsx');
const jsxDir = path.join(root, ".jsx");
// transformFile(file, null, (err, data) => {
//     if(err) return console.error({err})
//     // console.log({data})
//     const out = path.join(root, '.jsx', 'layout.mjs')
//     fs.writeFileSync(out, data.code)
//     import(out)
//     .then(data =>{
//         let layout = data.default;
//         let html = layout();
//         console.log({html})
//     })
// })

(async ()=>{
    const layoutText = fs.readFileSync(layoutFilePath).toString();
    const mainText = fs.readFileSync(mainFilePath).toString();

    let mainJsx = await transform(mainText);
    let layoutJsx = await transform(layoutText);

    let mainOutPath = path.join(jsxDir, 'main.js');
    let layoutOutPath = path.join(jsxDir, 'layout.js')

    fs.writeFileSync(mainOutPath, mainJsx.code)
    fs.writeFileSync(layoutOutPath, layoutJsx.code);

    // let main = (await import(mainOutPath)).default;
    let layout = (await import(layoutOutPath)).default;

    let html = layout({data: "GTA VI"});

    console.log({html})

})();