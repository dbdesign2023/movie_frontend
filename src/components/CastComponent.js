import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-awesome-modal';
import serverapi from '../services/serverapi';
import { AuthContext } from '../services/AuthContext';
import StaffImageForm from '../form/Staff/Image/StaffImageForm';
import StaffCastModifyForm from '../form/Staff/Cast/StaffCastModifyForm';
import countries from '../constants/country.json';

export default function CastComponent(props) {
  const { logout } = useContext(AuthContext);
  const cast = props.cast;
  const getCastList = props.getCastList;

  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [castModifyOpen, setCastModifyOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    getInfo();
  }, [cast]);

  const getInfo = async () => {
    const api = `movie/cast/detail?castId=${parseInt(cast.castId, 10)}`;
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

      const modifiedData = { ...response.data };
      let tmp = new Date(modifiedData.birthDate);
      modifiedData.birthDate =
        tmp.getFullYear() +
        '-' +
        (tmp.getMonth() < 9 ? '0' + (tmp.getMonth() + 1) : tmp.getMonth() + 1) +
        '-' +
        (tmp.getDate() < 10 ? '0' + tmp.getDate() : tmp.getDate());

      setInfo(modifiedData);
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

  const showImageModal = async () => {
    await getInfo();
    setImageModalOpen(true);
  };

  const closeImageModal = () => {
    setImageModalOpen(false);
  };

  const showCastModify = () => {
    setCastModifyOpen(true);
    getInfo();
  };

  const closeCastModify = () => {
    setCastModifyOpen(false);
  };

  const deleteCast = async (id) => {
    console.log('id', id);
    const api = `/movie/cast/delete?castId=${id}`;
    const token = localStorage.getItem('staffToken');
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
        'ngrok-skip-browser-warning': true,
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

  const getCountryName = (countryCode) => {
    const country = countries[countryCode];
    if (country) {
      return country.CountryNameKR;
    }
    return '';
  };

  return (
    <tr key={cast.castId}>
      <td className='centered-cell'>
        <span>{cast.name}</span>
      </td>
      <td className='centered-cell'>
        <span>{cast.birthDate}</span>
      </td>
      <td className='centered-cell'>
        <span>{getCountryName(cast.nationality)}</span>
      </td>
      <td>
        <button className='btn btn-secondary' onClick={showImageModal}>
          사진
        </button>
        {imageModalOpen && info && info.profileImage && (
          <Modal
            visible={imageModalOpen}
            effect='fadeInDown'
            onClickAway={closeImageModal}
          >
            <StaffImageForm
              closeImageModal={closeImageModal}
              fileURL='/api/profileImage?fileName='
              info={info}
            />
          </Modal>
        )}
      </td>
      <td>
        <button className='btn btn-warning' onClick={showCastModify}>
          수정
        </button>
        {castModifyOpen && (
          <Modal
            visible={castModifyOpen}
            effect='fadeInDown'
            onClickAway={closeCastModify}
          >
            <StaffCastModifyForm
              closeCastModify={closeCastModify}
              getCastList={getCastList}
              info={info}
            />
          </Modal>
        )}
      </td>
      <td>
        <button
          className='btn btn-danger'
          onClick={() => deleteCast(cast.castId)}
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
