import React, { useEffect } from 'react';
import Modal from 'react-awesome-modal';
import { useState } from 'react';
import '../styles/components/modal-container.scss';
import '../styles/components/form-container.scss';
import '../styles/components/page-container.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from './axios';

export default function CustomerMovieListForm() {
  const ip = baseUrl;
  const posterurl = ip + `/api/posters?fileName=`;
  const [allmovie, setAllmovie] = useState();
  const [ticketing, setTicketingOpen] = useState(false);
  const [movie, setMovie] = useState();
  const [moviedetail, setMoviedetail] = useState();
  const getmoviedata = async () => {
    try {
      const url = ip + `/schedule/allMovie`;
      const token = localStorage.getItem('customerToken');
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          'ngrok-skip-browser-warning': true,
        },
      };
      const response = await axios.get(url, header);
      setAllmovie(response.data);
    } catch (error) {
      if (error.response.data.message) alert(error.response.data.message);
      else alert('알수 없는 에러.');
    }
  };
  useEffect(() => {
    getmoviedata();
  }, []);
  useEffect(() => {
    if (movie) {
      getMoviedetail(movie);
    }
  }, [movie]);
  useEffect(() => {
    if (moviedetail) {
      showModal();
    }
  }, [moviedetail]);
  const showModal = () => {
    setTicketingOpen(true);
  };
  const closeModal = () => {
    setTicketingOpen(false);
  };
  function clickHandler() {
    setMovie(this);
    setTimeout(() => {
      if (moviedetail) {
        showModal();
      }
    }, 200);
  }
  const getMoviedetail = async (movie) => {
    try {
      const url = ip + `/movie/detail?id=` + movie.movieId;
      const token = localStorage.getItem('customerToken');
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          'ngrok-skip-browser-warning': true,
        },
      };
      const response = await axios.get(url, header);
      let data = response.data;
      let tmp = new Date(data.releaseDate);
      data.releaseDate =
        tmp.getFullYear() +
        '-' +
        (tmp.getMonth() < 10
          ? '0' + (tmp.getMonth() + 1)
          : tmp.getMonth() + 1) +
        '-' +
        (tmp.getDate() < 10 ? '0' + tmp.getDate() : tmp.getDate());
      tmp = new Date(data.director.birthDate);
      data.director.birthDate =
        tmp.getFullYear() +
        '-' +
        (tmp.getMonth() < 10
          ? '0' + (tmp.getMonth() + 1)
          : tmp.getMonth() + 1) +
        '-' +
        (tmp.getDate() < 10 ? '0' + tmp.getDate() : tmp.getDate());
      let genrestring = '';
      data.genreList.map((item) => {
        if (genrestring === '') {
          genrestring += item;
        } else {
          genrestring += ', ' + item;
        }
      });
      data.genrestring = genrestring;
      setMoviedetail(data);
    } catch (error) {
      if (error.response.data.message) alert(error.response.data.message);
      else alert('알수 없는 에러.');
    }
  };
  const navigate = useNavigate();
  const gototicketingpage = () => {
    localStorage.setItem('movie', JSON.stringify(moviedetail));
    navigate('/schedulewithmovie');
  };
  const gotodetailpage = () => {
    localStorage.setItem('detailmovie', JSON.stringify(moviedetail));
    navigate('/moviedetail');
  };
  const moviedetailpage = () => {
    if (moviedetail) {
      return (
        <Modal visible={ticketing} effect='fadeInDown' onClickAway={closeModal}>
          <div className='modal-container'>
            <div className='title-text-center-container'>{movie.title}</div>
            <div className='form-container'>
              <div className='row'>
                <div className='w-50'>
                  <h3 className='row'>감독: {moviedetail.director.name}</h3>
                  <h3 className='row'>언어: {moviedetail.language}</h3>
                </div>
                <div className='w-50'>
                  <div>{movie.rating}</div>
                </div>
              </div>
              <img
                src={posterurl + moviedetail.poster.fileName}
                style={{ width: 400 }}
                alt='poster_image'
              />
              <h4>{moviedetail.info}</h4>
              <div className='bottom-container'>
                <div className='button-container'>
                  <button
                    type='button'
                    className='btn btn-primary m-1'
                    onClick={gotodetailpage}
                  >
                    영화 상세정보 보기
                  </button>
                  <button
                    type='button'
                    className='btn btn-primary m-1'
                    onClick={gototicketingpage}
                  >
                    예매하러 가기
                  </button>
                  <button
                    type='button'
                    className='btn btn-secondary m-1'
                    onClick={closeModal}
                  >
                    닫기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      );
    }
  };
  return (
    <div className='movie-list-form-container'>
      <div className='title-text-container'>영화 목록</div>
      <div>
        <div className='row'>
          {allmovie &&
            allmovie.map((item) => (
              <div key={item.movieId} className='w-25'>
                <button
                  key={item.movieId}
                  className='btn btn-white'
                  onClick={clickHandler.bind(item)}
                >
                  <img
                    src={posterurl + item.fileName}
                    className='w-100'
                    alt='poster_image'
                  />
                  <h4>{item.title}</h4>
                </button>
              </div>
            ))}
        </div>
      </div>
      {moviedetailpage()}
    </div>
  );
}
