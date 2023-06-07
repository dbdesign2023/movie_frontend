import React, { useState } from 'react';
import serverapi from '../services/serverapi';
import { useForm } from 'react-hook-form';
import countries from '../constants/country.json';

import '../styles/components/form-container.scss';
import '../styles/components/modal-container.scss';

export default function StaffMovieModifyForm(props) {
  const closeMovieModal = props.closeMovieModal;
  const setMovieList = props.setMovieList;

  const [isLoading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    resetField,
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
    const api = '/movie/movie/register';
    const token = localStorage.getItem('staffToken');
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const formData = new FormData();

    try {
      setLoading(true);
      console.log('Request body', data);
      formData.append('name', data.name);
      formData.append('birthDate', data.birthDate);
      formData.append('profileImage', data.profileImage);
      formData.append('nationality', data.nationality);
      formData.append('info', data.info);
      console.log('Request body', formData);

      const response = await serverapi.post(api, formData, options);
      console.log('response', response.data);

      closeMovieModal();
      alert('인물이 등록되었습니다');
      setMovieList(response.data);
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
          onClick={closeMovieModal}
        ></button>
      </div>
      <div className='title-text-center-container'>인물 추가</div>
      <div className='form-container'>
        <form
          className='staff-movie-add-form'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='row'>
            <div class='col-sm-3'>
              <div className='content-text-container'>이름</div>
            </div>
            <div class='col-sm-9'>
              <input
                class='form-control'
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
            <div class='col-sm-3'>
              <div className='content-text-container'>생년월일</div>
            </div>
            <div class='col-sm-9'>
              <input
                class='form-control'
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
            <div class='col-sm-3'>
              <div className='content-text-container'>사진</div>
            </div>
            <div class='col-sm-9'>
              <input
                class='form-control'
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
            <div class='col-sm-3'>
              <div className='content-text-container'>국적</div>
            </div>
            <div class='col-sm-9'>
              <select
                class='form-select'
                aria-label='Default select example'
                aria-invalid={
                  !isDirty ? undefined : errors.nationality ? 'true' : 'false'
                }
                {...register('nationality', {
                  required: '국적을 선택해주세요.',
                })}
              >
                {Object.entries(countries).map(([key, country]) => {
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
