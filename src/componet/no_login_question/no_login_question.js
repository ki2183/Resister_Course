import './no_login_question.css'
import Modal from "react-modal"
import Instruction_Modal from '../user/instruction_modal';
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap/gsap-core';


export default function No_login_question(probs){

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const Ani_width = 316;

    const studentNumberRef = useRef(null)
    const [studentNumber ,setStudentNumber] = useState("")
    const [graduation,setGraduation] = useState("학년")

    const handler_stdudentNumber = (e)=>{
        e.preventDefault();
        setStudentNumber(e.target.value)

    }

    const handler_graduation = (e)=>{
        e.preventDefault();
        setGraduation(e.target.value)
    }

    useEffect(()=>{
        console.log(studentNumber)
    },[studentNumber])
    useEffect(()=>{
        console.log(graduation)
    },[graduation])

    const animationIn = (ref)=> {
        gsap.to(ref.current,{ 
          width:Ani_width,
          duration: 0.3,
          ease: "easeInOutBounce"})
      }
      const animationOut = (ref)=> {
        gsap.to(ref.current,{ 
          width:0,
          duration: 0.3,
          ease: "easeInOutBounce"})
      }

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const [prevInfo,setPrevInfo] = useState(null)
    const trans_info = useRef([])
    const handleTextAreaChange = (e) => {
        const newValue = e.target.value;
        setPrevInfo(newValue);
      };
      
    const TransformList = (prevInfo)=>{
        let resultArray 

        try {
            resultArray = JSON.parse(prevInfo);
          } catch (error) {
            alert("오류로 인해 변환되지 않습니다.")
            resultArray=[]
          }

        console.log(resultArray);
        trans_info.current = resultArray
    }

    useEffect(()=>{
        console.log(prevInfo)
        // TransformList(prevInfo);
    },[prevInfo])


    // -----------------------------------------------------

    const navigator = useNavigate();
    
    const NoneActiveLogin = () =>{
      navigator('/question', {state:{
        data:false,
        prevInfo:trans_info.current,
        studentNumber:studentNumber,
        graduation:graduation
        }})
    }
 

    return (
        <div className='container-no-login'>
            
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="모달 제목"
                style={{ overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex:'25',
                  },}}
                className='instruction-modal'
            >
            <Instruction_Modal></Instruction_Modal>
            </Modal>
            <h2>비회원 선택</h2>
            <span style={{color:'red', marginTop:"-10px", fontSize:"10px"}}>이전 시간표 삽입은 선택사항입니다.</span>
                  <div className='nologin-frame'>
                  <div className="ani-div-nologin" ref={studentNumberRef}></div>
                    <div><p>학번</p></div>
                    <input type='number' name='studentNumber' className="nologin-input" placeholder='학년'
                    onChange={handler_stdudentNumber}
                    onFocus={e=>{e.preventDefault(); animationIn(studentNumberRef)}}
                    onBlur={e=>{e.preventDefault(); animationOut(studentNumberRef)}}
                    />
                </div>

                    <div className='nologin-frame'>
                    <div><p>학년</p></div>
                        <select className="student-grade-nologin" name="studentGrade" aria-label="학번"
                         onChange={handler_graduation}
          
                         >  <option value="">학년</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
          
                        </select>
                    </div>

                    <div className='gap-nologin'> </div>
                    <div className='frame-userupdate' id='subjectTotalInfo'>

                        <div className='insert-script'>
                            <span>이전 시간표 정보 삽입</span>
                            <span>(스킵가능)</span>
                            <span onClick={e=>{e.preventDefault(); openModal();}}>자세히 보기</span>
                        </div>
                        
                        <textarea id='prev_info' onChange={e=>{e.preventDefault();
                        handleTextAreaChange(e)
                        }}>

                        </textarea>

                        
                    </div>
                    <button onClick={e=>{   
                        e.preventDefault(); 
                        TransformList(prevInfo);
                        if(studentNumber === ""){
                            alert('학번을 입력하세요')
                        }else if(graduation === "학년" ||graduation === "" ){
                            alert('학년을 입력하세요')
                        }else{
                            NoneActiveLogin();
                        }
                        
                        }}>다음</button>
        </div>
    )   
}