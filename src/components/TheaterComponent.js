import React, { useState } from 'react';
import Modal from 'react-awesome-modal';
import serverapi from '../services/serverapi';
import StaffTheaterModifyForm from '../form/Staff/Theater/StaffTheaterModifyForm';

export default function TheaterComponent(props) {
  const theater = props.theater;
  const getTheaterList = props.getTheaterList;

  const [theaterModifyOpen, setTheaterModifyOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [typeList, setTypeList] = useState([]);

  const showTheaterModify = () => {
    setTheaterModifyOpen(true);
    getTypeList();
  };

  const closeTheaterModify = () => {
    setTheaterModifyOpen(false);
  };

  const goToSeatPage = (id) => {
    window.location.replace(`/staff/theater/${id}`);
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
        <button
          className='btn btn-warning'
          onClick={() => goToSeatPage(theater.theaterId)}
        >
          좌석 관리
        </button>
      </td>
      <td>
        <button className='btn btn-warning' onClick={showTheaterModify}>
          수정
        </button>
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
