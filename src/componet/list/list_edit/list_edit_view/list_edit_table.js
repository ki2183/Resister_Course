import { useEffect } from "react"
import "./list_edit_table.css"
import { useState } from "react";

export default function List_Edit_Table({data}){
    
    const TL_ = data && data.timeline ? data : null;
    
    // const handleButtonClick = () => {

    //     console.log(TL_)
    //     if(TL_ !== null)
    //         navigate('/listedit', { state: { data: TL_} });
    //     else
    //         alert('시간표를 선택해주세요.')

    // };


    const [TLview ,setTLview ] = useState([])

    const DAY = ['','월','화','수','목','금']
    const TIME = ['9:30~11:00','11:00~12:15','13:00~14:15','14:30~15:45','16:00~17:15','17:30~18:45']
    
    useEffect(()=>{

        console.log("확인")

        const TL = data && data.timeline ? data.timeline : null;
        console.log(TL)

        const TLview_=[]
        const stack_val = [] 


        if (data !== null && TL !== null){
            for(let i = 0; i<6; i++){
                TLview_.push(
                    <div key={`${i} day`} className={['edit-tl-table-list', `tl-day-list-edit`].join(' ')}>{DAY[i]}</div>
                )}
            for(let i = 0; i<6; i++){
                for(let j = 0; j<6; j++){
                    if(j===0){
                        TLview_.push(
                            <div key={`day${i}${j}`}className='edit-tl-table-list time-tl-table-list'>{TIME[i]}</div>
                        )}
                    else{
                        let css = 0;
                        const val = TL[j-1][i] != "null" ? TL[j-1][i] : '';
                        
                        if(stack_val.includes !== true && val !== ''){
                            console.log(val)
                        }

                        TLview_.push(
                            <div key={`class${i}${j}`} className={['edit-tl-table-list', `${css}`,'edit-tl-table-list-content'].join(' ')}>{val}</div>
                        )}
                    }
                } 
            setTLview(TLview_)  
        }
        //요일 div
      
        
    },[])

    useEffect(()=>{
        console.log(data)
    },[])

    return (
        <div className="container-list-edit-table">
            {TLview}
        </div>
    )
}