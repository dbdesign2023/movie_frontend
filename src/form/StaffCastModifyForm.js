import React, { useEffect, useState } from 'react';
import serverapi from '../services/serverapi';
import { useForm } from 'react-hook-form';
import countries from '../constants/country.json';

import '../styles/components/form-container.scss';
import '../styles/components/modal-container.scss';

export default function StaffCastModifyForm(props) {
  const closeCastModify = props.closeCastModify;
  const getCastList = props.getCastList;
  const castId = props.castId;

  const [info, setInfo] = useState({});
  const [isLoading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid, isDirty, errors },
  } = useForm();

  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    const api = `/movie/cast/detail?castId=${castId}`;
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

      let tmp = new Date(info.birthDate);
      info.birthDate =
        tmp.getFullYear() +
        '-' +
        (tmp.getMonth() < 10
          ? '0' + (tmp.getMonth() + 1)
          : tmp.getMonth() + 1) +
        '-' +
        (tmp.getDate() < 10 ? '0' + tmp.getDate() : tmp.getDate()) +
        ' ' +
        (tmp.getHours() < 10 ? '0' + tmp.getHours() : tmp.getHours()) +
        ':' +
        (tmp.getMinutes() < 10 ? '0' + tmp.getMinutes() : tmp.getMinutes()) +
        ':' +
        (tmp.getSeconds() < 10 ? '0' + tmp.getSeconds() : tmp.getSeconds());
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  const resetData = () => {
    setValue('name', info.name);
    setValue('birthDate', info.birthDate);
    setValue('nationality', info.nationality);
    setValue('info', info.info);
    setValue('profileImage', null);
  };

  const onSubmit = async (data) => {
    const api = '/movie/cast/modify';
    const token = localStorage.getItem('staffToken');
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
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
          class='btn-close'
          aria-label='Close'
          onClick={closeCastModify}
        ></button>
      </div>
      <div className='title-text-center-container'>인물 수정</div>
      <div className='form-container'>
        <form className='staff-cast-add-form' onSubmit={handleSubmit(onSubmit)}>
          <div className='row'>
            <div class='col-sm-3'>
              <div className='content-text-container'>이름</div>
            </div>
            <div class='col-sm-9'>
              <input
                class='form-control'
                type='text'
                placeholder='인물 이름을 입력하세요'
                defaultValue={info.name}
                aria-invalid={
                  !isDirty ? undefined : errors.name ? 'true' : 'false'
                }
                {...register('name', {
                  required: '인물 이름을 입력해주세요.',
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
            <div class='col-sm-3'>
              <div className='content-text-container'>생년월일</div>
            </div>
            <div class='col-sm-9'>
              <input
                class='form-control'
                type='text'
                placeholder='1970-01-01'
                defaultValue={info.birthDate}
                aria-invalid={
                  !isDirty ? undefined : errors.birthDate ? 'true' : 'false'
                }
                {...register('birthDate', {
                  required: '생년월일을 입력해주세요.',
                })}
              />
              {errors.birthDate && (
                <small role='alert' className='input-alert'>
                  {errors.birthDate.message}
                </small>
              )}
            </div>
          </div>
          <div className='row'>
            <div class='col-sm-3'>
              <div className='content-text-container'>사진</div>
            </div>
            <div class='col-sm-9'>
              <input
                class='form-control'
                type='file'
                placeholder={info.fileName}
                {...register('profileImage')}
              />
              {errors.profileImage && (
                <small role='alert' className='input-alert'>
                  {errors.profileImage.message}
                </small>
              )}
            </div>
          </div>
          <div className='row'>
            <div class='col-sm-3'>
              <div className='content-text-container'>국적</div>
            </div>
            <div class='col-sm-9'>
              <select
                class='form-select'
                aria-label='Default select example'
                defaultValue={info.nationality}
                aria-invalid={
                  !isDirty ? undefined : errors.nationality ? 'true' : 'false'
                }
                {...register('nationality', {
                  required: '국적을 선택해주세요.',
                })}
              >
                {Object.entries(countries).map(([key, country]) => {
                  if (key === info.nationality)
                    return (
                      <option value={key} selected>
                        {country.CountryNameKR}
                      </option>
                    );
                  else
                    return <option value={key}>{country.CountryNameKR}</option>;
                })}
              </select>
            </div>
          </div>
          <div className='row'>
            <div class='col-sm-3'>
              <div className='content-text-container'>설명</div>
            </div>
            <div class='col-sm-9'>
              <textarea
                class='form-control'
                rows='3'
                defaultValue={info.info}
                aria-invalid={
                  !isDirty ? undefined : errors.nationality ? 'true' : 'false'
                }
                {...register('info', {
                  required: '인물 설명을 입력해주세요',
                })}
              />
              {errors.info && (
                <small role='alert' className='input-alert'>
                  {errors.info.message}
                </small>
              )}
            </div>
          </div>
          <div className='bottom-container'>
            <div className='button-container'>
              <button class='btn btn-secondary' onClick={resetData}>
                초기화
              </button>
              &nbsp; &nbsp; &nbsp;
              <button
                type='submit'
                class='btn btn-success'
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
