import React, { useEffect, useState } from 'react';
import Modal from 'react-awesome-modal';
import serverapi from '../services/serverapi';
import StaffCastAddForm from '../form/StaffCastAddForm';
import CastComponent from '../components/CastComponent';

import '../styles/components/page-container.scss';

export default function StaffCastPage() {
  const [castModalOpen, setCastModalOpen] = useState(false);
  const [castList, setCastList] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getCastList();
  }, []);

  const getCastList = async () => {
    const api = '/movie/cast/getList';
    const token = localStorage.getItem('staffToken');
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      setLoading(true);

      const response = await serverapi.get(api, options);
      console.log('response', response.data);

      setCastList(response.data);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const showCastModal = () => {
    setCastModalOpen(true);
  };

  const closeCastModal = () => {
    setCastModalOpen(false);
  };

  return (
    <>
      <div className='add-button-container'>
        <button class='btn btn-success' onClick={showCastModal}>
          {isLoading ? (
            <div className='spinner-border' role='status'>
              <span className='sr-only' />
            </div>
          ) : (
            <span>인물 추가</span>
          )}
        </button>
        {castModalOpen && <Modal setCastModalOpen={showCastModal} />}
        <Modal
          visible={castModalOpen}
          effect='fadeInDown'
          onClickAway={closeCastModal}
        >
          <StaffCastAddForm
            closeCastModal={closeCastModal}
            setCastList={setCastList}
          />
        </Modal>
      </div>
      <div className='list-container'>
        <table class='table table-striped'>
          <thead>
            <tr>
              <th scope='col'>이름</th>
              <th scope='col'>생년월일</th>
              <th scope='col'>국적</th>
              <th scope='col'>사진 보기</th>
              <th scope='col'>수정</th>
              <th scope='col'>삭제</th>
            </tr>
          </thead>
          <tbody>
            {castList.map((cast) => {
              return (
                <CastComponent
                  key={cast.castId}
                  cast={cast}
                  setCastList={setCastList}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
