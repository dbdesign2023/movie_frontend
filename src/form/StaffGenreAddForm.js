import React from 'react';
import serverapi from '../services/serverapi';
import { useForm } from 'react-hook-form';

import '../styles/components/form-container.scss';
import '../styles/components/modal-container.scss';

export default function StaffGenreAddForm(props) {
  const closeGenreModal = props.closeGenreModal;
  const setGenreList = props.setGenreList;

  const {
    register,
    handleSubmit,
    resetField,
    formState: { isValid, isDirty, errors },
  } = useForm();

  const resetData = () => {
    resetField('genre');
  };

  const onSubmit = async (data) => {
    const api = '/movie/genre/add';
    const token = localStorage.getItem('staffToken');
    const options = {
      headers: {
        'Content-type': 'text/plain; charset=UTF-8',
        Authorization: `Bearer ${token}`,
      },
    };
    let stringData = '';

    try {
      stringData = data.genre;
      console.log('Request body', stringData);

      const response = await serverapi.post(api, stringData, options);
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
          onClick={closeGenreModal}
        ></button>
      </div>
      <div className='title-text-center-container'>장르 추가</div>
      <div className='form-container'>
        <form
          className='staff-genre-add-form'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='row'>
            <div class='col-sm-3'>
              <div className='content-text-container'>새로 추가하기</div>
            </div>
            <div class='col-sm-9'>
              <input
                class='form-control'
                type='text'
                placeholder='장르 이름을 입력하세요'
                defaultValue=''
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
                초기화
              </button>
              &nbsp; &nbsp; &nbsp;
              <button
                type='submit'
                class='btn btn-success'
                onClick={closeGenreModal}
                disabled={!(isDirty && isValid)}
              >
                등록
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
