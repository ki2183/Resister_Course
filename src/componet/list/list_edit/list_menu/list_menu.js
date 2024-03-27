import { useLayoutEffect, useRef } from 'react'
import './list_menu.css'
import { gsap } from 'gsap'
import { useState } from 'react'
import { useEffect } from 'react'
import dto from '../classes/classes.json'
import './list_menu_modal.css'
import './scrollbar.css'
import { forwardRef } from 'react'
import subject_major from '../classes/classes_major.json'
import subject_cultural from '../classes/classes_cultural.json'
import axios from 'axios'



export default function List_Menu(probs){

    // const option_width_default = 350
    const option_width_default = 350
    const option_gap = 10
    const top_bar_height = 190 // 상단바 크기 이거 바꾸면 됨
    const top_bar_height_decrease = 140

    const fst_menu_num = 3 //all 시간 학점 이렇게 세가지 메뉴의 개수
    const fst_menu_bar_width = (option_width_default/3-7) //all 시간 학점 이렇게 세가지 메뉴의 개수의 width
 
    const RightRef = useRef(null)
    const ButtonRef = useRef(null)
    const largeRef = useRef(null)
    const searchRef = useRef(null)
    const searchModeRef = useRef(null)
    const [option_width,setOption_width] = useState(option_width_default)
    const option_direction_Ref = useRef(null)

    const fst_scrollRef = useRef(null) //중간 스크롤 Ref
    const scrollRef =useRef(null) //아래 스크롤 Ref
     
    const [menuItem, setMenuItem] = useState([])
    const [searchMode,setSearchMode] = useState(false)

    const small_menu = [['',"","","","","",""],['all',9,11,13,14,16,17],['all','월','화','수','목','금']]
    const [small_menu_option,setSmall_menu_option] = useState([''])
    const [small_menu_optionView,setSmall_menu_option_View] = useState([])

    // useEffect(()=>{
    //     console.log(menuItem)
    // },[menuItem])

    const [arrow,setArrow] = useState('◀')
    const [stageHeight,setStageHeight] = useState(window.innerHeight)

    const animation = useRef()
    
    const Toggle = () => {
        animation.current.restart();
    };

    const dateBefore = (date) =>{
        const time = date.slice(0,16)
        return time
    } // 첫교시 텍스트
    const dateAfter = (date) =>{
        const time = date.slice(18)
        return time
    }
    const modeHandler = () =>{
        setSearchMode(!searchMode)
    }// 두 교시 텍스트

    const small_menu_option_handler = (index) =>{
        setSmall_menu_option(small_menu[index])
        scrollbar_ZERO()

    }   // small_menu에 저장되어있는 옵션들 변경

    const scrollbar_ZERO =()=>{
        // console.log(scrollRef.current.scrollTop)
        if(scrollRef.current.scrollTop>0){
            gsap.to(scrollRef.current, {
                scrollTop: 0,
                duration: 0.5,
                ease: "easeInOutBounce" 
            });
        }
    }
// ---------------------------------첫번째 옵션 애니메이션-------------------------------------------------
    // fst_scrollRef
    const Move_Fst_scroll = (n) =>{ //첫번째 스크롤 애니메이션 버튼
        const x = n*(380/3)
        gsap.to(fst_scrollRef.current, {
            x:x,
            duration: 0.5,
            ease: "easeInOutBounce" 
        });
    }

    const Move_Fst_scroll_Zero = () =>{ //첫번째 스크롤 애니메이션 버튼
        gsap.to(fst_scrollRef.current, {
            scrollTop: 0,
            duration: 0.5,
            ease: "easeInOutBounce" 
        });
        gsap.to(scrollRef.current, {
            height :`${stageHeight-(top_bar_height)}px`,
            marginTop:`${top_bar_height-70-60}px`,
            duration: 0.5,
            ease: "easeInOutBounce" 
        });
    }

// ---------------------------------------all누르면 top 메뉴 줄어듦-------------------------------------------


    const Decrease_Option = ()=>{
        gsap.to(searchRef.current, {
            height:top_bar_height_decrease,
            duration: 0.5,
            ease: "easeInOutBounce" 
        });
        gsap.to(scrollRef.current, {
            height :`${stageHeight-(top_bar_height)-10}px`,
            marginTop:`${top_bar_height-70-50}px`,
            duration: 0.5,
            ease: "easeInOutBounce" 
        });

    }
    const Increase_Option = ()=>{
        gsap.to(searchRef.current, {
            height:top_bar_height,
            duration: 0.5,
            ease: "easeInOutBounce" 
        });
        gsap.to(scrollRef.current, {
            height :`${stageHeight-(top_bar_height+60)}px`,
            marginTop:`${top_bar_height-70}px`,
            duration: 0.5,
            ease: "easeInOutBounce" 
        });
    }

// ------------------------------------------------------------------------------------------------------------
    
    const option_direction_Handler = (n) =>{
        gsap.to(option_direction_Ref.current, { x: n, y: 0, rotate: 0, duration: 0.4 ,ease: "easeInOutBounce" })
        scrollbar_ZERO()
        Toggle()
    }

    useEffect(()=>{
        // console.log(probs.menuTF)

        if(probs.menuTF===true){
            gsap.to(RightRef.current, { x: -380, y: 0, rotate: 0, duration: 0.5 ,ease: "easeInOutBounce" })
            gsap.to(ButtonRef.current, { x: -380, y: 0, rotate: 0, duration: 0.5 ,ease: "easeInOutBounce" })
            gsap.to(searchRef.current, { x: -380, y: 0, rotate: 0, duration: 0.5 ,ease: "easeInOutBounce" })
            gsap.timeline().to(largeRef.current, {  width:450, duration: 0.5 ,ease: "easeInOutBounce" })
            .to(largeRef.current, {  width:70, duration: 0 ,ease: "easeInOutBounce" })
            setArrow('▶')
        }else if(probs.menuTF===false){
            gsap.to(RightRef.current, { x: 0, y: 0, rotate: 0, duration: 0.5 ,ease: "easeInOutBounce"})
            gsap.to(ButtonRef.current, { x: 0, y: 0, rotate: 0, duration: 0.5 ,ease: "easeInOutBounce" })
            gsap.to(searchRef.current, { x: 0, y: 0, rotate: 0, duration: 0.5 ,ease: "easeInOutBounce" })
            gsap.timeline().to(largeRef.current, {  width:450, duration: 0 ,ease: "easeInOutBounce" })
            setArrow('◀')
        }
    },[probs.menuTF]) //gsap 전체

    useEffect(()=>{ //검색gsap
        if(searchMode === false){
            gsap.to(searchModeRef.current, { x: 0, y: 0, rotate: 0, duration: 0.5 ,ease: "easeInOutBounce" })
        }else{
            gsap.to(searchModeRef.current, { x: -42, y: 0, rotate: 0, duration: 0.5 ,ease: "easeInOutBounce" })
        }
    },[searchMode]) //검색 옵션 tf임

    const handleResize = () => {
        setStageHeight(window.innerHeight);
    }; //height변경 될때 인지

    useEffect(()=>{

        window.addEventListener('resize' , handleResize)
        
        return ()=>{
            window.removeEventListener('resize',handleResize)
        }
    },[]) //resize 이벤트 resize될 때마다 height변경




    useLayoutEffect(()=>{

        const stageWidth = window.innerWidth;

        const timeoutId = setTimeout(() => {
            if(stageWidth<1300)
                probs.reverseTF();
        }, 100);

        return () => clearTimeout(timeoutId);
    },[]) // 1300 이하는 menu바가 들어감

    useEffect(()=>{
        const getAllsubeject = ()=>{
            axios.get(`/all/lecture`, {
                headers: {
                  'Content-Type': 'application/json'
                }
              })
              .then((res) => {
                console.log(res.data); // 전송 결과
                setSubject_DTO(res.data)
              })
              .catch((error) => {
                console.error(error); // 서버 통신 오류
              });
        }

        getAllsubeject();
    },[])

    // --------------------------------------메뉴 과목들---------------------------------------------

    const [option_sort_left,setOption_sort_left] = useState('ALL') //좌측 정렬 옵션
    const [option_sort_right_up,setOption_sort_right_up] = useState('ALL')//우측 정렬 옵션 上 all/시간/요일
    const [option_sort_right_down,setOption_sort_right_down] = useState('ALL')//우측 정렬 옵션 下 /none/all,9~17/all,월~금
    const subject_cultural_ = subject_cultural.data
    const subject_major_ = subject_major.data
    const [Search_dto,setSearch_dto] = useState('')
    
    const [subject_DTO , setSubject_DTO] = useState(subject_major_)

    const Search_Text_Handler = (e)=>{
        e.preventDefault();
        setSearch_dto(e.target.value)
    }
    // setSearchMode 검색 상태

    // useEffect(()=>{console.log(Search_dto)},[Search_dto])
    // useEffect(()=>{console.log(searchMode)},[searchMode]) //false 제목 / true 교수

    const Search_API_TEXT = ()=>{
        const mode = !searchMode ? 'title':'instruction';
        const api = `/search/${mode}/${Search_dto}`
        if(Search_dto === '')
            alert('검색 단어를 입력해주세요.')
        else
            SETAPIVIEW(api)
            Reset_right_option()
            small_menu_option_handler(0); 
            option_direction_Handler(0)
            Move_Fst_scroll(0);
            Decrease_Option();
    }
    

    const Reset_right_option=()=>{
        setOption_sort_right_up('ALL')
        setOption_sort_right_down('ALL')
    }

    const handleKeyDown = (event,state) => {
        if (event.key === "Tab") {
          event.preventDefault(); // 기본 동작을 막음
        }
        if (event.key === 'Enter') {
          console.log(state)
          event.preventDefault()
        //   alert('엔터')
          Search_API_TEXT()
        }
      };



    const [APIVIEW,SETAPIVIEW] = useState(null)

    const GET_API_TEXT=(option_sort_left,option_sort_right_up,option_sort_right_down)=>{ //api 이름 바꾸는거 텍스트 return
        
        const LEFT = ['','/major','/cultural'] //left 정렬 axios text나열
        const RIGHT_UP = ['','/time','/day'] // right up 정렬 axios text나열
        const RIGHT_DOWN = ['','/Mon','/Tues','/Wen','/Thur','/Fri'] // right up 정렬 axios text나열
        

        let OPTION_SORT_LEFT = ''
        let OPTION_SORT_RIGHT_UP = ''
        let OPTION_SORT_RIGHT_DOWN = ''

        const text = ''

        if(option_sort_left==='ALL')
            OPTION_SORT_LEFT=LEFT[0]

        else if(option_sort_left==='전공')
            OPTION_SORT_LEFT=LEFT[1]

        else if(option_sort_left==='교양')
            OPTION_SORT_LEFT=LEFT[2]

            
        if(option_sort_right_up ==='ALL')
            OPTION_SORT_RIGHT_UP = RIGHT_UP[0]
        else if(option_sort_right_up ==='시간'){
            OPTION_SORT_RIGHT_UP = RIGHT_UP[1]
            
            if(option_sort_right_down==="ALL"){
                OPTION_SORT_RIGHT_DOWN = ''
            }else{
                OPTION_SORT_RIGHT_DOWN= '/'+option_sort_right_down
            }
        }

        else if(option_sort_right_up ==='요일'){

            OPTION_SORT_RIGHT_UP = RIGHT_UP[2]

            if(option_sort_right_down==="ALL"){
                OPTION_SORT_RIGHT_DOWN = RIGHT_DOWN[0]
            }else if(option_sort_right_down==="월"){
                OPTION_SORT_RIGHT_DOWN = RIGHT_DOWN[1]
            }else if(option_sort_right_down==="화"){
                OPTION_SORT_RIGHT_DOWN = RIGHT_DOWN[2]
            }else if(option_sort_right_down==="수"){
                OPTION_SORT_RIGHT_DOWN = RIGHT_DOWN[3]
            }else if(option_sort_right_down==="목"){
                OPTION_SORT_RIGHT_DOWN = RIGHT_DOWN[4]
            }else if(option_sort_right_down==="금"){
                OPTION_SORT_RIGHT_DOWN = RIGHT_DOWN[5]
            }
        }

        return OPTION_SORT_LEFT+OPTION_SORT_RIGHT_UP+OPTION_SORT_RIGHT_DOWN
    }

    useEffect(()=>{
        const api = GET_API_TEXT(option_sort_left,option_sort_right_up,option_sort_right_down);
        SETAPIVIEW(api)
    },[option_sort_left,option_sort_right_up,option_sort_right_down])

    const Seach_subject=()=>{

            const api = GET_API_TEXT(option_sort_left,option_sort_right_up,option_sort_right_down);
            // SETAPIVIEW(`/Subject`+api)
            
            // axios.get(`/Subject/${api}`, {
            axios.get(`/all/lecture`, {
                headers: {
                  'Content-Type': 'application/json'
                }
              })
              .then((res) => {
                console.log(res.data); // 전송 결과
                setSubject_DTO(res.data)
              })
              .catch((error) => {
                console.error(error); // 서버 통신 오류
              });

    }

    useEffect(()=>{ //bar 크기 변경 및 정렬 옵션 
        const len = small_menu_option.length
        const small_menu_optionView_ = []
        const bar_width = ((option_width_default-(option_gap*(len-1)))/len)

        const makemenu = () =>{ small_menu_option.map((item,index)=>{
            small_menu_optionView_.push(
                <div className='choice-item' key={`choice${index}`} onClick={e=>{
                    e.preventDefault(); 
                    option_direction_Handler((bar_width+option_gap)*index)
                    setOption_sort_right_down(item)
                    
                    Seach_subject() //api 실행
                }}>{item}</div>
            )
            setSmall_menu_option_View(small_menu_optionView_)
        })
        setOption_width(bar_width)
        }

        makemenu()
        
    },[small_menu_option]) 


    useEffect(()=>{

        console.log(option_sort_left)

        if(option_sort_left==='전공'){ //전공
            // getSubjects('major')
            setSubject_DTO(subject_major_) //test
        }else if(option_sort_left==='교양'){ //교양
            // getSubjects('minor')
            setSubject_DTO(subject_cultural_)//test
        }else{ //ALL
            // getSubjects('all')
            setSubject_DTO(subject_major_)//test
        }
        
    },[option_sort_left]) // Effect 좌측정렬옵션

    useEffect(()=>{  // 메뉴에들어가있는 과목들 삽입
        // console.log(subject_DTO)
        const menuItems = []
        const q = []
        
        // const dto_ = dto.data
        subject_DTO.map((item,index) =>{

            q.push(item)

            if(q.length >= 2){
                const dto1 = q[0]
                const dto2 = q[1]

                menuItems.push(
                    <div className='item-list-menu-right' key={index}>
                        <div onClick={e=>{e.preventDefault(); 
                        probs.Change_DTO_Handler(dto1);
    
                        }}>
                            <span>{q[0].subject_title}</span>
                            <div className='list-menu-right-in-frame'>
                                <span>담당교수: {q[0].instruction}</span>
                                <span>학점: {q[0].credit}</span>
                                <span>이수구분: {q[0].major_classification}</span>
                                <span>{dateBefore(q[0].class_time)}</span>
                                { q[0].class_time.length > 17 && (<span>{dateAfter(q[0].class_time)}</span>)}
                            </div>
                        </div>

                        <div onClick={e=>{e.preventDefault(); 
                            probs.Change_DTO_Handler(dto2);
                        }}>
                            <span>{q[1].subject_title}</span>
                            <div className='list-menu-right-in-frame'>
                                <span>담당교수: {q[1].instruction}</span>
                                <span>학점: {q[1].credit}</span>
                                <span>이수구분: {q[1].major_classification}</span>
                                <span>{dateBefore(q[1].class_time)}</span>
                                { q[1].class_time.length > 17 && (<span>{dateAfter(q[1].class_time)}</span>)}
                            </div>
                        </div>
                    </div>
                )
          
                while (q.length > 0) {
                    q.pop();
                }
            }

        })
        if(q && q.length !== 0 ){
            const dto1 = q[0]
            menuItems.push(
                <div className='item-list-menu-right' key={dto1.id}>
                           <div onClick={e=>{e.preventDefault(); 
                        probs.Change_DTO_Handler(dto1);
    
                        }}>
                            <span>{q[0].subject_title}</span>
                            <div className='list-menu-right-in-frame'>
                                <span>담당교수: {q[0].instruction}</span>
                                <span>학점: {q[0].credit}</span>
                                <span>이수구분: {q[0].major_classification}</span>
                                <span>{dateBefore(q[0].class_time)}</span>
                                { q[0].class_time.length > 17 && (<span>{dateAfter(q[0].class_time)}</span>)}
                            </div>
                        </div>

                        
                    </div>
            )
            while (q.length > 0) {
                q.pop();
            }
        }

        const totalItem = <FadeIn stagger={0.05} x={100} ref={animation}>{menuItems}</FadeIn>
        setMenuItem(totalItem)
    },[subject_DTO])

    return (
        <div ref={largeRef} className='container-list-menu'>

            <div></div>
            <div ref={largeRef}>
            <div className='container-menu-arrow' ref={ButtonRef} onClick={e=>{
                e.preventDefault();
                probs.reverseTF();
            }}>
                <span>{arrow}</span>
                
            </div>
                <div className='container-list-menu-left'>
                    
                    <div onClick={ e=>{
                        e.preventDefault(); 
                        setOption_sort_left('ALL') //sort_option_left
                        Reset_right_option()//reset right option
                        small_menu_option_handler(0); 
                        option_direction_Handler(0)
                        Move_Fst_scroll(0);
                        Decrease_Option();

                        Seach_subject() //api 실행

                        }}>ALL
                    </div>

                    <div onClick={ e=>{
                        e.preventDefault(); 
                        setOption_sort_left('전공')//sort_option_left
                        Reset_right_option()//reset right option
                        small_menu_option_handler(1); 
                        option_direction_Handler(0);
                        Move_Fst_scroll(0);
                        Decrease_Option();

                        Seach_subject() //api 실행

                        }}>전공
                        </div>

                    <div onClick={ e=>{
                        e.preventDefault(); 
                        setOption_sort_left('교양')//sort_option_left
                        Reset_right_option()//reset right option
                        small_menu_option_handler(2); 
                        option_direction_Handler(0);
                        Move_Fst_scroll(0);
                        Decrease_Option(); 

                        Seach_subject() //api 실행

                        }}>교양
                    </div>
                    {/* <div onClick={ e=>{e.preventDefault(); small_menu_option_handler(3); option_direction_Handler(0)}}>시간</div>
                    <div onClick={ e=>{e.preventDefault(); small_menu_option_handler(4); option_direction_Handler(0)}}>학년</div> */}

                </div>
                <div id='list-menu-right-search' ref={searchRef} style={{height:`${top_bar_height_decrease}px`}}>
               
                    <div>
                        <button onClick={e=>{e.preventDefault(); Search_API_TEXT()}}>
                        </button>
                        <input type='text' onKeyDown={e=>{handleKeyDown(e,'id')}} onChange={Search_Text_Handler}/>
                        <button>
                        |
                        </button>
                        <div onClick={modeHandler}>
                            <div ref={searchModeRef}>
                                <span>제목</span>
                                <span>교수</span>
                            </div>
                        </div>
                       
                    </div>
                    <div className='list-menu-choice-button-fst'>
                            <div onClick={e=>{
                                e.preventDefault();
                                small_menu_option_handler(0);
                                option_direction_Handler(0); 
                                Move_Fst_scroll(0); //하단바 변경
                                Decrease_Option(); //크기 초기화

                                setOption_sort_right_up('ALL') //change right up sort option
                                setOption_sort_right_down('ALL')//change right down sort option

                                Seach_subject() //api 실행

                                }}>all</div>
                            <div onClick={e=>{
                                e.preventDefault();
                                small_menu_option_handler(1);
                                option_direction_Handler(0); 
                                Move_Fst_scroll(1);
                                Increase_Option();

                                setOption_sort_right_up('시간')//change right up sort option
                                setOption_sort_right_down('ALL')//change right down sort option

                                Seach_subject() //api 실행

                                }}>시간</div>
                            <div onClick={e=>{
                                e.preventDefault();
                                small_menu_option_handler(2);
                                option_direction_Handler(0); 
                                Move_Fst_scroll(2);
                                Increase_Option();

                                setOption_sort_right_up('요일')//change right up sort option
                                setOption_sort_right_down('ALL')//change right down sort option

                                Seach_subject() //api 실행

                                }}>요일</div>
                            <div id='choice-line-fst' style={{width:`${fst_menu_bar_width}px`}} ref={fst_scrollRef}></div>
                       </div>
                        <div className='list-menu-choice-button'>
                            {small_menu_optionView}
                            <div className='choice-line' ref={option_direction_Ref} style={{width:`${option_width}px`}}></div>
                        </div>
                </div>
                <div className='container-list-menu-right' ref={RightRef}  >
                    <div></div>
                    {/* <div ref ={scrollRef} style={{height :`${stageHeight-(top_bar_height+60)}px` ,marginTop:`${top_bar_height-70}px`}}> */}
                    <div ref ={scrollRef} style={{height :`${stageHeight-(top_bar_height)-10}px`, marginTop:`${top_bar_height-70-50}px`,}}>

                            {menuItem}

                    </div>
                </div>
              
            </div>
            <div className='testView' onClick={e=>{e.preventDefault(); console.log(GET_API_TEXT());}}><span>정렬옵션 : {option_sort_left} {option_sort_right_up} {option_sort_right_down}<span/></span><span>/Subject{APIVIEW}</span></div>
        </div>
    )
    
}

const FadeIn = forwardRef(({ children, stagger = 0, x = 0 }, ref) => {
    const el = useRef()
    const animation = useRef()

    useLayoutEffect(()=>{
        const ctx = gsap.context(()=>{
            animation.current = gsap.from(el.current.children,{
                opacity:0,
                stagger,
                x,
                // duration:1,
                ease:"easeInOutBounce"
            })
        })
        return () => ctx.revert()
    },[])

    useEffect(() => {
        ref.current = animation.current;
      }, [ref]);

    return <span ref={el}>{children}</span>
})

