import React, { useState, useContext, useEffect } from 'react';
import serverapi from '../../../services/serverapi';
import { AuthContext } from '../../../services/AuthContext';
import { useForm } from 'react-hook-form';

import '../../../styles/components/form-container.scss';
import '../../../styles/components/modal-container.scss';

export default function StaffScheduleModifyForm(props) {
  const { logout } = useContext(AuthContext);
  const closeScheduleModify = props.closeScheduleModify;
  const schedule = props.schedule;
  const theaterList = props.theaterList;
  const getTheaterList = props.getTheaterList;

  const [isLoading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      movieId: schedule.movieId,
      theaterId: schedule.theaterDTO.theaterId,
      scheduleId: schedule.scheduleId,
      discount: schedule.discount,
      startTime: schedule.startTime,
    },
  });

  useEffect(() => {
    console.log('schedule', schedule);
  }, [schedule]);

  const onSubmit = async (data) => {
    console.log(data);

    if (!data.startTime || !data.discount) {
      return;
    }

    const api = `/schedule/${schedule.scheduleId}/modify`;
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

      if (data.discount == 0) data.discount = null;
      console.log('Request body', data);

      const response = await serverapi.post(api, data, options);
      console.log('response', response.data);

      closeScheduleModify();
      alert('상영 일정이 수정되었습니다');
      getTheaterList();
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
    <div className='modal-container'>
      <div className='btn-close'>
        <button
          type='button'
          className='btn-close'
          aria-label='Close'
          onClick={closeScheduleModify}
        ></button>
      </div>
      <div className='title-text-center-container'>상영일정 수정</div>
      <div className='form-container'>
        <form
          className='staff-schedule-add-form'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='row'>
            <div className='col-sm-3'>
              <div className='content-text-container'>영화</div>
            </div>
            <div className='col-9'>{schedule.movieName}</div>
          </div>
          <div className='row'>
            <div className='col-sm-3'>
              <div className='content-text-container'>상영관</div>
            </div>
            <div className='col-9'>
              {theaterList.map((theater) => {
                if (theater.theaterId === schedule.theaterDTO.theaterId)
                  return (
                    <option
                      key={theater.theaterId}
                      value={theater.theaterId}
                      selected
                    >
                      {theater.name}({theater.theaterId})
                    </option>
                  );
              })}
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-3'>
              <div className='content-text-container'>시작 시간</div>
            </div>
            <div className='col-sm-9'>
              <input
                className='form-control'
                type='text'
                placeholder='0000-00-00 00:00'
                defaultValue={schedule.startTime}
                {...register('startTime')}
              />
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-3'>
              <div className='content-text-container'>할인율</div>
            </div>
            <div className='col-sm-9'>
              <input
                className='form-control'
                type='text'
                placeholder='할인율을 입력해주세요'
                defaultValue={schedule.discount}
                {...register('discount')}
              />
            </div>
          </div>
          <div className='bottom-container'>
            <div className='button-container'>
              <button type='submit' className='btn btn-success'>
                {isLoading ? (
                  <div className='spinner-border' role='status'>
                    <span className='sr-only' />
                  </div>
                ) : (
                  <span>수정</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
