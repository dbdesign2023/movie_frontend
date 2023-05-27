import React from 'react';
import serverapi from '../services/serverapi';
import { useForm } from 'react-hook-form';

import '../styles/components/form-container.scss';
import '../styles/components/modal-container.scss';

export default function StaffSignUpForm(props) {
  const closeSignUpModal = props.closeSignUpModal;

  const {
    register,
    handleSubmit,
    resetField,
    formState: { isSubmitting, isDirty, errors },
  } = useForm();

  const resetData = () => {
    resetField('name');
    resetField('loginId');
    resetField('password');
  };

  const onSubmit = async (data) => {
    const api = '/admin/signup';
    const formData = new FormData();

    try {
      //console.log('data', data);
      formData.append('name', data.name);
      formData.append('loginId', data.loginId);
      formData.append('password', data.password);
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
      <div className='title-text-center-container'>직원 회원 가입</div>
      <div className='form-container'>
        <form className='staff-signup-form' onSubmit={handleSubmit(onSubmit)}>
          <div className='row'>
            <div className='col-sm-3'>
              <div className='content-text-container'>이름</div>
            </div>
            <div className='col-sm-8'>
              <input
                class='form-control'
                type='text'
                placeholder='이름을 입력하세요'
                aria-invalid={
                  !isDirty ? undefined : errors.name ? 'true' : 'false'
                }
                {...register('name', {
                  required: '이름을 입력해주세요.',
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
            <div className='col-sm-3'>
              <div className='content-text-container'>아이디</div>
            </div>
            <div className='col-sm-8'>
              <input
                class='form-control'
                type='text'
                placeholder='아이디를 입력하세요'
                aria-invalid={
                  !isDirty ? undefined : errors.loginId ? 'true' : 'false'
                }
                {...register('loginId', {
                  required: '아이디를 입력해주세요.',
                })}
              />
              {errors.loginId && (
                <small role='alert' className='input-alert'>
                  {errors.loginId.message}
                </small>
              )}
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-3'>
              <div className='content-text-container'>비밀번호</div>
            </div>
            <div className='col-sm-8'>
              <input
                class='form-control'
                type='password'
                placeholder='비밀번호를 입력하세요'
                aria-invalid={
                  !isDirty ? undefined : errors.password ? 'true' : 'false'
                }
                {...register('password', {
                  required: '비밀번호를 입력해주세요.',
                })}
              />
              {errors.password && (
                <small role='alert' className='input-alert'>
                  {errors.password.message}
                </small>
              )}
            </div>
          </div>
          <div className='bottom-container'>
            <button class='btn btn-secondary' onClick={resetData}>
              초기화
            </button>
            &nbsp; &nbsp; &nbsp;
            <button
              type='submit'
              class='btn btn-success'
              onClick={closeSignUpModal}
              disabled={isSubmitting}
            >
              직원 회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
