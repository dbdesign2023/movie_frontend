import React, { useState, useContext } from 'react';
import Modal from 'react-awesome-modal';
import StaffLoginForm from '../form/Staff/Info/StaffLoginForm';
import StaffSignUpForm from '../form/Staff/Info/StaffSignUpForm';
import { AuthContext } from '../services/AuthContext';
import { Link } from 'react-router-dom';

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
      <ul className='nav me-auto' />
      <ul className='nav'>
        <li className='nav-item'>
          <a
            className='nav-link active'
            aria-current='page'
            onClick={showLoginModal}
          >
            직원로그인
          </a>
          {loginModalOpen && <Modal setLoginModalOpen={showLoginModal} />}
          <Modal
            visible={loginModalOpen}
            effect='fadeInDown'
            onClickAway={closeLoginModal}
          >
            <StaffLoginForm closeLoginModal={closeLoginModal} />
          </Modal>
        </li>
        <li className='nav-item'>
          <a
            className='nav-link active'
            aria-current='page'
            onClick={showSignUpModal}
          >
            직원회원가입
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

function StaffLogined() {
  return (
    <>
      <ul className='nav me-auto'>
        <li className='nav-item'>
          <Link
            to={'/staff/schedule'}
            className='nav-link link-dark px-2 active'
            aria-current='page'
          >
            상영 일정 관리
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            to={'/staff/movie'}
            className='nav-link link-dark px-2 active'
            aria-current='page'
          >
            영화 관리
          </Link>
        </li>

        <li className='nav-item'>
          <Link
            to={'/staff/role'}
            className='nav-link link-dark px-2 active'
            aria-current='page'
          >
            역할 관리
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            to={'/staff/cast'}
            className='nav-link link-dark px-2 active'
            aria-current='page'
          >
            인물 관리
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            to={'/staff/theater'}
            className='nav-link link-dark px-2 active'
            aria-current='page'
          >
            상영관 관리
          </Link>
        </li>
      </ul>
    </>
  );
}

function FooterSelector() {
  const value = useContext(AuthContext);
  const isCustomerLogin = value.isCustomerLogin;
  const isStaffLogin = value.isStaffLogin;

  if (isStaffLogin) return <StaffLogined />;
  else if (isCustomerLogin) return;
  else return <Unlogined />;
}

function Footer() {
  return (
    <nav className='py-2 bg-light border-bottom'>
      <div className='container d-flex flex-wrap'>
        <FooterSelector />
      </div>
    </nav>
  );
}

export default Footer;
