import "@/sass/main.css"

export default function Main({text, children, data = {}}){
    return (
        <main className="main" id="viewport" style={{fontSize: '1rem'}}>
            HELLO
            <br />
            WORLD
            {text}
            <br/>
            {children}
            <br/>
            {typeof data !== 'undefined' ? data : 'data.name is empty'}
        </main>
    )
}

// setTimeout(()=> console.log(cssImports), 1000);