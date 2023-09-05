import { useEffect } from 'react'
import './list_right.css'
import { useState } from 'react'
import res from '../result.json'

function transformJSON(dto){
    const dto_ = []
    dto.map((item,index)=>{
        const list_ = []
  
        item.timeline.map((item_,index_)=>{
      
            item_.map((item__,index__)=>{
                // console.log(item__)
                if(item__ !== 'null' && list_.includes(item__) === false){
                    list_.push(item__)
                    // console.log(item__)
                }
            })
        })

        dto_.push(list_)
    })

    console.log(dto_)
    return dto_
}

export default function List_Right(probs){
    
    const dto = res.data
    const [viewList,setViewList] = useState([]) // 저장 리스트 div 저장

    useEffect(()=>{
        // console.log(dto)

        const checkODD = (num) => {
            if(num % 2 !== 0){
                return true
            }else{
                return false
            }
        }

        const classlist = transformJSON(dto)
        // console.log(classlist)
        const viewList_ = []
        dto.map((item,index)=>{

            if(checkODD(index)===false){
                viewList_.push(
                    <div key={`${index}check`} className='list-frame even-list' onClick={e=>{
                        e.preventDefault();
                        probs.click_list_handler(item)
                    }}>
                    <div className='list-right-top'>
                        <div className='icon-list'></div>
                    </div>
                    <div className='list-right-bottom'>
                        <span>{item.title}</span>
                        <span>{classlist[index].map((item_,index_)=>{
                            const len = classlist[index].length
                            const text = index_ !== (len-1) ? (item_ +','+' ') : (item_);
                            return text;
                        })}</span>
                    </div>
                    <div className='list-right-date'>
                        {item.date}
                    </div>
                </div>
                )        
            }else{
                viewList_.push(
                    <div key={`${index}check`} className='list-frame odd-list'onClick={e=>{
                        e.preventDefault();
                        probs.click_list_handler(item)
                    }}>
                    <div className='list-right-top'>
                        <div className='icon-list'></div>
                    </div>
                    <div className='list-right-bottom'>
                    <span>{item.title}</span>
                        <span>{classlist[index].map((item_,index_)=>{
                            const len = classlist[index].length
                            const text = index_ !== (len-1) ? (item_ +','+' ') : (item_);
                            return text;
                        })}</span>
                    </div>
                    <div className='list-right-date'>
                        {item.date}
                    </div>
                </div>
                )   
            }
            
        })
        console.log(checkODD(1))
        setViewList(viewList_)
        
    },[])
// 
    return (
        <div className='container-list-right-in'>
            <div className='container-list-frame'>
                {viewList}
            </div>
            <div className='null-box'>
        
            </div>
        </div>
    )
}