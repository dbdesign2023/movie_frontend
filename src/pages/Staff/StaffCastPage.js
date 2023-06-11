import React, { useEffect, useState, useContext } from 'react';
import Modal from 'react-awesome-modal';
import serverapi from '../../services/serverapi';
import { AuthContext } from '../../services/AuthContext';
import StaffCastAddForm from '../../form/Staff/Cast/StaffCastAddForm';
import CastComponent from '../../components/CastComponent';

import '../../styles/components/page-container.scss';

export default function StaffCastPage() {
  const { logout } = useContext(AuthContext);
  const [castModalOpen, setCastModalOpen] = useState(false);
  const [preCastList, setPreCastList] = useState([]);
  const [castList, setCastList] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getPreCastList();
  }, []);

  const getPreCastList = async () => {
    const api = '/movie/cast/getList';
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

      const updatedCastList = response.data.map((cast) => {
        let tmp = new Date(cast.birthDate);
        cast.birthDate =
          tmp.getFullYear() +
          '-' +
          (tmp.getMonth() < 9
            ? '0' + (tmp.getMonth() + 1)
            : tmp.getMonth() + 1) +
          '-' +
          (tmp.getDate() < 10 ? '0' + tmp.getDate() : tmp.getDate());

        return cast;
      });

      setPreCastList(response.data);
      setCastList(updatedCastList);
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

  const showCastModal = () => {
    setCastModalOpen(true);
  };

  const closeCastModal = () => {
    setCastModalOpen(false);
  };

  return (
    <>
      <div className='add-button-container'>
        <button className='btn btn-success' onClick={showCastModal}>
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
            getCastList={getPreCastList}
          />
        </Modal>
      </div>
      <div className='list-container'>
        <table className='table table-striped'>
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
                  getCastList={getPreCastList}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
