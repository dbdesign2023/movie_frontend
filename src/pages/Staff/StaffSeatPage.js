import React, { useEffect, useState } from 'react';
import Modal from 'react-awesome-modal';
import serverapi from '../../services/serverapi';
import { useParams } from 'react-router-dom';
import StaffSeatAddForm from '../../form/Staff/Theater/StaffSeatAddForm';
import SeatComponent from '../../components/SeatComponent';

import '../../styles/components/page-container.scss';

export default function StaffSeatPage(props) {
  const { theaterId } = useParams();

  const [seatModalOpen, setSeatModalOpen] = useState(false);
  const [seatList, setSeatList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [theaterList, setTheaterList] = useState([]);

  useEffect(() => {
    getSeatList();
  }, []);

  useEffect(() => {
    console.log('seatList', seatList);
  }, [seatList]);

  const getSeatList = async () => {
    const api = `/seat/${theaterId}/seat`;
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
      },
    };

    try {
      setLoading(true);

      const response = await serverapi.get(api, options);
      console.log('response', response.data);

      setTheaterList(response.data);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const showSeatModal = () => {
    setSeatModalOpen(true);
    getTheaterList();
  };

  const closeSeatModal = () => {
    setSeatModalOpen(false);
  };

  return (
    <>
      <div className='add-button-container'>
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
            getSeatList={getSeatList}
            theaterList={theaterList}
          />
        </Modal>
      </div>
      <div className='list-container'>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th scope='col'>좌석번호</th>
              <th scope='col'>가격</th>
            </tr>
            <tbody>
              {seatList.map((seat) => {
                return <SeatComponent key={seat.seatId} seat={seat} />;
              })}
            </tbody>
          </thead>
        </table>
      </div>
    </>
  );
}
