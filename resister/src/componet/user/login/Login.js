// import { useState } from 'react';
import './Login.css';
import { useForm } from 'react-hook-form';
// import axios from "axios";
// import { useCookies } from 'react-cookie';
import { gsap } from 'gsap';
import { useRef } from 'react';

function Login(){
  
    const moveRef = useRef(null)

    const { handleSubmit, register, formState: { errors } } = useForm();
    const onsubmit = async dt => {
      await new Promise((r) => setTimeout(r, 1000));
      

      console.log(JSON.stringify(dt))
      alert(JSON.stringify(dt))
      window.location.href = '/main'  
      // axios.post('/users/login', JSON.stringify(dt), {
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // })
      // .then((response) => {
      //   console.log(response); // 전송 결과를 처리하는 코드
      //   alert(response)

      //   const token = response.data; // 서버에서 받은 토큰 값
      //   console.log(token)
        
      //   // setCookie('token', token, { path: '/' });
      // })
      // .catch((error) => {
      //   console.error(error); // 오류를 처리하는 코드
      // });
      
  };

  const nextHandler  = () => {
    gsap.to(moveRef.current, {x:'-450px' ,duration:0.5,ease: "power3.easeout"})
  }
  const prevHandler = () => {
    gsap.to(moveRef.current, {x:'0px' ,duration:0.5,ease: "power3.easein"})
  }

  return (
    <div className="container-login">
      <div className='login-view'>
        <div className='login-case' ref={moveRef}>
          <div id='login-title'>
            <h2>로그인</h2> <h2>비밀번호</h2>
          </div>
            <form id="login-frame"method='post' onSubmit={handleSubmit(onsubmit)}>
              <div>
                  
                  <input type="id" name="username" placeholder='아이디'
                  {...register("username",{required:"! 아이디를 입력해주세요"})}
                  />
                    {errors.username && <small className='err_m_login' role="alert">{errors.username.message}</small>}
                    <div className='login-fst-button-frame'>
                        <button className='login-button-child'>비회원</button>
                        <button className='login-button-child' onClick={nextHandler}>다음</button>
                    </div>
                </div>
                <div>
                
                <input type="password"name='password'  placeholder='비밀번호'
                {...register("password",{required:"! 비밀번호를 입력해주세요"})}/>
                {errors.password && <small className='err_m_login' role="alert">{errors.password.message}</small>}
                <div className='login-fst-button-frame'>
                    <button className='login-button-child' onClick={prevHandler}>이전</button>
                    <button className='login-button-child' >로그인</button>
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
