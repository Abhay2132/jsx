const fs = require("node:fs/promises");
const path = require("path")
const {BM} = require("../lib/utils")

const {
    swcAST,
    acornAST
} = require('../ast')

async function main (){
	const source = await require('../index')();

	let bm = new BM({name : "AST (Abstract Syntax Tree)"})

	bm.add({
		name : 'SWC',
		async func(){
			await swcAST(source);
		}
	})
	.add({
		name:'Acorn',
		async func(){
			await acornAST(source);
		}
	})

	await bm.run();
	bm.display();
	// let swcOutput = await swcAST(source);
	// let acornOutput = await acornAST(source);

	// console.log("swc",swcOutput)
	// console.log("acorn",acornOutput)
}

if(module.id === '.') main();
module.exports = main