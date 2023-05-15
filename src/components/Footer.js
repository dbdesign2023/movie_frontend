import React, { useContext } from 'react';

import { AuthContext } from '../services/AuthContext';

function Unlogined() {
  return (
    <>
      <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
        <li className='nav-item'>
          <a className='nav-link active' aria-current='page' href='/'>
            비회원조회
          </a>
        </li>
        <li className='nav-item'>
          <a className='nav-link active' aria-current='page' href='/schedule'>
            로그인
          </a>
        </li>
        <li className='nav-item'>
          <a className='nav-link active' aria-current='page' href='/schedule'>
            회원가입
          </a>
        </li>
      </ul>
    </>
  );
}

function CustomerLogined() {
  return (
    <>
      <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
        <li className='nav-item'>
          <a className='nav-link active' aria-current='page' href='/'>
            비회원조회
          </a>
        </li>
        <li className='nav-item'>
          <a className='nav-link active' aria-current='page' href='/schedule'>
            로그인
          </a>
        </li>
        <li className='nav-item'>
          <a className='nav-link active' aria-current='page' href='/schedule'>
            회원가입
          </a>
        </li>
      </ul>
    </>
  );
}

function StaffLogined() {
  return (
    <>
      <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
        <li class='nav-item drop'>
          <a
            class='nav-link dropdown-toggle show'
            href='#'
            data-bs-toggle='dropdown'
            aria-expanded='true'
          >
            수정
          </a>
          <ul class='dropdown-menu show' data-bs-popper='static'>
            <li>
              <a class='dropdown-item' href='/staffmovie'>
                영화 수정
              </a>
            </li>
            <li>
              <a class='dropdown-item' href='/staffschedule'>
                상영 일정
              </a>
            </li>
            <li>
              <a class='dropdown-item' href='/staffcast'>
                인물
              </a>
            </li>
            <li>
              <a class='dropdown-item' href='/staffgenrerating'>
                장르&등급
              </a>
            </li>
            <li>
              <a class='dropdown-item' href='/stafftheater'>
                상영관
              </a>
            </li>
            <li>
              <a class='dropdown-item' href='/staffcustomer'>
                고객
              </a>
            </li>
          </ul>
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
  else if (isCustomerLogin) return <CustomerLogined />;
  else return <Unlogined />;
}

function Footer() {
  return (
    <div
      className='navbar navbar-expand-sm navbar-dark bg-dark'
      aria-label='Eighth navbar example'
    >
      <div className='container'>
        <FooterSelector />
      </div>
    </div>
  );
}

export default Footer;
