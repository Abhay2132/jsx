const fs = require("fs")
const path = require('path')
function ls(dir) {
    if (!fs.statSync(dir).isDirectory()) return [dir];
    let items = [];
    fs.readdirSync(dir).forEach((item) => {
        items = [...items, ...ls(path.join(dir, item))];
    });
    return items.filter(Boolean);
}

function extractImportString(source){
    let importStr = source.match(/(('[^']*\.css')|("[^"]*\.css"))/gm)
    return importStr?.at(0).slice(1,-1);
}

class BM {
    #entries = new Map();
    #name = 'BM';
    #defaultCycles = 50;

    constructor({name = 'BM', cycles=50}){
        this.#name = name;
        this.#defaultCycles = cycles
    }

    add ({name, func, cycles = this.#defaultCycles}){
        if(typeof name !== 'string') throw new Error('first argument should be a <string> name and cannot be empty');
        if(typeof func !== 'function') throw new Error('second argument should be a <function> and cannot be empty');

        this.#entries.set(name, {func, cycles})
        return this;
    }

    async run (showResult=false){
        console.log("Running the BenchMarker :", this.#name);
        console.log("ENTRIES : ", this.getNames())

        // for console logging cycles value at same column
        let largestNameLength = Math.max(...this.getNames().map(name => name.length))

        for(let [name, entry] of this.#entries.entries()){
            const it = performance.now();

            entry.stats = {
                timestamps : [],
                min : null,
                max : null,
                avg: null,
            }
            for(let i = 0; i< entry.cycles; i++){

                let t1 = performance.now();
                await entry.func();
                let t2 = performance.now();
                entry.stats.timestamps.push(t2-t1);

            }

            entry.stats.min = Math.min(...entry.stats.timestamps)
            entry.stats.max = Math.max(...entry.stats.timestamps)
            entry.stats.avg = entry.stats.timestamps.reduce((a,b)=>a+b, 0) / entry.stats.timestamps.length;
            console.log(`Entry : ${name}, ${" ".repeat(largestNameLength+1-name.length)} cycles : ${entry.cycles}`);

            // console.log(entry.stats);
        }

        if(showResult) this.getNames().forEach(name => console.log(name, this.getResult(name)))

        return this
    }

    getNames (){
        return [...this.#entries.keys()];
    }

    getResult(name){
        if (this.#entries.has(name)) {
            let {min, max, avg} = this.#entries.get(name).stats
            return {min, max, avg}
        }
    }

    display(){

        const head = "SCOREBOARD";
        const width = process.stdout.columns;
        const padding = parseInt(width /2) - parseInt(head.length / 2) - 1;
        const paddingChar = "=".repeat(padding);
        console.log(`${paddingChar} ${head} ${paddingChar}`)

        let avgs = this.getNames().map(name => [name, this.getResult(name).avg])
        avgs.sort((a,b)=>a[1] - b[1]);

        for(let i = 0 ; i < avgs.length; i++){
            console.log(`${i+1}. ${avgs[i][0]} (${avgs[i][1].toFixed(5)} ms)`);
        }
    }


}

module.exports = {
	ls,
    extractImportString,
    BM
}