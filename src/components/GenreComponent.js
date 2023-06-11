import React, { useState, useContext } from 'react';
import Modal from 'react-awesome-modal';
import serverapi from '../services/serverapi';
import { AuthContext } from '../services/AuthContext';
import StaffGenreModifyForm from '../form/Staff/Genre/StaffGenreModifyForm';

export default function GenreComponent(props) {
  const { logout } = useContext(AuthContext);
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
        'Access-Control-Allow-Origin': '*',
        'ngrok-skip-browser-warning': true,
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
      if (error.response.data === undefined) {
        logout();
        alert('토큰이 만료되었습니다. 다시 로그인해주세요.');
      } else {
        console.log(error);
        alert(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr key={genre.code}>
      <td className='centered-cell'>
        <span>{genre.code}</span>
      </td>
      <td className='centered-cell'>
        <span>{genre.name}</span>
      </td>
      <td>
        <button className='btn btn-warning' onClick={showGenreModify}>
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
        <button
          className='btn btn-danger'
          onClick={() => deleteGenre(genre.code)}
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
