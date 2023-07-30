const fs = require('fs');
const path = require('path')
const test = require("node:test")

const tests = fs.readdirSync(module.path).filter(file => file !== 'index.js');

for(let t of tests){
	test(t, ()=>{
		console.log(`\nRunning "${t}"${"_".repeat(process.stdout.columns - t.length - 10)}`)
		require(path.join(module.path, t))();
	})
}