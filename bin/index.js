const swc = require('@swc/core')
const fs = require("node:fs/promises");
const path = require("path")

// console.log({module})
1 && (async () => {
    // const file = module.filename;
    const file = path.join(module.path, 'tests', 'main.jsx');
    const source = (await fs.readFile(file)).toString();
    console.log({source})

    const options = {
        filename: file,
        // sourceMaps: true,
        isModule: true,
        jsc: {
            parser: {
                syntax: "ecmascript",
                jsx: true,
            },
            transform: {},
        },
    }
    const output = await swc.transform(source, options)

    console.log({output})
})();