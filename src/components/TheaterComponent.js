import React, { useState } from 'react';
import Modal from 'react-awesome-modal';
import serverapi from '../services/serverapi';
import StaffTheaterModifyForm from '../form/Staff/Theater/StaffTheaterModifyForm';

export default function TheaterComponent(props) {
  const theater = props.theater;
  const getTheaterList = props.getTheaterList;

  const [seatModalOpen, setSeatModalOpen] = useState(false);
  const [theaterModifyOpen, setTheaterModifyOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [info, setInfo] = useState({});
  const [typeList, setTypeList] = useState([]);

  const getInfo = async () => {
    const api = `movie/theater/detail?theaterId=${parseInt(
      theater.theaterId,
      10,
    )}`;
    const token = localStorage.getItem('staffToken');
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
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
      console.log(error);
      alert(error.response.data.message);
    }
  };

  const showSeatModal = () => {
    setSeatModalOpen(true);
  };

  const closeSeatModal = () => {
    setSeatModalOpen(false);
  };

  const showTheaterModify = () => {
    setTheaterModifyOpen(true);
    getTypeList();
  };

  const closeTheaterModify = () => {
    setTheaterModifyOpen(false);
  };

  const getTypeList = async () => {
    const api = '/theater/type/list';
    const token = localStorage.getItem('staffToken');
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await serverapi.get(api, options);
      console.log('response', response.data);

      setTypeList(response.data);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  const deleteTheater = async (id) => {
    console.log('id', id);
    const api = `/theater/${id}/delete`;
    const token = localStorage.getItem('staffToken');
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const yesOrNo = window.confirm('상영관을 삭제하시겠습니까?');
    if (yesOrNo === false) {
      return;
    }

    try {
      setLoading(true);

      const response = await serverapi.delete(api, options);
      console.log('response', response.data);

      alert('삭제되었습니다');
      getTheaterList();
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr>
      <td className='centered-cell'>
        <span>{theater.name}</span>
      </td>
      <td className='centered-cell'>
        <span>{theater.typeName}</span>
      </td>
      <td className='centered-cell'>
        <span>{theater.floor}층</span>
      </td>
      <td>
        <button className='btn btn-warning' onClick={showSeatModal}>
          좌석 관리
        </button>
        {seatModalOpen && <Modal setSeatModalOpen={showSeatModal} />}
        <Modal
          visible={seatModalOpen}
          effect='fadeInDown'
          onClickAway={closeSeatModal}
        ></Modal>
      </td>
      <td>
        <button className='btn btn-warning' onClick={showTheaterModify}>
          수정
        </button>
        {theaterModifyOpen && (
          <Modal setTheaterModifyOpen={showTheaterModify} />
        )}
        <Modal
          visible={theaterModifyOpen}
          effect='fadeInDown'
          onClickAway={closeTheaterModify}
        >
          <StaffTheaterModifyForm
            closeTheaterModify={closeTheaterModify}
            getTheaterList={getTheaterList}
            typeList={typeList}
            theater={theater}
          />
        </Modal>
      </td>
      <td>
        <button
          className='btn btn-danger'
          onClick={() => deleteTheater(theater.theaterId)}
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
