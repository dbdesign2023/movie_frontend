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
import StaffSchedulePage from './StaffSchedulePage';
import StaffTheaterPage from './StaffTheaterPage';

import CustomerLoginPage from './CustomerLoginPage'; 
import CustomerRegisterPage from './CustomerRegisterPage';
import CustomerMovieListPage from './CustomerMovieListPage';
import CustomerTicketingPage from './CustomerTicketingPage';
import PaymentPage from './PaymentPage';
import MainPage from './MainPage';

function PrivateRoute({ staffAuth, customerAuth }) {
  const value = useContext(AuthContext);
  const isStaffLogin = value.isStaffLogin;
  const isCustomerLogin = value.isCustomerLogin;

  console.log('isStaffLogin', isStaffLogin);
  console.log('isCustomerLogin', isCustomerLogin);

  if (!staffAuth && !customerAuth) {
    //로그인, 회원가입 페이지
    return isStaffLogin ? (
      <Navigate replace to='/staff' />
    ) : isCustomerLogin ? (
      <Navigate replace to='/' />
    ) : (
      <Outlet />
    );
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
          <Route path='/mypage' element={<MyPagePage />} />
          <Route path='/ticketing' element={<TicketingPage />} />
          <Route path='/staff/*' element={<StaffMoviePage />} />
          <Route path='/staff/movie' element={<StaffMoviePage />} />
          <Route path='/staff/schedule' element={<StaffSchedulePage />} />
          <Route path='/staff/cast' element={<StaffCastPage />} />
          <Route path='/staff/genrerating' element={<StaffGenreRatingPage />} />
          <Route path='/staff/theater' element={<StaffTheaterPage />} />
          <Route path='/staff/customer' element={<StaffCustomerPage />} />
          <Route path='/main' element={<MainPage />} />
          <Route path='/login' element={<CustomerLoginPage />}/>
          <Route path='/signup' element={<CustomerRegisterPage />}/>
          <Route path='/customermovielist' element={<CustomerMovieListPage />}/>
          <Route path='/customerticketing' element={<CustomerTicketingPage />}/>
          <Route path='/payment' element={<PaymentPage />}/>
          {/**마음대로 안 돼서 일단 가둬놓음 
          <Route
            path='/stafflogin'
            element={<StaffLoginPage setIsStaffLogin={setIsStaffLogin} />}
          />
          <Route path='/staffsignup' element={<StaffSignUpPage />} />
          <Route path='/stafflogin' elememt={<StaffLoginPage />} />
        </Route>
        {/**customer logined }
        <Route element={<PrivateRoute customerAuth={true} staffAuth={false} />}>
          <Route path='/mypage' element={<MyPagePage />} />
          <Route path='/ticketing' element={<TicketingPage />} />
        </Route>
        {/**staff logined }
        <Route element={<PrivateRoute customerAuth={false} staffAuth={true} />}>
          <Route path='/staff/*' element={<StaffMoviePage />} />
          <Route path='/staff/movie' element={<StaffMoviePage />} />
          <Route path='/staff/mypage' element={<StaffMyPagePage />} />
          <Route path='/staff/schedule' element={<StaffSchedulePage />} />
          <Route path='/staff/cast' element={<StaffCastPage />} />
          <Route path='/staff/genrerating' element={<StaffGenreRatingPage />} />
          <Route path='/staff/theater' element={<StaffTheaterPage />} />
          <Route path='/staff/customer' element={<StaffCustomerPage />} />*/}
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
