import React, { useState } from 'react';
import Modal from 'react-awesome-modal';
import serverapi from '../services/serverapi';
import StaffImageForm from '../form/StaffImageForm';
import StaffCastModifyForm from '../form/StaffCastModifyForm';

export default function CastComponent(props) {
  const cast = props.cast;
  const getCastList = props.getCastList;

  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [castModifyOpen, setCastModifyOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const showImageModal = () => {
    setImageModalOpen(true);
  };

  const closeImageModal = () => {
    setImageModalOpen(false);
  };

  const showCastModify = () => {
    setCastModifyOpen(true);
  };

  const closeCastModify = () => {
    setCastModifyOpen(false);
  };

  const deleteCast = async (id) => {
    const api = `/movie/cast/delete?castId=${id}`;
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
      getCastList();
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr key={cast.castId}>
      <td>{cast.name}</td>
      <td>{cast.birthDate}</td>
      <td>{cast.nationality}</td>
      <td>
        <button class='btn btn-warning' onClick={showImageModal}>
          사진
        </button>
        {imageModalOpen && <Modal setImageModalOpen={showImageModal} />}
        <Modal
          visible={imageModalOpen}
          effect='fadeInDown'
          onClickAway={closeImageModal}
        >
          <StaffImageForm
            closeImageModal={closeImageModal}
            fileName={cast.fileName}
          />
        </Modal>
      </td>
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
            getCastList={getCastList}
            castId={cast.castId}
          />
        </Modal>
      </td>
      <td>
        <button class='btn btn-danger' onClick={() => deleteCast(cast.castId)}>
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
