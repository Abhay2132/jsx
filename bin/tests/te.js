import Layout from "../../.jsx/layout.js"
import ejs from "ejs"

const temp = ejs.compile(`<html lang="en">
<head>
    <title>JSX Complier</title>
</head>
<body>
    <main class="main" id="viewport" style="font-size: 1rem">
       <%= data %>
    </main>
</body>
</html>
`);

const ejsTime = []
const jsxTime = [];

for(let i = 0; i < 10e4; i++){
    let ejsT1 = performance.now();
    const ejsStr = temp({data: "ABHAY"});
    let ejsT2 = performance.now()
    ejsTime.push(ejsT2 - ejsT1);

    let jsxT1 = performance.now();
    const layoutStr = Layout({data : "ABHAY"})
    let jsxT2 = performance.now();
    jsxTime.push(jsxT2 - jsxT1);

}

function stat (arr=[]){
    let min = Math.min(...arr);
    let max = Math.max(...arr)
    let sum = arr.reduce((a,b)=> a+b, 0);
    let avg = sum / arr.length;

    return  {min, max, avg}
}

console.log("ejs")
console.log(stat(ejsTime))
console.log("_".repeat(process.stdout.columns))
console.log("jsx")
console.log(stat(jsxTime))