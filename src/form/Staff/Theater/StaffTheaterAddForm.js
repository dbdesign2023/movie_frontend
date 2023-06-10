import React, { useEffect, useState } from 'react';
import serverapi from '../../../services/serverapi';
import { useForm } from 'react-hook-form';

import '../../../styles/components/form-container.scss';
import '../../../styles/components/modal-container.scss';

export default function StaffTheaterAddForm(props) {
  const closeTheaterModal = props.closeTheaterModal;
  const getTheaterList = props.getTheaterList;
  const typeList = props.typeList;

  const [isLoading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    resetField,
    formState: { isValid, isDirty, errors },
  } = useForm();

  useEffect(() => {
    console.log('typeList', typeList);
  }, [typeList]);

  if (!typeList) return;

  const resetData = () => {
    resetField('name');
    setValue('type', 'TH001');
    resetField('floor');
  };

  const onSubmit = async (data) => {
    const api = '/theater/register';
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

      closeTheaterModal();
      alert('상영관이 등록되었습니다');
      getTheaterList();
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
          onClick={closeTheaterModal}
        ></button>
      </div>
      <div className='title-text-center-container'>상영관 추가</div>
      <div className='form-container'>
        <form
          className='staff-theater-add-form'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='row'>
            <div className='col-sm-3'>
              <div className='content-text-container'>상영관 이름</div>
            </div>
            <div className='col-sm-9'>
              <input
                className='form-control'
                type='text'
                placeholder='상영관 이름을 입력하세요'
                aria-invalid={
                  !isDirty ? undefined : errors.name ? 'true' : 'false'
                }
                {...register('name', {
                  required: '상영관 이름을 입력해주세요.',
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
              <div className='content-text-container'>상영관 종류</div>
            </div>
            <div className='col-sm-9'>
              <select
                className='form-select'
                aria-label='Default select example'
                aria-invalid={
                  !isDirty ? undefined : errors.type ? 'true' : 'false'
                }
                {...register('type', {
                  required: '상영관 종류를 선택해주세요.',
                })}
              >
                {typeList.map((type) => {
                  return (
                    <option key={type.code} value={type.code}>
                      {type.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-3'>
              <div className='content-text-container'>위치(층)</div>
            </div>
            <div className='col-sm-9'>
              <input
                className='form-control'
                type='number'
                placeholder='위치(층)을 입력하세요'
                aria-invalid={
                  !isDirty ? undefined : errors.floor ? 'true' : 'false'
                }
                {...register('floor', {
                  required: '상영 시간을 입력하세요.',
                })}
              />
              {errors.floor && (
                <small role='alert' className='input-alert'>
                  {errors.floor.message}
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
