import React, { useEffect, useState } from 'react';
import Modal from 'react-awesome-modal';
import serverapi from '../services/serverapi';
import StaffMovieAddForm from '../form/StaffMovieAddForm';
import MovieComponent from '../components/MovieComponent';

import '../styles/components/page-container.scss';

export default function StaffMoviePage() {
  const [movieModalOpen, setMovieModalOpen] = useState(false);
  const [preMovieList, setPreMovieList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getPreMovieList();
  }, []);

  useEffect(() => {
    console.log('movieList', movieList);
  }, [movieList]);

  const getPreMovieList = async () => {
    const api = '/movie/all';
    const token = localStorage.getItem('staffToken');
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      setLoading(true);

      const response = await serverapi.get(api, options);
      console.log('response', response.data);

      const updatedMovieList = response.data.map((movie) => {
        let tmp = new Date(movie.releaseDate);
        movie.releaseDate =
          tmp.getFullYear() +
          '-' +
          (tmp.getMonth() < 9
            ? '0' + (tmp.getMonth() + 1)
            : tmp.getMonth() + 1) +
          '-' +
          (tmp.getDate() < 10 ? '0' + tmp.getDate() : tmp.getDate());
        return movie;
      });

      setPreMovieList(response.data);
      setMovieList(updatedMovieList);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const showMovieModal = () => {
    setMovieModalOpen(true);
  };

  const closeMovieModal = () => {
    setMovieModalOpen(false);
  };

  return (
    <>
      <div className='add-button-container'>
        <button class='btn btn-success' onClick={showMovieModal}>
          {isLoading ? (
            <div className='spinner-border' role='status'>
              <span className='sr-only' />
            </div>
          ) : (
            <span>영화 추가</span>
          )}
        </button>
        {movieModalOpen && <Modal setMovieModalOpen={showMovieModal} />}
        <Modal
          visible={movieModalOpen}
          effect='fadeInDown'
          onClickAway={closeMovieModal}
        >
          <StaffMovieAddForm
            closeMovieModal={closeMovieModal}
            getMovieList={getPreMovieList}
          />
        </Modal>
      </div>
      <div className='list-container'>
        <table class='table table-striped'>
          <thead>
            <tr>
              <th scope='col'>제목</th>
              <th scope='col'>감독</th>
              <th scope='col'>개봉일</th>
              <th scope='col'>포스터 보기</th>
              <th scope='col'>수정</th>
              <th scope='col'>삭제</th>
            </tr>
          </thead>
          <tbody>
            {movieList.map((movie) => {
              return (
                <MovieComponent
                  key={movie.movieId}
                  movie={movie}
                  getMovieList={getPreMovieList}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
