import { useRef } from 'react'
import './list_menu.css'
import { gsap } from 'gsap'
import { useState } from 'react'
import { useEffect } from 'react'
import dto from '../classes/classes.json'
import './list_menu_modal.css'

export default function List_Menu(probs){

    const RightRef = useRef(null)
    const ButtonRef = useRef(null)
    const largeRef = useRef(null)
    
const [menuItem, setMenuItem] = useState([])
    
    const [arrow,setArrow] = useState('▶')

    const dateBefore = (date) =>{
        const time = date.slice(0,16)
        return time
    }
    const dateAfter = (date) =>{
        const time = date.slice(18)
        return time
    }

    useEffect(()=>{
        console.log(probs.menuTF)
        if(probs.menuTF===true){
            gsap.to(RightRef.current, { x: -380, y: 0, rotate: 0, duration: 0.5 ,ease: "easeInOutBounce" })
            gsap.to(ButtonRef.current, { x: -380, y: 0, rotate: 0, duration: 0.5 ,ease: "easeInOutBounce" })
            gsap.timeline().to(largeRef.current, {  width:450, duration: 0.5 ,ease: "easeInOutBounce" })
            .to(largeRef.current, {  width:70, duration: 0.1 ,ease: "easeInOutBounce" })
            setArrow('◀')
        }else if(probs.menuTF===false){
            gsap.to(RightRef.current, { x: 0, y: 0, rotate: 0, duration: 0.5 ,ease: "easeInOutBounce"})
            gsap.to(ButtonRef.current, { x: 0, y: 0, rotate: 0, duration: 0.5 ,ease: "easeInOutBounce" })
            gsap.timeline().to(largeRef.current, {  width:450, duration: 0.1 ,ease: "easeInOutBounce" })
            setArrow('▶')
        }
    },[probs.menuTF])

    useEffect(()=>{
        const timeoutId = setTimeout(() => {
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
                    
                    <div>ALL</div>
                    <div>전공</div>
                    <div>교양</div>

                </div>
                <div className='container-list-menu-right' ref={RightRef}>
                    <div id='list-menu-right-search'>
                        <input type='text'/>
                        <button>
                        </button>
                    </div>
                    {menuItem}
        
                </div>
              
            </div>
            
        </div>
    )
}