import { useRef } from 'react'
import './list_menu.css'
import { gsap } from 'gsap'
import { useState } from 'react'
import { useEffect } from 'react'
export default function List_Menu(probs){

    const RightRef = useRef(null)

    const [RightTF,setRightTF] = useState(false);

    useEffect(()=>{
        
    },[])
    

    return (
        <div className='container-list-menu'>

            <div></div>
            <div>
                <div className='container-list-menu-left'>
                    <div>ALL</div>
                    <div>전공</div>
                    <div>교양</div>

                </div>
                <div className='container-list-menu-right' ref={RightRef}>

                </div>
            </div>
            
        </div>
    )
}