import { defaultStyles } from 'react-modal'
import './list_left.css'
import { useEffect } from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function List_Left({click_list_info}){



    const navigate = useNavigate();
    const TL_ = click_list_info && click_list_info.timeline ? click_list_info : null;
    
    const handleButtonClick = () => {

        console.log(TL_)
        if(TL_ !== null)
            navigate('/listedit', { state: { data: TL_} });
        else
            alert('시간표를 선택해주세요.')

    };


    const [TLview ,setTLview ] = useState([
        <div className='click-the-list'>리스트를 클릭하세요</div>
    ])

    const DAY = ['','월','화','수','목','금']
    const TIME = ['9:30~11:00','11:00~12:15','13:00~14:15','14:30~15:45','16:00~17:15','17:30~18:45']
    
    useEffect(()=>{
        console.log(click_list_info)
        console.log("확인")

        const TL = click_list_info && click_list_info.timeline ? click_list_info.timeline : null;
        console.log(TL)

        const TLview_=[]


        if (click_list_info !== null && TL !== null){
            for(let i = 0; i<6; i++){
                TLview_.push(
                    <div key={`${i} day`} className={['view-tl-table-list', `tl-day-list`].join(' ')}>{DAY[i]}</div>
                )}
            for(let i = 0; i<6; i++){
                for(let j = 0; j<6; j++){
                    if(j===0){
                        TLview_.push(
                            <div key={`day${i}${j}`}className='view-tl-table-list time-tl-table-list'>{TIME[i]}</div>
                        )}
                    else{
                        let css = 0;
                        const val = TL[j-1][i] != "null" ? TL[j-1][i] : '';
                        // !TL[j-1][i] ? css='active-day' : css = 'disabled-day'
                        TLview_.push(
                            <div key={`class${i}${j}`} className={['view-tl-table-list', `${css}`,'view-tl-table-list-content'].join(' ')}>{val}</div>
                        )}
                    }
                } 
            setTLview(TLview_)  
        }
        //요일 div
      
        
    },[click_list_info])

    return (
    <div className='container-list-left-in' onClick={e=>{
        e.preventDefault();
        handleButtonClick();
        }}>
        {TLview}
    </div>
    )
}