import { useRef } from 'react'
import './list_menu.css'
import { gsap } from 'gsap'
import { useState } from 'react'
import { useEffect } from 'react'
export default function List_Menu(probs){

    const RightRef = useRef(null)
    const ButtonRef = useRef(null)
    
    const [arrow,setArrow] = useState('▶')
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
      
          // 컴포넌트가 언마운트되면 타임아웃을 클리어하여 메모리 누수를 방지합니다.
          return () => clearTimeout(timeoutId);
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

                    <div className='item-list-menu-right'>
                        <div>
                            <span>발탄국밥론</span>
                            <span>담당교수: 조익범</span>
                            <span>학점: 3</span>
                            <span>목(13:00~14:15)</span>
                            <span>목(14:30~15:45)</span>
                        </div>

                        <div>
                            <span>물리와 세계</span>
                            <span>담당교수: 정태성</span>
                            <span>학점: 3</span>
                            <span>월(9:30~10:45)</span>
                            <span>수(11:00~12:15)</span>
                        </div>
                    </div>

                    <div className='item-list-menu-right'>
                        <div>

                        </div>
                        <div>

                        </div>
                    </div>

                    <div className='item-list-menu-right'>
                        <div>

                        </div>
                        <div>

                        </div>
                    </div>

                    <div className='item-list-menu-right'>
                        <div>

                        </div>
                        <div>

                        </div>
                    </div>

                    <div className='item-list-menu-right'>
                        <div>

                        </div>
                        <div>

                        </div>
                    </div>

                    <div className='item-list-menu-right'>
                        <div>

                        </div>
                        <div>

                        </div>
                    </div>

                    <div className='item-list-menu-right'>
                        <div>

                        </div>
                        <div>

                        </div>
                    </div>

                    <div className='item-list-menu-right'>
                        <div>

                        </div>
                        <div>

                        </div>
                    </div>

                    <div className='item-list-menu-right'>
                        <div>

                        </div>
                        <div>

                        </div>
                    </div>

                    
                
        
                </div>
              
            </div>
            
        </div>
    )
}