import React, { useState } from 'react';
import Modal from 'react-awesome-modal';
import serverapi from '../services/serverapi';
import StaffGenreModifyForm from '../form/StaffGenreModifyForm';

export default function GenreComponent(props) {
  const genre = props.genre;
  const getGenreList = props.getGenreList;

  const [genreModifyOpen, setGenreModifyOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const showGenreModify = () => {
    setGenreModifyOpen(true);
  };

  const closeGenreModify = () => {
    setGenreModifyOpen(false);
  };

  const deleteGenre = async (id) => {
    const api = `/movie/genre/delete?id=${id}`;
    const token = localStorage.getItem('staffToken');
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const yesOrNo = window.confirm('장르를 삭제하시겠습니까?');
    if (yesOrNo === false) {
      return;
    }

    try {
      setLoading(true);

      const response = await serverapi.delete(api, options);
      console.log('response', response.data);

      alert('삭제되었습니다');
      getGenreList();
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr key={genre.code}>
      <td>{genre.code}</td>
      <td>{genre.name}</td>
      <td>
        <button class='btn btn-warning' onClick={showGenreModify}>
          수정
        </button>
        {genreModifyOpen && <Modal setGenreModifyOpen={showGenreModify} />}
        <Modal
          visible={genreModifyOpen}
          effect='fadeInDown'
          onClickAway={closeGenreModify}
        >
          <StaffGenreModifyForm
            closeGenreModify={closeGenreModify}
            getGenreList={getGenreList}
            genre={genre}
          />
        </Modal>
      </td>
      <td>
        <button class='btn btn-danger' onClick={() => deleteGenre(genre.code)}>
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
