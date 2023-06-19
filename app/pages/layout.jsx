import Main from "./main"

export default function ROOT ({data = {}}={}){
    return (<html lang='en'>
        <head>
            <title>JSX Complier</title>
        </head>
        <body>
            <Main text='India is Great' data={data}>
                I am Abhay Bisht
            </Main>
        </body>
    </html>)
}