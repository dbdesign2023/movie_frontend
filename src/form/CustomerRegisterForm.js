import React from 'react';
import Modal from 'react-awesome-modal';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import '../styles/components/modal-container.scss';
import '../styles/components/form-container.scss';

export default function CustomerRegisterForm() {
  const [name, setName] = useState('');
  const [login_id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('');
  const handleClickRadioButton = (e) => {
    setGender(e.target.value);
  };
  const [registerfin, setRegisterfin] = useState(false);
  const [phone_number, setPhonenumber] = useState('');
  const [email, setEmail] = useState('');
  const [clickcheck, setClickcheck] = useState(false);
  const navigate = useNavigate();
  const closemodal = () =>{
    setRegisterfin(false)
  }
  const openmodal = () =>{
    setRegisterfin(true)
  }
  const gotologinpage = () =>{
    navigate('/login')
};
var check_phone_number = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/
var check_email = /^[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*\.[a-zA-Z]{2,}$/i
const registerHandler = async () => {
  console.log(check_phone_number.test(phone_number))
  setClickcheck(true)
  if(name && login_id && password && nickname && birthdate && gender && check_phone_number.test(phone_number) && check_email.test(email)){
    try {
      const formData = new FormData();
      await new Promise((r) => setTimeout(r, 100));
      const url = `http://localhost:8080/customer/signup`;
      formData.append("name", name);
      formData.append("loginId", login_id);
      formData.append("password", password);
      formData.append("nickname", nickname);
      formData.append("birthdate", birthdate);
      formData.append("gender", gender);
      formData.append("phoneNo", phone_number);
      formData.append("email", email);
      console.log('formData', formData);
      const response = await axios.post(url, formData);
      console.log(response.data);
      openmodal()
      } 
    catch (error) {
      console.log(error);
      alert(error.response.data.message);
      }
    }
  };

  return (
    <div className='customer-register-form-container'>
      <div className='title-text-container'>사용자 등록</div>
      <div className='form-container'>
        <div className='row'>
          <div className='col-sm-4'>
            <div className='content-text-container'>이름</div>
          </div>
          <div className='col-sm-4'>
            <input
              type='text'
              className='form-control'
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className='col-sm-4 justify-content-start'>
            {clickcheck && !name && (
              <div style={{ color: 'red' }}>이름을 입력하세요.</div>
            )}
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-4'>
            <div className='content-text-container'>아이디</div>
          </div>
          <div className='col-sm-4'>
            <input
              type='text'
              className='form-control'
              value={login_id}
              onChange={(event) => setId(event.target.value)}
            />
          </div>
          <div className='col-sm-4 justify-content-start'>
            {clickcheck && !login_id && (
              <div style={{ color: 'red' }}>아이디를 입력하세요.</div>
            )}
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-4'>
            <div className='content-text-container'>비밀번호</div>
          </div>
          <div className='col-sm-4'>
            <input
              type='password'
              className='form-control'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className='col-sm-4 justify-content-start'>
            {clickcheck && !password && (
              <div style={{ color: 'red' }}>비밀번호를 입력하세요.</div>
            )}
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-4'>
            <div className='content-text-container'>닉네임</div>
          </div>
          <div className='col-sm-4'>
            <input
              type='text'
              className='form-control'
              value={nickname}
              onChange={(event) => setNickname(event.target.value)}
            />
          </div>
          <div className='col-sm-4 justify-content-start'>
            {clickcheck && !nickname && (
              <div style={{ color: 'red' }}>닉네임을 입력하세요.</div>
            )}
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-4'>
            <div className='content-text-container'>생년월일</div>
          </div>
          <div className='col-sm-4'>
            <input
              type='date'
              className='form-control'
              value={birthdate}
              onChange={(event) => setBirthdate(event.target.value)}
            />
          </div>
          <div className='col-sm-4 justify-content-start'>
            {clickcheck && !birthdate && (
              <div style={{ color: 'red' }}>생년월일을 선택하세요.</div>
            )}
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-4'>
            <div className='content-text-container'>성별</div>
          </div>
          <div className='col-sm-4'>
            <label>
              <input
                type='radio'
                value='1'
                checked={gender === '1'}
                onChange={handleClickRadioButton}
              />
              남성
            </label>
            <label className='ms-auto'>
              <input
                type='radio'
                value='2'
                checked={gender === '2'}
                onChange={handleClickRadioButton}
              />
              여성
            </label>
          </div>
          <div className='col-sm-4 justify-content-start'>
            {clickcheck && !gender && (
              <div style={{ color: 'red' }}>성별을 선택하세요.</div>
            )}
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-4'>
            <div className='content-text-container'>휴대폰 번호</div>
          </div>
          <div className='col-sm-4'>
            <input
              type='text'
              className='form-control'
              placeholder='01012345678'
              value={phone_number}
              onChange={(event) => setPhonenumber(event.target.value)}
            />
          </div>
          <div className='col-sm-4 justify-content-start'>
            {clickcheck && !check_phone_number.test(phone_number) && (
              <div style={{ color: 'red' }}>유효한 전화번호를 입력하세요.</div>
            )}
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-4'>
            <div className='content-text-container'>이메일</div>
          </div>
          <div className='col-sm-4'>
            <input
              type='email'
              className='form-control'
              placeholder='name@example.com'
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className='col-sm-4 justify-content-start'>
            {clickcheck && !check_email.test(email) && (
              <div style={{ color: 'red' }}>유효한 이메일을 입력하세요.</div>
            )}
          </div>
        </div>
        <button className='btn btn-primary m-1' onClick={registerHandler}>
          회원가입
        </button>
        <Modal
          visible={registerfin}
          effect='fadeInDown'
          onClickAway={closemodal}
        >
          <div className='title-text-center-container'>
            회원가입이 완료되었습니다!
          </div>
          <div className='bottom-container'>
            <div className='button-container'>
              <button
                type='button'
                className='btn btn-primary m-1'
                onClick={gotologinpage}
              >
                로그인하러가기
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
