import React, { useContext } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { AuthContext } from '../services/AuthContext';

import MoviePage from './MoviePage';
import MyPagePage from './MyPagePage';
import NonmemberPage from './NonmemberPage';
import NotFoundPage from './NotFoundPage';
import SchedulePage from './SchedulePage';
import TicketingPage from './TicketingPage';

import StaffCastPage from './StaffCastPage';
import StaffCustomerPage from './StaffCustomerPage';
import StaffGenreRatingPage from './StaffGenreRatingPage';
import StaffMoviePage from './StaffMoviePage';
import StaffMyPagePage from './StaffMyPage';
import StaffSchedulePage from './StaffSchedulePage';
import StaffTheaterPage from './StaffTheaterPage';

function PrivateRoute({ staffAuth, customerAuth }) {
  const value = useContext(AuthContext);
  const isStaffLogin = value.isStaffLogin;
  const isCustomerLogin = value.isCustomerLogin;

  console.log('isStaffLogin', isStaffLogin);
  console.log('isCustomerLogin', isCustomerLogin);

  if (!staffAuth && !customerAuth) {
    //로그인, 회원가입 페이지
    return <Navigate replace to='/nonmember' />;
  } else if (staffAuth) {
    //직원페이지
    return !isStaffLogin ? <Navigate replace to='/' /> : <Outlet />;
  } else {
    //고객페이지
    return !isCustomerLogin ? <Navigate replace to='/' /> : <Outlet />;
  }
}

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/**any logined or unlogined */}
        <Route>
          <Route path='/' element={<MoviePage />} />
          {/** MoviePage가 메인화면 */}
          <Route path='/schedule' element={<SchedulePage />} />
          <Route path='/nonmember' element={<NonmemberPage />} />
        </Route>
        {/**customer logined */}
        <Route element={<PrivateRoute customerAuth={true} staffAuth={false} />}>
          <Route path='/mypage' element={<MyPagePage />} />
          <Route path='/ticketing' element={<TicketingPage />} />
        </Route>
        {/**staff logined */}
        <Route element={<PrivateRoute customerAuth={false} staffAuth={true} />}>
          <Route path='/staffmovie' element={<StaffMoviePage />} />
          <Route path='/staffmypage' element={<StaffMyPagePage />} />
          <Route path='/staffschedule' element={<StaffSchedulePage />} />
          <Route path='/staffcast' element={<StaffCastPage />} />
          <Route path='/staffgenrerating' element={<StaffGenreRatingPage />} />
          <Route path='/stafftheater' element={<StaffTheaterPage />} />
          <Route path='/staffcustomer' element={<StaffCustomerPage />} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
