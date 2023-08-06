import { useEffect,useState,useRef } from 'react'
import './question.css'
import quest from"./question_test.json"
import { gsap } from 'gsap'

function FstQCard(probs){
    const type = probs.type
    const [content,setContent] = useState(null)

    const onTrue = ({ currentTarget }) => {
        gsap.to(currentTarget, { background: '#1c1729', color:'white' ,scale: 1.1 ,duration:0.1,ease: "power3.easeout", });
      };
      const onFalse = ({ currentTarget }) => {
        gsap.to(currentTarget, { background: 'transparent', color:'black',scale: 1,duration:0.1, ease:'power3.easein'});
      };
     
    
    useEffect(()=>{

        if(type==='Day'){
            setContent(<div className='container-fstcard-in'>
                        <p>휴강 요일</p>
                        {/* <div className='card-p-frame'> */}
                        <p>본인이 원하는 휴강 요일을 고르세요. 체크한 요일의 모든 강의가 휴강이 됩니다.</p>
                        {/* </div> */}
                        <div className='fst-button-frame'>
                            <button onClick={e=>{e.preventDefault(); probs.dayFunc(0); !probs.days[0] ? onTrue(e): onFalse(e)}}>월</button>
                            <button onClick={e=>{e.preventDefault(); probs.dayFunc(1); !probs.days[1] ? onTrue(e): onFalse(e)}}>화</button>
                            <button onClick={e=>{e.preventDefault(); probs.dayFunc(2); !probs.days[2] ? onTrue(e): onFalse(e)}}>수</button>
                            <button onClick={e=>{e.preventDefault(); probs.dayFunc(3); !probs.days[3] ? onTrue(e): onFalse(e)}}>목</button>
                            <button onClick={e=>{e.preventDefault(); probs.dayFunc(4); !probs.days[4] ? onTrue(e): onFalse(e)}}>금</button>
                        </div>
                    </div>
            )
        }else if(type==='Morning'){
            setContent(<div className='container-seccard-in'>
                        <p>아침공강</p>
                        {/* <div className='card-p-frame'> */}
                            <p>본인이 원하는 아침휴강을 요일을 고르세요. 체크한 요일의 아침강의가 전부 휴강이 됩니다.</p>
                            {/* </div> */}
                        <div className='sec-button-frame'>
                            <button onClick={e=>{e.preventDefault(); probs.morningFunc(0); !probs.mornings[0] ? onTrue(e): onFalse(e)}}>월</button>
                            <button onClick={e=>{e.preventDefault(); probs.morningFunc(1); !probs.mornings[1] ? onTrue(e): onFalse(e)}}>화</button>
                            <button onClick={e=>{e.preventDefault(); probs.morningFunc(2); !probs.mornings[2] ? onTrue(e): onFalse(e)}}>수</button>
                            <button onClick={e=>{e.preventDefault(); probs.morningFunc(3); !probs.mornings[3] ? onTrue(e): onFalse(e)}}>목</button>
                            <button onClick={e=>{e.preventDefault(); probs.morningFunc(4); !probs.mornings[4] ? onTrue(e): onFalse(e)}}>금</button>
                        </div>
                    </div>
            )
        }else if(type==='score'){
            setContent(<div className='container-trdcard-in'>
                        <p>학점</p>
                        <p>이번학기에 들을 학점을 입력하세요.</p>
                        <div>
                            <input className='card-score' type="text"></input>
                        </div>
                        <button className='quesiton-trd-check'>확인</button>
                    </div>
            )
        }
    },[probs.mornings,probs.days])

    return <div className='container-fstcard'>
        {content}
    </div>
}

function FstQuestion(probs){ //여기서 TL수정하는 함수 처리
    //나중에 api로 해결하면 질문들은 useEffect로 처리해야함
    //함수로 만들어야함 월요 x랑 아침 x여기서 만듦 대신 True랑 false여기서

    const [mornings,setMornings] = useState([false,false,false,false,false]) //아침 공강 확인용
    const [days,setDays]= useState([false,false,false,false,false]) //요일 공강 확인용
    

    function morningFunc(val){
        setMornings(prevMornings => {
            const updatedMornings = [...mornings];
            updatedMornings[val] = !updatedMornings[val];
            return updatedMornings;
          });
    }

    function dayFunc(val){
        const days_ = [...days]
        days_[val]=!days_[val];

        setDays(days_)

        console.log(days)
    }

    useEffect(()=>{
        console.log(days)
        console.log(mornings)

        probs.handlerTL(mornings,days)
    },[mornings,days])

    return <div className='container-question-frame'>
        <FstQCard days={days}  dayFunc={dayFunc} type="Day" key="day"/>
        <FstQCard mornings={mornings} morningFunc={morningFunc}type="Morning" key="morning"/>
        <FstQCard type="score" key="score"/>
    </div>

}
function ViewTL(probs){  //view 시간표
    const [TLview ,setTLview ] = useState([])
    const DAY = ['','월','화','수','목','금']
    const TIME = ['9:30~11:00','11:00~12:15','13:00~14:15','14:30~15:45','16:00~17:15','17:30~18:45']
    
    useEffect(()=>{
        console.log('check')
        const TLview_=[]
        
        //요일 div
        for(let i = 0; i<6; i++){
            TLview_.push(
                <div className={['view-tl-table', `tl-day`].join(' ')}>{DAY[i]}</div>
            )
        }
        for(let i = 0; i<6; i++){
            for(let j = 0; j<6; j++){
                if(j===0){
                    TLview_.push(
                        <div className='view-tl-table'>{TIME[i]}</div>
                    )
                }
                else{
                    let css
                    !probs.TL[j-1][i] ? css='active-day' : css = 'disabled-day'
                    TLview_.push(
                        <div className={['view-tl-table', `${css}`].join(' ')}></div>
                    )
                }
                
            }
        } 
        setTLview(TLview_)  
    },[probs.TL])
    

    return <div className='container-viewtl'>
        <div className='view-tl-frame'>
            {TLview}
        </div>
    </div>
}

function Question(){

    const q = quest
    const TL_ = [
        [false,false,false,false,false,false], //월
        [false,false,false,false,false,false], //화
        [false,false,false,false,false,false], //수
        [false,false,false,false,false,false], //목
        [false,false,false,false,false,false]  //금
    ]
    const [TL,setTL] = useState([
        [false,false,false,false,false,false], //월
        [false,false,false,false,false,false], //화
        [false,false,false,false,false,false], //수
        [false,false,false,false,false,false], //목
        [false,false,false,false,false,false]  //금
    ])

    const handlerTL = (lstm,lstd) => {

        for(let i=0; i<5; i++){
            if(lstm[i]===true){
                TL_[i][0] = true
                TL_[i][1] = true
            }
        }
        setTL(TL_)
        for(let i=0; i<5; i++){
            if(lstd[i]===true){
                for(let j=0; j<6; j++){            
                    TL_[i][j]=true
                }
            }
        }
        setTL(TL_)
    }

    useEffect(()=>{
        TL.forEach((arr, index) => {
            console.log(`요일 ${index + 1}:`, arr);
          });
    },[TL])

    return <div className='container-question'>
        <FstQuestion handlerTL={handlerTL} TL={TL} setTL={setTL}/>
        <ViewTL TL={TL}/>
        <div className='empty-question'></div>
    </div>
}


export default Question