import React, { useEffect } from 'react';
import Modal from 'react-awesome-modal';
import { useState } from 'react';
import '../../styles/OfficialFormModal.scss';

export default function MovieRegisterPage() {

  const [modalOpen, setModalOpen] = useState(false);
  const [date, setDate] = useState("");
  const [mainImg,setMainImg] = useState("");

  const showModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setReset();
  };

  const [name, setName] = useState("");
  const [nation, setNation] = useState("");
  const [info, setInfo] = useState("");

  const setReset = () => {
    setName("");
    setDate("");
    setNation("");
    setInfo("");
    setMainImg("");
  };

  const setPreviewImg = (event) => {
    var reader = new FileReader();

         reader.onload = function(event) {
              setMainImg(event.target.result);
         };
    try {
          reader.readAsDataURL(event.target.files[0]);
    }
    catch(error) {
      console.log(error);
    }
  };

  return (
    <div className="movie-register-form-container">
      <button type="button" class="btn btn-primary btn-sm" onClick={showModal}>인물 등록</button>
      <Modal
        visible={modalOpen}
        effect='fadeInDown'
        onClickAway={closeModal}
      >
        <div className='modal-container'>
          <div className='title-text-container'>
            인물 등록
          </div>
          <div className='form-container'>
            <div class="row">
              <div class="col-sm-2">
              <div className='content-text-container'>
                 이름
                </div>
              </div>
              <div class="col-sm-10">
                <div class="inner-form-container">
                  <input type="text" class="form-control" value={name} onChange={(event) => setName(event.target.value)}/>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-2">
                <div className='content-text-container'>생년월일</div>
              </div>
              <div class="col-sm-10">
                <div class="inner-form-container">
                  <input type="date" class="inputField" value={date} onChange={(event) => setDate(event.target.value)}/>
               </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-2">
                <div className='content-text-container'>사진</div>
              </div>
              <div class="col-sm-10">
                <img src={mainImg} style={{maxWidth:"110px"}}></img>
              </div>
            </div>
           <div class="row">
              <div class="col-sm-2">
              </div>
              <div class="col-sm-10">
                <input class="form-control" type="file" id="formFile" placeholder="" onChange={setPreviewImg}/>
             </div>
            </div>
            <div class="row">
              <div class="col-sm-2">
              <div className='content-text-container'>국적</div>
             </div>
              <div class="col-sm-10">
                <div class="inner-form-container">
                  <input type="text" class="form-control" value={nation} onChange={(event) => setNation(event.target.value)}/>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-2">
              <div className='content-text-container'>정보</div>
              </div>
              <div class="col-sm-10">
                <input type="text" class="form-control" value={info} onChange={(event) => setInfo(event.target.value)}/>
              </div>
            </div>
            <div className='bottom-container'>
              <div className='button-container'>
                <button type="button" class="btn btn-secondary" onClick={closeModal}>닫기</button>
              </div>
              <div className='button-container'>
                <button type="button" class="btn btn-outline-success  " onClick={setReset}>초기화</button>
              </div>
              <div className='button-container'>
                <button type="button" class="btn btn-success">등록</button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}