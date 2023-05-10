import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';

export default function StaffGenreAddForm(props) {
  const closeGenreModal = props.closeGenreModal;
  const [genre, setGenre] = useEffect('');
  const staffToken = localStorage.getItem('StaffToken');

  const post = async () => {
    try {
      console.log('data', genre);
      await new Promise((r) => setTimeout(r, 100));
      const url = `http://25.14.225.33:8080/movie/genre/add`;
      const bearer = `Bearer ${staffToken}`;
      const response = await axios.post(url, genre, {
        headers: {
          Authorization: bearer,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    <div className='modal-container'>
      <div className='title-text-center-container'>장르 목록</div>
      <div className='form-container'>
        <div className='row'>// 장르 목록 api 받아서 보여주는 곳</div>
        <div className='row'>
          <div class='col-sm-3'>
            <div className='content-text-container'>새로 추가하기</div>
          </div>
          <div class='col-sm-7'>
            <input type='text' class='form-control' onChange={setGenre} />
          </div>
          <div class='col-2'>
            <div class='left'>
              <button type='button' class='btn btn-success' onClick={post}>
                등록
              </button>
            </div>
          </div>
        </div>
        <div className='bottom-container'>
          <div className='button-container'>
            <button
              type='button'
              class='btn btn-secondary'
              onClick={closeGenreModal}
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
