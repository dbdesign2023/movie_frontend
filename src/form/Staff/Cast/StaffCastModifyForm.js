import React, { useState } from 'react';
import serverapi from '../../../services/serverapi';
import { useForm } from 'react-hook-form';
import countries from '../../../constants/country.json';

import '../../../styles/components/form-container.scss';
import '../../../styles/components/modal-container.scss';

export default function StaffCastModifyForm(props) {
  const closeCastModify = props.closeCastModify;
  const getCastList = props.getCastList;
  const info = props.info;

  const [isLoading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: info.name,
      birthDate: info.birthDate,
      profileImage: null,
      nationality: info.nationality,
      info: info.info,
    },
  });

  const onSubmit = async (data) => {
    if (!data.name || !data.birthDate || !data.info) {
      return;
    }

    const api = '/movie/cast/modify';
    const token = localStorage.getItem('staffToken');
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
        'ngrok-skip-browser-warning': true,
      },
    };
    const formData = new FormData();

    try {
      setLoading(true);
      console.log('Request body', data);
      formData.append('castId', info.castId);
      formData.append('name', data.name);
      formData.append('birthDate', data.birthDate);
      if (data.profileImage !== null)
        formData.append('profileImage', data.profileImage[0]);
      formData.append('nationality', data.nationality);
      formData.append('info', data.info);

      const response = await serverapi.post(api, formData, options);
      console.log('response', response.data);

      closeCastModify();
      alert('인물이 수정되었습니다');
      getCastList();
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
          onClick={closeCastModify}
        ></button>
      </div>
      <div className='title-text-center-container'>인물 수정</div>
      <div className='form-container'>
        <form className='staff-cast-add-form' onSubmit={handleSubmit(onSubmit)}>
          <div className='row'>
            <div className='col-sm-3'>
              <div className='content-text-container'>이름</div>
            </div>
            <div className='col-sm-9'>
              <input
                className='form-control'
                type='text'
                placeholder='인물 이름을 입력하세요'
                defaultValue={info.name}
                {...register('name', {
                  required: '인물 이름을 입력해주세요.',
                })}
              />
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-3'>
              <div className='content-text-container'>생년월일</div>
            </div>
            <div className='col-sm-9'>
              <input
                className='form-control'
                type='text'
                placeholder='1970-01-01'
                defaultValue={info.birthDate}
                {...register('birthDate', {
                  required: '생년월일을 입력해주세요.',
                })}
              />
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-3'>
              <div className='content-text-container'>사진</div>
            </div>
            <div className='col-sm-9'>
              <input
                className='form-control'
                type='file'
                {...register('profileImage')}
              />
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-3'>
              <div className='content-text-container'>국적</div>
            </div>
            <div className='col-sm-9'>
              <select
                className='form-select'
                aria-label='Default select example'
                defaultValue={info.nationality}
                {...register('nationality', {
                  required: '국적을 선택해주세요.',
                })}
              >
                {Object.entries(countries).map(([key, country]) => {
                  if (key === info.nationality)
                    return (
                      <option key={key} value={key} selected>
                        {country.CountryNameKR}
                      </option>
                    );
                  else
                    return (
                      <option key={key} value={key}>
                        {country.CountryNameKR}
                      </option>
                    );
                })}
              </select>
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-3'>
              <div className='content-text-container'>설명</div>
            </div>
            <div className='col-sm-9'>
              <textarea
                className='form-control'
                rows='3'
                defaultValue={info.info}
                {...register('info', {
                  required: '인물 설명을 입력해주세요',
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
