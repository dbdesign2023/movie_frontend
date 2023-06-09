import React, { useState } from 'react';
import serverapi from '../../../services/serverapi';
import { useForm } from 'react-hook-form';

import '../../../styles/components/form-container.scss';
import '../../../styles/components/modal-container.scss';

export default function StaffRoleAddForm(props) {
  const movieList = props.movieList;
  const closeRoleModal = props.closeRoleModal;
  const castList = props.castList;

  const [isLoading, setLoading] = useState(false);
  const [starring, setStarring] = useState(false);

  const {
    register,
    handleSubmit,
    resetField,
    setValue,
    formState: { isValid, isDirty, errors },
  } = useForm();

  const resetData = () => {
    resetField('movieId');
    resetField('castId');
    resetField('role');
    setValue('starring', false);
  };

  const onSubmit = async (data) => {
    console.log(data);

    const api = `/movie/${parseInt(data.movieId, 10)}/role/add`;
    const token = localStorage.getItem('staffToken');
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      setLoading(true);
      const updatedData = {
        ...data,
        starring: starring,
      };

      console.log('Request body', updatedData);

      const response = await serverapi.post(api, updatedData, options);
      console.log('response', response.data);

      closeRoleModal();
      alert('역할이 등록되었습니다');
      resetData();
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
          onClick={closeRoleModal}
        ></button>
      </div>
      <div className='title-text-center-container'>영화 추가</div>
      <div className='form-container'>
        <form className='staff-role-add-form' onSubmit={handleSubmit(onSubmit)}>
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
              <div className='content-text-container'>배우</div>
            </div>
            <div className='col-sm-9'>
              <select
                className='form-select'
                aria-label='Default select example'
                aria-invalid={
                  !isDirty ? undefined : errors.castId ? 'true' : 'false'
                }
                {...register('castId', {
                  required: '배우를 선택해주세요.',
                })}
              >
                {castList.map((cast) => {
                  return (
                    <option key={cast.castId} value={cast.castId}>
                      {cast.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-3'>
              <div className='content-text-container'>역할명</div>
            </div>
            <div className='col-sm-9'>
              <input
                className='form-control'
                type='text'
                placeholder='역할명을 입력하세요'
                aria-invalid={
                  !isDirty ? undefined : errors.role ? 'true' : 'false'
                }
                {...register('role', {
                  required: '역할명을 입력해주세요.',
                })}
              />
              {errors.role && (
                <small role='alert' className='input-alert'>
                  {errors.role.message}
                </small>
              )}
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-3'>
              <div className='content-text-container'>개봉일</div>
            </div>
            <div className='col-sm-9'>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='flexRadioDefault'
                  id='flexRadioDefault1'
                  value={true}
                  checked={starring === true}
                  onChange={() => setStarring(true)}
                />
                <label className='form-check-label' htmlFor='flexRadioDefault1'>
                  주연
                </label>
              </div>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='flexRadioDefault'
                  id='flexRadioDefault2'
                  value={false}
                  checked={starring === false}
                  onChange={() => setStarring(false)}
                />
                <label className='form-check-label' htmlFor='flexRadioDefault2'>
                  조연
                </label>
              </div>
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
