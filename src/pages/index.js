import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import MovieModifyPage from "./staff/MovieModifyPage";
import MovieRegisterPage from "./staff/MovieRegisterPage";
import StaffMovieListPage from "./staff/StaffMovieListPage";
import TestMainPage from './staff/TestMainPage';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/moviemodify' element={<MovieModifyPage />} />
                <Route path='/movieregister' element={<MovieRegisterPage />} />
                <Route path='/staffmovielist' element={<StaffMovieListPage />} />
                <Route path='/' element={<TestMainPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;