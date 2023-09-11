import { useRef } from 'react'
import './list_menu.css'
import { gsap } from 'gsap'
import { useState } from 'react'
import { useEffect } from 'react'
import dto from '../classes/classes.json'
export default function List_Menu(probs){

    const RightRef = useRef(null)
    const ButtonRef = useRef(null)
    const [menuItem, setMenuItem] = useState([])
    
    const [arrow,setArrow] = useState('▶')

    const dateBefore = (date) =>{
        const day = date[0]
        const time = date.slice(2,13)
        return `${day}(${time})`
    }
    const dateAfter = (date) =>{
        const day = date[0]
        const time = date.slice(16)
        return `${day}(${time})`
    }

    useEffect(()=>{
        console.log(probs.menuTF)
        if(probs.menuTF===true){
            gsap.to(RightRef.current, { x: -380, y: 0, rotate: 0, duration: 0.5 ,ease: "easeInOutBounce" })
            gsap.to(ButtonRef.current, { x: -380, y: 0, rotate: 0, duration: 0.5 ,ease: "easeInOutBounce" })
            setArrow('◀')
        }else if(probs.menuTF===false){
            gsap.to(RightRef.current, { x: 0, y: 0, rotate: 0, duration: 0.5 ,ease: "easeInOutBounce"})
            gsap.to(ButtonRef.current, { x: 0, y: 0, rotate: 0, duration: 0.5 ,ease: "easeInOutBounce" })
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
        // const menuItem_ = [...dto.data]
        const menuItems = []
        const q = []
        
        dto.data.map((item,index) =>{

            q.push(item)

            if(q.length >= 2){
                
                menuItems.push(
                    <div className='item-list-menu-right'>
                        <div>
                            <span>{q[0].class_name}</span>
                            <span>담당교수: {q[0].class_professor}</span>
                            <span>학점: {q[0].class_score}</span>
                            <span>{dateBefore(q[0].class_time)}</span>
                            <span>{dateAfter(q[0].class_time)}</span>
                        </div>

                        <div>
                        <span>{q[1].class_name}</span>
                            <span>담당교수: {q[1].class_professor}</span>
                            <span>학점: {q[1].class_score}</span>
                            <span>{dateBefore(q[1].class_time)}</span>
                            <span>{dateAfter(q[1].class_time)}</span>
                        </div>
                    </div>
                )
          
                while (q.length > 0) {
                    q.pop();
                }
            }

        })
        if(q && q.length !== 0 ){
            menuItems.push(
                <div className='item-list-menu-right'>
                    <div>
                            <span>{q[0].class_name}</span>
                            <span>담당교수: {q[0].class_professor}</span>
                            <span>학점: {q[0].class_score}</span>
                            <span>{dateBefore(q[0].class_time)}</span>
                            <span>{dateAfter(q[0].class_time)}</span>
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
        <div className='container-list-menu'>

            <div></div>
            <div>
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