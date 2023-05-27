import React, { useEffect, useState } from 'react';
import serverapi from '../services/serverapi';
import { useForm } from 'react-hook-form';

import '../styles/components/form-container.scss';
import '../styles/components/modal-container.scss';

export default function StaffMypageModifyForm(props) {
  const closeMypageModify = props.closeMypageModify;
  const [info, setInfo] = useState({});

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid, isDirty, errors },
  } = useForm();

  useEffect(() => {
    //getInfo();
    setInfo({ name: 'd', id: 'd', password: 'd' });
  }, []);

  const getInfo = async () => {
    const api = '/movie/rating/list';
    const token = localStorage.getItem('staffToken');
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      console.log('staffToken', token);
      const response = await serverapi.get(api, options);
      console.log('response', response.data);

      setInfo(response.data);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  const resetData = () => {
    setValue('name', info.name);
    setValue('loginId', info.id);
    setValue('password', '');
    setValue('password2', '');
  };

  const onSubmit = async (data) => {
    const api = '/admin/signup';
    const formData = new FormData();

    try {
      //console.log('data', data);

      if (data.password !== data.password2) {
        alert('입력한 비밀번호가 같지 않습니다.');
      } else {
        formData.append('name', data.name);
        formData.append('loginId', data.loginId);
        formData.append('password', data.password);
        console.log('Request body', formData);

        const response = await serverapi.post(api, formData);
        console.log('response', response.data);

        setInfo(response.data);
        resetData();
        closeMypageModify();
      }
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
          onClick={closeMypageModify}
        ></button>
      </div>
      <div className='title-text-center-container'>직원 마이페이지</div>
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
                defaultValue={info.name}
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
              <input class='form-control' value={info.id} />
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
          <div className='row'>
            <div className='col-sm-3'>
              <div className='content-text-container'>비밀번호 확인</div>
            </div>
            <div className='col-sm-8'>
              <input
                class='form-control'
                type='password'
                placeholder='비밀번호를 다시 한 번 입력하세요'
                aria-invalid={
                  !isDirty ? undefined : errors.password2 ? 'true' : 'false'
                }
                {...register('password2', {
                  required: '비밀번호를 다시 한 번 입력해주세요.',
                })}
              />
              {errors.password2 && (
                <small role='alert' className='input-alert'>
                  {errors.password2.message}
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
              disabled={!(isDirty && isValid)}
            >
              수정
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
