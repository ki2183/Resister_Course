import { useEffect } from "react"
import { useState } from "react"
import { useDrop } from "react-dnd"

function THISTIMELINE({TLdata,changeDTO,deleteThis}){

    const day = ['월','화','수','목','금',]
    const classtime = ['9:30~11:00','11:00~12:15','13:00~14:15','14:30~15:45','16:00~17:15','17:30~18:45']

    const [view ,setView] = useState([])
    const [,dropRef] = useDrop({
        accept:"CONTENT",
        drop: (droppedItem) =>{
            console.log(droppedItem)
            changeDTO(droppedItem.item.index,droppedItem.item.class_name)
        }
    })


    useEffect(()=>{

        const view_ = []
        view_.push(<div key="thisone" className="tl-div"></div>) //빈칸
        day.map((item,index)=>{
            view_.push(<div key={`${index}item__`} className="tl-div tl-day">{item}</div>)
        })
      

        for(let i=0; i<6; i++){
            for(let j=0; j<6; j++){
                if(j===0){
                    let key = `${i}timeline__`;
                    view_.push(<div key={key} className="tl-div tl-class-time">{classtime[i]}</div>)
                }else{
                    let key = `${i}timeline__${j}`;
                    if(TLdata[j-1][i] !== "null"){
                        view_.push(<div key={key} className="tl-div tl-class"><span>{TLdata[j-1][i] }</span><button className="cancle-button" onClick={e=>{e.preventDefault(); deleteThis(j-1,i)}}>x</button></div>) 
                    }
                    else{
                        view_.push(<div key={key} className="tl-div tl-class"><span></span></div>) 
                    }
                   
                }
                
            }
        }

        setView(view_)
    },[TLdata])

    
 
    return <div ref={dropRef} className="frame-reuslt-TL">
        {view}
    </div>
}



export default function ResultTL(probs){
    const title= probs.dto.title
    const TLdata = probs.dto.timeline

    return <div className="container-result-TL">
        <div><span>{title}</span></div>
        <THISTIMELINE TLdata={TLdata} changeDTO={probs.changeDTO} deleteThis={probs.deleteThis}/>
    </div>
}

