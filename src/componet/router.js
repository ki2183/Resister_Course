import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './router.css'

import Nav from './nav/nav';
import Nav_home from './nav/nav_home';
import Login from './user/login/Login'
import Usersave from './user/usersave/Usersave';
import Main from './main/main';
import MainBanner from './Mainbanner/Mainbanner';
import QuestionAll from './question/questionAll';
import Test from './test/test';
// import Result from './result/result';
import List from './list/list';
import Load from './load.js/load';
import List_Edit from './list/list_edit/list_edit';
import List_Menu from './list/list_edit/list_menu/list_menu';
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import Modal from "react-modal"
import Userupdate from './user/userupdate/userupdate';
import No_login_question from './no_login_question/no_login_question';
import AddDTO_Division_function from './router_function/AddDTO_Division'; 
import Transform_ViewDTO_function from './router_function/Tramsform_ViewDTO_function'; //시간표 데이터로 바꿔줌
  
import test_Table_dto from './list/list_edit/table_dto/table_dto.json' 

Modal.setAppElement('#root');

function MAINBANNER(probs){
    return <div>
        <Nav_home/>
        <MainBanner/>
    </div>
}

function USERSAVE(probs){
    return <div>
        <Nav_home/>
        <Usersave/>
    </div>
}

function USERUPDATE(probs){
  return <div>
      <Nav/>
      <Userupdate/>
  </div>
}
function LOGIN(probs){
    return <div>
        <Nav/>
        <Login/>
    </div>
}
function MAIN(probs){
    return <div>
        <Nav/>
        <Main/>
    </div>
}
function QUESTION(probs){
    return <div style={{position:'fixed'}}>
        <Nav/>
        <QuestionAll/>
    </div>
}
function LIST(probs){
  const [stageWidth,setStageWidth] = useState(0)
  const [width,setWidth] = useState(1300)

  const HandleResize = ()=>{
    setStageWidth(window.innerWidth)
    const element = document.getElementById("html-id");
      element.style.width = window.innerWidth + "px";
      // element.style.width = element.clientWidth + "px";
  }
  useEffect(()=>{
    HandleResize()
    console.log('tjossdfkl;sdfkl;sdfkl;kl;sdf')
  },[])
  useEffect(()=>{
    window.addEventListener('resize',HandleResize)
      
      return ()=>{
          window.removeEventListener('resize',HandleResize)
      }
  },[])

  useEffect(()=>{
    if(stageWidth<1300){
      setWidth(950)
    }else{
      setWidth(1300)
    }
  },[stageWidth])

    return <div>
        <Nav/>
        <Load load = {['목록','내 시간표']} px = {width}/>
        <div className='container-list-title'>
                <span>저장된 시간표</span>
            </div>
        <List/>
    </div>
}

function NO_LOGIN_QUESTION(probs){
    
  return <div>
      <Nav/>
      <No_login_question/>
  </div>
}

function LIST_EDIT(probs){
  

  // ------------------------navigate---------------------

    const [menuTF,setMenuTF] = useState(false)
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [ModalState,setModalState] = useState('add') // 모달 상태
    // ----------------------------------------------------------------------------
    const table_dto = test_Table_dto.data; //데이터 들어옴

    const Zero_dto = [
      ['null','null','null','null','null','null',],
      ['null','null','null','null','null','null',],
      ['null','null','null','null','null','null',],
      ['null','null','null','null','null','null',],
      ['null','null','null','null','null','null',]
    ] // 제로 데이터

    const tempDTORef = useRef(["",""]) //데이터 삭제 임시저장
    const tempChangeRef = useRef(null) //변경 데이터 임시저장
    const Change_DTO_Handler = (data) =>{
      // console.clear();
      // console.log(data)
      tempChangeRef.current = data
      setModalState('add')
      openModal();
    
    }
    // -------------location test--------------
    
    const location = useLocation()
    const Login_state = location && location.state ? location.state.data : null; //비회원이면 false 회원이면 true
    useEffect(()=>{console.clear(); console.log(Login_state)},[])
    // axios 없을때 test

    //--------------------------------------


    const [TL_DTO,setTL_DTO] = useState([])
    const [TL_View_DTO,setTL_View_DTO] = useState(Zero_dto)



    useEffect(()=>{
      // console.log(table_dto.timeline)
      console.log(TL_DTO)
      if(TL_DTO && TL_DTO.length>0){
        const TL = Transform_ViewDTO_function(TL_DTO)
        setTL_View_DTO(TL)
      }else{
        setTL_View_DTO(Zero_dto)
      }
    },[TL_DTO])

    useEffect(()=>{
      console.log(TL_View_DTO)
    },[TL_View_DTO])

    const ADD_DTO=()=>{
      const TL_DTO_ = [...TL_DTO]
      if(tempChangeRef.current !== null)
        TL_DTO_.push(tempChangeRef.current)
      setTL_DTO(TL_DTO_)

    }

    const DEL_TL_DTO = (id_) => {
      console.log(id_);
      console.log(TL_DTO);
      const TL_DTO_ =[...TL_DTO]
      
      if (TL_DTO.length === 0) {
          console.log("TL_DTO 배열이 비어 있습니다.");
          return;
      }
      
      const foundIndex = TL_DTO.findIndex(item => item.id === id_);
      
      if (foundIndex !== -1) {
          console.log("찾은 항목의 인덱스:", foundIndex);
          TL_DTO_.splice(foundIndex,1)
          setTL_DTO(TL_DTO_)
      } else {       
          alert('삭제 실패')
      }
  } 
    const SendID = (id,title,item)=>{
      tempChangeRef.current=item
      tempDTORef.current = [id,title]
      console.log(tempDTORef.current)
      console.log(id,title)
      setModalState('del')
      openModal();
    }
    //========================
    useEffect(()=>{
      // alert('test데이터')
      (Login_state === true || Login_state === false ) ? setTL_DTO(table_dto.timeline) : setTL_DTO(Login_state.timeline);
      console.log(table_dto.timeline)
    },[])

    // -------------------------------------------------------------------------------

   

    const openModal = () => {setModalIsOpen(true); };
    const closeModal = () => {setModalIsOpen(false);}

    const reverseTF = ()=>{ //애니메이션 tf
        setMenuTF(!menuTF) 
    }

    useEffect(()=>{
      console.log(ModalState)
    },[ModalState])

    const Modal_Del_Yes = () =>{
      DEL_TL_DTO(tempDTORef.current[0])
      tempDTORef.current = ["",""]
      closeModal()
    }
    const Modal_Change_Yes = () => { 
      // const Check_Overlap_subject = AddDTO_Division(tempChangeRef) // []반환하면 같은시간에 중복되는 강의가 없다는 뜻
      const Check_Overlap_subject = AddDTO_Division_function(tempChangeRef,TL_DTO) // []반환하면 같은시간에 중복되는 강의가 없다는 뜻
      console.log(Check_Overlap_subject)

      if(Check_Overlap_subject.length === 0){
        ADD_DTO();
        closeModal()
      }else if(Check_Overlap_subject.length === 1){
        // console.log(TL_DTO[Check_Overlap_subject[0]])
        alert(`(${TL_DTO[Check_Overlap_subject[0]].subject_title})과 중복됩니다.`)
      }else if(Check_Overlap_subject.length === 2){
        console.log(TL_DTO[Check_Overlap_subject[0]]
          )
        alert(`(${TL_DTO[Check_Overlap_subject[0]].subject_title},${TL_DTO[Check_Overlap_subject[1]].subject_title})과 중복됩니다.`)
      }

    }

    return <div className='List_Edit_div'>

        <Nav/>

        <Modal 

        style={{ overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex:'25'
        },}} className="class-modal-menu-menu"
        isOpen={modalIsOpen} onRequestClose={closeModal}>

         <div className='class-modal-cancle-menu'>
            <div>
              <div className='subject_title'>
                <div>교과목명</div>
                <div>{tempChangeRef.current &&tempChangeRef.current.subject_title}</div>
              </div>

              <div className='susbject_grade'>
                  <div>수강대상</div>
                  <div>{tempChangeRef.current &&tempChangeRef.current.grade}</div>
                  <div>이수구분</div>
                <div>{tempChangeRef.current &&tempChangeRef.current.major_classification}</div>
              </div>
              <div className='how_to_lesson'>
                <div>수업방식</div>
                <div>{tempChangeRef.current &&tempChangeRef.current.how_to_lesson}</div>
              </div>
              <div className='class_time'>
                <div>수업시간</div>
                <div>{tempChangeRef.current &&tempChangeRef.current.class_time}</div>
              </div>
            </div> 
            
            <div id='frame-menu-modal-button'>
              <button onClick={closeModal}>취소</button>
              {ModalState==='del'?(<button style={{
                backgroundColor: '#FF1755',
                boxShadow: '1px 1px 1px #1c1729',
                color: 'antiquewhite',

              }} onClick={Modal_Del_Yes}>삭제</button>):(<button style={{
                backgroundColor: 'var(--pc)',
                color: 'antiquewhite',

              }} onClick={Modal_Change_Yes}>추가</button>
              )}
              </div>
            {/* <span>{ModalState}</span> */}
          </div>

      </Modal>

      
        <List_Menu 
        Change_DTO_Handler={Change_DTO_Handler}
        menuTF={menuTF} TL_DTO={TL_DTO} reverseTF={reverseTF}/>
        <List_Edit 
        
        SendID={SendID} 
        menuTF={menuTF} 
        TL_View_DTO={TL_View_DTO} 
        TL_DTO={TL_DTO} />
        {/* <button style={{
          width:'200px',
          height:'50px',
          border:'1px solid #666',
          position:'absolute',
          top:'90%',
          left:'80%',
        }} onClick={e=>{
          e.preventDefault();

          (Login_state === true || Login_state === false ) ? setTL_DTO(table_dto.timeline) : setTL_DTO(Login_state.timeline);

          
        }}>Test / API 대용</button> */}
        
        
    </div>
}

function TEST(probs){
    
  return <div>
      <Nav/>
      <Test/>
  </div>
}

function AppRouter(){

  const expirationDate = new Date();
  expirationDate.setMinutes(expirationDate.getMinutes() + 10); //로그인하고 30분 지나면 자동 데이터 삭제
  const token = JSON.parse(localStorage.getItem('token')) && JSON.parse(localStorage.getItem('token')).data ? JSON.parse(localStorage.getItem('token')).data:null
  const [recognize_move,setRecognice_move] = useState(false)
  const recognize_time = useRef(null)

  const setRecognizeTimeout = ()=>{
      recognize_time.current = new Date().getTime() + 10 * 60 * 1000; // 맨 앞 숫자 '분'
  }

  const mouseMoveHandler =()=>{
      setRecognizeTimeout()
      setRecognice_move(true)
  }

  useEffect(()=>{
    setRecognizeTimeout()

    window.addEventListener('mousemove',mouseMoveHandler)

    return ()=>{
      window.removeEventListener('mousemove',mouseMoveHandler)
    }
  },[])


  useEffect(()=>{
    const chekctRecognizeTimeout = () =>{
      if(recognize_move && recognize_time.current && new Date().getTime() >= recognize_time.current) {
        console.log('로그아웃');
        setRecognice_move(false)
        localStorage.removeItem('token')
        window.location.href ='/'
        // if(token !== null){
        //   localStorage.removeItem('token')
        //   window.location.href ='/'
        // }
        // else{ 
        //   console.log('로그인 정보가 없음')
        // }
      }
      // else{
      //   console.log('시간안지남')
      // }
    }
    const intervalId = setInterval(chekctRecognizeTimeout, 10000); // 30초 마다 확인

    return () => {
      clearInterval(intervalId);
    };
  },[recognize_move])


  return <BrowserRouter>
       <Routes>

              <Route path="/" element={<MAINBANNER/>}></Route>
              <Route path="/usersave" element={<USERSAVE/>}></Route>
              <Route path="/userupdate" element={<USERUPDATE/>}></Route>
              <Route path="/login" element={<LOGIN/>}></Route>
              <Route path="/main" element={<MAIN/>}></Route>
              <Route path="/question" element={<QUESTION/>}></Route>
              <Route path="/test" element={<TEST/>}></Route>
              <Route path="/list" element={<LIST/>}></Route>
              <Route path="/listedit" element={<LIST_EDIT/>}></Route>
              <Route path="/nologin" element={<NO_LOGIN_QUESTION/>}></Route>
          </Routes>
  </BrowserRouter>
}


export default AppRouter;

