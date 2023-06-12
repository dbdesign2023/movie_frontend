import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-awesome-modal';
import { useNavigate } from 'react-router-dom';
import serverapi from '../../services/serverapi';
import { AuthContext } from '../../services/AuthContext';
import StaffTheaterAddForm from '../../form/Staff/Theater/StaffTheaterAddForm';
import TheaterComponent from '../../components/TheaterComponent';

import '../../styles/components/page-container.scss';

export default function StaffTheaterPage() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [theaterModalOpen, setTheaterModalOpen] = useState(false);
  const [theaterList, setTheaterList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [typeList, setTypeList] = useState([]);

  useEffect(() => {
    getTheaterList();
  }, []);

  useEffect(() => {
    console.log('theaterList', theaterList);
  }, [theaterList]);

  const getTheaterList = async () => {
    const api = '/theater/all';
    const token = localStorage.getItem('staffToken');
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
        'ngrok-skip-browser-warning': true,
      },
    };

    try {
      setLoading(true);

      const response = await serverapi.get(api, options);
      console.log('response', response.data);

      setTheaterList(response.data);
    } catch (error) {
      if (error.response.data === 'undefined') {
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

  const showTheaterModal = () => {
    setTheaterModalOpen(true);
    getTypeList();
  };

  const closeTheaterModal = () => {
    setTheaterModalOpen(false);
  };

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
    }
  };

  const goToTypePage = () => {
    navigate('/staff/theater/type');
  };

  return (
    <>
      <div className='add-button-container'>
        <button className='btn btn-success' onClick={showTheaterModal}>
          {isLoading ? (
            <div className='spinner-border' role='status'>
              <span className='sr-only' />
            </div>
          ) : (
            <span>상영관 추가</span>
          )}
        </button>
        {theaterModalOpen && <Modal setTheaterModalOpen={showTheaterModal} />}
        <Modal
          visible={theaterModalOpen}
          effect='fadeInDown'
          onClickAway={closeTheaterModal}
        >
          <StaffTheaterAddForm
            closeTheaterModal={closeTheaterModal}
            getTheaterList={getTheaterList}
            typeList={typeList}
          />
        </Modal>
        &nbsp;&nbsp;&nbsp;
        <button className='btn btn-primary' onClick={goToTypePage}>
          {isLoading ? (
            <div className='spinner-border' role='status'>
              <span className='sr-only' />
            </div>
          ) : (
            <span>상영관 종류 수정</span>
          )}
        </button>
      </div>
      <div className='list-container'>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th scope='col'>이름</th>
              <th scope='col'>종류</th>
              <th scope='col'>층</th>
              <th scope='col'>좌석 정보</th>
              <th scope='col'>상영관 수정</th>
              <th scope='col'>삭제</th>
            </tr>
          </thead>
          <tbody>
            {theaterList.map((theater) => {
              return (
                <TheaterComponent
                  key={theater.theaterId}
                  theater={theater}
                  getTheaterList={getTheaterList}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
