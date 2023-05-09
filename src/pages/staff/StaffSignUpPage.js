import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

function StaffSignupForm() {
  const [role, setRole] = useState('');

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      data.role = role;
      console.log('data', data);

      await new Promise((r) => setTimeout(r, 1000));
      const url = `http://25.14.225.33.:8080/admin/signup`;
      const response = await axios.post(url, data);
      console.log(response.data);
      alert(
        '회원가입 신청이 완료되었습니다. 승인이 완료되면 로그인이 가능합니다.',
      );
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    <div className='staff-signup-form-container'>
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
// 직원이 등록된 영화 목록을 확인하는 페이지
export default function StaffSignUpPage() {
  return <StaffSignupForm />;
}
