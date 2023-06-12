import React, { useEffect, useState } from 'react';
import Modal from 'react-awesome-modal';
import serverapi from '../../services/serverapi';
import { AuthContext } from '../../services/AuthContext';
import StaffTypeAddForm from '../../form/Staff/Theater/StaffTypeAddForm';
import TypeComponent from '../../components/TypeComponent';

import '../../styles/components/page-container.scss';

export default function StaffTypePage() {
  const [typeModalOpen, setTypeModalOpen] = useState(false);
  const [typeList, setTypeList] = useState([]);
  const [isLoading2, setLoading2] = useState(false);

  useEffect(() => {
    getTypeList();
  }, []);

  const getTypeList = async () => {
    const api = '/theater/type/list';
    const token = localStorage.getItem('staffToken');
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
        'ngrok-skip-browser-warning': true,
      },
    };

    try {
      setLoading2(true);

      const response = await serverapi.get(api, options);
      console.log('response', response.data);

      setTypeList(response.data);
    } catch (error) {
      if (error.response.data === undefined) {
        logout();
        alert('토큰이 만료되었습니다. 다시 로그인해주세요.');
      } else {
        console.log(error);
        alert(error.response.data.message);
      }
    } finally {
      setLoading2(false);
    }
  };

  const showTypeModal = () => {
    setTypeModalOpen(true);
  };

  const closeTypeModal = () => {
    setTypeModalOpen(false);
  };

  return (
    <>
      <div className='add-button-container'>
        <button className='btn btn-success' onClick={showTypeModal}>
          {isLoading2 ? (
            <div className='spinner-border' role='status'>
              <span className='sr-only' />
            </div>
          ) : (
            <span>상영관 종류 추가</span>
          )}
        </button>
        {typeModalOpen && <Modal setTypeModalOpen={showTypeModal} />}
        <Modal
          visible={typeModalOpen}
          effect='fadeInDown'
          onClickAway={closeTypeModal}
        >
          <StaffTypeAddForm
            closeTypeModal={closeTypeModal}
            getTypeList={getTypeList}
          />
        </Modal>
      </div>
      <div className='list-container'>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th scope='col'>코드</th>
              <th scope='col'>이름</th>
              <th scope='col'>수정</th>
              <th scope='col'>삭제</th>
            </tr>
          </thead>
          <tbody>
            {typeList.map((type) => (
              <TypeComponent
                key={type.code}
                type={type}
                getTypeList={getTypeList}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
