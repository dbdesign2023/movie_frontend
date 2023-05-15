import React, { useState, useContext } from 'react';
import Modal from 'react-awesome-modal';
import StaffLoginForm from '../form/StaffLoginForm';
import StaffSignUpForm from '../form/StaffSignUpForm';

import { AuthContext } from '../services/AuthContext';

import '../styles/components/_header.scss';

function Unlogined() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);

  const showLoginModal = () => {
    setLoginModalOpen(true);
  };
  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };
  const showSignUpModal = () => {
    setSignUpModalOpen(true);
  };
  const closeSignUpModal = () => {
    setSignUpModalOpen(false);
  };
  return (
    <>
      <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
        <li className='nav-item'>
          <a className='nav-link active' aria-current='page' href='/nonmember'>
            비회원조회
          </a>
        </li>
        <li className='nav-item'>
          <a
            className='nav-link active'
            aria-current='page'
            onClick={showLoginModal}
          >
            로그인
          </a>
          {loginModalOpen && <Modal setLoginModalOpen={showLoginModal} />}
          <Modal
            visible={loginModalOpen}
            effect='fadeInDown'
            onClickAway={closeLoginModal}
          >
            <StaffLoginForm />
          </Modal>
        </li>
        <li className='nav-item'>
          <a
            className='nav-link active'
            aria-current='page'
            onClick={showSignUpModal}
          >
            회원가입
          </a>
          {signUpModalOpen && <Modal setSignUpModalOpen={showSignUpModal} />}
          <Modal
            visible={signUpModalOpen}
            effect='fadeInDown'
            onClickAway={closeSignUpModal}
          >
            <StaffSignUpForm closeSignUpModal={closeSignUpModal} />
          </Modal>
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

  const Logout = () => {
    localStorage.clear();
    setIsCustomerLogin(false);
    setIsStaffLogin(false);
  };

  return (
    <>
      <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
        <li className='nav-item'>
          <a
            className='nav-link active'
            aria-current='page'
            href={isCustomerLogin ? '/mypage' : '/staffMyPage'}
          >
            마이페이지
          </a>
        </li>
        <li className='nav-item'>
          <button
            className='nav-link active'
            aria-current='page'
            onClick={Logout}
          >
            로그아웃
          </button>
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
    <Unlogined />
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
