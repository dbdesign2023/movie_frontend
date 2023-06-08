import React, { useState } from 'react';
import Modal from 'react-awesome-modal';
import serverapi from '../services/serverapi';
import StaffImageForm from '../form/StaffImageForm';
import StaffMovieModifyForm from '../form/StaffMovieModifyForm';

export default function MovieComponent(props) {
  const movie = props.movie;
  const getMovieList = props.getMovieList;

  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [movieModifyOpen, setMovieModifyOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [info, setInfo] = useState({});

  const getInfo = async () => {
    const api = `/movie/detail?id=${parseInt(movie.movieId, 10)}`;
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

      const modifiedData = { ...response.data };
      let tmp = new Date(modifiedData.releaseDate);
      modifiedData.releaseDate =
        tmp.getFullYear() +
        '-' +
        (tmp.getMonth() < 9 ? '0' + (tmp.getMonth() + 1) : tmp.getMonth() + 1) +
        '-' +
        (tmp.getDate() < 10 ? '0' + tmp.getDate() : tmp.getDate());

      setInfo(modifiedData);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  const showImageModal = () => {
    setImageModalOpen(true);
    getInfo();
  };

  const closeImageModal = () => {
    setImageModalOpen(false);
  };

  const showMovieModify = () => {
    setMovieModifyOpen(true);
    getInfo();
  };

  const closeMovieModify = () => {
    setMovieModifyOpen(false);
  };

  const deleteMovie = async (id) => {
    const api = `/movie/delete?id=${id}`;
    const token = localStorage.getItem('staffToken');
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const yesOrNo = window.confirm('영화를 삭제하시겠습니까?');
    if (yesOrNo === false) {
      return;
    }

    try {
      setLoading(true);

      const response = await serverapi.delete(api, options);
      console.log('response', response.data);

      alert('삭제되었습니다');
      getMovieList();
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr key={movie.movieId}>
      <td>{movie.title}</td>
      <td>{movie.directorName}</td>
      <td>{movie.releaseDate}</td>
      <td>
        <button class='btn btn-warning' onClick={showImageModal}>
          포스터
        </button>
        {imageModalOpen && <Modal setImageModalOpen={showImageModal} />}
        <Modal
          visible={imageModalOpen}
          effect='fadeInDown'
          onClickAway={closeImageModal}
        >
          <StaffImageForm
            closeImageModal={closeImageModal}
            fileURL='/api/posters?fileName='
            info={info}
          />
        </Modal>
      </td>
      <td>
        <button class='btn btn-warning' onClick={showMovieModify}>
          수정
        </button>
        {movieModifyOpen && <Modal setMovieModifyOpen={showMovieModify} />}
        <Modal
          visible={movieModifyOpen}
          effect='fadeInDown'
          onClickAway={closeMovieModify}
        >
          <StaffMovieModifyForm
            closeMovieModify={closeMovieModify}
            getMovieList={getMovieList}
            info={info}
          />
        </Modal>
      </td>
      <td>
        <button
          class='btn btn-danger'
          onClick={() => deleteMovie(movie.movieId)}
        >
          {isLoading ? (
            <div className='spinner-border' role='status'>
              <span className='sr-only' />
            </div>
          ) : (
            <span>삭제</span>
          )}
        </button>
      </td>
    </tr>
  );
}
