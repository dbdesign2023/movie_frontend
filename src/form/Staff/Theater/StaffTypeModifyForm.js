import React, { useState, useContext } from 'react';
import serverapi from '../../../services/serverapi';
import { AuthContext } from '../../../services/AuthContext';
import { useForm } from 'react-hook-form';

import '../../../styles/components/form-container.scss';
import '../../../styles/components/modal-container.scss';

export default function StaffTypeModifyForm(props) {
  const { logout } = useContext(AuthContext);
  const closeTypeModify = props.closeTypeModify;
  const getTypeList = props.getTypeList;
  const type = props.type;

  const [isLoading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid, isDirty, errors },
  } = useForm();

  const resetData = () => {
    setValue('code', type.code);
    setValue('name', type.name);
  };

  const onSubmit = async (data) => {
    const api = '/theater/type/modify';
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
      const updatedData = {
        ...data,
        code: type.code,
      };
      console.log('Request body', updatedData);

      const response = await serverapi.post(api, updatedData, options);
      console.log('response', response.data);

      closeTypeModify();
      alert('수정되었습니다');
      getTypeList();
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
      <div className='btn-close'>
        <button
          type='button'
          className='btn-close'
          aria-label='Close'
          onClick={closeTypeModify}
        ></button>
      </div>
      <div className='title-text-center-container'>상영관 종류 수정</div>
      <div className='form-container'>
        <form className='staff-type-add-form' onSubmit={handleSubmit(onSubmit)}>
          <div className='row'>
            <div className='col-sm-3'>
              <div className='content-text-container'>상영관 종류 코드</div>
            </div>
            <div className='col-sm-9'>
              <span>{type.code}</span>
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-3'>
              <div className='content-text-container'>상영관 종류 이름</div>
            </div>
            <div className='col-sm-9'>
              <input
                className='form-control'
                type='text'
                placeholder='상영관 종류 이름을 입력하세요'
                defaultValue={type.name}
                aria-invalid={
                  !isDirty ? undefined : errors.name ? 'true' : 'false'
                }
                {...register('name', {
                  required: '상영관 종류 이름을 입력해주세요.',
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
              <button
                type='button'
                className='btn btn-secondary'
                onClick={resetData}
              >
                되돌리기
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
                  <span>수정</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
