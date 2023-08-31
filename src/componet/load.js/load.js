import { useEffect, useState } from 'react'
import './load.css'

export default function Load({load,px}){

    const[view,setView] = useState('')
    const len =  load.length
    useEffect(()=>{
        const view_ = []
        load.map((item,index)=>{
            if(index !== len-1){
                view_.push(
                    <span key={`${index}item`}>{item}</span>
                )
                view_.push(
                    <span key={`${index}next`}>&gt;</span>
                )
            }else{
                view_.push(
                    <span key={`${index}item`} >{item}</span>
                )
            }
            
        })
        setView(view_)
    },[])

    return(
        <div className='container-load-out'>
            <div className='container-load' style={{
                width:`${px}px`
            }}> 
                {view}
            </div>
        </div>
    )
}