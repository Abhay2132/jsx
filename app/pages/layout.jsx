import {cssImports as main_css_imports, default as Main} from "./main"
// import Head from "./head";
import "@/sass/global.css"
import "@/sass/colorThemes.css";

export default function ROOT ({data={}}){

    const cssLinks = (main_css_imports || []).map((href)=>{
        return (<link rel="stylesheet" href={href} />)
    })
    return (<html lang='en'>
        <head>
            <title>JSX Complier</title>
            {cssLinks}
        </head>
        <body>
            <Main text='India is Great...' data={data}>
                I am Abhay Bisht
            </Main>
        </body>
    </html>)
}

