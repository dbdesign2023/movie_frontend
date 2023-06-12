import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MoviePage from './MoviePage';
import MyPagePage from './MyPagePage';
import NonmemberPage from './NonmemberPage';
import NotFoundPage from './NotFoundPage';
import SchedulePage from './SchedulePage';
import TicketingPage from './TicketingPage';

import StaffCastPage from './Staff/StaffCastPage';
import StaffGenreRatingPage from './Staff/StaffGenreRatingPage';
import StaffMoviePage from './Staff/StaffMoviePage';
import StaffSchedulePage from './Staff/StaffSchedulePage';
import StaffTheaterPage from './Staff/StaffTheaterPage';
import StaffSeatPage from './Staff/StaffSeatPage';
import StaffTypePage from './Staff/StaffTypePage';
import StaffRolePage from './Staff/StaffRolePage';

import CustomerLoginPage from './CustomerLoginPage';
import CustomerRegisterPage from './CustomerRegisterPage';
import CustomerMovieListPage from './CustomerMovieListPage';
import ChooseDatePage from './ChooseDatePage';
import ChooseSeatPage from './ChooseSeatPage';
import MainPage from './MainPage';
import CustomerTicketForm from '../form/CustomerTicketForm';
import CustomerPaymentPage from './CustomerPaymentPage';
import CustomerTicketListPage from './CustomerTicketListPage';
import ScheduleWithMoviePage from './ScheduleWithMoviePage';
import MovieDetailPage from './MovieDetailPage';

function Router() {
  console.log(process.env.PUBLIC_URL);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        {/**any logined or unlogined */}
        <Route>
          <Route path='/' element={<CustomerMovieListPage />} />
          {/** MoviePage가 메인화면 */}
          <Route path='schedule' element={<ChooseDatePage />} />
          <Route path='nonmember' element={<NonmemberPage />} />
          <Route path='mypage' element={<MyPagePage />} />
          <Route path='ticketing' element={<TicketingPage />} />

          <Route path='/staff/*' element={<StaffMoviePage />} />
          <Route path='/staff/movie' element={<StaffMoviePage />} />
          <Route
            path='/staff/movie/genrerating'
            element={<StaffGenreRatingPage />}
          />
          <Route path='/staff/schedule' element={<StaffSchedulePage />} />
          <Route path='/staff/cast' element={<StaffCastPage />} />
          <Route path='/staff/theater' element={<StaffTheaterPage />} />
          <Route path='/staff/theater/:theaterId' element={<StaffSeatPage />} />
          <Route path='/staff/theater/type' element={<StaffTypePage />} />
          <Route path='/staff/role' element={<StaffRolePage />} />

          <Route path='main' element={<MainPage />} />
          <Route path='/login' element={<CustomerLoginPage />} />
          <Route path='/signup' element={<CustomerRegisterPage />} />
          <Route path='chooseseat' element={<ChooseSeatPage />} />
          <Route path='payment' element={<CustomerPaymentPage />} />
          <Route path='ticketlist' element={<CustomerTicketListPage />} />
          <Route path='schedulewithmovie' element={<ScheduleWithMoviePage />} />
          <Route path='moviedetail' element={<MovieDetailPage />} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
