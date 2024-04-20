import { useEffect } from 'react'
import './list_right.css'
import { useState } from 'react'
import res from '../result.json'
import axios from 'axios'

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
    
    // const dto = 
    const [dto,setDTO] = useState([])
    const [viewList,setViewList] = useState([]) // 저장 리스트 div 저장

    const Zero_dto = [
        ['null','null','null','null','null','null',],
        ['null','null','null','null','null','null',],
        ['null','null','null','null','null','null',],
        ['null','null','null','null','null','null',],
        ['null','null','null','null','null','null',]
      ] // 제로 데이터

    
    useEffect(()=>{
        let userid = 13

        axios.get(`/timeline/${userid}`, JSON.stringify(dto), {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((res) => {
            console.log(res.data); // result
            console.log('axios에 올라간 데이터')
            // alert('전송됐네여')
          })
          .catch((error) => {
            console.error(error); // err
            console.log('axios 오류')
            // alert('axios오류')
          });
    },[])  
    // useEffect(()=>{
    //     console.log( dto.timeline_)
    //     console.log(TL_DTO)
    //     if(TL_DTO && TL_DTO.length>0){
    //       const TL = Transform_ViewDTO_function(TL_DTO)
    //       setTL_View_DTO(TL)
    //     }else{
    //       setTL_View_DTO(Zero_dto)
    //     }
    //   },[TL_DTO])
  
    //   useEffect(()=>{
    //     console.log(TL_View_DTO)
    //   },[TL_View_DTO])

    useEffect(()=>{
        // console.log(dto)

        const checkODD = (num) => {
            if(num % 2 !== 0){
                return true
            }else{
                return false
            }
        }

        // const classlist = transformJSON(dto)
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
                        <span>
                        {item.timeline.map((item_,index_)=>{
                            // console.log(item.timeline.length)
                            const len = item.timeline.length
                            console.log(len)
                            const text = index_ !== (len-1) ? (item_.subject_title +','+' ') : (item_.subject_title);
                            return text;
                        })}
                        </span>
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
                    <span>
                        {item.timeline.map((item_,index_)=>{
                            // console.log(item.timeline.length)
                            const len = item.timeline.length
                            console.log(len)
                            const text = index_ !== (len-1) ? (item_.subject_title +','+' ') : (item_.subject_title);
                            return text;
                        })}
                        </span>
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
        
    },[dto])
// 
    return (
        <div className='container-list-right-in'>
            <div className='container-list-frame'>
                {viewList}
            </div>
            <div className='null-box'>
        
            </div>
            <button style={{
          width:'200px',
          height:'50px',
          border:'1px solid #666',
          position:'absolute',
          top:'90%',
          left:'80%',
        }} onClick={e=>{
          e.preventDefault();
          setDTO(res.data)
        }}>클릭 데이터 삽입</button>
        </div>
    )
}