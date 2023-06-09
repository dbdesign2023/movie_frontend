import React, { useContext, useState, useEffect } from 'react';
import Modal from 'react-awesome-modal';
import { AuthContext } from '../services/AuthContext';
import serverapi from '../services/serverapi';
import StaffMypageModifyForm from '../form/Staff/Info/StaffMyPageModifyForm';
import { Link } from 'react-router-dom';

import '../styles/components/_header.scss';

function Unlogined() {
  return (
    <>
      <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
        <li className='nav-item'>
          <Link
            to={'/nonmember'}
            className='nav-link active'
            aria-current='page'
          >
            비회원조회
          </Link>
        </li>
        <li className='nav-item'>
          <Link to={'/login'} className='nav-link active' aria-current='page'>
            로그인
          </Link>
        </li>
        <li className='nav-item'>
          <Link to={'/signup'} className='nav-link active' aria-current='page'>
            회원가입
          </Link>
        </li>
      </ul>
    </>
  );
}

function Logined(props) {
  const value = props.value;
  const isCustomerLogin = value.isCustomerLogin;
  const { logout } = useContext(AuthContext);

  const [mypageModifyOpen, setMypageModifyOpen] = useState(false);
  const [info, setInfo] = useState({});

  const getInfo = async () => {
    const api = '/admin/detail';
    const token = localStorage.getItem('staffToken');
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
        'ngrok-skip-browser-warning': true,
      },
    };

    try {
      const response = await serverapi.get(api, options);
      console.log('response', response.data);

      setInfo(response.data);
    } catch (error) {
      if (error.response.data === undefined) {
        logout();
        alert('토큰이 만료되었습니다. 다시 로그인해주세요.');
      } else {
        console.log(error);
        alert(error.response.data.message);
      }
    }
  };

  const showMypageModify = async () => {
    await getInfo();
    setMypageModifyOpen(true);
  };

  useEffect(() => {
    console.log('info', info);
  }, [info]);

  const closeMypageModify = () => {
    setMypageModifyOpen(false);
  };

  return (
    <>
      <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
        <li className='nav-item'>
          {isCustomerLogin && (
            <Link
              to={'/ticketlist'}
              className='nav-link active'
              aria-current='page'
            >
              내 티켓 조회
            </Link>
          )}
        </li>
        <li className='nav-item'>
          {isCustomerLogin ? (
            <Link
              to={'/mypage'}
              className='nav-link active'
              aria-current='page'
            >
              마이페이지
            </Link>
          ) : (
            <a
              className='nav-link active'
              aria-current='page'
              onClick={showMypageModify}
            >
              마이페이지
            </a>
          )}
          {mypageModifyOpen && (
            <Modal
              visible={mypageModifyOpen}
              effect='fadeInDown'
              onClickAway={closeMypageModify}
            >
              <StaffMypageModifyForm
                closeMypageModify={closeMypageModify}
                info={info}
              />
            </Modal>
          )}
        </li>
        <li className='nav-item'>
          <a className='nav-link active' aria-current='page' onClick={logout}>
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
        <Link to={'/'} className='navbar-brand'>
          HiMovie
        </Link>
        <div className='collapse navbar-collapse'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <Link to={'/'} className='nav-link active' aria-current='page'>
                영화
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to={'/schedule'}
                className='nav-link active'
                aria-current='page'
              >
                상영 일정
              </Link>
            </li>
          </ul>
        </div>
        <HeaderSelector />
      </div>
    </div>
  );
}

export default Header;
