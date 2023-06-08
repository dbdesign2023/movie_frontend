import React, { useState } from 'react';
import serverapi from '../services/serverapi';
import { useForm } from 'react-hook-form';

import '../styles/components/form-container.scss';
import '../styles/components/modal-container.scss';

export default function StaffRatingModifyForm(props) {
  const closeRatingModify = props.closeRatingModify;
  const getRatingList = props.getRatingList;
  const rating = props.rating;

  const [isLoading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid, isDirty, errors },
  } = useForm();

  const resetData = () => {
    setValue('code', rating.code);
    setValue('name', rating.name);
  };

  const onSubmit = async (data) => {
    const api = '/movie/rating/modify';
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
        code: rating.code,
      };
      console.log('Request body', updatedData);

      const response = await serverapi.post(api, updatedData, options);
      console.log('response', response.data);

      closeRatingModify();
      alert('수정되었습니다');
      getRatingList();
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
          class='btn-close'
          aria-label='Close'
          onClick={closeRatingModify}
        ></button>
      </div>
      <div className='title-text-center-container'>등급 수정</div>
      <div className='form-container'>
        <form
          className='staff-rating-add-form'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='row'>
            <div class='col-sm-3'>
              <div className='content-text-container'>등급 코드</div>
            </div>
            <div class='col-sm-9'>
              <span>{rating.code}</span>
            </div>
          </div>
          <div className='row'>
            <div class='col-sm-3'>
              <div className='content-text-container'>등급 이름</div>
            </div>
            <div class='col-sm-9'>
              <input
                class='form-control'
                type='text'
                placeholder='등급 이름을 입력하세요'
                defaultValue={rating.name}
                aria-invalid={
                  !isDirty ? undefined : errors.name ? 'true' : 'false'
                }
                {...register('name', {
                  required: '등급 이름을 입력해주세요.',
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
                class='btn btn-secondary'
                onClick={resetData}
              >
                되돌리기
              </button>
              &nbsp; &nbsp; &nbsp;
              <button
                type='submit'
                class='btn btn-success'
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
