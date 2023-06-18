(async () => {
    const jsx = require('../lib/jsx')
    const path = require("path")
    const fs = require('fs')

    const root = path.resolve();

    await jsx.render(path.join(root, "app", "pages", "main.jsx"))
    await jsx.render(path.join(root, "app", "pages", "layout.jsx"))

    const {default : layout} = require(path.join(root, '.jsx', 'layout.js'))
    // const {default : layout} = await import(path.join(root, '.jsx', 'layout.js'))
    const html = layout({data : 'NEW DATA'});
    console.log({html})
    // console.log({ layout})
    fs.writeFileSync(path.join(root, '.jsx', 'index.html'), html)
})();