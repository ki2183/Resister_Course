import { useEffect } from 'react'
import './list_right.css'
import result from './result/result.json'
import { useState } from 'react'
import res from './result/result.json'

function transformJSON(dto){
    const dto_ = []
    dto.map((item,index)=>{
        const list_ = []
        // console.log(item)
        item.timeline.map((item_,index)=>{
            if(item !=="null" || list_.includes(item) === false){
                // list_.push(item_)
                console.log(item_)
            }
        })

        // dto_.push({
        //     "title":item.title,
        //     "timeline":dto_,
        //     "date":item.date
        // })
        // console.log(dto_)
    })
}

export default function List_Right(probs){
    
    const [l_list,setL_list] = useState([])
    const dto = res.data

    useEffect(()=>{
        // console.log(dto)
        transformJSON(dto)
    },[])
// 
    return (
        <div className='container-list-right-in'>
            <div className='container-list-frame'>
                <div className='list-frame odd-list'>
                    <div className='list-right-top'>
                        <div className='icon-list'></div>
                    </div>
                    <div className='list-right-bottom'>
                        <span>시간표 1</span>
                        <span>물리로 보는 세계, 리액트, 고급프로그래밍, 데이터 엔지니어링, 영어기초회화, 웹 프로그래밍</span>
                    </div>
                    <div className='list-right-date'>
                        2018-10-11
                    </div>
                </div>
                <div className='list-frame even-list'>
                    <div className='list-right-top'>
                        <div className='icon-list'></div>
                    </div>
                    <div className='list-right-bottom'>
                        <span>시간표 2</span>
                        <span>물리로 보는 세계, 리액트, 고급프로그래밍, 데이터 엔지니어링, 영어기초회화, 웹 프로그래밍</span>
                    </div>
                    <div className='list-right-date'>
                        2018-10-11
                    </div>
                </div>
                <div className='list-frame odd-list'>
                    <div className='list-right-top'>
                        <div className='icon-list'></div>
                    </div>
                    <div className='list-right-bottom'>
                        <span>시간표 1</span>
                        <span>물리로 보는 세계, 리액트, 고급프로그래밍, 데이터 엔지니어링, 영어기초회화, 웹 프로그래밍</span>
                    </div>
                    <div className='list-right-date'>
                        2018-10-11
                    </div>
                </div>
                <div className='list-frame even-list'>
                    <div className='list-right-top'>
                        <div className='icon-list'></div>
                    </div>
                    <div className='list-right-bottom'>
                        <span>시간표 2</span>
                        <span>물리로 보는 세계, 리액트, 고급프로그래밍, 데이터 엔지니어링, 영어기초회화, 웹 프로그래밍</span>
                    </div>
                    <div className='list-right-date'>
                        2018-10-11
                    </div>
                </div>
                <div className='list-frame odd-list'>
                    <div className='list-right-top'>
                        <div className='icon-list'></div>
                    </div>
                    <div className='list-right-bottom'>
                        <span>시간표 1</span>
                        <span>물리로 보는 세계, 리액트, 고급프로그래밍, 데이터 엔지니어링, 영어기초회화, 웹 프로그래밍</span>
                    </div>
                    <div className='list-right-date'>
                        2018-10-11
                    </div>
                </div>
                <div className='list-frame even-list'>
                    <div className='list-right-top'>
                        <div className='icon-list'></div>
                    </div>
                    <div className='list-right-bottom'>
                        <span>시간표 2</span>
                        <span>물리로 보는 세계, 리액트, 고급프로그래밍, 데이터 엔지니어링, 영어기초회화, 웹 프로그래밍</span>
                    </div>
                    <div className='list-right-date'>
                        2018-10-11
                    </div>
                </div>

            </div>
        </div>
    )
}