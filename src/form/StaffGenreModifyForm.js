import React from 'react';
import serverapi from '../services/serverapi';
import { useForm } from 'react-hook-form';

import '../styles/components/form-container.scss';
import '../styles/components/modal-container.scss';

export default function StaffGenreModifyForm(props) {
  const closeGenreModify = props.closeGenreModify;
  const getGenreList = props.getGenreList;
  const genre = props.genre;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid, isDirty, errors },
  } = useForm();

  const resetData = () => {
    setValue('code', genre.code);
    setValue('name', genre.name);
    console.log('되돌리기');
  };

  const onSubmit = async (data) => {
    const api = '/movie/genre/modify';
    const token = localStorage.getItem('staffToken');
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      console.log('Request body', data);

      const response = await serverapi.post(api, data, options);
      console.log('response', response.data);

      getGenreList();
      resetData();
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    <div className='modal-container'>
      <div className='btn-close'>
        <button
          type='button'
          class='btn-close'
          aria-label='Close'
          onClick={closeGenreModify}
        ></button>
      </div>
      <div className='title-text-center-container'>장르 수정</div>
      <div className='form-container'>
        <form
          className='staff-genre-add-form'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='row'>
            <div class='col-sm-3'>
              <div className='content-text-container'>장르 코드</div>
            </div>
            <div class='col-sm-9'>
              <input
                class='form-control'
                type='text'
                placeholder='GR000'
                defaultValue={genre.code}
                value={genre.code}
                aria-invalid={
                  !isDirty ? undefined : errors.code ? 'true' : 'false'
                }
                {...register('code', {
                  required: '장르 이름을 입력해주세요.',
                })}
              />
              {errors.code && (
                <small role='alert' className='input-alert'>
                  {errors.code.message}
                </small>
              )}
            </div>
          </div>
          <div className='row'>
            <div class='col-sm-3'>
              <div className='content-text-container'>장르 이름</div>
            </div>
            <div class='col-sm-9'>
              <input
                class='form-control'
                type='text'
                placeholder='장르 이름을 입력하세요'
                defaultValue={genre.name}
                aria-invalid={
                  !isDirty ? undefined : errors.name ? 'true' : 'false'
                }
                {...register('name', {
                  required: '장르 이름을 입력해주세요.',
                })}
              />
              {errors.name && (
                <small role='alert' className='input-alert'>
                  {errors.name.message}
                </small>
              )}
            </div>
          </div>
          <div className='bottom-container'>
            <div className='button-container'>
              <button class='btn btn-secondary' onClick={resetData}>
                되돌리기
              </button>
              &nbsp; &nbsp; &nbsp;
              <button
                type='submit'
                class='btn btn-success'
                onClick={closeGenreModify}
                disabled={!(isDirty && isValid)}
              >
                수정
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
