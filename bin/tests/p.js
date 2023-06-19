function parseStyle (data={}){
    let style = ''
    for(let prop in data){
        let newProp = ''
        let re = /[A-Z]/g;
        let arr = []
        let lastPos = 0;
        while((arr = re.exec(prop)) !== null){
            let {lastIndex : end} = re;
            let {index: start} = arr
            newProp += prop.slice(lastPos, start) + '-' + arr[0]
            lastPos = end;
        }
        if(lastPos > 0) newProp += prop.slice(lastPos)
        style += `${newProp.toLowerCase()}:${data[prop]};`
    }
    return style;
}

let style = {
    borderBottomColor : 'red',
    borderLeftColor: 'pink'
}

console.time('time')
let styleStr = parseStyle(style);
console.timeEnd('time')

console.log({styleStr})