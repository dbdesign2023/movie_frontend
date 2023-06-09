import React, { useState } from 'react';
import serverapi from '../../../services/serverapi';
import { useForm } from 'react-hook-form';

import '../../../styles/components/form-container.scss';
import '../../../styles/components/modal-container.scss';

export default function StaffTheaterModfyForm(props) {
  const closeTheaterModify = props.closeTheaterModify;
  const getTheaterList = props.getTheaterList;
  const typeList = props.typeList;
  const theater = props.theater;

  const [isLoading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: theater.name,
      type: theater.typeCode,
      floor: theater.floor,
    },
  });

  const onSubmit = async (data) => {
    if (!data.name || !data.floor) {
      return;
    }

    const api = '/theater/modify';
    const token = localStorage.getItem('staffToken');
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      setLoading(true);
      const updatedData = {
        ...data,
        theaterId: theater.theaterId,
      };
      console.log('Request body', updatedData);

      const response = await serverapi.post(api, updatedData, options);
      console.log('response', response.data);

      closeTheaterModify();
      alert('수정되었습니다');
      getTheaterList();
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
          onClick={closeTheaterModify}
        ></button>
      </div>
      <div className='title-text-center-container'>상영관 수정</div>
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
                defaultValue={theater.name}
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
                {...register('type', {
                  required: '상영관 종류를 선택해주세요.',
                })}
                onChange={(e) => setValue('type', e.target.value)} // 선택된 값으로 setValue 호출
                defaultValue={theater.typeCode} // 초기 선택 값을 설정
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
                defaultValue={theater.floor}
                {...register('floor', {
                  required: '상영 시간을 입력하세요.',
                })}
              />
            </div>
          </div>
          <div className='bottom-container'>
            <div className='button-container'>
              <button type='submit' className='btn btn-success'>
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
