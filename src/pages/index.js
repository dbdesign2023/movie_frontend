import React, { useContext } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { AuthContext } from '../services/AuthContext';

import MovieModifyPage from './staff/MovieModifyPage';
import MovieRegisterPage from './staff/MovieRegisterPage';
import StaffLoginPage from './staff/StaffLoginPage';
import StaffMovieListPage from './staff/StaffMovieListPage';
import StaffSignUpPage from './staff/StaffSignUpPage';
import TestMainPage from './TestMainPage';

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
    return !isStaffLogin ? <Navigate replace to='/stafflogin' /> : <Outlet />;
  } else {
    //고객페이지
    return !isCustomerLogin ? <Navigate replace to='/login' /> : <Outlet />;
  }
}

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/**로그인 안해야지만 접근 가능 */}
        <Route
          element={<PrivateRoute customerAuth={false} staffAuth={false} />}
        >
          <Route path='/' element={<TestMainPage />} />
          <Route path='/stafflogin' element={<StaffLoginPage />} />
          <Route path='/staffsignup' element={<StaffSignUpPage />} />
        </Route>
        {/**고객 or 직원 로그인 해야만 접근 가능 */}
        <Route
          element={<PrivateRoute customerAuth={true} staffAuth={false} />}
        ></Route>
        {/**직원 로그인 해야만 접근 가능 */}
        <Route element={<PrivateRoute customerAuth={false} staffAuth={true} />}>
          <Route path='/moviemodify' element={<MovieModifyPage />} />
          <Route path='/movieregister' element={<MovieRegisterPage />} />
          <Route path='/staffmovielist' element={<StaffMovieListPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
