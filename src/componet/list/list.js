import { useEffect } from 'react'
import './list.css'
import result from './result/result.json'
import List_Right from './list_right'
import Load from '../load.js/load'
export default function List(probs){

    const myload = ['내 시간표','목록']

    useEffect(()=>{
        console.log(result.data)
    },[])
    return (
        <div className='container-list-out'>
            <div className='container-list-title'>
                <span>저장된 시간표</span>
            </div>
            <div className='container-list'>
                <div className='container-list-right'>
                    <List_Right/>
                </div>
              
                <div className='container-list-left'>
                    
                </div>
            </div>
        </div>
    )
}