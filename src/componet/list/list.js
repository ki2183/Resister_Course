import { useEffect } from 'react'
import './list.css'
import result from './result/result.json'
import List_Right from './result/list_right/list_right'
import Load from '../load.js/load'
import List_Left from './result/list_left/list_left'
import { useState } from 'react'
export default function List(probs){

    const myload = ['내 시간표','목록']

    const [click_list_info,setClick_list_info] = useState(null)

    useEffect(()=>{
        console.log(result.data)
    },[])

    useEffect(()=>{
        console.log(click_list_info)
    },[click_list_info])

    const click_list_handler = (info) =>{
        setClick_list_info(info)
    }

    return (
        <div className='container-list-out'>
                <div className='container-list-right'>
                    <List_Right click_list_handler={click_list_handler}/>
                </div>
              
                <div className='container-list-left'>
                    <List_Left click_list_info={click_list_info}/>
                </div>
        </div>
    )
}



