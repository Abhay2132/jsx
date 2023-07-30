const path = require('path');
const fs = require("fs/promises");
const root = path.resolve();
const app = path.join(root, 'app');
const {extractImportString} = require("./lib/utils");

const empty = module.path+"/empty.js";
// console.log({empty});

module.exports = () => ({
    name: 'dependcies finder',
    setup(build) {

        const hrefs = new Set();

        build.onLoad({filter: /(head\.jsx)$/},  args =>{
           return {
                contents: getHead({ styles : Array.from(hrefs) }),
                loader: 'jsx',
                // external: true,
            }
        })

        build.onLoad({filter: /\.jsx$/}, async args =>{
            const data = (await fs.readFile(args.path)).toString();
            const cssImports = data.match(/import\s+(('[^']*\.css')|("[^"]*\.css"));?/gm);
            
            if(cssImports) {
                cssImports.forEach(href => hrefs.add(href));            
                var importStrings = Array.from(cssImports).map(extractImportString);
            }

            const newData = data.replace(/import\s+(('[^']*\.css')|("[^"]*\.css"));?/gm, '') +
            (cssImports ? `\nexport const cssImports = JSON.parse(\`${JSON.stringify(importStrings)}\`);` : '');
            console.log(cssImports, importStrings);
            return {
                contents : newData,
                loader: 'jsx',
            }
        })

        build.onResolve({filter: /jsx-runtime\.js$/}, args => {
            console.log('hehe')
            return {
                path : args.path,
                external: true
            }
        })

        build.onResolve({filter : /^@/}, args =>{
            // return console.log(args)
            return {
                path: path.join('app' ,args.path.slice(1)),
                external : true
            }
        })
        
    }
})

/*
* params : data <array[string:<css_href>]>
* return   : <string>
*/
const getHead = (data) => `
export default function Head (props){
    const data = JSON.parse(\`${JSON.stringify(data)}\`)
    let styles = data?.styles?.map(href => (<link rel='stylesheet' href={href} />)) || []
    return (
        <head>
            {!!props?.children ? props.children : ''}
            {styles}
        </head>
    )
}`

