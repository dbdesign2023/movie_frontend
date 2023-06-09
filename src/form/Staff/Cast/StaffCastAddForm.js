import React, { useState, useContext } from 'react';
import serverapi from '../../../services/serverapi';
import { AuthContext } from '../../../services/AuthContext';
import { useForm } from 'react-hook-form';
import countries from '../../../constants/country.json';

import '../../../styles/components/form-container.scss';
import '../../../styles/components/modal-container.scss';

export default function StaffCastAddForm(props) {
  const { logout } = useContext(AuthContext);
  const closeCastModal = props.closeCastModal;
  const getCastList = props.getCastList;

  const [isLoading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    resetField,
    setValue,
    formState: { isValid, isDirty, errors },
  } = useForm();

  const resetData = () => {
    resetField('name');
    resetField('birthdate');
    setValue('nationality', 'KR');
    resetField('info');
    resetField('profileImage');
  };

  const onSubmit = async (data) => {
    const api = '/movie/cast/register';
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
      formData.append('name', data.name);
      formData.append('birthDate', data.birthDate);
      formData.append('profileImage', data.profileImage[0]);
      formData.append('nationality', data.nationality);
      formData.append('info', data.info);

      const response = await serverapi.post(api, formData, options);
      console.log('response', response.data);

      closeCastModal();
      alert('인물이 등록되었습니다');
      getCastList();
      resetData();
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
          onClick={closeCastModal}
        ></button>
      </div>
      <div className='title-text-center-container'>인물 추가</div>
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
            <div className='col-sm-3'>
              <div className='content-text-container'>생년월일</div>
            </div>
            <div className='col-sm-9'>
              <input
                className='form-control'
                type='text'
                placeholder='1970-01-01'
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
            <div className='col-sm-3'>
              <div className='content-text-container'>사진</div>
            </div>
            <div className='col-sm-9'>
              <input
                className='form-control'
                type='file'
                aria-invalid={
                  !isDirty ? undefined : errors.profileImage ? 'true' : 'false'
                }
                {...register('profileImage', {
                  required: '이미지 파일을 업로드해주세요.',
                })}
              />
              {errors.profileImage && (
                <small role='alert' className='input-alert'>
                  {errors.profileImage.message}
                </small>
              )}
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
                aria-invalid={
                  !isDirty ? undefined : errors.nationality ? 'true' : 'false'
                }
                {...register('nationality', {
                  required: '국적을 선택해주세요.',
                })}
              >
                {Object.entries(countries).map(([key, country]) => {
                  return (
                    <option key={key} value={key} selected={key === 'KR'}>
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
