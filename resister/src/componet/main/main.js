import { useState } from "react"
import "./main.css"
import { gsap } from "gsap"
function Content(probs){

    const e = probs.contentInfo

    return (<div key={e.name} className="menu-content" onMouseLeave={probs.onLeave} onMouseEnter={probs.onEnter} onClick={event=>{
        event.preventDefault()
        window.location.href = e.link
    }}>
   
        <div className="menu-content-num">
            <p className="menu-content-number">{e.num}</p>
            <p className="menu-content-p">{e.name}</p>
        </div>
        <div className="menu-content-intro">
            <p className="menu-content-intro-p">{e.intro}</p>
        </div>
        <div className="menu-content-img">
            <img src={e.imgurl} className="menu-content-img-icon"></img>
        </div>
    </div>)
}

function MainMenu(){

    const contentInfo = [
        {
            name : "시간표",
            intro: "시간표만들기에서 저장했던시간표들을 불러오고 관리 할 수 있습니다.",
            imgurl : "",
            link:"/",
            num:"01"
        },
        {
            name : "정보 수정",
            intro: "학년, 학번, 이름등 개인정보를 수정 할 수 있습니다.",
            imgurl : "",
            link:"/",
            num:"02"
        },
        {
            name : "시간표 만들기",
            intro: "질문을 통해서 자동으로 시간표를 만들 수 있습니다.",
            imgurl : "",
            link:"/",
            num:"03"
        },
    ]


    const onEnter = ({ currentTarget }) => {
        gsap.to(currentTarget, { scale: 1.05 });
      };
      
      const onLeave = ({ currentTarget }) => {
        gsap.to(currentTarget, { scale: 1 });
      };

    return <div className="container-main-menu">

        <Content onEnter={onEnter} onLeave={onLeave} contentInfo={contentInfo[0]} />
        <Content onEnter={onEnter} onLeave={onLeave} contentInfo={contentInfo[1]} />
        <Content onEnter={onEnter} onLeave={onLeave}contentInfo={contentInfo[2]} />

    </div>
}

function Main(){
    return <div className="container-main">
        <MainMenu></MainMenu>
    </div>
}

export default Main