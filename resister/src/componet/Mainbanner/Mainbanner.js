import "./Mainbanner.css"
import { gsap} from "gsap"
import React, { useState, useEffect,useRef } from 'react';

function MainTRD(){
    return <div className="mainbanner-frame-trd" >
        UI 다듬어지면 그거 넣을 예정
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
        gsap.to(infoRef.current, { y: -400, duration: 1 });
      } else {
        gsap.to(infoRef.current, { y: 0, duration: 1});
      }
      console.log(scrollY)
    }, [scrollY]);

    return <div className="mainbanner-frame-sec" >
        <div className="mainbanner-sec-title">

        </div>
        <div className="mainbanner-sec-recommand" ref={infoRef}>
            <div>더 이상 시간표에 시간을 할애하지 마세요</div>
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
           <button onClick={e=>{e.preventDefault(); window.location.href="/login"}}>계정 만들기</button>
        </div>
    </div>
}

function MainBanner(){
    return (<div className="containner-mainbanner">
        <MainFST/>
        <MainSEC/>
        <MainTRD/>
    </div>)
}

export default MainBanner