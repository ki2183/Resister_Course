import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './router.css'

import Home from './home/home';
import Nav from './nav/nav';
import Login from './user/login/Login'
import Usersave from './user/usersave/Usersave';
import Main from './main/main';
import MainBanner from './Mainbanner/Mainbanner';
import Menu from './menu/menu';
import LastQuestion from './lastquestion/lastquestion';
import QuestionAll from './question/questionAll';
import Test from './test/test';
import MakeQuesitonInput from './question/question_input';
import Result from './result/result';
import List from './list/list';
import Load from './load.js/load';
import List_Edit from './list/list_edit/list_edit';
import List_Menu from './list/list_edit/list_menu/list_menu';
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import Modal from "react-modal"
import calcDate from "./routerfuntion"

function MAINBANNER(probs){
    return <div>
        <Nav/>
        <MainBanner/>
    </div>
}

function USERSAVE(probs){
    return <div>
        <Nav/>
        <Usersave/>
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
    return <div>
        <Nav/>
        <QuestionAll/>
    </div>
}
function RESULT(probs){
    return <div>
        <Nav/>
        <Result/>
    </div>
}
function LIST(probs){
    
    return <div>
        <Nav/>
        <Load load = {['목록','내 시간표']} px = {1300}/>
        <div className='container-list-title'>
                <span>저장된 시간표</span>
            </div>
        <List/>
    </div>
}
function LIST_EDIT(probs){

    const [menuTF,setMenuTF] = useState(false)
    const location = useLocation();
    const { data } = location.state;
    const [Tabletemp,setTabletemp] = useState([])
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalIsMenuOpen, setModalMenuIsOpen] = useState(false);
    const [tempIndex,setTempIndex] = useState([])

    const nullinfo = {
      
        "id" : null,
        "grade": null,
        "major_classification" : null,
        "subject_title":null,
        "how_to_lesson":null,
        "credit":null,
        "instruction":null,
        "class_time" : null,
        "index":[[0,0],[2,1]]

    }

    const [changeInfo ,setChangeInfo] = useState(nullinfo)


    const openModal = () => setModalIsOpen(true);
    const closeModal = () => {setModalIsOpen(false); setTabletemp([]) }

    const openMenuModal = () => setModalMenuIsOpen(true);
    const closeMenuModal = () => {setModalMenuIsOpen(false); setTabletemp([]) }
    
    const [title_,setTitle] = useState(null)

    const [tableDTO,setTableDTO] = useState(data.timeline)
    const reverseTF = ()=>{ //애니메이션 tf
        setMenuTF(!menuTF) 
    }
    const Modal_Del_Yes = () =>{
      setTableDTO(Tabletemp)
      closeModal()
    }
    const Modal_Change_Yes = () => { //수업 바꾸기에 yes를 하면 바꾸고 TEMP에 있던 값 초기화
        console.log(Tabletemp)
        const limit = []
        const title = []
        let val = ''

        tempIndex.map((item)=>{
          if(tableDTO[item[0]][item[1]]==='null'){
            limit.push(true)
            title.push(tableDTO[item[0]][item[1]])
            
          }else{
            limit.push(false)
            title.push(tableDTO[item[0]][item[1]])
          }
        })

        const totallimit = limit.includes(true) //과목이 비었다면 true 
        if(title.length <= 2){
          if(title[0]===title[1]){
            val = `(${title[0]})`
          }else{
            val = `(${title[0]}), (${title[1]})`
          }
        }else{
          val = `(${title[0]})`
        }
        
        if(totallimit===false){
          alert(`같은시간대에 ${val} 이(가) 존재합니다.`)
        }else{
          setTableDTO(Tabletemp)

        }

        closeMenuModal()
      }

    const del_table_dto = (dx,dy) =>{    // 수업 삭제 메소드
        let limit = false
        let temp
        
        const updateDTO = JSON.parse(JSON.stringify(tableDTO));

    
        let title = updateDTO[dx][dy] //제목
        // setTemp_title(title) //modal에 줄 title 업뎃
        const data_ = updateDTO //timeline 변수
        console.log(title)
        setTitle(title)
        // console.log(updateDTO)

        const UP_DOWN_FIND = (day,period) => {

          if(period > 0 && title === data_[day][period-1]){ //아래
            temp=[day,period-1]
            limit = true
          }
          else if(period < 5 && title === data_[day][period+1]){ //위 탐색
            temp=[day,period+1]
            limit = true
          }
        }

        const EQUEL_FIND = (day,period) =>{ 
          if(title === data_[day][period]){ //아래
            temp=[day,period]
            limit = true
          }
        }
    
        const Day_Find = () => { //요일 먼저 찾음 [요일][교시] 니까
          if(dx === 0 || dx == 1){ //월.화 // 수목 탐색
            
            EQUEL_FIND(dx+2,dy)
            if(limit===false)
              UP_DOWN_FIND(dx+2,dy)
    
          }else if(dx === 2 || dx == 3){ //수.목 // 월화 탐색
            
            EQUEL_FIND(dx-2,dy)
            if(limit===false)
              UP_DOWN_FIND(dx-2,dy)
          } // 금요일은 격일로 연강하는 경우 없음
        }
    
        UP_DOWN_FIND(dx,dy)
    
        if(limit === false){ // 탐색 후 없으면 다른날 찾긔
          Day_Find()
        }
    
        if(limit === false){
          console.log(dx,dy)
          updateDTO[dx][dy] = "null" //단일강의

        }else{
          console.log(dx,dy)
          console.log(temp)
          updateDTO[dx][dy] = "null"
          updateDTO[temp[0]][temp[1]] = "null" //연강이거나 다른날에 강의가 있음
        }

        console.log(updateDTO)
        console.log(tableDTO)
        setTabletemp(updateDTO)
        
        openModal() // 모달 열기

      };  

      const changeDTO = (dto) => { //수업 바꾸기 메소드
        
        const updateDTO = JSON.parse(JSON.stringify(tableDTO));
        console.log(dto)
        calcDate(dto.class_time)
        openMenuModal()
        let limit = false
        let arr = calcDate(dto.class_time)
        console.log(arr)
        setTempIndex(arr)
        
        for (let i = 0; i < arr.length; i++) {
          let x = arr[i][0];
          let y = arr[i][1];
          // console.log('x',x)
          // console.log('y',y)
          // console.log(dto.subject_title)
          updateDTO[x][y] = dto.subject_title;
          console.log(tableDTO[x][y]==='null')
          
          if(tableDTO[x][y] === 'null') {
            limit = true
            setTabletemp(updateDTO)
            setChangeInfo(dto)
          }
        }
        console.log(updateDTO)

        setTabletemp(updateDTO)
        setChangeInfo(dto)
        openMenuModal();
    
      }

      const gradeFuntion = (arr)=>{
        const char = []
        arr.map((item,index)=>{
          if(index<arr.length-1){
            char.push(item)
            char.push(', ')
          }else{
            char.push(item)
          }
        })

        return char
      }

    useEffect(()=>{
        console.log(data.timeline)
        console.log("확인")
        const tl = data.timeline
        setTableDTO(tl)
    },[])

    useEffect(()=>{
        console.log(changeInfo)
        console.log('qhkfgkaskjfasljkfasjkljklasf')
    },[changeInfo])

    return <div className='List_Edit_div'>
        <Nav/>

        <Modal style={{ overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex:'25'
        },}} className="class-modal-menu" isOpen={modalIsOpen} onRequestClose={closeModal}>
        <p className='class-modal-info-menu'>{title_}을(를) 삭제하시겠습니까?</p>
        <div className='class-modal-YesOrNo-menu'>
          <button onClick={e=>{e.preventDefault(); Modal_Del_Yes()}}>예</button>
          <button onClick={closeModal}>아니요</button>
          
        </div>
      </Modal>
      <Modal style={{ overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex:'25'
    },}} className="class-modal-menu-menu" isOpen={modalIsMenuOpen} onRequestClose={closeMenuModal}>
        <div className='class-modal-cancle-menu'>
            {/* <span onClick={closeMenuModal} className='class-modal-cancle-button'>✕</span> */}
            <div>
              <div className='subject_title'>
                <div>교과목명</div>
                <div>{changeInfo.subject_title}</div>
              </div>

              <div className='susbject_grade'>
                  <div>수강대상</div>
                  <div>{changeInfo && changeInfo.grade && gradeFuntion(changeInfo.grade)}</div>
                  <div>이수구분</div>
                <div>{changeInfo.major_classification}</div>
              </div>
              <div className='how_to_lesson'>
                <div>수업방식</div>
                <div>{changeInfo.how_to_lesson}</div>
              </div>
              <div className='class_time'>
                <div>수업시간</div>
                <div>{changeInfo.class_time}</div>
              </div>
            </div> 
            
            <div id='frame-menu-modal-button'>
              <button onClick={closeMenuModal}>취소</button>
              <button onClick={Modal_Change_Yes}>추가</button>
            </div>
          </div>
        

      </Modal>
      

        <List_Menu menuTF={menuTF} reverseTF={reverseTF} changeDTO={changeDTO}/>
        <List_Edit menuTF={menuTF} tableDTO={tableDTO} del_table_dto={del_table_dto} />

        
    </div>
}
// const [modalIsMenuOpen, setModalMenuIsOpen] = useState(false);
    // const openMenuModal = () => setModalMenuIsOpen(true);
    // const closeMenuModal = () => {setModalMenuIsOpen(false); setTabletemp([]) }

function AppRouter(){
    return <BrowserRouter>
         <Routes>

                <Route path="/" element={<MAINBANNER/>}></Route>
                <Route path="/usersave" element={<USERSAVE/>}></Route>
                <Route path="/login" element={<LOGIN/>}></Route>
                <Route path="/main" element={<MAIN/>}></Route>
                <Route path="/question" element={<QUESTION/>}></Route>
                <Route path="/test" element={<Test/>}></Route>
                <Route path="/result" element={<RESULT/>}></Route>
                <Route path="/list" element={<LIST/>}></Route>
                <Route path="/listedit" element={<LIST_EDIT/>}></Route>
            </Routes>
    </BrowserRouter>
}

export default AppRouter;

