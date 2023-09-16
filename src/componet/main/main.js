// import { useState } from "react"
import "./main.css"
import { gsap } from "gsap"
import listpng from './icon/list2.png';
import calendarpng from './icon/calendar2.png';
import userpng from './icon/user2.png';
import FrameChanger from "./mark_animation";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Login from "../user/login/Login";

function Content(probs){

    const e = probs.contentInfo

    return (<div key={e.name} className={e.style} onMouseLeave={probs.onLeave} onMouseEnter={probs.onEnter} onClick={event=>{
        event.preventDefault()
        if(e.link !== "")
            window.location.href = e.link
    }}>
   
        <div className="menu-content-num">
            {/* <p className="menu-content-number">{e.num}</p> */}
            <div className="menu-content-img-icon" style={{
            backgroundImage: `url(${e.imgurl})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            backgroundPosition: 'center'
        }}> 
            </div>
            <p className="menu-content-p">{e.name}</p>
        </div>
        <div className="menu-content-intro">
            <p className="menu-content-intro-p">{e.intro}</p>
        </div>
    </div>)
}

function MainMenu(){
    const location = useLocation()
    const Login_state = location.state!==undefined ? location.state.data : false

    useEffect(()=>{
        console.log(Login_state)
    },[])

    const contentInfo = [
        {
            name : "시간표",
            intro: "시간표만들기에서 저장했던시간표들을 불러오고 관리 할 수 있습니다.",
            imgurl :listpng,
            link:"/list",
            num:"01",
            style:"menu-content"
        },
        {
            name : "정보 수정",
            intro: "학년, 학번, 이름등 개인정보를 수정 할 수 있습니다.",
            imgurl :userpng,
            link:"/",
            num:"02",
            style:"menu-content"
        },
        {
            name : "시간표 만들기",
            intro: "질문을 통해서 자동으로 시간표를 만들 수 있습니다.",
            imgurl :calendarpng,
            link:"/question",
            num:"03",
            style:"menu-content"
        },
    ]

    const contentInfo_nonactive = [
        {
            name : "시간표",
            intro: "시간표만들기에서 저장했던시간표들을 불러오고 관리 할 수 있습니다.",
            imgurl :listpng,
            link:"",
            num:"01",
            style:"menu-content-none"
        },
        {
            name : "정보 수정",
            intro: "학년, 학번, 이름등 개인정보를 수정 할 수 있습니다.",
            imgurl :userpng,
            link:"",
            num:"02",
            style:"menu-content-none"
        },
        {
            name : "시간표 만들기",
            intro: "질문을 통해서 자동으로 시간표를 만들 수 있습니다.",
            imgurl :calendarpng,
            link:"/question",
            num:"03",
            style:"menu-content"
        },
    ]


    const onEnter = ({ currentTarget }) => {
        gsap.to(currentTarget, { scale: 1.03,duration:0.2});
      };
      
      const onLeave = ({ currentTarget }) => {
        gsap.to(currentTarget, { scale: 1 ,duration:0.2});
      };

    return <div className="container-main-menu">

        <Content onEnter={onEnter} onLeave={onLeave} contentInfo={Login_state===true ? contentInfo[0]: contentInfo_nonactive[0]} />
        <Content onEnter={onEnter} onLeave={onLeave} contentInfo={Login_state===true ? contentInfo[1]: contentInfo_nonactive[1]} />
        <Content onEnter={onEnter} onLeave={onLeave} contentInfo={Login_state===true ? contentInfo[2]: contentInfo_nonactive[2]} />

    </div>
}

function Main(){
    return <div className="container-main">
        <div className="container-image-frame">
            <FrameChanger/>
        </div>
        <MainMenu></MainMenu>
        
        <div><a id="출처"href="https://kr.freepik.com/icon/%ED%8F%B4%EB%8D%94_7094763#position=28&fromView=resource_detail">Rizki Ahmad Fauzi 제작 아이콘</a></div>
    </div>
}

export default Main