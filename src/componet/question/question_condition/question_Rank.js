import { useRef, useState } from 'react'
import './question_Rank.css'
import { useEffect } from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import gsap from 'gsap';

export default function Question_rank({SecConditionRef,Handle_Rank}){

   
    // const [ranks,setranks] = useState(["아침 수업 제외","점심 시간 확보","우주 공강 제거","월공강","금공강","월수공강","화목공강","목금공강"])
    const [ranks,setranks] = useState(["아침 수업 제외","월공강","금공강","월수공강","화목공강","목금공강"])
    
    const dayranks = ['월공강','금공강','월수공강','화목공강','목금공강']
    const [ranksView,setRanksView] = useState([])


    const [RankView,setRankView] = useState([])
    const [list,setList] = useState([]) /// 밖에서 정의해야함

    // ------------------------------------Animation---------------------------------------------

    

    const test = [
                    <MakeRankItem_morning/>,
                    <MakeRankItem_OneDay  css1={`Monday`} />,
                    <MakeRankItem_OneDay  css1={`Friday`} />,
                    <MakeRankItem_TwoDay_test css1={`Monday`} css2={`Wednesday`} hovercss1={'TwoDays1'} hovercss2='TwoDays2' cssBackGround={'TwoDaysback'}/>,
                    <MakeRankItem_TwoDay_test css1={`Tuesday`} css2={`Thursday`} hovercss1={'TwoDays1'} hovercss2='TwoDays2' cssBackGround={'TwoDaysback'}/>,
                    <MakeRankItem_TwoDay_test css1={`Thursday`} css2={`Friday`} hovercss1={'TwoDays1'} hovercss2='TwoDays2' cssBackGround={'TwoDaysback'}/>,
    ]

    


    // ----------------------------------------------------------------------------------------------

    const moveItem = (fromIndex,toIndex) => {
        // console.log(fromIndex,toIndex)
        const list_ = [...list]
        const [movedItem] = list_.splice(fromIndex,1)
        list_.splice(toIndex,0,movedItem)
        setList(list_)
    }

    const Del_list=(index_)=>{
        const list_ = [...list];
        list_.splice(index_, 1);
        setList(list_);
    }

    useEffect(()=>{

        const RanksView_=[]
        const addList = (item_)=>{
            const list_ = [...list]
            list_.push(item_)
            setList(list_) 
        }

        ranks.map((item,index)=>{
            console.log(index)
            RanksView_.push(
                <div key={`rankView${index}`}className='rank-this' onClick={e=>{
                    e.preventDefault()

                    if(list.length<5 && list.includes(item)===false)
                        if(item === '금공강' || item === '월수공강' || item === '화목공강' || item === '목금공강'|| item === '월공강'){
             
                            const limit = []
             
                            list.map(listItem=>{ // 리스트 확인ㅁ
                                limit.push(dayranks.includes(listItem))
                            })

                            limit.includes(true) ? alert("요일항목은 하나만 선택가능합니다.") : addList(item);
                            
                        }else{
                            addList(item)
                        }
                        

                 
                }}>
                    <div>
                        <span>{item}</span>
                    </div>

                    <div style={{overflow: 'hidden'}}>
                        {test[index]}
                    </div>
                </div>
            )
        })
        setRanksView(RanksView_)
    },[list])


    useEffect(()=>{

        console.log(list)
        Handle_Rank(list)
        const RankView_=[]
        const makeListView = () =>{
            list.map((item,index)=>{
                console.log(index)
                RankView_.push(
                    <Choice_option_Div key={`${index}Rank`} Del_list={Del_list} moveItem={moveItem} item={item} index={index}/>
                )
            })
        }
        
        list.length !== 0 ? makeListView() : RankView_.push(<div key={'THISONLYONE'} className='replace-null-option'></div>);

        setRankView(RankView_)
    },[list])


    

    return(
        <div className='frame-rank' ref={SecConditionRef}>
            <div>
                <div><span>우선순위</span></div>
                <div className='collection-rank'>
                    {ranksView}
                    



                </div>
            </div>

            <div>
                <div></div>
            </div>

            <div>
                <div>
                    <span>항목들의 우선순위를 매겨주세요</span>
                    <span>원하는 항목을 클릭 뒤 끌어서 순위를 바꿔주세요.</span>
                    <span>필수 아님, 요일항목은 중복되지 않습니다.</span>
                </div>

                <div className='frame-rank-this'>
                    {RankView}
                </div>
            </div>
        </div>
    )

}


function Choice_option_Div({item,index,moveItem,Del_list}){

useEffect(()=>{
    console.log(item)
    console.log(index)
},[])

    const [,dragRef] = useDrag({
        type:'ITEM',
        item:{'index':index,"item":item},
      })
    
      const [,dropRef] = useDrop({
        accept:'ITEM',
        drop: (draggedItem)=>{
            console.log(draggedItem)
          if(draggedItem.index !== index){
            console.log(draggedItem.index)
            moveItem(draggedItem.index,index)
            draggedItem.index = index
          }
        }
      })

    return (
        <div className='question-choice-option' ref={node => {dragRef(dropRef(node));}}>
            <div>{index+1}위</div>
            <div><span>{item}</span></div>
            <div onClick={e=>{
                e.preventDefault()
                // alert(index)
                Del_list(index)
              
            }}>✕</div>
        </div>
    )
}

function MakeRankItem_morning(){

    const MorningRef = useRef(null);
    const BackGroundRef = useRef(null);
    const BackGround2Ref = useRef(null);
    const GroundRef = useRef(null)
    const [isAnimating, setIsAnimating] = useState(false);
  
    useEffect(()=>{
        gsap.to(MorningRef.current, { scale:0.8,  duration: 0 })
    },[])

    const handleMouseEnter = async () => {
      if (!isAnimating) {
        setIsAnimating(true);
    
        gsap.timeline()
          .to(BackGroundRef.current, { backgroundColor:'rgb(189, 218, 224)' ,  duration: 0})
          .to(BackGroundRef.current, { backgroundColor:'rgb(237, 242, 243)' , duration: 1})
          .to(BackGroundRef.current, { backgroundColor:'rgb(189, 218, 224)' ,  duration: 1})

          gsap.timeline()
          .to(BackGround2Ref.current, {  y:0, scale:1,opacity:1,  duration: 0})
          .to(BackGround2Ref.current, {  y:2, scale:1.05, opacity:0,  duration: 1})
          .to(BackGround2Ref.current, {  y:0,scale:1, opacity:1,   duration: 1})

          gsap.timeline()
          .to(GroundRef.current, { y:0, scale:1,  duration: 0})
          .to(GroundRef.current, {  y:2, scale:1.05,  duration: 1})
          .to(GroundRef.current, { y:0,scale:1,  duration: 1})


        gsap.timeline()
          .to(MorningRef.current, { rotate:0, scale:0.8,  y:0,  duration: 0 })
          .to(MorningRef.current, { rotate:-90,scale:0.6, y:-10,  duration: 1})
          .to(MorningRef.current, { rotate:-180,scale:0.8,   y:0,scale:1,  duration: 1})
          .eventCallback("onComplete", () => {
            setIsAnimating(false);
          });
      }
    };

    return <div className="rankIcon alarmcssback" ref={BackGroundRef} onMouseEnter={handleMouseEnter}>
    <div>
      <div className={` sun time-sec-icon-one`} ref={MorningRef}></div>
      <div className={` ground2 time-fst-icon-one`}ref={GroundRef} ></div>
      <div className={` ground time-fst-icon-one`}ref={BackGround2Ref}></div>
      
    </div>

    
  </div>
}

function MakeRankItem_afternoon(){

    const MorningRef = useRef(null);
    
    const BackGroundRef = useRef(null);
    const BackGround2Ref = useRef(null);
    const GroundRef = useRef(null)
    
    const [isAnimating, setIsAnimating] = useState(false);
  
    useEffect(()=>{
        gsap.to(MorningRef.current, { scale:0.8,  duration: 0 })
    },[])
    const handleMouseEnter = async () => {
      if (!isAnimating) {
        setIsAnimating(true);
    
        gsap.timeline()
          .to(BackGroundRef.current, { backgroundColor:'rgb(237, 242, 243)' ,  duration: 0})
          .to(BackGroundRef.current, { backgroundColor:'#f6ecd0' , duration: 1})
          .to(BackGroundRef.current, { backgroundColor:'rgb(237, 242, 243)' ,  duration: 1})

          gsap.timeline()
          .to(BackGround2Ref.current, {  y:0, scale:1,opacity:1,  duration: 0})
          .to(BackGround2Ref.current, {  y:8, scale:1.3, opacity:0,  duration: 0.7})
          .to(BackGround2Ref.current, {  y:8, scale:1.3, opacity:0,  duration: 0.3})
          .to(BackGround2Ref.current, {  y:0,scale:1, opacity:1,   duration: 1})

          gsap.timeline()
          .to(GroundRef.current, { y:0, scale:1,  duration: 0})
          .to(GroundRef.current, {  y:8, scale:1.3,  duration: 0.7})
          .to(GroundRef.current, {  y:8, scale:1.3,  duration: 0.3})
          .to(GroundRef.current, { y:0,scale:1,  duration: 1})


        gsap.timeline()
          .to(MorningRef.current, { rotate:0, y:0,scale:0.8,  duration: 0 })
          .to(MorningRef.current, { rotate:-90, scale:0.5, y:-5,  duration: 1})
          .to(MorningRef.current, { rotate:-180,scale:0.8, y:0,  duration: 1})
          .eventCallback("onComplete", () => {
            setIsAnimating(false);
          });
      }
    };

    return <div className="rankIcon alarmcssback" ref={BackGroundRef} onMouseEnter={handleMouseEnter}>
    <div>
      <div className={` sun time-sec-icon-lunch`} ref={MorningRef}></div>
      
      <div className={` ground3 time-fst-icon-one`} ref={GroundRef}></div>
      <div className={` ground2 time-fst-icon-one`} ref={BackGround2Ref} ></div>
    </div>
    

    
  </div>
}

function MakeRankItem_Number({css1}){
    return <div className='rankIcon onecssback'>
        <div>
            <div className={` ${css1} number-fst-icon-one`}></div>
        </div>
        <div className='empty-fill'></div>
        <div className='empty-fill2'></div>
    </div>
}

function MakeRankItem_OneDay({FstRef,css1,alarmRef}){

    return <div className='rankIcon onecssback'>
        <div>
            <div className={` ${css1} day-fst-icon-one`}></div>
        </div>
        <div className='empty-fill'></div>
        <div className='empty-fill2'></div>
    </div>
}

function MakeRankItem_TwoDay_test({css1,css2,hovercss1,hovercss2,cssBackGround}){

    return <div className={`rankIcon ${cssBackGround}`}>
        <div className={`day-fst-icon ${hovercss1}`}>
            <div className={`${css1} ani-day-icon ani-day1 `}></div>
        </div>
        <div className={`day-sec-icon ${hovercss2}`}>
            <div className={`${css2} ani-day-icon ani-day2`}></div>
        </div>
        <div className='empty-fill'></div>
        <div className='empty-fill2'></div>
    </div>
}

function MakeRankItem_Space({css1,css2,css3,css4}){


    return <div className='rankIcon spaceFrame'>
        <div className={`space-icon ${css1}`}></div>
        <div className={`space-icon ${css2}`}></div>
        <div className={`space-icon ${css3}`}></div>
        <div className={`space-icon ${css4}`}></div>
        <div className='empty-fill-space'></div>
    </div>
}