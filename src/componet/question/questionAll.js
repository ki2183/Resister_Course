import './questionAll.css'
import handimg from './icon/hand.png'
import forbidden from './icon/forbidden.png'
import clock from './icon/clock2.png'
import good1 from './icon/good1.png'
import { useEffect, useRef, useState } from 'react'
import { gsap } from "gsap"
import questionDto from './question.json'
import Question_frame from './new_question_input/question_frame'
import Question_frame_YN from './new_question_input/question_frame_yn'
import Question_condition from './question_condition/question_condition'
import Question_rank from './question_condition/question_Rank'
import { useLocation, useNavigate } from 'react-router-dom'
import Submit_transform from './question_submit_transform'
import Control_classes from './control_classes/control_classes'
import myClasses from './classes_json/classes.json'
import Select_essential from './select_essential'
import Major_count from './question_condition/major_count'

// 손아이콘 <a href="https://kr.freepik.com/icon/%EC%86%90_2121078#fromView=search&term=hand&page=1&position=42">Freepik 제작 아이콘</a>
// 금지아이콘 <a href="https://kr.freepik.com/icon/%EC%86%90_2121078#fromView=search&term=hand&page=1&position=42">Freepik 제작 아이콘</a>
// good icon PS C:\Users\user\OneDrive\바탕 화면\Resister_Course-html\resister> l 
// https://kr.freepik.com/icon/%25ED%258F%25B4%25EB%258D%2594_7094763#position=28&fromView=resource_detail
function QuestionAll(probs){

    const token = JSON.parse(localStorage.getItem('token'))


    const forbiddenRef = useRef(null)
    const handRef = useRef(null)
    const clockRef = useRef(null)
    const good1Ref = useRef(null)

    const [imgTF,setImgTF] = useState(false)
    const [clockTF,setClockTF] = useState(false)
    const [goodTF,setGoodTF] = useState(false)

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

      const Icon_good_Enter_Handler = () => {
        setGoodTF(true);
      
        gsap.timeline()
        .to(good1Ref.current, { rotate: -20, duration: 0.1, ease: 'power2.inOut' })
        .to(good1Ref.current, { rotate: 20, duration: 0.1, ease: 'power2.inOut' })
        .to(good1Ref.current, { rotate: -10, duration: 0.1, ease: 'power2.inOut' })
        .to(good1Ref.current, { rotate: 10, duration: 0.1, ease: 'power2.inOut' })
        .to(good1Ref.current, { rotate: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' })
  
          .call(() => {
            setGoodTF(false); // 애니메이션 완료 후 상태 변경
          });
      };

// -------------------------------------------------------아이콘---------------------------------------------

const location = useLocation()
// const Login_state = location.state!==null || location.state!==undefined? location.state.data : null
const Login_state = location && location.state ? location.state.data : true; //비회원이면 false 회원이면 true
const PrevInfo = location && location.state ? location.state.prevInfo : null; 
const noLogin_graduation = location && location.state ? location.state.graduation : null; 
const noLogin_studentNumber = location && location.state ? location.state.studentNumber : null; 


  useEffect(()=>{
    console.log('--------------------------------------')
    console.log(Login_state) // 로그인하면 true 아니면 false
    console.log(PrevInfo)
    console.log(token)
    console.log(token)
    console.log(noLogin_graduation)
    console.log(noLogin_studentNumber)
  },[])


  const [quest_info,setQuest_info] = useState(questionDto.data) //질문데이터
  const [questions, setQuestions] = useState([]) //질문VIEW
  const [sortRank,setSortRank] = useState([]) //우선순위
  const [credit,setCredit] = useState(18) //학점
  const [major_count,setMajor_count] = useState(4)//전공개수

  const Handle_Rank = (dto)=>{
    setSortRank(dto)
  }
  
  const handleRangeChange = (e) => {
      const newValue = parseFloat(e.target.value); 
      setCredit(newValue);
  };

  const handle_Major_Count = (num) => {
    setMajor_count(num)
  }
   
// --------------------------------------------------------

  const [classes,setClasses] = useState(null)
  
  useEffect(()=>{
    console.log(myClasses)
    const updatedClasses = myClasses.map(item => ({ ...item, score: 0 }));
    setClasses(updatedClasses)
  },[])

  useEffect(()=>{
    // console.log(classes)
    // Control_classes(classes)
  },[classes])


// ----------------------------비회원 회원------------------------------------

const navigator = useNavigate();

const LoginHandler_no_login = (subject_rank,essential_classes) =>{

  const st_num = noLogin_studentNumber
  console.log(st_num)

  const dto = {
    "subject_rank" : subject_rank,
    // "userId" : 13,
    "credit":credit,
    "prevInfo":PrevInfo,
    "sortRank":sortRank,
    "essential_subject": essential_classes
  }
  console.log(dto)
  // navigator('/listedit', {state:{data:Login_state}})
}

const LoginHandler_yes_login = (subject_rank,essential_classes) =>{
  console.log(token)
  const st_num = token.studentnumber

  console.log(st_num)

  const dto = {
    "subject_rank" : subject_rank,
    "userId" : 13,
    "credit":credit,
    "prevInfo":PrevInfo,
    "sortRank":sortRank,
    "essential_subject": essential_classes
  }
  console.log(dto)
  // navigator('/listedit', {state:{data:Login_state}})
}

// -----------------------------------------------------------------------------------------

    const ContentFrameRef = useRef(null)
    const FstConditionRef = useRef(null)
    const SecConditionRef = useRef(null)
    const TrdConditionRef = useRef(null)

    const [animationNum,setAnimationNum] = useState(0)
    const n = questionDto.data.length
    const contentWidth = 700
    const gap = 10
    const Content_Plus_Gap = (contentWidth+gap)
    const waste_height = 1100 // 토탈 높이
    const TotalRef = useRef(null)


    const frameWidth = ((contentWidth+gap)*(n)) //질문 넓이 값
    let Total_Scroll_Height = frameWidth+waste_height //버튼 질문+설정질문+설정질문
    const element = document.getElementById("html-id");
    element.style.overflowY = 'scroll'
    element.style.overflowX = 'hidden'
    element.style.height =`${Total_Scroll_Height}px`
  

      const [scrollTop, setScrollTop] = useState(0);

      // 스크롤 이벤트 리스너를 추가
      useEffect(() => {
        const handleScroll = () => {
          setScrollTop(window.scrollY);
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

      useEffect(()=>{
        // console.log(scrollTop)
        // console.log(frameWidth)
        // console.log(n)
        // console.log(Total_Scroll_Height)
        // console.log(scrolly)
        if(scrollTop<frameWidth-Content_Plus_Gap){
            // console.log(scrollTop,frameWidth)
            // console.log(Total_Scroll_Height)
            // console.log('true')

            gsap.to(TotalRef.current, { y: 0, duration: 0 ,ease: "easeInOutBounce" })    
            gsap.to(ContentFrameRef.current, { x: -scrollTop, duration: 0.1 ,ease: "easeInOutBounce" })
            gsap.to(FstConditionRef.current, { opacity:0, duration: 0.5 ,ease: "easeInOutBounce" })
            gsap.to(SecConditionRef.current, { opacity:0, duration: 0.5 ,ease: "easeInOutBounce" })
            gsap.to(TrdConditionRef.current, { opacity:0, duration: 0.5 ,ease: "easeInOutBounce" })

        }else{
            // console.log('false')
            // console.log(scrollTop,frameWidth)
            const val = frameWidth-Content_Plus_Gap
            gsap.to(ContentFrameRef.current, { x: -val, duration: 0 ,ease: "easeInOutBounce" })
            let scrolly= scrollTop-(frameWidth-Content_Plus_Gap)
            if(scrolly>10){
                gsap.to(FstConditionRef.current, { opacity:1, duration: 0.5 ,ease: "easeInOutBounce" })
                gsap.to(SecConditionRef.current, { opacity:1, duration: 0.5 ,ease: "easeInOutBounce" })
                gsap.to(TrdConditionRef.current, { opacity:1, duration: 0.5 ,ease: "easeInOutBounce" })
                gsap.to(TotalRef.current, { y: -scrolly, duration: 0 ,ease: "easeInOutBounce" })    
            }
            // console.log(scrolly)
            // TotalRef
            // let scrolly= scrollTop-frameWidth-810
            
        }
      },[scrollTop])

    //   -------------------------------gsap----------------------
    
    
    
    const Change_Value = (ind,val)=>{
        // console.log(quest_info[ind].value)
        // console.log(ind)
        // console.log(val)
        // console.log(quest_info[ind].value)
        const quest_info_ = [...quest_info]
        quest_info_[ind].value = val
        setQuest_info(quest_info_)
    }  



    useEffect(()=>{
        const val = animationNum*(Content_Plus_Gap)

        if(scrollTop<frameWidth-Content_Plus_Gap)
            gsap.to(document.getElementById("html-id"), { scrollTop:val, duration: 0.5 ,ease: "easeInOutBounce" })
        
    },[animationNum])

    const Change_Animation_Num = (num)=>{
        setAnimationNum(num+1)
    }

      useEffect(()=>{
        const questions_ = []
        // console.log(quest_info)
        quest_info.map((item,index)=>{
          // console.log(item.type)
          if(item.type === 'score'){
            questions_.push(
                <Question_frame 
                    key={`${index} questions`}
                    item={item} 
                    number={index} 
                    Change_Animation_Num={Change_Animation_Num}
                    Change_Value={Change_Value}
                    quest_info={quest_info}
                />
            )}if(item.type === 'yn'){
              questions_.push(
                  <Question_frame_YN
                      key={`${index} questions`}
                      item={item} 
                      number={index} 
                      Change_Animation_Num={Change_Animation_Num}
                      Change_Value={Change_Value}
                      quest_info={quest_info}
                  />
              )}
        })
        
        setQuestions(questions_)
        
        const Checkout_question = (data) =>{

        let val = null
    
        for(let i=0; i<data.length; i++){
          if(data[i].value === 0){
   
            val = i
            break
          }

        }
        return val
        } 
        const nullval = Checkout_question(quest_info)

        if(nullval !== null)
            setAnimationNum(nullval)
        else
            gsap.to(document.getElementById("html-id"), { scrollTop:Total_Scroll_Height, duration: 1 ,ease: "easeInOutBounce" })
            
    },[quest_info])

    // --------------------------------------------------------

    const OnSubmit = ()=>{
      console.log(quest_info)
      const subject_rank = Control_classes(classes,quest_info)
      const essential_classes = Select_essential(quest_info,Login_state === true ? token.studentnumber : noLogin_studentNumber)
      // const subject_rank = Submit_transform(quest_info)
      // console.log(subject_rank)
        const Checkout_question = (data) =>{
   
                let val = null
            
                for(let i=0; i<data.length; i++){
                  if(data[i].value === 0){
                    val = i
                    break
                  }
            
                }
                return val
                } 
                const nullval = Checkout_question(quest_info)
            
                if(nullval !== null)
                    gsap.to(document.getElementById("html-id"), { scrollTop:nullval*Content_Plus_Gap, duration: 0.5 ,ease: "easeInOutBounce" })
                else{
                    alert('통과')
                    // const Submit_transform(quest_info)
                    if(Login_state === true){ //
                      LoginHandler_yes_login(subject_rank,essential_classes)
                    }else{
                      LoginHandler_no_login(subject_rank,essential_classes)
                    }
                  }
    }
    

    return <div ref={TotalRef}>
        
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
                    <div className='menu-content-in-div'
                    onMouseEnter={e => {e.preventDefault(); if(goodTF===false){
                        Icon_good_Enter_Handler()
                    }}}
                    >
                    <img id='good1-icon' src={good1} width={90} height={80} ref={good1Ref}/>
                        <span className='content-div-info'>&nbsp;&nbsp;&nbsp; 휴강관련 질문은 넘겨도 됩니다.</span>
                    </div>
                </div>
        </div>
        
        <div className='container-questionAll-new' >
            
            <div className='frame-questionAll-new' ref={ContentFrameRef} style={{width:frameWidth}}>    
                {questions}
            </div>
          
            <Question_condition FstConditionRef={FstConditionRef} credit={credit} handleRangeChange={handleRangeChange}/>
            <Major_count TrdConditionRef ={TrdConditionRef} handle_Major_Count={handle_Major_Count} major_count={major_count}/>
            <Question_rank SecConditionRef={SecConditionRef} Handle_Rank={Handle_Rank}/>


            <div className='frame-questionAll-button'>
                <button onClick={e=>{e.preventDefault(); OnSubmit()}}>제출</button>
            </div>
        </div>
        
        <div className='view-test'
        onClick={e=>{e.preventDefault(); Control_classes(classes,quest_info)}} 
        style={{display:'none'}}
        > &#123;<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"questions" :
        [
          {quest_info.map(item=>(
          (<div key={item.question} className='test-item'>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &#123;  "name": "{item.name}" "value":{item.value}  &#125;
          </div>)
        ))}
        ],  <span style={{color:'red'}}>//질문데이터</span><br/><br/>


        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"userId": 13  <span style={{color:'red'}}>//유저아이디</span><br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        "rank": [{sortRank.map((item,index)=>(
          <span key={index}>"{item}",</span>
          ))} ]<span style={{color:'red'}}>//우선순위</span>
    
        <br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"credit": {credit} <span style={{color:'red'}}>//학점</span><br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"prevInfo": {PrevInfo} <span style={{color:'red'}}>//이전에 들었던 강의 데이터</span><br/>
        &#125;
        </div>
        {/* 임시 데이터 뷰 */}
        
    </div>
}


export default QuestionAll



// const Checkout_question = (data) =>{

//     let val = null

//     for(let i=0; i<data.length; i++){
//       if(data[i].value === 0){

//         val = i
//         break
//       }

//     }
//     return val
//     } 
//     const nullval = Checkout_question(quest_info)

//     if(nullval !== null)
//         setAnimationNum(nullval)
//     else
//         gsap.to(document.getElementById("html-id"), { scrollTop:Total_Scroll_Height, duration: 1 ,ease: "easeInOutBounce" })