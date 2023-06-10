import React, { useState } from 'react';
import serverapi from '../../../services/serverapi';
import { useForm } from 'react-hook-form';

import '../../../styles/components/form-container.scss';
import '../../../styles/components/modal-container.scss';

export default function StaffScheduleModifyForm(props) {
  const closeScheduleModify = props.closeScheduleModify;
  const schedule = props.schedule;
  const theaterList = props.theaterList;

  const [isLoading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      movieId: schedule.movieId,
      theaterId: schedule.theaterDTO.theaterId,
      scheduleId: schedule.scheduleId,
      discount: schedule.discount,
    },
  });

  const onSubmit = async (data) => {
    console.log(data);

    if (!data.startTime || !data.discount) {
      return;
    }

    data.discount = `${data.discount}%`;

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

      console.log('Request body', data);

      const response = await serverapi.post(api, data, options);
      console.log('response', response.data);

      closeScheduleModify();
      alert('상영 일정이 수정되었습니다');
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
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
            <div className='col-sm-9'>{schedule.movieName}</div>
          </div>
          <div className='row'>
            <div className='col-sm-3'>
              <div className='content-text-container'>상영관</div>
            </div>
            <div className='col-sm-9'>
              {theaterList.map((theater) => {
                if (theater.theaterId === schedule.theaterDTO.theaterId)
                  return (
                    <option
                      key={theater.theaterId}
                      value={theater.theaterId}
                      selected
                    >
                      {theater.name}
                    </option>
                  );
                else
                  return (
                    <option key={theater.theaterId} value={theater.theaterId}>
                      {theater.name}
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
                type='number'
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
