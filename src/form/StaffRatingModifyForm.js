import React from 'react';
import serverapi from '../services/serverapi';
import { useForm } from 'react-hook-form';

import '../styles/components/form-container.scss';
import '../styles/components/modal-container.scss';

export default function StaffRatingModifyForm(props) {
  const closeRatingModify = props.closeRatingModify;
  const getRatingList = props.getRatingList;
  const rating = props.rating;

  const {
    register,
    handleSubmit,
    resetField,
    setValue,
    formState: { isValid, isDirty, errors },
  } = useForm();

  const resetData = () => {
    setValue('name', rating.name);
    resetField('minAge', rating.minAge);
  };

  const onSubmit = async (data) => {
    const api = '/movie/rating/modify';
    const token = localStorage.getItem('staffToken');
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const formData = new FormData();

    try {
      //console.log('data', data);
      formData.append('ratingId', rating.ratingId);
      formData.append('name', data.name);
      formData.append('minAge', data.minAge);
      console.log('Request body', formData);

      const response = await serverapi.post(api, formData, options);
      console.log('response', response.data);

      getRatingList();
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
              <div className='content-text-container'>이름</div>
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
          <div className='row'>
            <div class='col-sm-3'>
              <div className='content-text-container'>제한 나이</div>
            </div>
            <div class='col-sm-9'>
              <input
                class='form-control'
                type='number'
                placeholder='제한 나이를 입력하세요'
                defaultValue={rating.minAge}
                aria-invalid={
                  !isDirty ? undefined : errors.minAge ? 'true' : 'false'
                }
                {...register('minAge', {
                  required: '등급 이름을 입력해주세요.',
                })}
              />
              {errors.minAge && (
                <small role='alert' className='input-alert'>
                  {errors.minAge.message}
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
                onClick={closeRatingModify}
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
