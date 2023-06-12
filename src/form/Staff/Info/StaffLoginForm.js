import React, { useContext, useState } from 'react';
import serverapi from '../../../services/serverapi';
import { AuthContext } from '../../../services/AuthContext';
import { useForm } from 'react-hook-form';

import '../../../styles/components/form-container.scss';
import '../../../styles/components/modal-container.scss';

export default function StaffLoginForm(props) {
  const { logout } = useContext(AuthContext);
  const closeLoginModal = props.closeLoginModal;

  const [isLoading, setLoading] = useState(false);

  const value = useContext(AuthContext);
  const setIsStaffLogin = value.setIsStaffLogin;

  const {
    register,
    handleSubmit,
    resetField,
    formState: { isValid, isDirty, errors },
  } = useForm();

  const resetData = () => {
    resetField('loginId');
    resetField('password');
  };

  const onSubmit = async (data) => {
    const api = '/admin/signin';

    try {
      setLoading(true);
      console.log('data', data);

      const response = await serverapi.post(api, data);
      console.log('response', response.data);

      closeLoginModal();
      alert('로그인 되었습니다');
      resetData();
      window.location.reload("");
      localStorage.setItem('staffToken', response.data);
      setIsStaffLogin(true);
      console.log("localStorage['staffToken']", localStorage['staffToken']);
    } catch (error) {
      if (error.response.data === undefined) {
        logout();
        alert('토큰이 만료되었습니다. 다시 로그인해주세요.');
      } else {
        console.log(error);
        alert(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='modal-container'>
      <div className='title-text-center-container'>직원 로그인</div>
      <div className='form-container'>
        <form className='staff-login-form' onSubmit={handleSubmit(onSubmit)}>
          <div className='row'>
            <div className='col-sm-3'>
              <div className='content-text-container'>아이디</div>
            </div>
            <div className='col-sm-8'>
              <input
                className='form-control'
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
                className='form-control'
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
                <span>직원 로그인</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
