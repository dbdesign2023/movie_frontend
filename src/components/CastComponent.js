import React, { useState } from 'react';
import Modal from 'react-awesome-modal';
import serverapi from '../services/serverapi';
import StaffCastModifyForm from '../form/StaffCastModifyForm';

export default function CastComponent(props) {
  const cast = props.cast;
  const setCastList = props.setCastList;

  const [castModifyOpen, setCastModifyOpen] = useState(false);

  const showCastModify = () => {
    setCastModifyOpen(true);
  };

  const closeCastModify = () => {
    setCastModifyOpen(false);
  };

  const deleteCast = async (id) => {
    const api = `/movie/cast/delete?id=${id}`;
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

      setCastList(response.data);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    <tr key={cast.castId}>
      <td>{cast.castId}</td>
      <td>{cast.name}</td>
      <td>{cast.birthdate}</td>
      <td>{cast.nationality}</td>
      <td>
        <button class='btn btn-warning' onClick={showCastModify}>
          수정
        </button>
        {castModifyOpen && <Modal setCastModifyOpen={showCastModify} />}
        <Modal
          visible={castModifyOpen}
          effect='fadeInDown'
          onClickAway={closeCastModify}
        >
          <StaffCastModifyForm
            closeCastModify={closeCastModify}
            setCastList={setCastList}
            cast={cast}
          />
        </Modal>
      </td>
      <td>
        <button class='btn btn-danger' onClick={() => deleteCast(cast.castId)}>
          삭제
        </button>
      </td>
    </tr>
  );
}