import React, { useContext } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { AuthContext } from '../services/AuthContext';

import MovieModifyPage from './MovieModifyPage';
import MovieRegisterPage from './MovieRegisterPage';
import StaffLoginPage from './StaffLoginPage';
import StaffMovieListPage from './StaffMovieListPage';
import StaffSignUpPage from './StaffSignUpPage';
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
      <Navigate replace to='/' />
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
  const value = useContext(AuthContext);
  const setIsStaffLogin = value.setIsStaffLogin;
  return (
    <BrowserRouter>
      <Routes>
        {/**로그인 안 해도 접근 가능 */}
        <Route>
          <Route path='/' element={<MainPage />} />
          <Route
            path='/stafflogin'
            element={<StaffLoginPage setIsStaffLogin={setIsStaffLogin} />}
          />
          <Route path='/staffsignup' element={<StaffSignUpPage />} />
          <Route path='/stafflogin' elememt={<StaffLoginPage />} />
        </Route>
        {/**고객 or 직원 로그인 해야만 접근 가능 */}
        <Route
          element={<PrivateRoute customerAuth={true} staffAuth={false} />}
        ></Route>
        {/**직원 로그인 해야만 접근 가능 */}
        <Route element={<PrivateRoute customerAuth={false} staffAuth={true} />}>
          <Route path='/moviemodify' element={<MovieModifyPage />} />
          <Route path='/movieregister' element={<MovieRegisterPage />} />
          <Route
            path='/movielist'
            element={<StaffMovieListPage setIsStaffLogin={setIsStaffLogin} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
