import React, { useEffect, useState } from 'react';
import Modal from 'react-awesome-modal';
import serverapi from '../../services/serverapi';
import { useParams } from 'react-router-dom';
import StaffSeatAddForm from '../../form/Staff/Theater/StaffSeatAddForm';
import StaffSeatModifyForm from '../../form/Staff/Theater/StaffSeatModifyForm';
import SeatComponent from '../../components/SeatComponent';

import '../../styles/components/page-container.scss';

export default function StaffSeatPage(props) {
  const { theaterId } = useParams();

  const [seatModifyOpen, setSeatModifyOpen] = useState(false);
  const [seatModalOpen, setSeatModalOpen] = useState(false);
  const [seatList, setSeatList] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getSeatList();
  }, []);

  useEffect(() => {
    console.log('seatList', seatList);
  }, [seatList]);

  useEffect(() => {
    console.log('selectedSeats', selectedSeats);
  }, [selectedSeats]);

  const getSeatList = async () => {
    const api = `/theater/${theaterId}/seat`;
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

      setSeatList(response.data);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const showSeatModal = () => {
    setSeatModalOpen(true);
  };

  const closeSeatModal = () => {
    setSeatModalOpen(false);
  };

  const showSeatModify = () => {
    setSeatModifyOpen(true);
  };

  const closeSeatModify = () => {
    setSeatModifyOpen(false);
  };

  const selectedDelete = async (id) => {
    const api = `/theater/${parseInt(theaterId, 10)}/seat/delete?id=${id}`;
    const token = localStorage.getItem('staffToken');
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      setLoading(true);

      const response = await serverapi.delete(api, options);
      console.log('response', response.data);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteSeat = () => {
    const yesOrNo = window.confirm('좌석을 삭제하시겠습니까?');
    if (yesOrNo === false) {
      return;
    }

    selectedSeats.forEach((seat) => {
      selectedDelete(seat);
    });

    alert('삭제되었습니다');
    getSeatList();
  };

  const handleSeatSelection = (seatId) => {
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seatId)) {
        // 이미 선택된 좌석인 경우 선택 취소
        return prevSelectedSeats.filter((id) => id !== seatId);
      } else {
        // 선택되지 않은 좌석인 경우 선택 추가
        return [...prevSelectedSeats, seatId];
      }
    });
  };

  return (
    <>
      <div className='add-button-container'>
        <button className='btn btn-success' onClick={showSeatModify}>
          {isLoading ? (
            <div className='spinner-border' role='status'>
              <span className='sr-only' />
            </div>
          ) : (
            <span>선택한 좌석 가격 수정</span>
          )}
        </button>
        {seatModifyOpen && <Modal setSeatModifyOpen={showSeatModify} />}
        <Modal
          visible={seatModifyOpen}
          effect='fadeInDown'
          onClickAway={closeSeatModify}
        >
          <StaffSeatModifyForm
            closeSeatModify={closeSeatModify}
            theaterId={theaterId}
            selectedSeats={selectedSeats}
            getSeatList={getSeatList}
          />
        </Modal>
        &nbsp; &nbsp; &nbsp;
        <button className='btn btn-success' onClick={deleteSeat}>
          {isLoading ? (
            <div className='spinner-border' role='status'>
              <span className='sr-only' />
            </div>
          ) : (
            <span>선택한 좌석 삭제</span>
          )}
        </button>
        &nbsp; &nbsp; &nbsp;
        <button className='btn btn-success' onClick={showSeatModal}>
          {isLoading ? (
            <div className='spinner-border' role='status'>
              <span className='sr-only' />
            </div>
          ) : (
            <span>좌석 추가</span>
          )}
        </button>
        {seatModalOpen && <Modal setSeatModalOpen={showSeatModal} />}
        <Modal
          visible={seatModalOpen}
          effect='fadeInDown'
          onClickAway={closeSeatModal}
        >
          <StaffSeatAddForm
            closeSeatModal={closeSeatModal}
            theaterId={theaterId}
            getSeatList={getSeatList}
          />
        </Modal>
      </div>
      <div className='list-container'>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th scope='col'>선택</th>
              <th scope='col'>좌석번호</th>
              <th scope='col'>가격</th>
            </tr>
          </thead>
          <tbody>
            {seatList.map((seat) => {
              const isSelected = selectedSeats.includes(seat.seatId);
              return (
                <SeatComponent
                  key={seat.seatId}
                  seat={seat}
                  handleSeatSelection={handleSeatSelection}
                  isSelected={isSelected}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
