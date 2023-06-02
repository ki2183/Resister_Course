import "./home.css"

function TestNav(){
    return <div className="container-nav">

    </div>
}

function InitHome(){
    return <div className="container-inithome">

    </div>
}

function Home(){
    return <div className="container-home">
        <TestNav/>
        <InitHome/>    
    </div>
}

export default Home