import Main from "./main"
import Head from "./head";

export default function ROOT ({data={}}){
    return (<html lang='en'>
        <Head>
            <title>JSX Complier</title>
        </Head>
        <body>
            <Main text='India is Great...' data={data}>
                I am Abhay Bisht
            </Main>
        </body>
    </html>)
}