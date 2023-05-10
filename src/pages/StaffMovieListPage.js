import React from 'react';

// 직원이 등록된 영화 목록을 확인하는 페이지
export default function StaffMovieListPage(props) {

  const logout = () => {
    localStorage.clear();
    props.setIsStaffLogin(false);
  }

  return (
    <>
    
    <button onClick={logout}>
            로그아웃
    </button>
    <a class='btn btn-primary' href='/moiveregister' role='button'>
        직원 영화 등록
      </a>
      </>
  );
}
