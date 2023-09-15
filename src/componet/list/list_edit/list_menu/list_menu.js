import { useLayoutEffect, useRef } from 'react'
import './list_menu.css'
import { gsap } from 'gsap'
import { useState } from 'react'
import { useEffect } from 'react'
import dto from '../classes/classes.json'
import './list_menu_modal.css'
import './scrollbar.css'

export default function List_Menu(probs){

    const option_width_default = 350
    const option_gap = 10

    const RightRef = useRef(null)
    const ButtonRef = useRef(null)
    const largeRef = useRef(null)
    const searchRef = useRef(null)
    const searchModeRef = useRef(null)
    const [option_width,setOption_width] = useState(option_width_default)
    const option_direction_Ref = useRef(null)
     
    const [menuItem, setMenuItem] = useState([])
    const [searchMode,setSearchMode] = useState(false)

    const small_menu = [['제목','교수'],['제목','교수'],['제목','교수'],[9,11,13,14,16,17],[1,2,3,4]]
    const [small_menu_option,setSmall_menu_option] = useState(['제목','교수'])
    const [small_menu_optionView,setSmall_menu_option_View] = useState([])

    const [arrow,setArrow] = useState('▶')
    const [stageHeight,setStageHeight] = useState(window.innerHeight)


    const dateBefore = (date) =>{
        const time = date.slice(0,16)
        return time
    }
    const dateAfter = (date) =>{
        const time = date.slice(18)
        return time
    }

    const modeHandler = () =>{
        setSearchMode(!searchMode)
    }

    const small_menu_option_handler = (index) =>{
        setSmall_menu_option(small_menu[index])
    }

    const option_direction_Handler = (n) =>{
       
        gsap.to(option_direction_Ref.current, { x: n, y: 0, rotate: 0, duration: 0.4 ,ease: "easeInOutBounce" })

    }

    useEffect(()=>{
        console.log(probs.menuTF)

        if(probs.menuTF===true){
            gsap.to(RightRef.current, { x: -380, y: 0, rotate: 0, duration: 0.5 ,ease: "easeInOutBounce" })
            gsap.to(ButtonRef.current, { x: -380, y: 0, rotate: 0, duration: 0.5 ,ease: "easeInOutBounce" })
            gsap.to(searchRef.current, { x: -380, y: 0, rotate: 0, duration: 0.5 ,ease: "easeInOutBounce" })
            gsap.timeline().to(largeRef.current, {  width:450, duration: 0.5 ,ease: "easeInOutBounce" })
            .to(largeRef.current, {  width:70, duration: 0 ,ease: "easeInOutBounce" })
            setArrow('◀')
        }else if(probs.menuTF===false){
            gsap.to(RightRef.current, { x: 0, y: 0, rotate: 0, duration: 0.5 ,ease: "easeInOutBounce"})
            gsap.to(ButtonRef.current, { x: 0, y: 0, rotate: 0, duration: 0.5 ,ease: "easeInOutBounce" })
            gsap.to(searchRef.current, { x: 0, y: 0, rotate: 0, duration: 0.5 ,ease: "easeInOutBounce" })
            gsap.timeline().to(largeRef.current, {  width:450, duration: 0 ,ease: "easeInOutBounce" })
            setArrow('▶')
        }
    },[probs.menuTF])

    useEffect(()=>{ //검색gsap
        if(searchMode === false){
            gsap.to(searchModeRef.current, { x: 0, y: 0, rotate: 0, duration: 0.5 ,ease: "easeInOutBounce" })
        }else{
            gsap.to(searchModeRef.current, { x: -42, y: 0, rotate: 0, duration: 0.5 ,ease: "easeInOutBounce" })
        }
    },[searchMode])

    const handleResize = () => {
        setStageHeight(window.innerHeight);
      };

    useEffect(()=>{
        // console.log(window.innerHeight)
        // console.log(stageHeight)

        window.addEventListener('resize' , handleResize)
        
        return ()=>{
            window.removeEventListener('resize',handleResize)
        }
    },[])

    // const small_menu = [['제목','교수'],['제목','교수'],[9,11,13,14,16,17],[1,2,3,4]]

    // const [small_menu_option,setSmall_menu_option] = useState(['제목','교수'])

    // const [small_menu_optionView,setSmall_menu_option_View] = useState([])


    // useEffect(()=>{
    
    //     console.log(stageHeight)
    // },[stageHeight])
    // const [option_width,setOption_width] = useState(346)


    useEffect(()=>{
        const len = small_menu_option.length
        const small_menu_optionView_ = []
        const bar_width = ((option_width_default-(option_gap*(len-1)))/len)
        // const gap_width = (option_gap/(len-1))

        const makemenu = () =>{ small_menu_option.map((item,index)=>{
            small_menu_optionView_.push(
                <div className='choice-item' key={`choice${index}`} onClick={e=>{
                    e.preventDefault(); 
                    option_direction_Handler((bar_width+option_gap)*index)
                }}>{item}</div>
            )
            setSmall_menu_option_View(small_menu_optionView_)
        })

        // option_width_default

        setOption_width(bar_width)

        }

        makemenu()
        
    },[small_menu_option])



    useLayoutEffect(()=>{

        const stageWidth = window.innerWidth;

        const timeoutId = setTimeout(() => {
            if(stageWidth<1300)
                probs.reverseTF();
        }, 100);

        return () => clearTimeout(timeoutId);
    },[])

    useEffect(()=>{
    
        const menuItems = []
        const q = []
        
        // const dto_ = dto.data

        dto.data.map((item,index) =>{

            q.push(item)

            if(q.length >= 2){
                const dto1 = q[0]
                const dto2 = q[1]

                menuItems.push(
                    <div className='item-list-menu-right' key={index}>
                        <div onClick={e=>{e.preventDefault(); console.log(dto1); probs.changeDTO(dto1)}}>
                            <span>{q[0].subject_title}</span>
                            <span>담당교수: {q[0].instruction}</span>
                            <span>학점: {q[0].credit}</span>
                            <span>{dateBefore(q[0].class_time)}</span>
                            { q[0].class_time.length > 17 && (<span>{dateAfter(q[0].class_time)}</span>)}
                        </div>

                        <div onClick={e=>{e.preventDefault(); console.log(dto2); probs.changeDTO(dto2)}}>
                            <span>{q[1].subject_title}</span>
                            <span>담당교수: {q[1].instruction}</span>
                            <span>학점: {q[1].credit}</span>
                            <span>{dateBefore(q[1].class_time)}</span>
                            { q[1].class_time.length > 17 && (<span>{dateAfter(q[1].class_time)}</span>)}
                        </div>
                    </div>
                )
          
                while (q.length > 0) {
                    let a = q.pop();
                }
            }

        })
        if(q && q.length !== 0 ){
            const dto1 = q[0]
            menuItems.push(
                <div className='item-list-menu-right' key={dto1.id}>
                        <div onClick={e=>{e.preventDefault(); console.log(dto1); probs.changeDTO(dto1)}}>
                            <span>{q[0].subject_title}</span>
                            <span>담당교수: {q[0].instruction}</span>
                            <span>학점: {q[0].credit}</span>
                            <span>{dateBefore(q[0].class_time)}</span>
                            { q[0].class_time.length > 17 && (<span>{dateAfter(q[0].class_time)}</span>)}
                        </div>

                        
                    </div>
            )
            while (q.length > 0) {
                q.pop();
            }
        }
        setMenuItem(menuItems)
    },[])

    return (
        <div ref={largeRef} className='container-list-menu'>

            <div></div>
            <div ref={largeRef}>
            <div className='container-menu-arrow' ref={ButtonRef} onClick={e=>{
                e.preventDefault();
                probs.reverseTF();
            }}>
                <span>{arrow}</span>
                
            </div>
                <div className='container-list-menu-left'>
                    
                    <div onClick={ e=>{e.preventDefault(); small_menu_option_handler(0); option_direction_Handler(0)}}>ALL</div>
                    <div onClick={ e=>{e.preventDefault(); small_menu_option_handler(1); option_direction_Handler(0)}}>전공</div>
                    <div onClick={ e=>{e.preventDefault(); small_menu_option_handler(2); option_direction_Handler(0)}}>교양</div>
                    <div onClick={ e=>{e.preventDefault(); small_menu_option_handler(3); option_direction_Handler(0)}}>시간</div>
                    <div onClick={ e=>{e.preventDefault(); small_menu_option_handler(4); option_direction_Handler(0)}}>학년</div>

                </div>
                <div id='list-menu-right-search' ref={searchRef}>
               
                    <div>
                        <button>
                        </button>
                        <input type='text'/>
                        <button>
                        |
                        </button>
                        <div onClick={modeHandler}>
                            <div ref={searchModeRef}>
                                <span>제목</span>
                                <span>교수</span>
                            </div>
                        </div>
                       
                    </div>
                        <div className='list-menu-choice-button'>
                            {small_menu_optionView}
                            <div className='choice-line' ref={option_direction_Ref} style={{width:`${option_width}px`}}></div>
                        </div>
                </div>
                <div className='container-list-menu-right' ref={RightRef}>
                    <div></div>
                    <div style={{height :`${stageHeight-200}px`}}>
                        {menuItem}
                    </div>
                </div>
              
            </div>
            
        </div>
    )
}