import './Login.css';
import { useForm } from 'react-hook-form';
import axios from "axios";
import { gsap } from 'gsap';
import { useEffect, useRef,useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserInfo from "./userinfo.json"

function Login(){

    const [formData, setFormData] = useState({}); // 데이터 저장 state
    const moveRef = useRef(null) //frame내부 div이동을 위한 ref

    const idRef = useRef(null)
    const pwdRef = useRef(null)

    const idErrRef = useRef(null) // err애니메이션 ref
    const pwdErrRef = useRef(null) // err애니메이션 ref

    const errMessage = ['비밀번호를 입력하세요.','아이디와 비밀번호가 일치하지 않습니다.','아이디를 입력하세요.']
    const [errMsg,setErrMsg] = useState(errMessage[0])


    const { handleSubmit, register, formState: { errors } } = useForm();

    const navigator = useNavigate();
    
    const savedToken = JSON.parse(localStorage.getItem('token'));

    const NoneActiveLogin = () =>{
      if(savedToken&&savedToken.data){
        alert('강제 로그아웃합니다.')
        localStorage.removeItem('token')
      }
      
      navigator('/main', {state:{data:false}})
      
    }
    const ActiveLogin = () =>{
      navigator('/main', {state:{data:true}})
    }


    const Ani_width = 365;

    const IDRef = useRef(null)
    const PWDRef = useRef(null)

    // -------------------------애니메이션 --------------------------

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

    const ShakeHandler = async() => {
      ErrRef_animation(pwdErrRef);
      await gsapToPromise(moveRef.current, { x: '-455px' , repeat:5, yoyo:true }, { duration: 0.05, ease: 'power2.inOut', 
      onComplete:function(){
        gsap.to(moveRef.current, { x: '-450px', repeat:5, yoyo:true }, { duration: 0.2, ease: 'power3.easeout' });
      }
    });
      pwdRef.current.focus();
  
    } //패스워드를 입력하지 않았을때 애니메이션

    const nextHandler = async () => {
      await gsapToPromise(moveRef.current, { x: '-450px' }, { duration: 0.2, ease: 'power3.easeout' });
      pwdRef.current.focus();
    }; //엔터를 눌렀을때 패스워드로 가는 애니메이션+ 포커싱
  
    const prevHandler = async() => {
  
      await gsapToPromise(moveRef.current, { x: '0px' }, { duration: 0.2, ease: 'power3.easein' });
      idRef.current.focus();
    } //아이디로 가는 동시에 포커싱을 바꾸는 애니메이션

    const ErrRef_animation = (ref)=>{ 
      gsap.timeline().to(ref.current,{opacity:1 , duration:0.3})  
      .to(ref.current,{opacity:0, duration:0.5},3)  
    } //오류 텍스트 뷰 애니메이션

    // ----------------------------------------------------------------------------


  
    const onsubmit = async dt => {
      await new Promise((r) => setTimeout(r, 1000));
      

      console.log(JSON.stringify(dt))

      axios.post('/login', JSON.stringify(dt), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        console.log(res); // 전송 결과
        // alert('전송완료 콘솔보셈')
        console.log(res.data.isLogin)
        // const loginState = JSON.stringify(res.data.isLogin)
        // console.log(loginState)
        if(res.data.isLogin == "로그인 성공!"){
          console.log(res.data.userdata)
          const userdto = res.data.userdata 
          localStorage.setItem('token', JSON.stringify(userdto))
          const token = JSON.parse(localStorage.getItem('token'))
          
          console.log(token)

          ActiveLogin();
        }else{
          console.log(res.data.isLogin)
          setErrMsg(errMessage[1])
          ShakeHandler()
        }
      })
      .catch((error) => {
        console.error(error); // 서버 통신 오류
        // alert('전송실패 ㅋㅋㅋ')
        setErrMsg(errMessage[1])
        ShakeHandler()
      });
   
      
  };

  const gsapToPromise = (element, properties, options) => {
    return new Promise((resolve) => {
      gsap.to(element, {
        ...properties,
        ...options,
        onComplete: resolve,
      });
    });
  };  // 동기적으로 실행되야 하기때문에 따로만듦

  const handleKeyDown = (event,state) => {
    if (event.key === "Tab") {
      event.preventDefault(); // 기본 동작을 막음
      handleEnterKeyPressed(event,state)
    }
    if (event.key === 'Enter') {
      console.log(state)
      event.preventDefault()
      handleEnterKeyPressed(event,state)
    }
  };

  const handleEnterKeyPressed = (event,state) => {
    console.log('Enter 키가 눌렸습니다!');
    if(state === 'id'){
      nextHandler()
    }
    if(state === 'pwd'){
      if(formData.userId == "" || !formData.userId){
        ErrRef_animation(idErrRef);
        prevHandler()

      }
      else if(formData && formData.userId && formData.userPassword){
        if(formData.userId !== "" || formData.userPassword !== "")
          onsubmit(formData)
      }
      else if(formData && formData.userId){
        if(formData.userId !== "" || formData.userPasswor == "")
          // alert("비밀번호를 입력하세요")
          setErrMsg(errMessage[0])
          ShakeHandler()
      }
      
    }
    

  };

  const handleInputChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }; //폼 데이터 formData state에 저장

  const handleGuestButtonClick = () => {
    alert("비회원으로 사용합니다.");
    // window.location.href = '/main';
    
    localStorage.removeItem('token')
    NoneActiveLogin()
  };




  return (
    <div className="container-login">
      <div className='login-view'>
        <div className='login-case' ref={moveRef}>
          <div id='login-title'>
            <h2>로그인</h2> <h2>비밀번호</h2>
          </div>
            <form id="login-frame"method='post'>
              <div>
                  <div className='login-ani' ref={IDRef}></div>
                  <input tabIndex="-1" type="id" name="userId" placeholder='아이디'
                  {...register("userId",{required:"! 아이디를 입력해주세요"})}
                  onChange={handleInputChange} // 입력 값 변경 시 상태 업데이트
                  onKeyDown={e=>{handleKeyDown(e,'id')}}
                  value={formData.userId || ''} // 저장된 값으로 초기화
                  ref={idRef}
                  onFocus={e=>{e.preventDefault(); animationIn(IDRef)}}
                  onBlur={e=>{e.preventDefault(); animationOut(IDRef)}}
                  />
                    {errors.userId && !formData.userId && (
                    <small className='err_m_login' role="alert">{errors.userId.message}</small>
                    )}
                      {errors.userId && !formData.userId && (
                      prevHandler()
                    )}
    
                    <div className='login-fst-button-frame'>
                        <span className='message-err-id' ref={idErrRef} >{errMessage[2]}</span>
                        <div className='login-button-child' onClick={e=>{handleGuestButtonClick()}}>비회원</div>
                        <div className='login-button-child' onClick={e=>{e.preventDefault(); nextHandler();
                          
                           }}>다음</div>
                    </div>
                </div>
                <div>
                <div className='login-ani'ref={PWDRef}></div>                           
                <input tabIndex="-1" type="password"name='userPassword'  placeholder='비밀번호'
                {...register("userPassword",{required:"! 비밀번호를 입력해주세요"})}
                onChange={handleInputChange} // 입력 값 변경 시 상태 업데이트
                value={formData.userPassword || ''}
                onKeyDown={e=>{handleKeyDown(e,'pwd')}}
                ref={pwdRef}
                onFocus={e=>{e.preventDefault(); animationIn(PWDRef)}}
                onBlur={e=>{e.preventDefault(); animationOut(PWDRef)}}
                />
        
                {errors.userPassword && !formData.userPassword && (
                  <small className='err_m_login' role="alert">{errors.userPassword.message}</small>
                )}
                <div className='login-fst-button-frame'>
                    <span className='message-err-password' ref={pwdErrRef} >{errMsg}</span>
                    <button className='login-button-child' onClick={e=>{e.preventDefault(); prevHandler()}}>이전</button>
                    <button className='login-button-child' onClick={e=>{e.preventDefault(); 
                      if( formData&&formData.userId && formData.userPassword){ //아이디와 비번이 존재할 경우
                        if(formData.userId !== "" || formData.userPassword !== "")
                          onsubmit(formData)
                      }else{
                        if(formData&&formData.userId){
                          if(formData.userId !== "" || formData.userPassword == "")
                            setErrMsg(errMessage[0])
                            ShakeHandler()
                          }else if(formData.userId === "" ){
                            ErrRef_animation(idErrRef)
                            prevHandler()
                          }
                        }
                      }}>로그인</button>
                </div>
            </div>
            
            </form>
          

          <p>아이디가 없으십니까?  <a href='/userSave'>회원가입하기</a></p>
        </div>
      </div>
      <button className='testView'  onClick={e=>{
        e.preventDefault(); 
        localStorage.setItem('token', JSON.stringify(UserInfo));
        ActiveLogin();
        }}>임시 로그인 버튼</button>
    </div>
  );  
}

export default Login;