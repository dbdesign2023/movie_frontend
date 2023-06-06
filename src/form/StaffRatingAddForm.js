import React from 'react';
import serverapi from '../services/serverapi';
import { useForm } from 'react-hook-form';

import '../styles/components/form-container.scss';
import '../styles/components/modal-container.scss';

export default function StaffRatingAddForm(props) {
  const closeRatingModal = props.closeRatingModal;
  const getRatingList = props.getRatingList;

  const {
    register,
    handleSubmit,
    resetField,
    formState: { isValid, isDirty, errors },
  } = useForm();

  const resetData = () => {
    resetField('name');
    resetField('minAge');
  };

  const onSubmit = async (data) => {
    const api = '/movie/rating/add';
    const token = localStorage.getItem('staffToken');
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const formData = new FormData();

    try {
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
          onClick={closeRatingModal}
        ></button>
      </div>
      <div className='title-text-center-container'>등급 추가</div>
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
                defaultValue=''
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
                defaultValue=''
                aria-invalid={
                  !isDirty ? undefined : errors.minAge ? 'true' : 'false'
                }
                {...register('minAge', {
                  required: '제한 나이를 입력해주세요.',
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
                onClick={closeRatingModal}
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
