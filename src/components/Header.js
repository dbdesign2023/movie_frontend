import React, { useContext, useState } from 'react';
import Modal from 'react-awesome-modal';
import { AuthContext } from '../services/AuthContext';
import StaffMypageModifyForm from '../form/StaffMyPageModifyForm';

import '../styles/components/_header.scss';

function Unlogined() {
  return (
    <>
      <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
        <li className='nav-item'>
          <a className='nav-link active' aria-current='page' href='/nonmember'>
            비회원조회
          </a>
        </li>
        <li className='nav-item'>
          <a className='nav-link active' aria-current='page' href='/login'>
            로그인
          </a>
        </li>
        <li className='nav-item'>
          <a className='nav-link active' aria-current='page' href='/signup'>
            회원가입
          </a>
        </li>
      </ul>
    </>
  );
}

function Logined(props) {
  const value = props.value;
  const isCustomerLogin = value.isCustomerLogin;
  const setIsCustomerLogin = value.setIsCustomerLogin;
  const setIsStaffLogin = value.setIsStaffLogin;

  const [mypageModifyOpen, setMypageModifyOpen] = useState(false);
  const showMypageModify = () => {
    setMypageModifyOpen(true);
  };

  const closeMypageModify = () => {
    setMypageModifyOpen(false);
  };

  const Logout = () => {
    localStorage.clear();
    setIsCustomerLogin(false);
    setIsStaffLogin(false);
  };

  return (
    <>
      <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
        <li className='nav-item'>
          {isCustomerLogin ? (
            <a className='nav-link active' aria-current='page' href='/mypage'>
              마이페이지
            </a>
          ) : (
            <a
              className='nav-link active'
              aria-current='page'
              onClick={showMypageModify}
            >
              마이페이지
            </a>
          )}
          {mypageModifyOpen && <Modal setMypageModifyOpen={showMypageModify} />}
          <Modal
            visible={mypageModifyOpen}
            effect='fadeInDown'
            onClickAway={closeMypageModify}
          >
            <StaffMypageModifyForm
              closeMypageModify={closeMypageModify}
              Logout={Logout}
            />
          </Modal>
        </li>
        <li className='nav-item'>
          <a className='nav-link active' aria-current='page' onClick={Logout}>
            로그아웃
          </a>
        </li>
      </ul>
    </>
  );
}

function HeaderSelector() {
  const value = useContext(AuthContext);
  const isCustomerLogin = value.isCustomerLogin;
  const isStaffLogin = value.isStaffLogin;

  return isCustomerLogin || isStaffLogin ? (
    <Logined value={value} />
  ) : (
    <Unlogined value={value} />
  );
}

function Header() {
  return (
    <div
      className='navbar navbar-expand-lg navbar-dark bg-dark'
      aria-label='Eighth navbar example'
    >
      <div className='container'>
        <a className='navbar-brand' href='/'>
          HiMovie
        </a>
        <div className='collapse navbar-collapse'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <a className='nav-link active' aria-current='page' href='/'>
                영화
              </a>
            </li>
            <li className='nav-item'>
              <a
                className='nav-link active'
                aria-current='page'
                href='/schedule'
              >
                상영 일정
              </a>
            </li>
          </ul>
        </div>
        <HeaderSelector />
      </div>
    </div>
  );
}

export default Header;
