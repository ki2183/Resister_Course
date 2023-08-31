import './result.css'
import data from  './data/result.json'
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import ResultTL from './resultTL';
import GeneralClass from './generalClass';
import g_class from './data/generalClass.json'
import Modal from "react-modal"
import Small_TL_View from './smalltlview';
import { gsap } from 'gsap';

function Result_Top_Left(probs){
  const [view,setView] = useState(<div className='container-result-TL-before'>컨텐츠를 여기다가 끌어당기세요</div>)
  const [dto,setDTO] = useState({})
  const temp = useRef([]) // 임시 데이터 저장
  const temp_del = useRef(null)

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {setModalIsOpen(false); temp.current=[] }

  const [Cancle_Modal_Open,setCancle_Modal_Open] = useState(false)
  const openCancleModal = () => setCancle_Modal_Open(true);
  const closeCancleModal = () => {setCancle_Modal_Open(false); temp_del.current = null}

  const [temp_title,setTemp_title]= useState(null)

  
  
  const [,dropRef] = useDrop({
    accept:"ITEM",
    drop:(droppedItem) =>{
      setDTO(droppedItem.item)
    }
  })
  

  const deleteThis = (dx,dy) =>{    // 수업 삭제 메소드
    let limit = false
    let temp
    
    const updateDTO ={
      ...dto,
      timeline: dto.timeline.map(row=>[...row])
    } //데이터 복제

    let title = updateDTO.timeline[dx][dy] //제목
    setTemp_title(title) //modal에 줄 title 업뎃
    const data_ = updateDTO.timeline //timeline 변수

    const UP_DOWN_FIND = (day,period) => {
      // console.log("함수시작 ")
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
      if(dx === 0 || dx == 1){ //월.수
        
        EQUEL_FIND(dx+2,dy)
        if(limit===false)
          UP_DOWN_FIND(dx+2,dy)

      }else if(dx === 2 || dx == 3){ //화.목
        
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
      updateDTO.timeline[dx][dy] = "null" //단일강의
    }else{
      console.log(dx,dy)
      console.log(temp)
      updateDTO.timeline[dx][dy] = "null"
      updateDTO.timeline[temp[0]][temp[1]] = "null" //연강이거나 다른날에 강의가 있음
    }
    console.log(dto.timeline[temp[0]][temp[1]])
    temp_del.current = updateDTO
    // setDTO(updateDTO) // modal을 보여줘서 참이면 업뎃 아니면 냅두기
    // temp.current = updateDTO
    console.log(temp_del)
    openCancleModal()
  };  

  const changeDTO = (arr, title_) => { //수업 바꾸기 메소드
    
    const updatedDTO = {
      ...dto,
      timeline: dto.timeline.map(row => [...row]) 
    };
    let limit = false
    for (let i = 0; i < arr.length; i++) {
      let x = arr[i][0];
      let y = arr[i][1];
      updatedDTO.timeline[x][y] = title_;
      console.log(dto.timeline[x][y]==='null')
      
      if(dto.timeline[x][y] === 'null') {
        limit = true
        temp.current.push([x,y])
      }
    }
 
    if (limit === true){
      setDTO(updatedDTO)
    }else{
      temp.current = updatedDTO;
      openModal();
    }

  }

  const Modal_Q_Yes = () => { //수업 바꾸기에 yes를 하면 바꾸고 TEMP에 있던 값 초기화
    console.log(temp.current)
    setDTO(temp.current)
    closeModal()
    temp.current = []
  }

  const Modal_Cancle_Q_Yes = () => { //수업 바꾸기에 yes를 하면 바꾸고 TEMP에 있던 값 초기화
    console.log(temp.current)
    setDTO(temp_del.current)
    closeCancleModal()
    // temp_del.current = []
  }

  useEffect(()=>{
    if (Object.keys(dto).length === 0) {
      setView(<div className='container-result-TL-before'>컨텐츠를 여기다가 끌어당기세요</div>)
    } else if (dto.title) {
      setView(<ResultTL dto={dto} changeDTO={changeDTO} deleteThis={deleteThis}/>)
      console.log('제목있음')
    }
    // console.log(dto.timeline)
  },[dto])
  
  return(
      <div className='container-result-top-left' ref={dropRef}>
        {view}
        <Modal className="class-modal" isOpen={modalIsOpen} onRequestClose={closeModal}>
        <div className='class-modal-cancle'><span onClick={closeModal} className='class-modal-cancle-button'>✕</span></div>
        <p className='class-modal-info'>중복되는 강의가 있습니다. 교체하시겠습니까?</p>
        <div className='class-modal-YesOrNo'>
          <button onClick={e=>{e.preventDefault(); Modal_Q_Yes()}}>예</button>
          <button onClick={closeModal}>아니요</button>
          
        </div>
      </Modal>

      <Modal className="class-modal" isOpen={Cancle_Modal_Open} onRequestClose={closeCancleModal}>
        <div className='class-modal-cancle'><span onClick={closeCancleModal} className='class-modal-cancle-button'>✕</span></div>
        <p className='class-modal-info'>{temp_title}를 삭제하시겠습니까?</p>
        <div className='class-modal-YesOrNo'>
          <button onClick={Modal_Cancle_Q_Yes}>예</button>
          
          <button onClick={closeCancleModal}>아니요</button>
          
        </div>
      </Modal>
      </div>
  )
}
function Result_Top_Right({gsapTF}){


    return(
        <div className='container-result-top-right' >
          <GeneralClass g_class={g_class} gsapTF={gsapTF}/>
          
        </div>
    )
}
// ----------------------bottom--------------------------


function Result_Bottom({gsapTF,setGsapTF}){
  
  const [list,setList] = useState(data.data)
  const [TLview,setTLview] = useState()
  const moveItem = (fromIndex,toIndex) => {
    const list_ = [...list]
    const [movedItem] = list_.splice(fromIndex,1)
    list_.splice(toIndex,0,movedItem)
    setList(list_)
  }

  // const [gsapTF,setGsapTF] = useState(true)
  const smallhandlerRef = useRef(null)
  const bighandlerRef = useRef(null)
  const contentRef = useRef(null)
  const rightRef = useRef(null)

  useEffect(()=>{
    if(gsapTF===true){
      gsap.to(smallhandlerRef.current,{height:9, x:0, y:0,duration: 0.2, ease: "easeInOutBounce"})
      gsap.to(bighandlerRef.current,{height:80, width:1048, duration: 0.5, ease: "easeInOutBounce"})
    }else{
      gsap.timeline().to(smallhandlerRef.current,{height:9, x:0, y:0,duration: 0.2, ease: "easeInOutBounce"})
      .to(smallhandlerRef.current,{height:0 ,y:3,duration: 0.5, ease: "easeInOutBounce"})
      gsap.timeline().to(bighandlerRef.current,{height:80, width:1048, duration: 0.2, ease: "easeInOutBounce"})
      .to(bighandlerRef.current,{height:202.67,width:1500, duration: 0.5, ease: "easeInOutBounce"})
    }
    
  },[gsapTF])


  useEffect(()=>{
    const list_ = []
    list.map((item,index)=>{
      list_.push(<Result_Bottom_Item gsapTF={gsapTF} contentRef={contentRef} key={`${index}item`} index={index} item={item} moveItem={moveItem}/>)
  })
    setTLview(list_)
    
  },[list,gsapTF])

  useEffect(()=>{
    console.log(data.data)
  },[TLview])

  return <div className='container-result-bottom-in' ref={bighandlerRef} >
    <div className='export-button'  onClick={e=>{e.preventDefault(); 
  setGsapTF(!gsapTF)
  }}><div ref={smallhandlerRef}></div></div>
    <div className='frame-Tlview'>
      {TLview}
    </div>
  </div>
}

function Result_Bottom_Item({item,index,moveItem,gsapTF}){

  const [,dragRef] = useDrag({
    type:'ITEM',
    item:{'index':index,"item":item},
  })

  const [,dropRef] = useDrop({
    accept:'ITEM',
    drop: (draggedItem)=>{
      if(draggedItem.index !== index){
        console.log(draggedItem.index)
        moveItem(draggedItem.index,index)
        draggedItem.index = index
      }
    }
  })

  const contentRef = useRef(null)

  useEffect(()=>{
    console.log(gsapTF)
    if(gsapTF===true){
      gsap.to(contentRef.current,{width : 50, marginBottom:50, height : 30 ,justifyContent:'start',duration: 0.5, ease: "easeInOutBounce"})
    }else{
      gsap.timeline().to(contentRef.current,{width : 50, marginBottom:50, height : 30 ,justifyContent:'start',duration: 0.4, ease: "easeInOutBounce"})
      .to(contentRef.current,{width : 300,marginBottom:30, height : 150,justifyContent: 'space-around',gap: 30 ,duration: 0.5, ease: "easeInOutBounce"})
    }
  },[gsapTF])

  return <div className='TLITEMS' ref={node => {
    dragRef(dropRef(node));
    contentRef.current=node
    
  }}>
  
    {item.title}
    <Small_TL_View item={item} gsapTF={gsapTF}/>
  </div>
}

function Result(probs){

  const [gsapTF,setGsapTF] = useState(true)

    return (
        <div className='container-result'>
            <div className='container-result-top'>
                <Result_Top_Left/>
                <Result_Top_Right gsapTF={gsapTF}/>
            </div>
            <div className='container-result-bottom'>
                 <Result_Bottom gsapTF={gsapTF} setGsapTF={setGsapTF}></Result_Bottom>
            </div>
        </div>
    )
}

export default Result