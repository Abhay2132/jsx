const prettier = require("prettier");
const swc = require('@swc/core')
const fs = require("node:fs/promises");
const path = require("path")
const acorn = require("acorn")
const transform = require("./index")

async function swcAST(source) {
    const mod = await swc.parse(source, {
        syntax: "ecmascript", // "ecmascript" | "typescript"
        comments: false,
        script: true,
        target: "es3",
    })

    const body = await prettier.format(JSON.stringify(mod.body), {
        semi: false,
        parser: "acorn"
    });

    return mod;
}

function acornAST(source) {
    return acorn.parse(source, {
        ecmaVersion: 2020,
        sourceType : 'module',
    })
}

module.exports = {
    swcAST,
    acornAST
}