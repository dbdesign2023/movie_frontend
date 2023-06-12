import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-awesome-modal';
import serverapi from '../../services/serverapi';
import { AuthContext } from '../../services/AuthContext';
import StaffScheduleAddForm from '../../form/Staff/Schedule/StaffScheduleAddForm';
import DateScheduleComponent from '../../components/DateScheduleComponent';

import '../../styles/components/page-container.scss';

export default function StaffSchedulePage() {
  const { logout } = useContext(AuthContext);

  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [preMovieList, setPreMovieList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [preScheduleList, setPreScheduleList] = useState([]);
  const [scheduleList, setScheduleList] = useState([]);
  const [theaterList, setTheaterList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState([]);
  const [dateList, setDateList] = useState([]);

  useEffect(() => {
    const today = new Date();
    const twoWeeksLater = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);

    const newList = [];
    let currentDate = today;

    while (currentDate <= twoWeeksLater) {
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      newList.push(formattedDate);

      currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
    }

    setDateList(newList);
  }, []);

  const showScheduleModal = () => {
    setScheduleModalOpen(true);
    getTheaterList();
    getPreMovieList();
  };

  const closeScheduleModal = () => {
    setScheduleModalOpen(false);
  };

  function padZero(value) {
    return value.toString().padStart(2, '0');
  }

  function formatDateTime(dateTime) {
    const [year, month, day, hour, minute] = dateTime;

    const paddedYear = padZero(year);
    const paddedMonth = padZero(month);
    const paddedDay = padZero(day);
    const paddedHour = padZero(hour);
    const paddedMinute = padZero(minute);

    return `${paddedYear}-${paddedMonth}-${paddedDay} ${paddedHour}:${paddedMinute}`;
  }

  const getTheaterList = async () => {
    const api = '/theater/all';
    const token = localStorage.getItem('staffToken');
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
        'ngrok-skip-browser-warning': true,
      },
    };

    try {
      setLoading(true);

      const response = await serverapi.get(api, options);
      console.log('response', response.data);

      setTheaterList(response.data);
    } catch (error) {
      if (error.response.data === 'undefined') {
        logout();
        alert('토큰이 만료되었습니다. 다시 로그인해주세요.');
      } else {
        console.log(error);
        alert(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleItem = (date) => {
    setIsOpen((prevOpen) => {
      if (prevOpen.includes(date)) {
        return prevOpen.filter((id) => id !== date);
      } else {
        return [...prevOpen, date];
      }
    });
    getPreScheduleList(date);
  };

  useEffect(() => {
    console.log('ScheduleList', scheduleList);
  }, [scheduleList]);

  const getPreScheduleList = async (date) => {
    const api = `schedule/date/${date}`;
    const token = localStorage.getItem('staffToken');
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
        'ngrok-skip-browser-warning': true,
      },
    };

    try {
      const response = await serverapi.get(api, options);
      console.log('response', response.data);

      const updatedScheduleList = response.data.map((schedule) => {
        console.log('schedule', schedule);

        let tmp = formatDateTime(schedule.startTime);
        schedule.startTime = tmp;

        return schedule;
      });

      setPreScheduleList(response.data);
      setScheduleList(updatedScheduleList);
    } catch (error) {
      if (error.response.data === undefined) {
        logout();
        alert('토큰이 만료되었습니다. 다시 로그인해주세요.');
      } else {
        console.log(error);
        alert(error.response.data.message);
      }
    }
  };

  const getPreMovieList = async () => {
    const api = '/movie/all';
    const token = localStorage.getItem('staffToken');
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
        'ngrok-skip-browser-warning': true,
      },
    };

    try {
      setLoading(true);

      const response = await serverapi.get(api, options);
      console.log('response', response.data);

      const updatedMovieList = response.data.map((movie) => {
        let tmp = new Date(movie.releaseDate);
        movie.releaseDate =
          tmp.getFullYear() +
          '-' +
          (tmp.getMonth() < 9
            ? '0' + (tmp.getMonth() + 1)
            : tmp.getMonth() + 1) +
          '-' +
          (tmp.getDate() < 10 ? '0' + tmp.getDate() : tmp.getDate());
        return movie;
      });

      setPreMovieList(response.data);
      setMovieList(updatedMovieList);
    } catch (error) {
      if (error.response.data === undefined) {
        logout();
        alert('토큰이 만료되었습니다. 다시 로그인해주세요.');
      } else {
        console.log(error);
        alert(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='add-button-container'>
        <button className='btn btn-success' onClick={showScheduleModal}>
          {isLoading ? (
            <div className='spinner-border' schedule='status'>
              <span className='sr-only' />
            </div>
          ) : (
            <span>상영일정 추가</span>
          )}
        </button>
        {scheduleModalOpen && (
          <Modal setScheduleModalOpen={showScheduleModal} />
        )}
        <Modal
          visible={scheduleModalOpen}
          effect='fadeInDown'
          onClickAway={closeScheduleModal}
        >
          <StaffScheduleAddForm
            closeScheduleModal={closeScheduleModal}
            movieList={movieList}
            theaterList={theaterList}
            getScheduleList={getPreScheduleList}
          />
        </Modal>
      </div>
      <div class='accordion' id='accordionExample'>
        {dateList.map((date) => {
          return (
            <DateScheduleComponent
              key={date}
              date={date}
              toggleItem={toggleItem}
              isOpen={isOpen}
              scheduleList={scheduleList}
              getTheaterList={getTheaterList}
              theaterList={theaterList}
            />
          );
        })}
      </div>
    </>
  );
}
