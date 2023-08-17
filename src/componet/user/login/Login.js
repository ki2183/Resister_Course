import './Login.css';
import { useForm } from 'react-hook-form';
// import axios from "axios";
import { gsap } from 'gsap';
import { useEffect, useRef,useState } from 'react';

function Login(){
    const [formData, setFormData] = useState({}); // 데이터 저장
    const moveRef = useRef(null)
    const idRef = useRef(null)
    const pwdRef = useRef(null)
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [focus, setFocus] = useState(false)
  
    const onsubmit = async dt => {
      await new Promise((r) => setTimeout(r, 1000));
      

      console.log(JSON.stringify(dt))
      alert(JSON.stringify(dt))
      window.location.href = '/main'  
   
      
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
  
  const nextHandler = async () => {
    await gsapToPromise(moveRef.current, { x: '-450px' }, { duration: 0.2, ease: 'power3.easeout' });
    pwdRef.current.focus();
  };

  const prevHandler = async() => {

    await gsapToPromise(moveRef.current, { x: '0px' }, { duration: 0.2, ease: 'power3.easein' });
    idRef.current.focus();
  }

  const handleKeyDown = (event,state) => {
    
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
      if(formData.username == "" || !formData.username){
        prevHandler()
      }
      if(formData&&formData.username && formData.password){
        if(formData.username !== "" || formData.password !== "")
          onsubmit(formData)
      }
    }
    

  };

 
  const handleInputChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleGuestButtonClick = () => {
    alert("비회원으로 사용합니다.");
    window.location.href = '/main';
  };

  useEffect(()=>{
    const Reconize_focus = () =>{
      if(focus ==='id'){
        
      }
      else if(focus ==='pwd'){

      }
    }
    Reconize_focus()
    console.log(focus,'useEffect')
    
  },[focus])


  return (
    <div className="container-login">
      <div className='login-view'>
        <div className='login-case' ref={moveRef}>
          <div id='login-title'>
            <h2>로그인</h2> <h2>비밀번호</h2>
          </div>
            <form id="login-frame"method='post'>
              <div>
                  
                  <input type="id" name="username" placeholder='아이디'
                  {...register("username",{required:"! 아이디를 입력해주세요"})}
                  onChange={handleInputChange} // 입력 값 변경 시 상태 업데이트
                  onKeyDown={e=>{handleKeyDown(e,'id')}}
                  value={formData.username || ''} // 저장된 값으로 초기화
                  ref={idRef}
                  />
                    {/* { errors.username && <small className='err_m_login' role="alert">{errors.username.message}</small>} */}
                    {errors.username && !formData.username && (
                    <small className='err_m_login' role="alert">{errors.username.message}</small>
                    )}
                      {errors.username && !formData.username && (
                      prevHandler()
                    )}
    
                    <div className='login-fst-button-frame'>
                        {/* <button className='login-button-child' onClick={e=>{handleGuestButtonClick()}}>비회원</button> */}
                        <div className='login-button-child' onClick={e=>{handleGuestButtonClick()}}>비회원</div>
                        <div className='login-button-child' onClick={e=>{e.preventDefault(); nextHandler();
                          
                           }}>다음</div>
                    </div>
                </div>
                <div>

                <input type="password"name='password'  placeholder='비밀번호'
                {...register("password",{required:"! 비밀번호를 입력해주세요"})}
                onChange={handleInputChange} // 입력 값 변경 시 상태 업데이트
                value={formData.password || ''}
                onKeyDown={e=>{handleKeyDown(e,'pwd')}}
                ref={pwdRef}
                />
                {/* {errors.password && <small className='err_m_login' role="alert">{errors.password.message}</small>} */}
                {errors.password && !formData.password && (
                  <small className='err_m_login' role="alert">{errors.password.message}</small>
                )}
                <div className='login-fst-button-frame'>
                    <button className='login-button-child' onClick={e=>{e.preventDefault(); prevHandler()}}>이전</button>
                    <button className='login-button-child' onClick={e=>{e.preventDefault(); 
                      if( formData&&formData.username && formData.password){
                        if(formData.username !== "" || formData.password !== "")
                          onsubmit(formData)
                      }else{
                        // alert(formData)
                        // console.log(formData)
                      }
                      }}>로그인</button>
                </div>
            </div>
            
            </form>
          

          <p>아이디가 없으십니까?  <a href='/userSave'>회원가입하기</a></p>
        </div>
      </div>
    </div>
  );  
}

export default Login;
