import { BrowserRouter, Route, Routes, useLocation, useSearchParams } from 'react-router-dom';

import Home from './home/home';
import Nav from './Nav/nav';

function AppRouter(){
    return <BrowserRouter>
    <Nav/>
         <Routes>
                <Route path="/" element={<Home/>}></Route>
            </Routes>
    </BrowserRouter>
}

export default AppRouter;