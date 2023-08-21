import { useEffect } from "react"
import "./smalltlview.css"
import { useState } from "react"

export default function Small_TL_View({item}){

    const [tlview,setTlview] = useState([])

    useEffect(()=>{
        const tl = item.timeline
        const w = tl.length
        const h = tl[0].length
        const tlview_ = []
        const DAY = ['월','화','수','목','금']

        // tl.map((item,index)=>{

        //     item.map((item_,index_)=>{
        //     if(tl[index][index_]=='null'){
        //         tlview_.push(
        //             <div key={item_+index+item} className="s-tl-item s-tl-false"></div>
        //         )}
        //     else{
        //         tlview_.push(
        //             <div key={item_+index+item} className="s-tl-item s-tl-true"></div>
        //         )}
        //     })
        for(let i=0; i<6; i++){
            for(let j=0; j<5; j++){
                if(tl[j][i] == 'null'){
                    tlview_.push(
                        <div key={j+tl[j][i]+i} className="s-tl-item s-tl-false"></div>
                    )
                }else{
                    tlview_.push(
                        <div key={j+tl[j][i]+i} className="s-tl-item s-tl-true"></div>)
                }
            }
        }
                

        setTlview(tlview_)

    },[])

    return (
        <div className="frame-small-tl" onClick={e=>{e.preventDefault(); console.log(item)}}>
            {tlview}
        </div>
    )
}