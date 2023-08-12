import './questionAll.css'
import handimg from './icon/hand.png'
import forbidden from './icon/forbidden.png'
import clock from './icon/clock2.png'
import { useEffect, useRef, useState } from 'react'
import { gsap } from "gsap"
import Table_TL from './table'
import MakeQuesitonInput from './question_input'
import { useForm } from 'react-hook-form';

// 손아이콘 <a href="https://kr.freepik.com/icon/%EC%86%90_2121078#fromView=search&term=hand&page=1&position=42">Freepik 제작 아이콘</a>
// 금지아이콘 <a href="https://kr.freepik.com/icon/%EC%86%90_2121078#fromView=search&term=hand&page=1&position=42">Freepik 제작 아이콘</a>
// https://kr.freepik.com/icon/%25ED%258F%25B4%25EB%258D%2594_7094763#position=28&fromView=resource_detail
function QuestionAll(probs){

    const { handleSubmit, control } = useForm();

    const forbiddenRef = useRef(null)
    const handRef = useRef(null)
    const clockRef = useRef(null)
    const [imgTF,setImgTF] = useState(false)
    const [clockTF,setClockTF] = useState(false)

    const Icon_Hand_Enter_Handler = () => {
        setImgTF(true);
      
        gsap.timeline()
          .to(handRef.current, { scale: 0.6, x: 6, y: 1, rotate: 0, duration: 0.15 })
          .to(handRef.current, { scale: 1, x: 0, y: 0, rotate: 20, duration: 0.5 }, "+=1")
          .call(() => {
            setImgTF(false); // 애니메이션 완료 후 상태 변경
          });
      };

    const Icon_Forbidden_Enter_Handler = () => {
        gsap.timeline()
        .to(forbiddenRef.current, { scale: 3, x:-10, y:-20, rotate:0, duration: 0.15 })
        .to(forbiddenRef.current, { scale: 1, x:0, y:0, rotate: 0, duration: 0.5 },"+=1")
    }

    const Icon_Clock_Enter_Handler = () => {
        setClockTF(true);
      
        gsap.timeline()
          .to(clockRef.current, { scale: 1.2, x: 0, y: -10, rotate: 0, duration: 0.15 ,ease: "easeInOutBounce" })
          .to(clockRef.current, { scale: 1, x: 0, y: 0, rotate: 0, duration: 0.5,ease: "easeInOutBounce" }, "+=1")
          .call(() => {
            setClockTF(false); // 애니메이션 완료 후 상태 변경
          });
      };

// -------------------------------------------------------아이콘---------------------------------------------

    const [Allrest,setAllrest] = useState([false,false,false,false,false])
    const [morningRest,setMorningRest] = useState([false,false,false,false,false])
    const [AllrestCSS,setAllrestCSS] =useState(["check_no","check_no","check_no","check_no","check_no"])
    const [morningRestCSS,setMorningRestCSS] =useState(["check_no","check_no","check_no","check_no","check_no"])
    const [TLTF,setTLTF] = useState([
        [false,false,false,false,false,false],
        [false,false,false,false,false,false],
        [false,false,false,false,false,false],
        [false,false,false,false,false,false],
        [false,false,false,false,false,false],
        // [false,false,false,false,false]
    ])

    const [TL_View,setTLview] = useState(<Table_TL TLTF={TLTF}/>)

    const Allrest_Click = (day) =>{
        const TLTF_ = [...TLTF]
        const Allrest_ = [...Allrest]
        const morningRest_ = [...morningRest]

        Allrest_[day] = !Allrest_[day] 

        if(Allrest_[day] == true){
            for(let i=0; i<6; i++){
                TLTF_[day][i] = true
            }
        }else{
            if(morningRest_[day]===false){
                for(let i=0; i<7; i++){
                    TLTF_[day][i] = false
                }   
            }else{
                for(let i=2; i<7; i++){
                    TLTF_[day][i] = false
                }   
            }
        }
        setAllrest(Allrest_)
        setTLTF(TLTF_)
    }

    const Morningrest_Click = (day) =>{
        const TLTF_ = [...TLTF]
        const Allrest_ = [...Allrest]
        const morningRest_ = [...morningRest]

        morningRest_[day] = !morningRest_[day] 

        if(morningRest_[day] == true){
            for(let i=0; i<2; i++){
                TLTF_[day][i] = true
            }
        }else{
            if(Allrest_[day] == false){
                for(let i=0; i<2; i++){
                    TLTF_[day][i] = false
                }
            }
        }
        // setAllrest(Allrest_)
        setMorningRest(morningRest_)
        setTLTF(TLTF_)
    }

    useEffect(()=>{
        console.log(TLTF)
        // console.log(Allrest)
        // console.log(morningRest)
        setTLview(<Table_TL TLTF={TLTF}/>)
    },[TLTF])

    useEffect(()=>{
        const AllrestCSS_ = []
        const morningRestCSS_= []

        for(let i=0; i<6; i++){
            if(Allrest[i]===true){
                AllrestCSS_.push("check_yes")
            }
            else{
                AllrestCSS_.push("check_no")
            }
        }

        for(let i=0; i<6; i++){
            if(morningRest[i]===true){
                morningRestCSS_.push("check_yes")
            }
            else{
                morningRestCSS_.push("check_no")
            }
        }
        setMorningRestCSS(morningRestCSS_)
        setAllrestCSS(AllrestCSS_)
        
    },[Allrest,morningRest])
    
    const onSubmit = async (dt,event) => {
        event.preventDefault(); // 폼 제출 이벤트의 기본 동작 막기
        console.log('실행 확인')
        await new Promise((r) => setTimeout(r, 1000));
        console.log(JSON.stringify(dt));
        alert(JSON.stringify(dt));
      };

    return <div>
        
        <div className='title-container-questionAll'>
                <span className='menu-title'>
                    시간표 질문
                </span>
                <div className='menu-content-in'>
                    <div className='menu-content-in-div' 
                    onMouseEnter={e => {e.preventDefault(); if(imgTF===false){
                        Icon_Hand_Enter_Handler(); Icon_Forbidden_Enter_Handler();
                    }}}
                    >
                        <img id='forbidden-icon' src={forbidden} width={30} height={30} ref={forbiddenRef}/>
                        <img id='hand-icon'src={handimg} width={80} height={80} ref={handRef} />
                        <span className='content-div-info'>웬만하면 중간 점수를 삼가하세요</span>
                    </div>
                    <div className='menu-content-in-div'
                     onMouseEnter={e => {e.preventDefault(); if(clockTF===false){
                        Icon_Clock_Enter_Handler()
                    }}}
                    >
                        <img id='clock-icon' src={clock} width={80} height={80} ref={clockRef}/>
                        <span className='content-div-info'>&nbsp;&nbsp;&nbsp; 딱히 시간 제한은 두지 않습니다</span>
                    </div>
                    <div className='menu-content-in-div'></div>
                </div>
        </div>
        
        <div className='container-questionAll'>
            
            <div className='frame-questionAll'>

            <div className='card-questionAll'id='input-score'>
                    <div className='card-question-info'>
                        <span className='card-question-info-span'>
                            이번학기에 원하는 학점을 입력하세요
                        </span>
                        
                    </div>

                    <div className='card-question-score'>
                        <div className='frame-card-question-score-input'>
                            <input type='text' className='input-class-score'></input><span>점</span>
                        </div>
      
                    </div>
                    
                </div>

                <div className='card-questionAll'>
                    <div className='card-question-info'>
                        <span className='card-question-info-span'>
                            휴강요일을 선택하세요
                        </span>
                        
                    </div>

                    <div className='card-question-score'>
                        <span>월</span>
                        <div className='frame-card-question-score'>
                            <div className='score-radio fstbut' id={AllrestCSS[0]} onClick={e=>{e.preventDefault(); Allrest_Click(0);}}></div>
                            <div className='score-radio secbut' id={AllrestCSS[1]} onClick={e=>{e.preventDefault(); Allrest_Click(1);}}></div>
                            <div className='score-radio trdbut' id={AllrestCSS[2]} onClick={e=>{e.preventDefault(); Allrest_Click(2);}}></div>
                            <div className='score-radio fourthbut' id={AllrestCSS[3]} onClick={e=>{e.preventDefault(); Allrest_Click(3);}}></div>
                            <div className='score-radio fifthbut' id={AllrestCSS[4]} onClick={e=>{e.preventDefault(); Allrest_Click(4);}}></div>
                        </div>
                        <span>금</span>
                    </div>
                    
                </div>

                <div className='card-questionAll'>
                    <div className='card-question-info'>
                        <span className='card-question-info-span'>
                            아침공강을 원하는 요일을 선택하세요
                        </span>
                        
                    </div>

                    <div className='card-question-score'>
                        <span>월</span>
                        <div className='frame-card-question-score'>
                            <div className='score-radio fstbut' id={morningRestCSS[0]} onClick={e=>{e.preventDefault(); Morningrest_Click(0)}} ></div>
                            <div className='score-radio secbut' id={morningRestCSS[1]} onClick={e=>{e.preventDefault(); Morningrest_Click(1)}}></div>
                            <div className='score-radio trdbut' id={morningRestCSS[2]} onClick={e=>{e.preventDefault(); Morningrest_Click(2)}}></div>
                            <div className='score-radio fourthbut' id={morningRestCSS[3]} onClick={e=>{e.preventDefault(); Morningrest_Click(3)}}></div>
                            <div className='score-radio fifthbut' id={morningRestCSS[4]} onClick={e=>{e.preventDefault(); Morningrest_Click(4)}}></div>
                        </div>
                        <span>금</span>
                    </div>
                    
                </div>
                <form name='this' method='get' onSubmit={handleSubmit(onSubmit)}>
                    <MakeQuesitonInput title={'웹에 관심이 있으십니까?'} input_name={'front'} control={control} />
                    <MakeQuesitonInput title={'서버에 관심이 있으십니까?'} input_name={'back'} control={control} />
                    <MakeQuesitonInput title={'리액트에 관심이 있으십니까?'} input_name={'react'} control={control} />
                    <MakeQuesitonInput title={'운동에 관심이 있으십니까?'} input_name={'exercise'} control={control} />
                    <MakeQuesitonInput title={'음악에 관심이 있으십니까?'} input_name={'music'} control={control} />
                    <MakeQuesitonInput title={'종교에 관심이 있으십니까?'} input_name={'region'} control={control} />
                    <MakeQuesitonInput title={'물리에 관심이 있으십니까?'} input_name={'physical'} control={control} />

                    <input type="submit" onSubmit={e=>{e.preventDefault(); handleSubmit(onSubmit)}} value='가입하기' id="submitButton" />
                </form>
                

            </div>
            <div className='questionAll-tl'> 
                <div className='test'>
                    <div className='frame-tl'>
                        {/* <Table_TL TLTF={TLTF}/> */}
                        {TL_View}
                    </div>
                </div>
            </div>
        </div>
        
    </div>
}


export default QuestionAll
