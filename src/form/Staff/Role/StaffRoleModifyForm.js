import React, { useState } from 'react';
import serverapi from '../../../services/serverapi';
import { useForm } from 'react-hook-form';

import '../../../styles/components/form-container.scss';
import '../../../styles/components/modal-container.scss';

export default function StaffRoleModifyForm(props) {
  const closeRoleModify = props.closeRoleModify;
  const getMovieList = props.getMovieList;
  const role = props.role;
  const info = props.info;

  const [isLoading, setLoading] = useState(false);
  const [starring, setStarring] = useState(false);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      movieId: info.movieId,
      castId: role.castId,
      role: role.role,
      starring: role.starring,
    },
  });

  const onSubmit = async (data) => {
    console.log(data);

    if (!data.role) {
      return;
    }

    const api = `/movie/${parseInt(info.movieId, 10)}/role/modify`;
    const token = localStorage.getItem('staffToken');
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      setLoading(true);
      const updatedData = {
        ...data,
        starring: starring,
      };

      console.log('Request body', updatedData);

      const response = await serverapi.post(api, updatedData, options);
      console.log('response', response.data);

      closeRoleModify();
      alert('역할이 수정되었습니다');
      getMovieList();
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
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
          onClick={closeRoleModify}
        ></button>
      </div>
      <div className='title-text-center-container'>역할 수정</div>
      <div className='form-container'>
        <form className='staff-role-add-form' onSubmit={handleSubmit(onSubmit)}>
          <div className='row'>
            <div className='col-sm-3'>
              <div className='content-text-container'>(개봉일)영화</div>
            </div>
            <div className='col-sm-9'>
              ({info.releaseDate}){info.title}
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-3'>
              <div className='content-text-container'>(ID)배우</div>
            </div>
            <div className='col-sm-9'>
              ({role.castId}){role.name}
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-3'>
              <div className='content-text-container'>역할명</div>
            </div>
            <div className='col-sm-9'>
              <input
                className='form-control'
                type='text'
                placeholder='역할명을 입력하세요'
                {...register('role', {
                  required: '역할명을 입력해주세요.',
                })}
              />
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-3'>
              <div className='content-text-container'>개봉일</div>
            </div>
            <div className='col-sm-9'>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='flexRadioDefault'
                  id='flexRadioDefault1'
                  value={true}
                  checked={starring === true}
                  onChange={() => setStarring(true)}
                />
                <label className='form-check-label' htmlFor='flexRadioDefault1'>
                  주연
                </label>
              </div>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='flexRadioDefault'
                  id='flexRadioDefault2'
                  value={false}
                  checked={starring === false}
                  onChange={() => setStarring(false)}
                />
                <label className='form-check-label' htmlFor='flexRadioDefault2'>
                  조연
                </label>
              </div>
            </div>
          </div>
          <div className='bottom-container'>
            <div className='button-container'>
              <button type='submit' className='btn btn-success'>
                {isLoading ? (
                  <div className='spinner-border' role='status'>
                    <span className='sr-only' />
                  </div>
                ) : (
                  <span>수정</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
