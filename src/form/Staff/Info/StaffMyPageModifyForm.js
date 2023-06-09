import React, { useState, useContext, useEffect } from 'react';
import serverapi from '../../../services/serverapi';
import { AuthContext } from '../../../services/AuthContext';
import { useForm } from 'react-hook-form';

import '../../../styles/components/form-container.scss';
import '../../../styles/components/modal-container.scss';

export default function StaffMypageModifyForm(props) {
  const { logout } = useContext(AuthContext);
  const closeMypageModify = props.closeMypageModify;
  const Logout = props.Logout;
  const info = props.info || {};

  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isLoading2, setLoading2] = useState(false);

  useEffect(() => {
    console.log('info', info);
  }, [info]);

  const { register, handleSubmit } = useForm({
    defaultValues: { name: info.name },
  });

  async function exit() {
    const api = '/admin/delete'; // 회원탈퇴로 바꾸기
    const token = localStorage.getItem('staffToken');
    const options = {
      headers: {
        'Content-type': 'text/plain; charset=UTF-8',
        Authorization: `Bearer ${token}`,
      },
    };
    let stringData = '';

    const yesOrNo = window.confirm('회원을 탈퇴하시겠습니까?');
    if (yesOrNo === false) {
      return;
    }

    try {
      if (password !== password2) {
        alert('입력된 비밀번호가 다릅니다.');
      } else {
        setLoading2(true);
        stringData = password;
        console.log('Request body', stringData);

        const response = await serverapi.delete(api, stringData, options);
        console.log('response', response.data);

        closeMypageModify();
        alert('회원탈퇴 되었습니다.');
        // 로그 아웃
        Logout();
        window.location.replace('/movie_frontend/');
      }
    } catch (error) {
      if (error.response.data === undefined) {
        logout();
        alert('토큰이 만료되었습니다. 다시 로그인해주세요.');
      } else {
        console.log(error);
        alert(error.response.data.message);
      }
    } finally {
      setLoading2(false);
    }
  }

  const onSubmit = async (data) => {
    const api = '/admin/modify';
    const token = localStorage.getItem('staffToken');
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
        'ngrok-skip-browser-warning': true,
      },
    };

    try {
      setLoading(true);
      console.log('data', data);

      if (data.password !== data.password2) {
        alert('입력한 비밀번호가 같지 않습니다.');
      } else {
        delete data['password2'];
        data['info'] = { loginId: info.loginId }; // 수정된 부분
        //console.log('data', data);

        const response = await serverapi.post(api, data, options);
        console.log('response', response.data);

        closeMypageModify();
        alert('회원 정보가 수정되었습니다');
      }
    } catch (error) {
      if (error.response.data === undefined) {
        logout();
        alert('토큰이 만료되었습니다. 다시 로그인해주세요.');
      } else {
        console.log(error);
        alert(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='modal-container'>
      <div className='btn-close'>
        <button
          type='button'
          className='btn-close'
          aria-label='Close'
          onClick={closeMypageModify}
        ></button>
      </div>
      <div className='title-text-center-container'>직원 마이페이지</div>
      <div className='form-container'>
        <form className='staff-signup-form' onSubmit={handleSubmit(onSubmit)}>
          <div className='row'>
            <div className='col-sm-3'>
              <div className='content-text-container'>이름</div>
            </div>
            <div className='col-sm-8'>
              <input
                className='form-control'
                type='text'
                placeholder='이름을 입력하세요'
                defaultValue={info.name}
                {...register('name', {
                  required: '이름을 입력해주세요.',
                })}
              />
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-3'>
              <div className='content-text-container'>아이디</div>
            </div>
            <div className='col-8'>
              <span>{info.loginId}</span>
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-3'>
              <div className='content-text-container'>비밀번호</div>
            </div>
            <div className='col-sm-8'>
              <input
                className='form-control'
                type='password'
                placeholder='비밀번호를 입력하세요'
                onChange={(e) => setPassword(e.target.value)}
                {...register('password', {
                  required: '비밀번호를 입력해주세요.',
                })}
              />
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-3'>
              <div className='content-text-container'>비밀번호 확인</div>
            </div>
            <div className='col-sm-8'>
              <input
                className='form-control'
                type='password'
                placeholder='비밀번호를 다시 한 번 입력하세요'
                onChange={(e) => setPassword2(e.target.value)}
                {...register('password2', {
                  required: '비밀번호를 다시 한 번 입력해주세요.',
                })}
              />
            </div>
          </div>
          <div className='bottom-container'>
            <button type='submit' className='btn btn-success'>
              {isLoading ? (
                <div className='spinner-border' role='status'>
                  <span className='sr-only' />
                </div>
              ) : (
                <span>수정</span>
              )}
            </button>
            &nbsp; &nbsp; &nbsp;
            <div className='btn btn-danger' onClick={exit}>
              {isLoading2 ? (
                <div className='spinner-border' role='status'>
                  <span className='sr-only' />
                </div>
              ) : (
                <span>회원 탈퇴</span>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
