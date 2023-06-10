import React, { useEffect, useState } from 'react';
import serverapi from '../../../services/serverapi';
import { useForm } from 'react-hook-form';
import countries from '../../../constants/country.json';

import '../../../styles/components/form-container.scss';
import '../../../styles/components/modal-container.scss';

export default function StaffMovieModifyForm(props) {
  const closeMovieModify = props.closeMovieModify;
  const getMovieList = props.getMovieList;
  const info = props.info;

  const [castList, setCastList] = useState([]);
  const [ratingList, setRatingList] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: info.title,
      releaseDate: info.releaseDate,
      runningTime: info.runningTime,
      info: info.info,
      poster: null,
      countryCode: info.countryCode,
      language: info.language,
      directorId: info.directorId,
      ratingCode: info.ratingCode,
      genreCodes: info.genreCodes,
    },
  });

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
        'Access-Control-Allow-Origin': '*',
        'ngrok-skip-browser-warning': true,
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
        'Access-Control-Allow-Origin': '*',
        'ngrok-skip-browser-warning': true,
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
        'Access-Control-Allow-Origin': '*',
        'ngrok-skip-browser-warning': true,
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

  const onSubmit = async (data) => {
    const api = '/movie/modify';
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

      console.log(selectedGenres);

      console.log('Request body', data);
      formData.append('title', data.title);
      formData.append('releaseDate', data.releaseDate);
      formData.append('runngingTime', data.runngingTime);
      formData.append('info', data.info);
      formData.append('countryCode', data.countryCode);
      formData.append('language', data.language);
      if (data.poster !== null) formData.append('poster', data.poster[0]);
      formData.append('directorId', data.directorId);
      formData.append('ratingCode', data.ratingCode);
      formData.append('genreCodes', selectedGenres);

      const response = await serverapi.post(api, formData, options);
      console.log('response', response.data);

      closeMovieModify();
      alert('영화가 수정되었습니다');
      getMovieList();
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
          onClick={closeMovieModify}
        ></button>
      </div>
      <div className='title-text-center-container'>영화 수정</div>
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
                defaultValue={info.title}
                {...register('title', {
                  required: '영화 제목을 입력해주세요.',
                })}
              />
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
                defaultValue={info.releaseDate}
                {...register('releaseDate', {
                  required: '개봉일을 입력해주세요.',
                })}
              />
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
                defaultValue={info.runningTime}
                {...register('runngingTime', {
                  required: '상영 시간을 입력하세요.',
                })}
              />
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
          <div className='row'>
            <div className='col-sm-3'>
              <div className='content-text-container'>배급사 국가</div>
            </div>
            <div className='col-sm-9'>
              <select
                className='form-select'
                aria-label='Default select example'
                {...register('countryCode', {
                  required: '나라를 선택해주세요.',
                })}
              >
                {Object.entries(countries).map(([key, country]) => {
                  if (key === info.countryCode)
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
              <div className='content-text-container'>언어</div>
            </div>
            <div className='col-sm-9'>
              <input
                className='form-control'
                type='text'
                defaultValue={info.language}
                placeholder='언어를 입력하세요'
                {...register('language', {
                  required: '언어를 입력하세요.',
                })}
              />
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
                {...register('poster')}
              />
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
                {...register('directorId', {
                  required: '감독을 선택해주세요.',
                })}
              >
                {castList.map((cast) => {
                  if (cast.castId === info.directorId)
                    return (
                      <option key={cast.castId} value={cast.castId} selected>
                        {cast.name}
                      </option>
                    );
                  else
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
                {...register('ratingCode', {
                  required: '상영 등급을 선택해주세요.',
                })}
              >
                {ratingList.map((rating) => {
                  if (rating.code === info.ratingCode)
                    return (
                      <option key={rating.code} value={rating.code} selected>
                        {rating.name}
                      </option>
                    );
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
