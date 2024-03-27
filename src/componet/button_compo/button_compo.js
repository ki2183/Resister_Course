import { useEffect, useRef, useState } from "react"
import "./button_compo.css"
import gsap from "gsap"

export default function Button_compo({color,tf,value,handle_Major_Count}){

    const colorRef = useRef(null)
    const spanRef = useRef(null)

    const [TF,setTF] = useState(false)
    let color_this = "#111"
    
    useEffect(()=>{
        

        if(color === "#404AE4" || color === "#a84622"){
            color_this = "antiquewhite"
        }
        
        if(TF === false && tf === false){
            gsap.to(colorRef.current,{
                backgroundColor:"transparent",
                height: "35px",
                width: "35px",
                duration:0.1
            })
            gsap.to(spanRef.current,{
                color:"#111",
                fontSize: "17px",
                duration:0.1
            })
        }else{
            gsap.to(colorRef.current,{
                backgroundColor:color,
                height: "43px",
                width: "43px",
                duration:0.1
            })
            gsap.to(spanRef.current,{
                color:color_this,
                fontSize: "20px",
                duration:0.1
            })
        }
    },[TF,tf])

    return <div className="component-button">
        <button 
            ref={colorRef} 
            style={{
                    border:`2px solid ${color}`
                }}
            onMouseEnter={e=>{e.preventDefault(); setTF(true);}}
            onMouseLeave={e=>{e.preventDefault(); setTF(false);}}    
            onClick={e=>{e.preventDefault(); handle_Major_Count(value)}}
            >

            <span className="componet-button-in-span" ref={spanRef}>
                {value}    
            </span>

        </button>
    </div>
}