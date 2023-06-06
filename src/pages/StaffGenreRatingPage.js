import React, { useEffect, useState } from 'react';
import Modal from 'react-awesome-modal';
import serverapi from '../services/serverapi';
import StaffGenreAddForm from '../form/StaffGenreAddForm';
import StaffRatingAddForm from '../form/StaffRatingAddForm';
import GenreComponent from '../components/GenreComponent';
import RatingComponent from '../components/RatingComponent';

import '../styles/components/page-container.scss';

function StaffGenrePage() {
  const [genreModalOpen, setGenreModalOpen] = useState(false);
  const [genreList, setGenreList] = useState([]);

  useEffect(() => {
    getGenreList();
    /*setGenreList([
      { genreId: 1, name: '1번 장르' },
      { genreId: 2, name: '2번 장르' },
      { genreId: 3, name: '3번 장르' },
    ]);*/
  }, []);

  const getGenreList = async () => {
    const api = '/movie/genre/list';
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

      setGenreList(response.data);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  const showGenreModal = () => {
    setGenreModalOpen(true);
  };

  const closeGenreModal = () => {
    setGenreModalOpen(false);
  };

  return (
    <>
      <div className='add-button-container'>
        <button class='btn btn-success' onClick={showGenreModal}>
          장르 추가
        </button>
        {genreModalOpen && <Modal setGenreModalOpen={showGenreModal} />}
        <Modal
          visible={genreModalOpen}
          effect='fadeInDown'
          onClickAway={closeGenreModal}
        >
          <StaffGenreAddForm
            closeGenreModal={closeGenreModal}
            getGenreList={getGenreList}
          />
        </Modal>
      </div>
      <div className='list-container'>
        <table class='table table-striped'>
          <thead>
            <tr>
              <th scope='col'>코드</th>
              <th scope='col'>이름</th>
              <th scope='col'>삭제</th>
              <th scope='col'>수정</th>
            </tr>
          </thead>
          <tbody>
            {genreList.map((genre) => (
              <GenreComponent
                key={genre.code}
                genre={genre}
                getGenreList={getGenreList}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function StaffRatingPage() {
  const [ratingModalOpen, setRatingModalOpen] = useState(false);
  const [ratingList, setRatingList] = useState([]);

  useEffect(() => {
    getRatingList();
    /*setRatingList([
      { ratingId: 1, name: '11세 미만', minAge: 11 },
      { ratingId: 2, name: '12세 미만', minAge: 12 },
      { ratingId: 3, name: '13세 미만', minAge: 13 },
    ]);*/
  }, []);

  const getRatingList = async () => {
    const api = '/movie/rating/list';
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

      setRatingList(response.data);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  const showRatingModal = () => {
    setRatingModalOpen(true);
  };

  const closeRatingModal = () => {
    setRatingModalOpen(false);
  };

  return (
    <>
      <div className='add-button-container'>
        <button class='btn btn-success' onClick={showRatingModal}>
          등급 추가
        </button>
        {ratingModalOpen && <Modal setRatingModalOpen={showRatingModal} />}
        <Modal
          visible={ratingModalOpen}
          effect='fadeInDown'
          onClickAway={closeRatingModal}
        >
          <StaffRatingAddForm
            closeRatingModal={closeRatingModal}
            getRatingList={getRatingList}
          />
        </Modal>
      </div>
      <div className='list-container'>
        <table class='table table-striped'>
          <thead>
            <tr>
              <th scope='col'>이름</th>
              <th scope='col'>제한 나이</th>
              <th scope='col'>삭제</th>
              <th scope='col'>수정</th>
            </tr>
          </thead>
          <tbody>
            {ratingList.map((rating) => (
              <RatingComponent
                rating={rating}
                getRatingList={getRatingList}
                key={rating.ratingId}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default function StaffGenreRatingPage() {
  return (
    <>
      <div className='row'>
        <div className='col-sm-6'>
          <StaffGenrePage />
        </div>
        <div className='col-sm-6'>
          <StaffRatingPage />
        </div>
      </div>
    </>
  );
}
