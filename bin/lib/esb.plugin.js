const empty = module.path+"/empty.js";
// console.log({empty});

module.exports = () => ({
    name: 'dependcies finder',
    setup(build) {

        const hrefs = new Set();

        // build.onLoad({ filter: /.*/ }, args => {
        //     return {
        //         contents: getHead({ styles : Array.from(hrefs) }),
        //         loader: 'jsx'
        //     }
        // })

        build.onResolve({filter: /.*/}, args =>{
            if(args.kind == 'entry-point') return;
            return {
                path: empty,
                external: true
            }
        })
        // build.onResolve({ filter: /.*/ }, args => {
        //     return void console.log(args)
        //     hrefs.add(args.path.slice(1))
        //     return {
        //         path : empty,
        //         external : true
        //     }
        // })

        
    }
})

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