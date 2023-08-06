import { useState } from "react"
import "./table.css"
import { useEffect } from "react"

function Table_TL(probs){
    
    const a = probs.TLTF
    
    const [TLview ,setTLview ] = useState([])
    const DAY = ['','월','화','수','목','금']
    const TIME = ['9:30~11:00','11:00~12:15','13:00~14:15','14:30~15:45','16:00~17:15','17:30~18:45']
    
    useEffect(()=>{
        console.log('check')
        const TLview_=[]
        
        //요일 div
        for(let i = 0; i<6; i++){
            TLview_.push(
                <div key={`${i} day`} className={['view-tl-table', `tl-day`].join(' ')}>{DAY[i]}</div>
            )
        }
        for(let i = 0; i<6; i++){
            for(let j = 0; j<6; j++){
                if(j===0){
                    TLview_.push(
                        <div key={`${j}day${i}`}className='view-tl-table'>{TIME[i]}</div>
                    )
                }
                else{
                    let css
                    !probs.TLTF[i][j-1] ? css='active-day' : css = 'disabled-day'
                    TLview_.push(
                        <div key={`${j}day${i}`} className={['view-tl-table', `${css}`].join(' ')}></div>
                    )
                }
                
            }
        } 
        setTLview(TLview_)  
    },[probs.TLTF])

    return <div className="container-tl-table">
        <div className='view-tl-frame'>
            {TLview}
        </div>
    </div>
}

export default Table_TL