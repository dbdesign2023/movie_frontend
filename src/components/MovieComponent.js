import React, { useState } from 'react';
import Modal from 'react-awesome-modal';
import serverapi from '../services/serverapi';
import StaffImageForm from '../form/StaffImageForm';
import StaffMovieModifyForm from '../form/StaffMovieModifyForm';

export default function MovieComponent(props) {
  const movie = props.movie;
  const setMovieList = props.setMovieList;

  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [movieModifyOpen, setMovieModifyOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const showImageModal = () => {
    setImageModalOpen(true);
  };

  const closeImageModal = () => {
    setImageModalOpen(false);
  };

  const showMovieModify = () => {
    setMovieModifyOpen(true);
  };

  const closeMovieModify = () => {
    setMovieModifyOpen(false);
  };

  const deleteMovie = async (id) => {
    const api = `/movie/movie/delete?id=${id}`;
    const token = localStorage.getItem('staffToken');
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const yesOrNo = window.confirm('인물을 삭제하시겠습니까?');
    if (yesOrNo === false) {
      return;
    }

    try {
      setLoading(true);

      const response = await serverapi.delete(api, options);
      console.log('response', response.data);

      alert('삭제되었습니다');
      setMovieList(response.data);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr key={movie.movieId}>
      <td>{movie.name}</td>
      <td>{movie.director.name}</td>
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
            image={movie.profileImage}
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
            setMovieList={setMovieList}
            movieId={movie.movieId}
          />
        </Modal>
      </td>
      <td>
        <button class='btn btn-danger' onClick={deleteMovie(movie.movieId)}>
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
