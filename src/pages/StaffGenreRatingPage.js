import React, { useEffect, useState } from 'react';
import Modal from 'react-awesome-modal';
import serverapi from '../services/serverapi';
import StaffGenreAddForm from '../form/StaffGenreAddForm';

export default function StaffGenreRatingPage() {
  const [genreModalOpen, setGenreModalOpen] = useState(false);
  const [genreList, setGenreList] = useState([]);

  useEffect(() => {
    getGenreList();
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
          <StaffGenreAddForm closeGenreModal={closeGenreModal} />
        </Modal>
      </div>
      <div className='list-container'>
        <ul class='list-group list-group-flush'>
          {genreList.map((genre) => {
            return <li class='list-group-item'>{genre.name}</li>;
          })}
        </ul>
      </div>
    </>
  );
}
