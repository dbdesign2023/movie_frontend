import React, { useEffect, useState } from 'react';
import Modal from 'react-awesome-modal';
import serverapi from '../services/serverapi';
import StaffCastAddForm from '../form/StaffCastAddForm';
import CastComponent from '../components/CastComponent';

import '../styles/components/page-container.scss';

export default function StaffCastPage() {
  const [castModalOpen, setCastModalOpen] = useState(false);
  const [castList, setCastList] = useState([]);

  useEffect(() => {
    getCastList();
    /*setCastList([
      {
        castId: 1,
        name: '영화배우1',
        birthdate: 12351111,
        fileName: 'abc.jpg',
        nationality: '대한민국',
        info: '설명중1',
      },
      {
        castId: 2,
        name: '영화배우2',
        birthdate: 12352222,
        fileName: 'def.jpg',
        nationality: '대한민국',
        info: '설명중2',
      },
      {
        castId: 3,
        name: '영화배우3',
        birthdate: 12353333,
        fileName: 'ghi.jpg',
        nationality: '대한민국',
        info: '설명중3',
      },
    ])*/
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
              <th scope='col'>인물코드</th>
              <th scope='col'>이름</th>
              <th scope='col'>생년월일</th>
              <th scope='col'>국적</th>
              <th scope='col'>삭제</th>
              <th scope='col'>수정</th>
            </tr>
          </thead>
          <tbody>
            {castList.map((cast) => {
              return <CastComponent cast={cast} setCastList={setCastList} />;
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
