import React from 'react';
import serverapi from '../services/serverapi';
import { useForm } from 'react-hook-form';

import '../styles/components/form-container.scss';
import '../styles/components/modal-container.scss';

export default function StaffSignUpForm(props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty, errors },
  } = useForm();

  const onSubmit = async (data) => {
    const api = '/user/signup';
    const formData = new FormData();

    const resetForm = () => {
      reset;
    };

    try {
      //console.log('data', data);
      formData.append('name', data.name);
      formData.append('loginId', data.loginId);
      formData.append('password', data.password);
      console.log('formData', formData);

      const response = await serverapi.post(api, formData);
      console.log(response.data);
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
                type='text'
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
            <button
              type='submit'
              class='btn btn-secondary'
              onClick={props.closSignUpModal && resetForm}
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
