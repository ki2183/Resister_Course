import { useEffect, useRef, useState } from "react"
import "./lastquestion.css"

function Question_total_frame(){

    return(
        <div className="frame-total-lastquestion">
            <div className="card-lastquestion"></div>
        </div>
    )
}

function Question_frame(){

    const [scroll, setScroll] = useState(0);
    const scrollRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            // Update scroll state with the current scroll position
            setScroll(scrollRef.current.scrollTop);
        };

        // Attach the scroll event listener to the scrollRef
        scrollRef.current.addEventListener('scroll', handleScroll);

        // Clean up the event listener when the component unmounts
        return () => {
            scrollRef.current.removeEventListener('scroll', handleScroll);
        };
    }, [scroll]); // scroll을 의존성 배열에 추가하여 스크롤 이벤트 시에 컴포넌트가 다시 렌더링되도록 함

    useEffect(() => {
        console.log('Scroll value:', scroll);
    }, [scroll]);

    return(
        <div className="frame-lastquestion" ref={scrollRef}>
            <Question_total_frame/>
        </div>
    )
}

function LastQuestion(){
    return(
        <div className="container-lastquestion">
            <Question_frame/>
            <button>좌</button>
            <button>우</button>
        </div>
    )    
}

// export default LastQuestion