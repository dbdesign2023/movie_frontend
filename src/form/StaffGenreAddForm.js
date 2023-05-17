import React from 'react';
import serverapi from '../services/serverapi';
import { useForm } from 'react-hook-form';

import '../styles/components/form-container.scss';
import '../styles/components/modal-container.scss';

export default function StaffGenreAddForm(props) {
  const closeGenreModal = props.closeGenreModal;

  const {
    register,
    handleSubmit,
    resetField,
    formState: { isSubmitting, isDirty, errors },
  } = useForm();

  const resetData = () => {
    resetField('genre');
  };

  const onSubmit = async (data) => {
    const api = '/movie/genre/add';
    const token = localStorage.getItem('staffToken');
    const options = {
      headers: {
        Authorization: `Bearer ` + { token },
      },
    };
    let stringData = '';

    try {
      //console.log('data', data);
      stringData = data.genre;
      console.log('Request body', stringData);

      const response = await serverapi.get(api, stringData, options);
      console.log('response', response.data);

      resetData();
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    <div className='modal-container'>
      <div className='title-text-center-container'>장르 목록</div>
      <div className='form-container'>
        <form className='staff-signup-form' onSubmit={handleSubmit(onSubmit)}>
          <div className='row'>// 장르 목록 api 받아서 보여주는 곳</div>
          <div className='row'>
            <div class='col-sm-3'>
              <div className='content-text-container'>새로 추가하기</div>
            </div>
            <div class='col-sm-7'>
              <input
                class='form-control'
                type='text'
                placeholder='장르 이름을 입력하세요'
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
            <div class='col-2'>
              <div class='left'>
                <button
                  type='submit'
                  class='btn btn-success'
                  disabled={isSubmitting}
                >
                  등록
                </button>
              </div>
            </div>
          </div>
          <div className='bottom-container'>
            <div className='button-container'>
              <button
                type='button'
                class='btn btn-secondary'
                onClick={closeGenreModal}
              >
                닫기
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
