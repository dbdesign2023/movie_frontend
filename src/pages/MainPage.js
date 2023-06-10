import React from 'react';

export default function MainPage() {
  return (
    <div>
      <a className='btn btn-primary m-1' href='/stafflogin' role='button'>
        직원 로그인
      </a>
      <a className='btn btn-primary m-1' href='/login' role='button'>
        로그인
      </a>
      <a
        className='btn btn-primary m-1'
        href='/customermovielist'
        role='button'
      >
        비회원 예매
      </a>
    </div>
  );
}
