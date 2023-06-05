// import { useState } from 'react';
import './Login.css';
import { useForm } from 'react-hook-form';
// import axios from "axios";
// import { useCookies } from 'react-cookie';

function Login(){
    // const [cookies, setCookie] = useCookies(['token']);
    const { handleSubmit, register, formState: { errors } } = useForm();
    const onsubmit = async dt => {
      await new Promise((r) => setTimeout(r, 1000));
      

      console.log(JSON.stringify(dt))
      alert(JSON.stringify(dt))
      window.location.href = '/'  
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



  return (
    <div className="container-login">
      <div className='login-case'>
      <div id='login-title'>
        <h1>로그인</h1>
        <p>아이디가 없으십니까? <a href='/userSave'>회원가입하기</a></p>
      </div>
        <form id="login-frame"method='post' onSubmit={handleSubmit(onsubmit)}>
        <div>
            <label htmlFor="id">아이디</label>
            <input type="id" name="username"
            {...register("username",{required:"! 아이디를 입력해주세요"})}
            />
            {errors.username && <small className='err_m' role="alert">{errors.username.message}</small>}
         </div>
         <div>
            <label htmlFor="password">비밀번호</label>
            <input type="password"name='password' 
            {...register("password",{required:"! 비밀번호를 입력해주세요"})}/>
             {errors.password && <small className='err_m' role="alert">{errors.password.message}</small>}
         </div>
         <button className='login-button' id="login-button-first" >로그인</button>
        </form>
        <div id='line_'></div>
        <div id='login-option'>
        <button className='login-button'>비회원으로 실행하기</button> 
      </div>
      </div>
    </div>
  );  
}

export default Login;
