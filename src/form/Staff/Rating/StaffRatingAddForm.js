import React, { useState } from 'react';
import serverapi from '../../../services/serverapi';
import { useForm } from 'react-hook-form';

import '../../../styles/components/form-container.scss';
import '../../../styles/components/modal-container.scss';

export default function StaffRatingAddForm(props) {
  const closeRatingModal = props.closeRatingModal;
  const getRatingList = props.getRatingList;
  const [isLoading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    resetField,
    formState: { isValid, isDirty, errors },
  } = useForm();

  const resetData = () => {
    resetField('code');
    resetField('name');
  };

  const onSubmit = async (data) => {
    const api = '/movie/rating/add';
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

      closeRatingModal();
      alert('장르가 등록되었습니다');
      getRatingList();
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
            <div className='col-sm-3'>
              <div className='content-text-container'>등급 코드</div>
            </div>
            <div className='col-sm-9'>
              <input
                className='form-control'
                type='text'
                placeholder='RT000'
                defaultValue=''
                aria-invalid={
                  !isDirty ? undefined : errors.code ? 'true' : 'false'
                }
                {...register('code', {
                  required: '등급 코드를 입력해주세요.',
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
            <div className='col-sm-3'>
              <div className='content-text-container'>등급 이름</div>
            </div>
            <div className='col-sm-9'>
              <input
                className='form-control'
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
