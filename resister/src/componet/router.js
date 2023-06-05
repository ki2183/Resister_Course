import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './home/home';
import Nav from './Nav/nav';
import Login from './user/login/Login'
import Usersave from './user/usersave/Usersave';
import Main from './main/main';

function AppRouter(){
    return <BrowserRouter>
    <Nav/>
         <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/usersave" element={<Usersave/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/main" element={<Main/>}></Route>
            </Routes>
    </BrowserRouter>
}

export default AppRouter;