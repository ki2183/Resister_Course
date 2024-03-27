import { useEffect } from "react";
import "./nav.css"
import { useLocation, useNavigate } from 'react-router-dom';

function NavLogin(probs){
    return <div>
        HOME
    </div>
}

function Nav(){

    const navigator = useNavigate();
    const ActiveLogin = () =>{
        navigator('/main', {state:{data:true}})
      }

      const location = useLocation()
      const Login_state = location && location.state!=null && location.state.data ? location.state : null;
      const savedToken = JSON.parse(localStorage.getItem('token'));

      const handler_logout = (e)=>{
        e.preventDefault();
        localStorage.removeItem('token');
        window.location.href="/"
      } 

      const handler_login = (e)=>{
        e.preventDefault();
        window.location.href = '/login'
      }
      
      useEffect(()=>{

        console.log(savedToken&&savedToken.data?savedToken.data:null)
        console.log(savedToken&&savedToken.data)

      },[])

    return <div className="container-nav">
        <div id="nav-home" onClick={e=>{e.preventDefault(); ActiveLogin();}}>Home</div>
        {
            (savedToken&&savedToken.data)?(<div id="nav-login" onClick={handler_logout}>{savedToken.data.name}님</div>):(<div id="nav-login" onClick={handler_login}>login</div>)
        }
        
    </div>
}

export default Nav