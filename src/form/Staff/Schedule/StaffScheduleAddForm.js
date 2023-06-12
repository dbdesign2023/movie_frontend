import React, { useState, useContext } from 'react';
import serverapi from '../../../services/serverapi';
import { AuthContext } from '../../../services/AuthContext';
import { useForm } from 'react-hook-form';

import '../../../styles/components/form-container.scss';
import '../../../styles/components/modal-container.scss';

export default function StaffScheduleAddForm(props) {
  const { logout } = useContext(AuthContext);
  const closeScheduleModal = props.closeScheduleModal;
  const movieList = props.movieList;
  const theaterList = props.theaterList;

  const [isLoading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    resetField,
    formState: { isValid, isDirty, errors },
  } = useForm();

  const resetData = () => {
    resetField('movieId');
    resetField('theaterId');
    resetField('discount');
  };

  const onSubmit = async (data) => {
    console.log(data);

    data.discount = `${data.discount}%`;

    const api = `/schedule/add`;
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

      closeScheduleModal();
      alert('상영 일정이 등록되었습니다');
      resetData();
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
          onClick={closeScheduleModal}
        ></button>
      </div>
      <div className='title-text-center-container'>상영일정 등록</div>
      <div className='form-container'>
        <form
          className='staff-schedule-add-form'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='row'>
            <div className='col-sm-3'>
              <div className='content-text-container'>(개봉일)영화</div>
            </div>
            <div className='col-sm-9'>
              <select
                className='form-select'
                aria-label='Default select example'
                aria-invalid={
                  !isDirty ? undefined : errors.movieId ? 'true' : 'false'
                }
                {...register('movieId', {
                  required: '영화를 선택해주세요.',
                })}
              >
                {movieList.map((movie) => {
                  return (
                    <option key={movie.movieId} value={movie.movieId}>
                      {movie.title}({movie.releaseDate})
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-3'>
              <div className='content-text-container'>상영관</div>
            </div>
            <div className='col-sm-9'>
              <select
                className='form-select'
                aria-label='Default select example'
                aria-invalid={
                  !isDirty ? undefined : errors.theaterId ? 'true' : 'false'
                }
                {...register('theaterId', {
                  required: '상영관을 선택해주세요.',
                })}
              >
                {theaterList.map((theater) => {
                  return (
                    <option key={theater.theaterId} value={theater.theaterId}>
                      {theater.name}({theater.theaterId})
                    </option>
                  );
                })}
              </select>
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
                aria-invalid={
                  !isDirty ? undefined : errors.startTime ? 'true' : 'false'
                }
                {...register('startTime', {
                  required: '역할명을 입력해주세요.',
                })}
              />
              {errors.startTime && (
                <small role='alert' className='input-alert'>
                  {errors.startTime.message}
                </small>
              )}
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
                aria-invalid={
                  !isDirty ? undefined : errors.discount ? 'true' : 'false'
                }
                {...register('discount', {
                  required: '할인율을 입력해주세요.',
                })}
              />
              {errors.discout && (
                <small role='alert' className='input-alert'>
                  {errors.discount.message}
                </small>
              )}
            </div>
          </div>

          <div className='bottom-container'>
            <div className='button-container'>
              <button className='btn btn-secondary' onClick={resetData}>
                초기화
              </button>
              &nbsp; &nbsp; &nbsp;
              <button
                type='submit'
                className='btn btn-success'
                disabled={!(isDirty && isValid)}
              >
                {isLoading ? (
                  <div className='spinner-border' role='status'>
                    <span className='sr-only' />
                  </div>
                ) : (
                  <span>등록</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
