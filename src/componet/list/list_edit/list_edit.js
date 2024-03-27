import { useLocation, useSearchParams } from 'react-router-dom';
import './list_edit.css'
import { useEffect, useState } from 'react';
import List_Edit_Table from './list_edit_view/list_edit_table';
import { useRef } from 'react';
import { gsap } from 'gsap';

// state

export default function List_Edit(probs){

    const loadRef = useRef(null)
    const NullRef = useRef(null)
    const scrollableDiv = useRef(null)

    // ----------------- 경로 확인

    const location = useLocation()
    const Login_state = location && location.state ? location.state.data : null; //비회원이면 false 회원이면 true
    const [state,setState] = useState('null')
    const [title,setTitle] = useState('제목')

    const TitleHandler = (e)=>{
        e.preventDefault();
        setTitle(e.target.value)
    }

    useEffect(()=>{console.log(probs.TL_DTO)},[probs.TL_DTO])

    useEffect(()=>{
        console.log(Login_state) // 로그인하면 true 아니면 false
        const element = document.getElementById("html-id");
        element.style.width = element.clientWidth + "px";
        element.style.height = element.clientHeight + "px";
        element.style.overflowX = 'hidden'
        element.style.overflowY = 'auto'

        if(Login_state == true){
            setState('login')
        }else if(Login_state == false){
            setState('nologin')
        }else{
            setState('list')
        }

    },[])

    useEffect(()=>{
        console.log(state)
        if(state==='nologin'){
            setState_Info(
                {
                    title:Title[0],
                    button:Button[0],
                    load:[Load[0][0],Load[0][1],[Load[0][2]]]
                }
            )
        }else if(state==='login'){
            setState_Info(
                {
                    title:Title[1],
                    button:Button[1],
                    load:[Load[1][0],Load[1][1],[Load[1][2]]]
                }
            )
        }else{
            setState_Info(
                {
                    title:Title[2],
                    button:Button[2],
                    load:[Load[2][0],Load[2][1],[Load[2][2]]]
                }
            )
        }
    },[state])

    const [state_Info,setState_Info] = useState({
        title:null,
        button:null,
        load:[null,null,null]
    })

    const Title = ['제목','제목','제목']
    const Button = ['나가기','저장하기','저장하기']
    const Load = [['메인','질문','비회원 시간표 수정'],['메인','질문','회원 시간표 수정'],['목록','내 시간표','내 시간표 수정']]
    

    // useState(()=>{

    //     console.log(state)
        

    // },[state])

    useEffect(()=>{
       console.log(state_Info) 
    },[state_Info])

    // ----------------- resize

 


    // ------------------

    const [contentWidth,setContentWidth] = useState(0)
    const inWidth = 750
    const width_max = (contentWidth-inWidth)

    const marginGap = 5
    const divWidth = 155

    const [contentView,setContentView] = useState([])

    
    const dateBefore = (date) =>{
        const time = date.slice(0,16)
        return time
    } // 첫교시 텍스트
    const dateAfter = (date) =>{
        const time = date.slice(18)
        return time
    }

    useEffect(()=>{
        const length = probs.TL_DTO.length
        setContentWidth(length*((marginGap*2)+divWidth)+marginGap*2)
        const contentView_ = []

        probs.TL_DTO.map((item,index)=>{
            contentView_.push(<div key={`${index}content`} className='frame-contentView' onClick={e=>{
                e.preventDefault();
                probs.SendID(item.id,item.subject_title,item)
                
            }} >
                            <span>{item.subject_title}</span>
                            <div className='contentView'>
                                <span>담당교수: {item.instruction}</span>
                                <span>학점: {item.credit}</span>
                                { item.class_time.length > 14 && (<span>{dateBefore(item.class_time)}</span>)}
                                { item.class_time.length === 0 && <div className='null-span'></div>}
                                { item.class_time.length > 17 && (<span>{dateAfter(item.class_time)}</span>)}
                                { item.class_time.length <= 17 && <div className='null-span'></div>}
                                
                            </div>
                            <div className='content-cancle'><span>✕</span></div>
            </div>)
        })
        setContentView(contentView_)

    },[probs.TL_DTO])

    useEffect(()=>{
        console.log(probs.menuTF)
        if(probs.menuTF===true){
            gsap.to(loadRef.current, { x: -330, y: 0, rotate: 0, duration: 0.5 ,ease: "easeInOutBounce" })
            gsap.to(NullRef.current,{width:0,duration: 0.5 ,ease: "easeInOutBounce" })
        }else if(probs.menuTF===false){
            gsap.to(loadRef.current, { x: 50, y: 0, rotate: 0, duration: 0.5 ,ease: "easeInOutBounce"})
            gsap.to(NullRef.current,{width:380, duration: 0.5 ,ease: "easeInOutBounce" })
        }
    },[probs.menuTF])

    const [scrollX, setScrollX] = useState(0);

    const handleWheel = (event) => {

        let totalX = scrollX + event.deltaY  

        if(totalX<=0)
            totalX=0

        else if(totalX>width_max)
            totalX=width_max

        setScrollX(totalX);
       
        scrollableDiv.current.scrollLeft = scrollX;  
    };
 
    return (
        <div className='container-list-edit'>
                <div className='container-list-edit-load'>
                    <div ref={loadRef}>
                        <span>{state_Info.load[0]}</span>
                        <span>&gt;</span>
                        <span>{state_Info.load[1]}</span>
                        <span>&gt;</span>
                        <span>{state_Info.load[2]}</span>
                    </div>
                </div>
                
                <div className='container-list-edit-in'>
                    <div className='frame-list-edit-in-null' ref={NullRef}>
                        
                    </div>
                    <div className='frame-list-edit-in'>
                        <div className='frame-list-edit-in-title'>
                            <input type='text' defaultValue={state_Info.title} onChange={TitleHandler} ></input>
                        </div>
                        <div className='line-list-edit-load'></div>
                        
                        <List_Edit_Table
                          SendID={probs.SendID} TL_View_DTO={probs.TL_View_DTO} />
                        <div className='container-score-out'>
                            <div className='container-score' ref={scrollableDiv} onWheel={handleWheel} >
                                <div style={{width:contentWidth}}>
                                    {contentView}
                                </div>
                            </div>
                        </div>
                        <button onClick={e=>{e.preventDefault();  console.log(`"timeline":`,probs.TL_DTO, `\n title:${title} \n id:${1}`)}}>{state_Info.button}</button>
                    </div>
                </div>

        </div>
    )
}