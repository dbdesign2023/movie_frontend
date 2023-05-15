import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';

export default function StaffSignupForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      console.log('data', data);
      await new Promise((r) => setTimeout(r, 100));
      const url = `http://183.96.25.218/admin/signup`;
      formData.append('name', data.name);
      formData.append('loginId', data.loginId);
      formData.append('password', data.password);
      console.log('formData', formData);
      const response = await axios.post(url, formData);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    <div className='FormContainer'>
      <form className='staff-signup-form' onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='name'>이름</label>
        <input
          id='name'
          type='text'
          name='name'
          placeholder='이름'
          aria-invalid={!isDirty ? undefined : errors.name ? 'true' : 'false'}
          {...register('name', {
            required: '이름을 입력해주세요.',
          })}
        />
        {errors.name && (
          <small role='alert' className='input-alert'>
            {errors.name.message}
          </small>
        )}
        <label htmlFor='loginId'>아이디</label>
        <input
          id='loginId'
          type='text'
          name='loginId'
          placeholder='아이디'
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
        <label htmlFor='password'>비밀번호</label>
        <input
          id='password'
          type='text'
          name='password'
          placeholder='비밀번호'
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
        <div className='signup-button-container'>
          <button
            className='signup-button'
            type='submit'
            disabled={isSubmitting}
          >
            직원 회원가입 신청하기
          </button>
        </div>
      </form>
    </div>
  );
}
