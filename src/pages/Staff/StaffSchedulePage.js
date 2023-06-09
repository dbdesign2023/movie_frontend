import React, { useEffect, useState } from 'react';
import Modal from 'react-awesome-modal';
import serverapi from '../../services/serverapi';
import StaffScheduleAddForm from '../../form/Staff/Schedule/StaffScheduleAddForm';
import DateScheduleComponent from '../../components/DateScheduleComponent';

import '../../styles/components/page-container.scss';

export default function StaffSchedulePage() {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [preMovieList, setPreMovieList] = useState([]);
  const [movieList, setMovieList] = useState([]);
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

  const getTheaterList = async () => {
    const api = '/theater/all';
    const token = localStorage.getItem('staffToken');
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      setLoading(true);

      const response = await serverapi.get(api, options);
      console.log('response', response.data);

      setTheaterList(response.data);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
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
    getScheduleList(date);
  };

  useEffect(() => {
    console.log('ScheduleList', scheduleList);
  }, [scheduleList]);

  const getScheduleList = async (date) => {
    const api = `schedule/date/${date}`;
    const token = localStorage.getItem('staffToken');
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await serverapi.get(api, options);
      console.log('response', response.data);

      setScheduleList(response.data);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  const getPreMovieList = async () => {
    const api = '/movie/all';
    const token = localStorage.getItem('staffToken');
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
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
      console.log(error);
      alert(error.response.data.message);
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
              theaterList={theaterList}
            />
          );
        })}
      </div>
    </>
  );
}
