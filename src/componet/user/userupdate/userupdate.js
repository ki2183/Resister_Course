import { useLocation, useSearchParams } from 'react-router-dom'
import './userupdate.css'
import { useLayoutEffect, useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import gsap from 'gsap'
import Modal from "react-modal"
import Instruction_Modal from '../instruction_modal'
import axios from 'axios'


export default function Userupdate(probs){

    const Input_width = 300.78

    const NameRef = useRef(null)
    const [NameTF,setNameTF] = useState(false)
    const NumRef = useRef(null)
    const [NumTF,setNumTF] = useState(false)
    // const [NumTF,setNumTF] = useState(false)

// ---------------------------------------- 값 설정Ref

    const gradeRef = useRef(null)
    const studentNumberRef = useRef(null)
    // studentNumber

    const [InsertDtoTF,setInsertDtoTF] = useState(false)

    // const userId = 13

    const token = JSON.parse(localStorage.getItem('token'))

    const TestDto = {
        'userid':'1',
        'username':'김기준',
        'studentNumber':'18',
        'studentGrade':'4',
        
    }

    const prev_tl_ = `[["KY201A","채플"],["KY677Y1","대학생활길잡이"],["KY719K1","독서와토론"],["KY721R1","영어Ⅰ"],["KY885A","미술속의기독교"],["NI115A","C언어입문"],["NI136B","미적분학"],["KY410R4","진로와상담"],["KY720R1","글쓰기의기초"],["KY722J1","영어Ⅱ"],["KY472A","생활법률"],["NI125A","C++이론및실습"],["NI134B","공학설계입문"],["NI137B","공업수학"],["KY101B","채플"],["KY410R4","진로와상담"],["KY309A","생활속의실용금융"],["KY498A","오르간연주법1"],["NI202B","유닉스시스템"],["NI241A","자바프로그래밍"],["NI260B","논리회로설계및실험"],["NI351A","무인이동체SW공학"],["KY201B","채플"],["KY921Z1","사회생활길잡이"],["KYA21A","물리란무엇인가"],["OC194A","도시문화와디자인"],["NI215A","운영체제"],["NI232B","인터넷프로그래밍"],["NI431A","알고리즘"],["NI482A","영상정보처리"],["KY201B","채플"],["KY744A","역사란무엇인가"],["KYA67A","지혜로운소비와재테크"],["NI317A","디지털시스템설계및실험"],["NI324A","웹프로그래밍"],["NI386B","컴퓨터비전"],["NI470B","컴퓨터네트워크"],["KY201A","채플"],["KY410R4","진로와상담"],["KY593A","진로선택과취업준비"],["NI295A","게임프로그래밍"],["NI325B","모바일프로그래밍"],["NI337A","유닉스시스템프로그래밍"],["NI343A","데이터베이스"],["NI519B","데이터분석기초"],["KYC03A","컴퓨터활용능력을위한엑셀2016"],["KY410R4","진로와상담"],["OC112A","생활속의심리학"],["NI302A","빅데이터개론"],["NI304A","프로그래밍언어"],["NI421A","객체지향프로그래밍"],["NI523A","소프트웨어융합종합설계1"]]` 

    const [DTO,setDTO] = useState({
        'userid':'',
        'username':'',
        'studentNumber':'',
        'studentGrade':'',
    })//학생 데이터

    const [dto,setDto] = useState({
        'userid':'',
        'username':'',
        'studentNumber':'',
        'studentGrade':'',
    })//학생 데이터

    const TestUpdateDto = () =>{
        setDTO(TestDto)
        setInsertDtoTF(!InsertDtoTF)
        // gradeRef.current.value = DTO.graduation
        // studentNumberRef.current.value = DTO.AdmissionYear
    }
    // const token = JSON.parse(localStorage.getItem('token'))
    // useEffect(()=>{
        
    // },[InsertDtoTF])

    useEffect(()=>{
        
        // console.log(TokenString.data)
        // const token = TokenString
        console.log(token)
        console.log(token.userid)
        console.log(token.username)
        console.log(token.studentnumber)
        console.log(token.studentgrade)
        // setDto({
        //     userid:token.userId,
        //     username:token.username,
        //     studentNumber:token.graduation,
        //     studentGrade:token.AdmissionYear,
        // })
        const dto_ = {
            userid:token.userid,
            username:token.username,
            studentGrade:token.studentgrade,
            studentNumber:token.studentnumber,
            
        }
        
        setDTO(dto_)  
        setInsertDtoTF(!InsertDtoTF)
    },[])   

    useEffect(()=>{
        console.log   (DTO.studentGrade)
        // const grade = DTO.studentGrade
        gradeRef.current.value =  DTO.studentGrade
        studentNumberRef.current.value =  DTO.studentNumber
        console.log(DTO)
        // console.log(savedToken)

        // const prevList = TransformList(prevInfo)
        // console.log(prevList)

        setDto({
            userid:token.userid,
            username:DTO.username,
            studentNumber:DTO.studentNumber,
            studentGrade:DTO.studentGrade
        })
    },[DTO])

    // useEffect(()=>{console.log(dto)},[dto])


    //------- prev info--------

    const [prevInfo,setPrevInfo] = useState(null)

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

        return resultArray
    }

    
    // -------modal--------

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    useEffect(()=>{

        if(NameTF===true){
            gsap.to(NameRef.current,{ 
                width:Input_width,
                duration: 0.3,
                ease: "easeInOutBounce"})
        }else{
            gsap.to(NameRef.current,{ 
                width:0,
                duration: 0.3,
                ease: "easeInOutBounce"})
        }
    },[NameTF])

    useEffect(()=>{

        if(NumTF===true){
            gsap.to(NumRef.current,{ 
                width:Input_width,
                duration: 0.3,
                ease: "easeInOutBounce"})
        }else{
            gsap.to(NumRef.current,{ 
                width:0,
                duration: 0.3,
                ease: "easeInOutBounce"})
        }
    },[NumTF])


    const onSubmit = ()=>{
        if (DTO.name===''){
            alert('이름칸이 비어있습니다.')
        }else if(DTO.graduation==='' ||DTO.graduation==='학년'){
            alert('학년칸이 비어있습니다.')
        }else if(DTO.AdmissionYear===''||DTO.AdmissionYear === '입학년도'){
            alert('학번 칸이 비어있습니다.')
        }else{
            OnSubmit();
        }


    }

    const NameChange =(e)=>{
        e.preventDefault();
        console.log(e.target.value)
        setDTO((prevDTO)=>({
            ...prevDTO,
            username:e.target.value
        }))
        // setDTO()
    }

    const GraduationChange =(e)=>{
        e.preventDefault();
        console.log(e.target.value)
        setDTO((prevDTO)=>({
            ...prevDTO,
            studentGrade:parseInt(e.target.value)
        }))
    }
    // userid:token.userid,
    // username:token.username,
    // studentNumber:token.studentNumber,
    // studentGrade:token.studentGrade,
    const AdmissionChange =(e)=>{
        e.preventDefault();
        console.log(e.target.value)
        setDTO((prevDTO)=>({
            ...prevDTO,
            studentNumber:parseInt(e.target.value)
        }))
        // setDTO()
    }

    const OnSubmit = (e)=>{
        e.preventDefault();
        alert('확인')
        console.log(DTO)
        // console.log(DTO)    
        const userupdate = ()=>{
             axios.post(`/user/data/update`, JSON.stringify(DTO), {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((res) => {
            // console.log(res); // result
            // console.log('axios에 올라간 데이터')
            // console.log(token)
            // console.log(JSON.parse(localStorage.getItem('token')))
            const token_ = JSON.parse(localStorage.getItem('token'))
            const dto_ = {
                userid:token_.userid,
                username:DTO.username,
                studentnumber:DTO.studentNumber,
                studentgrade:DTO.studentGrade 
            }

            localStorage.setItem('token',JSON.stringify(dto_))

            alert('저장 완료')

            window.location.href='/userupdate'   
            
          })
          .catch((error) => {
            console.error(error); // err
            console.log('axios 오류')
            alert('axios오류')
          });
        }

        
        // console.log(prevList)
        const userPrevInfo = (dto_)=>{

            axios.post(`/user/prevInfo/save`, JSON.stringify(dto_), {
           headers: {
             'Content-Type': 'application/json'
           }
         })
         .then((res) => {
           console.log(res); // result
           console.log('axios에 올라간 데이터')
           alert('UserUpdate 전송완료')
           
         })
         .catch((error) => {
           console.error(error); // err
           console.log('axios 오류')
           alert('axios오류')
         });
       }
       if(prevInfo !== "" && prevInfo !== null && prevInfo !== undefined){
            const prevList = TransformList(prevInfo)
            console.log(prevList)
            const dto_ = {
                userid:DTO.userid,
                lectures:prevList
            }

            console.log(dto_)
            if( dto_.lectures != [])
                userPrevInfo(dto_)
       }
        userupdate()
    }


    return(
        <div className='container-userdate' >
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
            <div className='frame-userdate'>
                <h2>정보수정</h2>
                <form  className='frame-userupdate-form' onSubmit={OnSubmit}>
                    <div className='frame-userupdate'>
                        <span>이름</span>
                        <input type='text' defaultValue={DTO.username} className='userupdate-input' onFocus={e=>{
                            e.preventDefault()
                            setNameTF(true)
                        }}
                        onBlur={e=>{
                            e.preventDefault()
                            setNameTF(false)
                        }}
                        onChange={NameChange}
                        ></input>
                        <div ref={NameRef} className='name-bottom-ref'></div>
                    </div>

                    <div className='frame-userupdate'>
                        <span>학번</span>
                        <input type='number' defaultValue={DTO.studentnumber}  ref={studentNumberRef} className='userupdate-input' onFocus={e=>{
                            e.preventDefault()
                            setNumTF(true)
                        }}
                        onBlur={e=>{
                            e.preventDefault()
                            setNumTF(false)
                        }}
                        onChange={AdmissionChange}
                        ></input>
                        <div ref={NumRef} className='name-bottom-ref'></div>
                    </div>

                    <div className='frame-userupdate'>
                        <span>학년</span>
                        <select id="student-graduation" ref={gradeRef} name="studentNumber"
                        onChange={GraduationChange} 
                         >  <option value="">학년</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}   >4</option>
                        </select>
                    </div>
                    {/* <div className='frame-userupdate'>
                        <span>입학년도</span>
                        <select id="Admission-year" ref={studentNumberRef} name="studentGrade" 
                        onChange={AdmissionChange}
                         >  <option value="">입학년도</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                        </select>
                    </div> */}
                    <div className='frame-userupdate' id='subjectTotalInfo'>
                        <div className='insert-script'>
                            <span>이전 시간표 정보 삽입</span>
                            <span>(선택)</span>
                            <span onClick={e=>{e.preventDefault(); openModal();}}>자세히 보기</span>
                        </div>
                        
                        <textarea onChange={handleTextAreaChange} defaultValue={DTO.prev_tl}>

                        </textarea>
                    </div>
                    <div className='frame-userupdate'>
                        <input type='submit' value='변경' ></input>
                    </div>
                </form>
                <a href='#' onClick={e=>{e.preventDefault(); alert('안함 ㅋㅋ');}}>회원탈퇴하기</a>
                <a href='#' onClick={e=>{e.preventDefault(); console.log(token)}}>Fake get api test</a>
            </div>
        </div>
    )
}











