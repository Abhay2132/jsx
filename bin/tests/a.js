// const jsx = require('../lib/jsx')
// const path = require("path")
// const fs = require('fs')

import * as jsx from "../lib/jsx.js"
import * as path from "node:path"
import * as fs from "node:fs";

(async () => {

    const root = path.resolve();

    console.time("renderFile (main)")
    await jsx.renderFile(path.join(root, "app", "pages", "main.jsx"))
    console.timeEnd('renderFile (main)')

    console.time("renderFile (layout)")
    await jsx.renderFile(path.join(root, "app", "pages", "layout.jsx"))
    console.timeEnd("renderFile (layout)")

    const {default : layout} = await import(path.join(root, '.jsx', 'layout.js'))

    console.time('data')
    const html = layout()//{data : 'NEW DATA'});
    console.timeEnd('data')

    console.log({html})
    // console.log({ layout})
    fs.writeFileSync(path.join(root, '.jsx', 'index.html'), html)
})();