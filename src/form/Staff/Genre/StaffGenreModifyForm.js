import React, { useState } from 'react';
import serverapi from '../../../services/serverapi';
import { useForm } from 'react-hook-form';

import '../../../styles/components/form-container.scss';
import '../../../styles/components/modal-container.scss';

export default function StaffGenreModifyForm(props) {
  const closeGenreModify = props.closeGenreModify;
  const getGenreList = props.getGenreList;
  const genre = props.genre;

  const [isLoading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid, isDirty, errors },
  } = useForm();

  const resetData = () => {
    setValue('code', genre.code);
    setValue('name', genre.name);
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
      setLoading(true);
      const updatedData = {
        ...data,
        code: genre.code,
      };
      console.log('Request body', updatedData);

      const response = await serverapi.post(api, updatedData, options);
      console.log('response', response.data);

      closeGenreModify();
      alert('수정되었습니다');
      getGenreList();
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
            <div className='col-sm-3'>
              <div className='content-text-container'>장르 코드</div>
            </div>
            <div className='col-sm-9'>
              <span>{genre.code}</span>
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-3'>
              <div className='content-text-container'>장르 이름</div>
            </div>
            <div className='col-sm-9'>
              <input
                className='form-control'
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
              <button
                type='button'
                className='btn btn-secondary'
                onClick={resetData}
              >
                되돌리기
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
