import React, { useEffect, useState } from 'react';
import Modal from 'react-awesome-modal';
import serverapi from '../../services/serverapi';
import StaffGenreAddForm from '../../form/Staff/Genre/StaffGenreAddForm';
import StaffRatingAddForm from '../../form/Staff/Rating/StaffRatingAddForm';
import GenreComponent from '../../components/GenreComponent';
import RatingComponent from '../../components/RatingComponent';

import '../../styles/components/page-container.scss';

function StaffGenrePage() {
  const [genreModalOpen, setGenreModalOpen] = useState(false);
  const [genreList, setGenreList] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getGenreList();
  }, []);

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
      setLoading(true);

      const response = await serverapi.get(api, options);
      console.log('response', response.data);

      setGenreList(response.data);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    } finally {
      setLoading(false);
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
        <button className='btn btn-success' onClick={showGenreModal}>
          {isLoading ? (
            <div className='spinner-border' role='status'>
              <span className='sr-only' />
            </div>
          ) : (
            <span>장르 추가</span>
          )}
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
        <table className='table table-striped'>
          <thead>
            <tr>
              <th scope='col'>코드</th>
              <th scope='col'>이름</th>
              <th scope='col'>수정</th>
              <th scope='col'>삭제</th>
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
  const [isLoading2, setLoading2] = useState(false);

  useEffect(() => {
    getRatingList();
  }, []);

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
      setLoading2(true);

      const response = await serverapi.get(api, options);
      console.log('response', response.data);

      setRatingList(response.data);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    } finally {
      setLoading2(false);
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
        <button className='btn btn-success' onClick={showRatingModal}>
          {isLoading2 ? (
            <div className='spinner-border' role='status'>
              <span className='sr-only' />
            </div>
          ) : (
            <span>등급 추가</span>
          )}
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
        <table className='table table-striped'>
          <thead>
            <tr>
              <th scope='col'>코드</th>
              <th scope='col'>이름</th>
              <th scope='col'>수정</th>
              <th scope='col'>삭제</th>
            </tr>
          </thead>
          <tbody>
            {ratingList.map((rating) => (
              <RatingComponent
                key={rating.code}
                rating={rating}
                getRatingList={getRatingList}
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
