import "./Mainbanner.css"
import {gsap} from "gsap"
import React, { useState, useEffect,useRef } from 'react';
import calendar from '../main/icon/calendar2.png'
import list from '../main/icon/list2.png'
import user from '../main/icon/user2.png'
import hand from '../question/icon/hand.png'
import forbidden from '../question/icon/forbidden.png'
import clock from '../question/icon/clock2.png'
import good from '../question/icon/good1.png'
import mon from '../question/question_condition/rank_icons/Monday.png'
import tues from '../question/question_condition/rank_icons/Tuesday.png'
import wen from '../question/question_condition/rank_icons/Wednesday.png'
import thur from '../question/question_condition/rank_icons/Thursday.png'
import fri from '../question/question_condition/rank_icons/Friday.png'

function MainTRD(){

    const linkthis =(link)=>{
      const copyToClipboard=(text)=> {
        const tempInput = document.createElement("textarea");
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy"); 
        document.body.removeChild(tempInput); 
    }
    copyToClipboard(link)
    alert('링크가 복사되었습니다.')
    }

    return <div className="mainbanner-frame-trd" >
      <span>Designed by Freepik (Click copy link)</span>
      <div className="container-links">
        <img src={calendar} onClick={e=>{e.preventDefault(); linkthis('https://kr.freepik.com/icon/folder_7094763#position=28&fromView=resource_detail')}}></img>
        <img src={list} onClick={e=>{e.preventDefault(); linkthis('https://kr.freepik.com/icon/calendar_7094814#fromView=resource_detail&position=4')}}></img>
        <img src={user} onClick={e=>{e.preventDefault(); linkthis('https://kr.freepik.com/icon/user_7094779#fromView=resource_detail&position=20')}}></img>
        <img src={hand} onClick={e=>{e.preventDefault(); linkthis('https://kr.freepik.com/icon/%EC%86%90_2121078#fromView=search&term=hand&page=1&position=42')}}></img>
        <img src={forbidden} onClick={e=>{e.preventDefault(); linkthis('https://kr.freepik.com/icon/%EC%86%90_2121078#fromView=search&term=hand&page=1&position=42')}}></img>
        <img src={clock} onClick={e=>{e.preventDefault(); linkthis('https://kr.freepik.com/icon/rating_1365358')}}></img>
        <img src={good} onClick={e=>{e.preventDefault(); linkthis('https://kr.freepik.com/icon/clock_86093#fromView=search&term=clock&page=3&position=18&track=ais&track=ais')}}></img>
        <img src={mon} onClick={e=>{e.preventDefault(); linkthis('https://kr.freepik.com/icon/%ED%96%89%EC%84%B1_6428463')}}></img>
        <img src={tues} onClick={e=>{e.preventDefault(); linkthis('https://kr.freepik.com/icon/%ED%96%89%EC%84%B1_6428453')}}></img>
        <img src={wen} onClick={e=>{e.preventDefault(); linkthis('https://kr.freepik.com/icon/%ED%96%89%EC%84%B1_6428465')}}></img>
        <img src={thur} onClick={e=>{e.preventDefault(); linkthis('https://kr.freepik.com/icon/%ED%96%89%EC%84%B1_6428447')}}></img>
        <img src={fri} onClick={e=>{e.preventDefault(); linkthis('https://kr.freepik.com/icon/%ED%96%89%EC%84%B1_6428478')}}></img>
      </div>
    </div>
}

function MainSEC(){

    const [scrollY, setScrollY] = useState(0);
    const infoRef = useRef(null);
  
    useEffect(() => {
      const handleScroll = () => {
        setScrollY(window.scrollY);
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
    useEffect(() => {
      if (scrollY > 500) {
        gsap.to(infoRef.current, { y: -300, duration: 1 });
      } else {
        gsap.to(infoRef.current, { y: 0, duration: 1});
      }
      console.log(scrollY)
    }, [scrollY]);

    return <div className="mainbanner-frame-sec" >
        <div className="mainbanner-sec-title">

        </div>
        <div className="mainbanner-sec-recommand" ref={infoRef}>
            <div>더 이상 시간표 만드는 시간을 할애하지 마세요</div>
        </div>
    </div>
}

function MainFST(){
    return <div className="mainbanner-frame-fst" >
        <div className="mainbanner-fst-title">
            더욱 편리하고 빠르게<br/> 시간표를 만드세요
        </div>
        <div className="mainbanner-fst-recommand">
           <div> 저장 기능을 사용하려면 계정을 만드세요</div>
           <button onClick={e=>{e.preventDefault(); window.location.href="/login"}}>로그인</button>
        </div>
    </div>
}

function MainBanner(){
    return (<div className="containner-mainbanner">
        <MainFST/>
        <MainSEC/>
        <MainTRD/>
        <div style={{width:'10px',height:'100px'}}></div>
    </div>)
}

export default MainBanner