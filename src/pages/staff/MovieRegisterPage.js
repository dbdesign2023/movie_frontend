import React from 'react';
import Modal from 'react-awesome-modal';
import { useState } from 'react';
import '../../styles/MovieRegisterPage.scss';

export default function MovieRegisterPage() {

  const [modalOpen, setModalOpen] = useState(false);

  const showModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setReset();
  };

  const [name, setName] = useState("");
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [day, setDay] = useState(0);
  const [nation, setNation] = useState("");
  const [info, setInfo] = useState("");
  const [picture, setPicture] = useState("");

  const setReset = () => {
    setName("");
    setYear(0);
    setMonth(0);
    setDay(0);
    setNation("");
    setInfo("");
    setPicture("");
  };

  return (
    <div className="movie-register-form-containter">
      <button type="button" class="btn btn-primary btn-sm" onClick={showModal}>인물 등록</button>
      <Modal
        visible={modalOpen}
        effect='fadeInDown'
        onClickAway={closeModal}
      >
        <div className='modal-container'>
          <div className='top-container'>
            <legend>인물 등록</legend>
          </div>
          <div className='middle-container'>
          <div class="row">
            <div class="col-sm-2">
              <p>이름</p>
            </div>
            <div class="col-sm-10">
              <input id='name' type="text" class="form-control" />
            </div>
          </div>
          <div class="row">
            <div class="col-sm-2">
              <p>생년월일</p>
            </div>
            <div class="col-sm-10">
              <input id='year' type="number" class="form-control" width="20px" />
              <div class="col-sm-3">년</div>
              <input id='month' type="number" class="form-control" />
              <div class="col-sm-3">월</div>
              <input id='day' type="number" class="form-control" />
              <div class="col-sm-3">일</div>
                
              </div>
          </div>
          </div>
          <div className='bottom-container'>
            <button className='cancel-button' onClick={closeModal}>
              <span>닫기</span>
            </button>
            <button className='cancel-button' onClick={setReset}>
              <span>초기화</span>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}