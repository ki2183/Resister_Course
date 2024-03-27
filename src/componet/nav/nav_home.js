import "./nav.css"
import { useLocation, useNavigate } from 'react-router-dom';

function Nav_home(){

      


    return <div className="container-nav">
        <div id="nav-home" onClick={e=>{e.preventDefault(); alert('로그인을 해야 사용가능');}}>Home</div>
        <div id="nav-login"onClick={e=>{e.preventDefault(); window.location.href="/login"}}>login</div>
    </div>
}

export default Nav_home