import React from 'react';
import serverapi from '../services/serverapi';
import { useForm } from 'react-hook-form';

import '../styles/components/form-container.scss';
import '../styles/components/modal-container.scss';

export default function StaffCastModifyForm(props) {
  const closeCastModify = props.closeCastModify;
  const setCastList = props.setCastList;
  const cast = props.cast;

  const {
    register,
    handleSubmit,
    resetField,
    setValue,
    formState: { isValid, isDirty, errors },
  } = useForm();

  const resetData = () => {
    resetField('name');
    resetField('birthdate');
    resetField('nationality');
    resetField('info');
  };

  const onSubmit = async (data) => {
    const api = '/movie/cast/add';
    const formData = new FormData();
    try {
      formData.append('name', data.name);
      formData.append('birthdate', data.birthdate);
      formData.append('nationality', data.nationality);
      formData.append('info', data.info);
      console.log('Request body', formData);

      const response = await serverapi.post(api, formData);
      console.log('response', response.data);

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
          onClick={closeCastModify}
        ></button>
      </div>
      <div className='title-text-center-container'>인물 추가</div>
      <div className='form-container'>
        <form className='staff-cast-add-form' onSubmit={handleSubmit(onSubmit)}>
          <div className='row'>
            <div class='col-sm-3'>
              <div className='content-text-container'>이름</div>
            </div>
            <div class='col-sm-9'>
              <input
                class='form-control'
                type='text'
                placeholder='등급 이름을 입력하세요'
                aria-invalid={
                  !isDirty ? undefined : errors.password ? 'true' : 'false'
                }
                {...register('name', {
                  required: '등급 이름을 입력해주세요.',
                })}
              />
            </div>
          </div>
          <div className='row'>
            <div class='col-sm-3'>
              <div className='content-text-container'>생년월일</div>
            </div>
            <div class='col-sm-9'>
              <input
                class='form-control'
                type='number'
                placeholder='생년월일을 입력하세요'
                aria-invalid={
                  !isDirty ? undefined : errors.password ? 'true' : 'false'
                }
                {...register('birthdate', {
                  required: '생년월일을 입력해주세요.',
                })}
              />
            </div>
          </div>
          <div className='row'>
            <div class='col-sm-3'>
              <div className='content-text-container'></div>
            </div>
            <div class='col-sm-9'>
              <input
                class='form-control'
                type='text'
                placeholder='등급 이름을 입력하세요'
                aria-invalid={
                  !isDirty ? undefined : errors.password ? 'true' : 'false'
                }
                {...register('name', {
                  required: '등급 이름을 입력해주세요.',
                })}
              />
            </div>
          </div>
          <div className='row'>
            <div class='col-sm-3'>
              <div className='content-text-container'>이름</div>
            </div>
            <div class='col-sm-9'>
              <input
                class='form-control'
                type='text'
                placeholder='등급 이름을 입력하세요'
                aria-invalid={
                  !isDirty ? undefined : errors.password ? 'true' : 'false'
                }
                {...register('name', {
                  required: '등급 이름을 입력해주세요.',
                })}
              />
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
                onClick={closeCastModify}
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
