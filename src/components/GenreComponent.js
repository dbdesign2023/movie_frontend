import React, { useState } from 'react';
import Modal from 'react-awesome-modal';
import serverapi from '../services/serverapi';
import StaffGenreModifyForm from '../form/StaffGenreModifyForm';

export default function GenreComponent(props) {
  const genre = props.genre;
  const getGenreList = props.getGenreList;

  const [genreModifyOpen, setGenreModifyOpen] = useState(false);

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

    try {
      console.log('staffToken', token);
      const response = await serverapi.delete(api, options);
      console.log('response', response.data);

      getGenreList();
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
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
          삭제
        </button>
      </td>
    </tr>
  );
}
