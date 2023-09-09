import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './router.css'

import Home from './home/home';
import Nav from './nav/nav';
import Login from './user/login/Login'
import Usersave from './user/usersave/Usersave';
import Main from './main/main';
import MainBanner from './Mainbanner/Mainbanner';
import Menu from './menu/menu';
import LastQuestion from './lastquestion/lastquestion';
import QuestionAll from './question/questionAll';
import Test from './test/test';
import MakeQuesitonInput from './question/question_input';
import Result from './result/result';
import List from './list/list';
import Load from './load.js/load';
import List_Edit from './list/list_edit/list_edit';
import List_Menu from './list/list_edit/list_menu/list_menu';
import { useState } from 'react';

function MAINBANNER(probs){
    return <div>
        <Nav/>
        <MainBanner/>
    </div>
}

function USERSAVE(probs){
    return <div>
        <Nav/>
        <Usersave/>
    </div>
}
function LOGIN(probs){
    return <div>
        <Nav/>
        <Login/>
    </div>
}
function MAIN(probs){
    return <div>
        <Nav/>
        <Main/>
    </div>
}
function QUESTION(probs){
    return <div>
        <Nav/>
        <QuestionAll/>
    </div>
}
function RESULT(probs){
    return <div>
        <Nav/>
        <Result/>
    </div>
}
function LIST(probs){
    
    return <div>
        <Nav/>
        <Load load = {['목록','내 시간표']} px = {1300}/>
        <div className='container-list-title'>
                <span>저장된 시간표</span>
            </div>
        <List/>
    </div>
}
function LIST_EDIT(probs){

    const [menuTF,setMenuTF] = useState(false)
    const reverseTF = ()=>{
        setMenuTF(!menuTF)
    }

    return <div className='List_Edit_div'>
        <Nav/>
        <List_Menu menuTF={menuTF} reverseTF={reverseTF}/>
        <List_Edit menuTF={menuTF}></List_Edit>
    </div>
}

function AppRouter(){
    return <BrowserRouter>
         <Routes>

                <Route path="/" element={<MAINBANNER/>}></Route>
                <Route path="/usersave" element={<USERSAVE/>}></Route>
                <Route path="/login" element={<LOGIN/>}></Route>
                <Route path="/main" element={<MAIN/>}></Route>
                <Route path="/question" element={<QUESTION/>}></Route>
                <Route path="/test" element={<Test/>}></Route>
                <Route path="/result" element={<RESULT/>}></Route>
                <Route path="/list" element={<LIST/>}></Route>
                <Route path="/listedit" element={<LIST_EDIT/>}></Route>
            </Routes>
    </BrowserRouter>
}

export default AppRouter;