import "./home.css"
// import { gsap } from "gsap"

function InitHome(){

    const GoLogin = () =>{
        window.location.href = '/login'  
    }

    return <div className="container-inithome">
        <h1 id="inithome-h1">한신대 시간표 추천</h1>
        <button className="inithome-button" id="login-button" onClick={GoLogin}>로그인</button>
        <button className="inithome-button" id="nologin-button">비회원 사용</button>
        <div className="init-div">
        <h3 className="init-h3">수강신청을 하고싶다면 →  </h3>    
            <a className="init-a"href="/">한신대 수강신청 링크</a>
        </div>
    </div>
}

function Home(){
    return <div className="container-home">
        <InitHome/>    
    </div>
}

export default Home