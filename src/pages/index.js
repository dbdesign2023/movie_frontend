import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MovieModifyPage from "./staff/MovieModifyPage";
import MovieRegisterPage from "./staff/MovieRegisterPage";
import OfficialsModifyPage from "./staff/OfficialsModifyPage";
import OfficialsRegisterPage from "./staff/OfficialsRegisterPage";
import TestMainPage from './staff/TestMainPage';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<TestMainPage />} />
                <Route path='/moviemodify' element={<MovieModifyPage />} />
                <Route path='/moviemanage' element={<MovieRegisterPage />} />
                <Route path='/officialsmodify' element={<OfficialsModifyPage />} />
                <Route path='/officialsmanage' element={<OfficialsRegisterPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;