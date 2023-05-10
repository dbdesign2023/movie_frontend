import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';


export default function StaffLoginForm(props) {
    const setIsStaffLogin = props.setIsStaffLogin

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
          const url = `http://25.14.225.33:8080/admin/signin`;
          formData.append("loginId", data.loginId);
          formData.append("password", data.password);
        console.log('formData', formData);
      const response = await axios.post(url, formData);
          console.log(response.data);
      localStorage.setItem('staffToken', response.data);

      setIsStaffLogin(true);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    <div className='FormContainer'>
      <form className='staff-signup-form' onSubmit={handleSubmit(onSubmit)}>
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
            직원 로그인 신청하기
          </button>
        </div>
      </form>
    </div>
  );
}