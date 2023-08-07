import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './home/home';
import Nav from './nav/nav';
import Login from './user/login/Login'
import Usersave from './user/usersave/Usersave';
import Main from './main/main';
// import Question from './question/question';
import MainBanner from './Mainbanner/Mainbanner';
import Menu from './menu/menu';
import LastQuestion from './lastquestion/lastquestion';
import QuestionAll from './question/questionAll';
import Test from './test/test';
import MakeQuesitonInput from './question/question_input';

function AppRouter(){
    return <BrowserRouter>
    <Nav/>
         <Routes>
                <Route path="/" element={<MainBanner/>}></Route>
                <Route path="/usersave" element={<Usersave/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/main" element={<Main/>}></Route>
                <Route path="/menu" element={<Menu/>}></Route>
                <Route path="/question" element={<QuestionAll/>}></Route>
                <Route path="/mainbanner" element={<MainBanner/>}></Route>
                <Route path="/lastquestion" element={<LastQuestion/>}></Route>
                <Route path="/test" element={<Test/>}></Route>
                <Route path="/test2" element={<MakeQuesitonInput/>}></Route>
                {/* <Route path="/question2" element={<QuestionAll/>}></Route> */}
            </Routes>
    </BrowserRouter>
}

export default AppRouter;