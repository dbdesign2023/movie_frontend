import React from 'react';
import serverapi from '../services/serverapi';
import { useForm } from 'react-hook-form';

import '../styles/components/form-container.scss';
import '../styles/components/modal-container.scss';

export default function StaffGenreModifyForm(props) {
  const closeGenreModify = props.closeGenreModify;
  const setGenreList = props.setGenreList;
  const genre = props.genre;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid, isDirty, errors },
  } = useForm();

  const resetData = () => {
    setValue('genre', genre.name);
  };

  const onSubmit = async (data) => {
    const api = '/movie/genre/modify'; // 수정
    const token = localStorage.getItem('staffToken');
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const formData = new FormData();

    try {
      //console.log('data', data);
      formData.append('genreId', genre.genreId);
      formData.append('name', data.name);
      console.log('Request body', formData);

      const response = await serverapi.post(api, formData, options);
      console.log('response', response.data);

      setGenreList(response.data);
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
              <div className='content-text-container'>장르 수정하기</div>
            </div>
            <div class='col-sm-9'>
              <input
                class='form-control'
                type='text'
                placeholder='장르 이름을 입력하세요'
                defaultValue={genre.name}
                aria-invalid={
                  !isDirty ? undefined : errors.genre ? 'true' : 'false'
                }
                {...register('genre', {
                  required: '장르 이름을 입력해주세요.',
                })}
              />
              {errors.genre && (
                <small role='alert' className='input-alert'>
                  {errors.genre.message}
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
