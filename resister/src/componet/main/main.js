import { useState } from "react"
import "./main.css"

function MainMenu(){

    const [content,setContent] = useState([]) //메뉴 안에 컨텐츠들

    const contentInfo = [
        {
            name : "저장된 시간표",
            imgurl : "",
            link:"/"
        },
        {
            name : "정보 수정",
            imgurl : "",
            link:"/"
        },
        {
            name : "시간표 만들기",
            imgurl : "",
            link:"/"
        },
    ]

    useState(()=>{
        const content_ = []

        contentInfo.forEach(e => {
            content_.push(
                <div key={e.name} className="menu-content" onClick={event=>{
                    event.preventDefault()
                    window.location.href = e.link
                }}>
                    <div className="menu-content-img">
                        
                    </div>
                    <p className="menu-content-p">{e.name}</p>
                </div>
            )
        });
        setContent(content_)
    },[])

    return <div className="container-main-menu">
      {content}
    </div>
}

function Main(){
    return <div className="container-main">
        <MainMenu></MainMenu>
    </div>
}

export default Main