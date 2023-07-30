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

module.exports = {
	ls,
    extractImportString
}