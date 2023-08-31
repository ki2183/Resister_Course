import { useEffect } from "react"
import "./smalltlview.css"
import { useState } from "react"
import { useRef } from "react"
import { gsap } from "gsap"

export default function Small_TL_View({item,gsapTF}){

    const [tlview,setTlview] = useState([])
    const contentREF = useRef(null)

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

    useEffect(()=>{
        console.log(gsapTF)
        if(gsapTF===true){
          gsap.to(contentREF.current,{width : 50,  height : 30 ,justifyContent:'start',duration: 0.2, ease: "easeInOutBounce"})
        }else{
          gsap.timeline().to(contentREF.current,{width : 50,  height : 30 ,justifyContent:'start',duration: 0.4, ease: "easeInOutBounce"})
          .to(contentREF.current,{width : 300, height : 125,justifyContent: 'space-around',gap: 30 ,duration: 0.4, ease: "easeInOutBounce"})
        }
      },[gsapTF])

    return (
        <div className="frame-small-tl" ref={contentREF} onClick={e=>{e.preventDefault(); console.log(item)}}>
            {tlview}
        </div>
    )
}