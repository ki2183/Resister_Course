import { useLocation } from 'react-router-dom';
import './list_edit.css'
import { useEffect } from 'react';
import List_Edit_Table from './list_edit_view/list_edit_table';
import Load from '../../load.js/load';
import { useRef } from 'react';
import { gsap } from 'gsap';

export default function List_Edit(probs){

    const location = useLocation();
    const { data } = location.state;
    const loadRef = useRef(null)
    const NullRef = useRef(null)
    
    useEffect(()=>{
        console.log(data)
    },[])

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

    return (
        <div className='container-list-edit'>
                <div className='container-list-edit-load'>
                    <div ref={loadRef}>
                        <span>목록</span>
                        <span>&gt;</span>
                        <span>내 시간표</span>
                        <span>&gt;</span>
                        <span>내 시간표 수정</span>
                    </div>
                </div>
                <div className='container-list-edit-in'>
                    <div className='frame-list-edit-in-null' ref={NullRef}>
                        
                    </div>
                    <div className='frame-list-edit-in'>
                        <div className='frame-list-edit-in-title'>
                            <input type='text' value={"제목"}></input>
                            <button></button>
                            <button></button>
                        </div>
                        <List_Edit_Table data = {data}/>
                        <button>수정하기</button>
                    </div>
                </div>
            
        </div>
    )
}