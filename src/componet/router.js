import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './home/home';
import Nav from './nav/nav';
import Login from './user/login/Login'
import Usersave from './user/usersave/Usersave';
import Main from './main/main';
import Question from './question/question';
import MainBanner from './Mainbanner/Mainbanner';

function AppRouter(){
    return <BrowserRouter>
    {/* <Nav/> */}
         <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/usersave" element={<Usersave/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/main" element={<Main/>}></Route>
                <Route path="/question" element={<Question/>}></Route>
                <Route path="/mainbanner" element={<MainBanner/>}></Route>
            </Routes>
    </BrowserRouter>
}

export default AppRouter;