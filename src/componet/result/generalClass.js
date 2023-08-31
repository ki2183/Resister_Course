import { useState } from "react"
import { useRef } from "react"
import { useEffect } from "react"
import { useDrag, useDrop } from "react-dnd"
import { gsap } from "gsap"

export default function GeneralClass({g_class,gsapTF}){
    const [dto,setDto] = useState(g_class.data)
    const [content,setContent] = useState([])
    const moveItem = (fromIndex,toIndex) =>{
        const dto_ = [...dto]
        const [movedItem] = dto_.splice(fromIndex,1)
        dto_.splice(toIndex,0,movedItem)
        setDto(dto_)
    }


    useEffect(()=>{
        const timeline = gsap.timeline();
        const content_ = []
        dto.map((item,index)=>{
            content_.push(<GeneralClass_Content item={item} index={index} moveItem={moveItem}/>)
        })
        setContent(content_)
    },[dto])

    const rightRef = useRef(null)

        useEffect(()=>{
            console.log(gsapTF)
            const timeline = gsap.timeline();
            
            if(gsapTF===true){
            // gsap.to(rightRef.current,{height: 745, marginLeft:15, duration: 0.2, ease: "easeInOutBounce"})
            gsap.timeline()
          .to(rightRef.current, {height :650,marginLeft:45,duration: 0, ease: "easeInOutBounce" })
          .to(rightRef.current, {height: 745, marginLeft:15, duration: 0.5, ease: "easeInOutBounce"}, "+=0.3")
            }else{
            gsap.to(rightRef.current,{height :650,marginLeft:45,duration: 0.5, ease: "easeInOutBounce"})
            }
    },[gsapTF])

    return <div className="container-general-class" ref={rightRef}>
        <div className="restore-button"><button>저장</button></div>
        {content}
        
    </div>
}

function GeneralClass_Content({index,item,moveItem}){
    const [,dragRef] = useDrag({
        type:"CONTENT",
        item:{item,index}
    })
    
    const [,dropRef] = useDrop({
        accept:'CONTENT',
        drop: (draggedItem)=>{
          if(draggedItem.index !== index){
            moveItem(draggedItem.index,index)
            draggedItem.index = index
          }
        }
      })

    return <div ref={(node)=>{dragRef(dropRef(node))}} key={`content${index}`} className="general-content">
        <span>{item.class_name}</span>
        <span>{item.class_time}</span>
    </div>
}
