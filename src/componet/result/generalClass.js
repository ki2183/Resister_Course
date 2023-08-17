import { useState } from "react"
import { useEffect } from "react"
import { useDrag, useDrop } from "react-dnd"

export default function GeneralClass({g_class}){
    const [dto,setDto] = useState(g_class.data)
    const [content,setContent] = useState([])
    const moveItem = (fromIndex,toIndex) =>{
        const dto_ = [...dto]
        const [movedItem] = dto_.splice(fromIndex,1)
        dto_.splice(toIndex,0,movedItem)
        setDto(dto_)
    }


    useEffect(()=>{
        const content_ = []
        dto.map((item,index)=>{
            content_.push(<GeneralClass_Content item={item} index={index} moveItem={moveItem}/>)
        })
        setContent(content_)
    },[dto])

    return <div className="container-general-class">
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
