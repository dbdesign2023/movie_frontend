import React, { useEffect, useState } from 'react';
import Modal from 'react-awesome-modal';
import serverapi from '../services/serverapi';
import StaffCastAddForm from '../form/StaffCastAddForm';

import '../styles/components/page-container.scss';

export default function StaffCastPage() {
  const [castModalOpen, setCastModalOpen] = useState(false);
  const [castList, setCastList] = useState([]);

  useEffect(() => {
    getCastList();
  }, []);

  useEffect(() => {
    getCastList();
  }, [castList]);

  const getCastList = async () => {
    const api = '/movie/cast/getList';
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

      setCastList(response.data);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
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
          인물 추가
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
              <th scope='col'>제한 나이</th>
              <th scope='col'>삭제</th>
              <th scope='col'>수정</th>
            </tr>
          </thead>
          <tbody>
            {castList.map((cast) => {
              return (
                <tr>
                  <td>{cast.name}</td>
                  <td>{cast.minAge}</td>
                  <td></td>
                  <td></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
