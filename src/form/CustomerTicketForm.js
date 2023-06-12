import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from './axios';
import Modal from 'react-awesome-modal';

export default function CustomerTicketForm(props) {
  const ticket = props.ticket;
  const ip = baseUrl;
  const [password, setPassword] = useState();
  const [string, setString] = useState();
  const [movie, setMovie] = useState({ payed: false });
  const [modal, setModal] = useState(false);
  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };
  useEffect(() => {
    let movie = {};
    let seat = [];
    if (ticket) {
      movie.ticket_id = ticket.ticketId;
      movie.title = ticket.movieTitle;
      movie.theater = ticket.theaterName;
      movie.start_time = ticket.startTime;
      movie.img = ticket.posterFileName;
      movie.bill = 0;
      movie.discount = ticket.discount;
      movie.payed = ticket.payed;
      movie.schedule_id = ticket.scheduleId;
      ticket.seats.map((item) => {
        seat.push(item.seatId);
        movie.bill += item.price;
      });
      if (movie.discount){
        if (movie.discount.at(-1) === '%') {
          let tmp = parseInt(movie.discount.slice(0, -1));
          movie.fin_bill = (movie.bill * (100 - tmp)) / 100;
        } else {
          let tmp = parseInt(movie.discount.slice(0, -1));
          movie.fin_bill = movie.bill - tmp * ticket.seats.length;
        }
      }
      else{
        movie.discount = "할인 적용 대상이 아닙니다."
        movie.fin_bill = movie.bill
      }
      let string = '';
      seat.map((tmp) => {
        if (string === '') {
          string = tmp;
        } else {
          string = string + ', ' + tmp;
        }
        setString(string);
      });
      setMovie(movie);
    }
  }, []);
  const style = {
    background: '#BBBBBB88',
    borderRadius: 15,
  };
  const navigate = useNavigate();
  const modify = () => {
    localStorage.setItem('modifyticketid', movie.ticket_id);
    localStorage.setItem('modifyscheduleid', movie.schedule_id);
    navigate('/chooseseat');
  };
  const deleteticket = async () => {
    try {
      const url = ip + `/ticket/delete?ticketId=` + movie.ticket_id;
      const token = localStorage.getItem('customerToken');
      let response;
      if (token) {
        const header = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
            'ngrok-skip-browser-warning': true,
          },
          data: password,
        };
        response = await axios.delete(url, header);
        alert('티켓이 취소되었습니다.');
        window.location.reload();
      } else {
        const header = {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'ngrok-skip-browser-warning': true,
          },
          data: password,
        };
        response = await axios.delete(url, header);
        alert('티켓이 취소되었습니다.');
        navigate('../');
      }
    } catch (error) {
      if (error.response.data.message) alert(error.response.data.message);
      else alert('알수 없는 에러.');
    }
  };
  const deletehandler = () => {
    if (password) {
      deleteticket();
    } else {
      alert('비밀번호를 입력해야합니다.');
    }
  };
  return (
    <div>
      <div className='ticket-container m-3' style={style}>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '50%', padding: 10 }}>
            {movie && (
              <h5 className='text-start'>ticket_no : {movie.ticket_id}</h5>
            )}
            {movie && (
              <h2 className='text-start pb-1'>영화 제목 : {movie.title}</h2>
            )}
            {movie && <h3 className='text-start'>상영관 : {movie.theater}</h3>}
            {movie && <h4 className='text-start pb-1'>좌석 : {string}</h4>}
            {movie && (
              <h3 className='text-start'>시작시간 : {movie.start_time}</h3>
            )}
            {movie && <h3 className='text-start'>금액 : {movie.bill}</h3>}
            {movie && <h3 className='text-start'>할인율 : {movie.discount}</h3>}
            {movie && (
              <h3 className='text-start'>최종결제금액 : {movie.fin_bill}</h3>
            )}
          </div>
          <div style={{ width: '50%' }}>
            {movie && (
              <img
                className='img-fluid'
                src={ip+"/api/posters?fileName="+movie.img}
                style={{ width: 250, padding: 10 }}
              ></img>
            )}
          </div>
        </div>
        <div>
          {!movie.payed && (
            <button
              type='button'
              className='btn btn-primary m-1'
              onClick={modify}
            >
              좌석 재선택
            </button>
          )}
          {!movie.payed && (
            <button
              type='button'
              className='btn btn-danger m-1'
              onClick={openModal}
            >
              예약 취소
            </button>
          )}
          {movie.payed && (
            <button
              type='button'
              className='btn btn-danger m-1'
              onClick={openModal}
            >
              티켓 환불
            </button>
          )}
        </div>
        <Modal
          visible={modal}
          effect='fadeInDown'
          onClickAway={closeModal}
          width='600'
        >
          <div>
            <div className='content-text-container'>비밀번호를 입력하세요.</div>
          </div>
          <div style={{ padding: 10 }}>
            <input
              type='password'
              className='form-control'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button
            type='button'
            className='btn btn-danger m-1'
            onClick={deletehandler}
          >
            티켓 삭제하기
          </button>
        </Modal>
      </div>
    </div>
  );
}
