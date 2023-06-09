import React, { useEffect, useState } from 'react';
import serverapi from '../../../services/serverapi';
import { useForm } from 'react-hook-form';
import countries from '../../../constants/country.json';

import '../../../styles/components/form-container.scss';
import '../../../styles/components/modal-container.scss';

export default function StaffMovieAddForm(props) {
  const closeMovieModal = props.closeMovieModal;
  const getMovieList = props.getMovieList;

  const [castList, setCastList] = useState([]);
  const [ratingList, setRatingList] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    resetField,
    formState: { isValid, isDirty, errors },
  } = useForm();

  useEffect(() => {
    getCastList();
    getRatingList();
    getGenreList();
  }, []);

  const getCastList = async () => {
    const api = '/movie/cast/getList';
    const token = localStorage.getItem('staffToken');
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await serverapi.get(api, options);
      console.log('response', response.data);

      setCastList(response.data);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  const getRatingList = async () => {
    const api = '/movie/rating/list';
    const token = localStorage.getItem('staffToken');
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await serverapi.get(api, options);
      console.log('response', response.data);

      setRatingList(response.data);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  const getGenreList = async () => {
    const api = '/movie/genre/list';
    const token = localStorage.getItem('staffToken');
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await serverapi.get(api, options);
      console.log('response', response.data);

      setGenreList(response.data);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  const handleCheckboxChange = (event) => {
    const genreCode = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      // 선택된 항목을 추가합니다.
      setSelectedGenres((prevSelectedGenres) => [
        ...prevSelectedGenres,
        genreCode,
      ]);
    } else {
      // 선택 해제된 항목을 제외합니다.
      setSelectedGenres((prevSelectedGenres) =>
        prevSelectedGenres.filter((code) => code !== genreCode),
      );
    }
  };

  const resetData = () => {
    resetField('title');
    resetField('releaseDate');
    resetField('runningTime');
    resetField('info');
    resetField('countryCode');
    resetField('language');
    resetField('poster');
    resetField('directorId');
    resetField('ratingCode');
    resetField('genreCodes');
  };

  const onSubmit = async (data) => {
    const api = '/movie/register';
    const token = localStorage.getItem('staffToken');
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const formData = new FormData();

    try {
      setLoading(true);

      console.log(selectedGenres);

      console.log('Request body', data);
      formData.append('title', data.title);
      formData.append('releaseDate', data.releaseDate);
      formData.append('runngingTime', data.runngingTime);
      formData.append('info', data.info);
      formData.append('countryCode', data.countryCode);
      formData.append('language', data.language);
      formData.append('poster', data.poster[0]);
      formData.append('directorId', data.directorId);
      formData.append('ratingCode', data.ratingCode);
      formData.append('genreCodes', selectedGenres);
      console.log('Request body', formData);

      const response = await serverapi.post(api, formData, options);
      console.log('response', response.data);

      closeMovieModal();
      alert('영화가 등록되었습니다');
      getMovieList();
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
          onClick={closeMovieModal}
        ></button>
      </div>
      <div className='title-text-center-container'>영화 추가</div>
      <div className='form-container'>
        <form
          className='staff-movie-add-form'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='row'>
            <div className='col-sm-3'>
              <div className='content-text-container'>제목</div>
            </div>
            <div className='col-sm-9'>
              <input
                className='form-control'
                type='text'
                placeholder='영화 제목을 입력하세요'
                aria-invalid={
                  !isDirty ? undefined : errors.title ? 'true' : 'false'
                }
                {...register('title', {
                  required: '영화 제목을 입력해주세요.',
                })}
              />
              {errors.title && (
                <small role='alert' className='input-alert'>
                  {errors.title.message}
                </small>
              )}
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-3'>
              <div className='content-text-container'>개봉일</div>
            </div>
            <div className='col-sm-9'>
              <input
                className='form-control'
                type='text'
                placeholder='1970-01-01'
                aria-invalid={
                  !isDirty ? undefined : errors.releaseDate ? 'true' : 'false'
                }
                {...register('releaseDate', {
                  required: '개봉일을 입력해주세요.',
                })}
              />
              {errors.releaseDate && (
                <small role='alert' className='input-alert'>
                  {errors.releaseDate.message}
                </small>
              )}
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-3'>
              <div className='content-text-container'>상영 시간</div>
            </div>
            <div className='col-sm-9'>
              <input
                className='form-control'
                type='number'
                placeholder='상영 시간을 입력하세요'
                aria-invalid={
                  !isDirty ? undefined : errors.runngingTime ? 'true' : 'false'
                }
                {...register('runngingTime', {
                  required: '상영 시간을 입력하세요.',
                })}
              />
              {errors.runngingTime && (
                <small role='alert' className='input-alert'>
                  {errors.runngingTime.message}
                </small>
              )}
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
                  !isDirty ? undefined : errors.info ? 'true' : 'false'
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
          <div className='row'>
            <div className='col-sm-3'>
              <div className='content-text-container'>배급사 국가</div>
            </div>
            <div className='col-sm-9'>
              <select
                className='form-select'
                aria-label='Default select example'
                aria-invalid={
                  !isDirty ? undefined : errors.countryCode ? 'true' : 'false'
                }
                {...register('countryCode', {
                  required: '나라를 선택해주세요.',
                })}
              >
                {Object.entries(countries).map(([key, country]) => {
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
              <div className='content-text-container'>언어</div>
            </div>
            <div className='col-sm-9'>
              <input
                className='form-control'
                type='text'
                placeholder='언어를 입력하세요'
                aria-invalid={
                  !isDirty ? undefined : errors.language ? 'true' : 'false'
                }
                {...register('language', {
                  required: '언어를 입력하세요.',
                })}
              />
              {errors.language && (
                <small role='alert' className='input-alert'>
                  {errors.language.message}
                </small>
              )}
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-3'>
              <div className='content-text-container'>포스터</div>
            </div>
            <div className='col-sm-9'>
              <input
                className='form-control'
                type='file'
                aria-invalid={
                  !isDirty ? undefined : errors.poster ? 'true' : 'false'
                }
                {...register('poster', {
                  required: '이미지 파일을 업로드해주세요.',
                })}
              />
              {errors.poster && (
                <small role='alert' className='input-alert'>
                  {errors.poster.message}
                </small>
              )}
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-3'>
              <div className='content-text-container'>감독</div>
            </div>
            <div className='col-sm-9'>
              <select
                className='form-select'
                aria-label='Default select example'
                aria-invalid={
                  !isDirty ? undefined : errors.directorId ? 'true' : 'false'
                }
                {...register('directorId', {
                  required: '감독을 선택해주세요.',
                })}
              >
                {castList.map((cast) => {
                  return (
                    <option key={cast.castId} value={cast.castId}>
                      {cast.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-3'>
              <div className='content-text-container'>등급</div>
            </div>
            <div className='col-sm-9'>
              <select
                className='form-select'
                aria-label='Default select example'
                aria-invalid={
                  !isDirty ? undefined : errors.ratingCode ? 'true' : 'false'
                }
                {...register('ratingCode', {
                  required: '상영 등급을 선택해주세요.',
                })}
              >
                {ratingList.map((rating) => {
                  return (
                    <option key={rating.code} value={rating.code}>
                      {rating.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-3'>
              <div className='content-text-container'>장르</div>
            </div>
            <div className='col-sm-9'>
              {genreList.map((genre) => {
                return (
                  <div key={genre.code} className='form-check'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      value={genre.code}
                      id={genre.code}
                      name='genreCodes'
                      onChange={handleCheckboxChange}
                      checked={selectedGenres.includes(genre.code)}
                    />
                    <label className='form-check-label' htmlFor={genre.code}>
                      {genre.name}
                    </label>
                  </div>
                );
              })}
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
