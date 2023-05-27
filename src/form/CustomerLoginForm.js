import React from 'react';
import { useState } from 'react';

import '../styles/components/modal-container.scss';
import '../styles/components/form-container.scss';

export default function CustomerLoginForm() {
  const [login_id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [clickcheck, setClickcheck] = useState(false);
  function loginHandler() {
    setClickcheck(true);
    if (login_id && password) {
      console.log('CHECK');
    }
  }
  return (
    <div className='customer-register-form-container'>
      <div className='title-text-container'>로그인</div>
      <div className='form-container'>
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
          <div>
            <button className='btn btn-primary m-1' onClick={loginHandler}>
              로그인
            </button>
            <a className='btn btn-primary m-1' href='/signup' role='button'>
              회원가입
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
