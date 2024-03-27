import "./major_count.css"
import Button_compo from "../../button_compo/button_compo"
import { useEffect, useState } from "react"
export default function Major_count({handle_Major_Count,major_count,TrdConditionRef}){
    
    // const [view,setView] = useState(null)

    const [button_info,setButton_info] = useState([
        {
            color:"#404AE4",
            tf:false,
            value:0
        },{
            color:"#4095E4",
            tf:false,
            value:1
        },{
            color:"#40E4A0",
            tf:false,
            value:2
        },{
            color:"#40E456",
            tf:false,
            value:3
        },{
            color:"#E4D440",
            tf:false,
            value:4
        },{
            color:"#a84622",
            tf:false,
            value:5
        }
    ])



    useEffect(()=>{
        console.log(major_count)
        const button_info_ = []

        button_info.forEach((item,index)=>{
            if(index === major_count){
                button_info_.push({
                    color:item.color,
                    tf:true,
                    value:item.value
                })
            }else{
                button_info_.push({
                    color:item.color,
                    tf:false,
                    value:item.value
                })
            }
        })

        setButton_info(button_info_)
    },[major_count])


    useEffect(()=>{
        console.log(button_info)
    },[button_info])



    return (
    <div className='container-major-count' ref={TrdConditionRef}>
        <div>
            듣고 싶은 전공 개수를 선택하세요
        </div>

        <div className='frame-major-count'>

            {button_info.map((item, index) => (
                 <Button_compo key={index} color={item.color} tf={item.tf} value={item.value} handle_Major_Count={handle_Major_Count}/>
            ))}


        </div>
    </div>
    )
}