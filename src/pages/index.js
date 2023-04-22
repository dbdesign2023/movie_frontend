import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import MovieModifyPage from "./staff/MovieModifyPage";
import MovieRegisterPage from "./staff/MovieRegisterPage";
import OfficialsModifyPage from "./staff/OfficialsModifyPage";
import OfficialsRegisterPage from "./staff/OfficialsRegisterPage";
import StaffMovieListPage from "./staff/StaffMovieListPage";
import TestMainPage from './staff/TestMainPage';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/moviemodify' element={<MovieModifyPage />} />
                <Route path='/movieregister' element={<MovieRegisterPage />} />
                <Route path='/officialsmodify' element={<OfficialsModifyPage />} />
                <Route path='/officialsregister' element={<OfficialsRegisterPage />} />
                <Route path='/staffmovielist' element={<StaffMovieListPage />} />
                <Route path='/' element={<TestMainPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;