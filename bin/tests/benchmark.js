const {
	BM
} = require("../lib/utils")
const bm = new BM({name: "TESTING BM", cycles : 500})

async function main(argument) {

	bm
		.add({
			name: 'func1',
			func() {
				let a = 0
				for (let i = 0; i < 10e4; i++) {
					a += 1
				}
			}
		})
		.add({
			name : 'func2',
			func(){
				let b = 50000;
				while(b--){ b -= 0}
			}
		})
	await bm.run();

	bm.display();

}

if(module.id == '.') main();
module.exports = main;