import React from 'react';
import Modal from 'react-awesome-modal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/components/modal-container.scss';
import '../styles/components/form-container.scss';

export default function CustomerMovieListForm() {
  const data = [
    {
      movie_id: 1,
      title: '가디언즈 오브 갤럭시: Volume 3',
      release_date: '2023-05-05',
      running_time: 150,
      info: '‘가모라’를 잃고 슬픔에 빠져 있던 ‘피터 퀼’이 위기에 처한 은하계와 동료를 지키기 위해 다시 한번 가디언즈 팀과 힘을 모으고, 성공하지 못할 경우 그들의 마지막이 될지도 모르는 미션에 나서는 이야기',
      poster_url:
        'https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2023/05/08/0124c55a-d9fe-40a9-8cd1-e3c8085ca69c.jpg',
      contry: 'USA',
      language: '영어',
      director: '제임스 건',
      rating:
        'https://i.namu.wiki/i/_gPC-Ku_ZOFffvjZuH-As657jDePOv8nyqosVQO4vQIOcAxFSYWg5kl2TtVeoB1NShzPxfFS9WATxAP6Qh8kvlTL7szEqCWBYeQFdX2zH8F7X0MOJWu_N1yGgwnzBrzrcBo6Hf-1vim5-T3j8vON5w.svg',
    },
    {
      movie_id: 2,
      title: '아바타 물의 길',
      release_date: '2022-12-14',
      running_time: 150,
      info: "<아바타: 물의 길>은 판도라 행성에서 '제이크 설리'와 '네이티리'가 이룬 가족이 겪게 되는 무자비한 위협과 살아남기 위해 떠나야 하는 긴 여정과 전투, 그리고 견뎌내야 할 상처에 대한 이야기를 그렸다. 월드와이드 역대 흥행 순위 1위를 기록한 전편 <아바타>에 이어 제임스 카메론 감독이 13년만에 선보이는 영화로, 샘 워싱턴, 조 샐다나, 시고니 위버, 스티븐 랭, 케이트 윈슬렛이 출연하고 존 랜도가 프로듀싱을 맡았다.",
      poster_url:
        'https://cdn.ngetnews.com/news/photo/202211/412751_34579_559.jpg',
      contry: 'USA',
      language: '영어',
      director: '제임스 카메론',
      rating:
        'https://i.namu.wiki/i/_gPC-Ku_ZOFffvjZuH-As657jDePOv8nyqosVQO4vQIOcAxFSYWg5kl2TtVeoB1NShzPxfFS9WATxAP6Qh8kvlTL7szEqCWBYeQFdX2zH8F7X0MOJWu_N1yGgwnzBrzrcBo6Hf-1vim5-T3j8vON5w.svg',
    },
  ];
  const [ticketing, setTicketingOpen] = useState(false);
  const [movie, setMovie] = useState({});
  const showModal = () => {
    setTicketingOpen(true);
  };

  const closeModal = () => {
    setTicketingOpen(false);
  };
  function clickHandler() {
    setMovie(this);
    showModal();
  }
  const navigate = useNavigate();
  const gototicketingpage = () => {
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 60);
    navigate('/customerticketing');
  };
  return (
    <div className='movie-list-form-container'>
      <div className='title-text-container'>영화 목록</div>
      <div className='form-container'>
        <div className='row'>
          {data.map((item) => (
            <div key={item.movie_id} className='w-25'>
              <Modal
                visible={item.movie_id === movie.movie_id && ticketing}
                effect='fadeInDown'
                onClickAway={closeModal}
              >
                <div className='modal-container'>
                  <div className='title-text-center-container'>
                    {item.title}
                  </div>
                  <div className='form-container'>
                    <div className='row'>
                      <div className='w-50'>
                        <h3 className='row'>감독: {item.director}</h3>
                        <h3 className='row'>언어: {item.language}</h3>
                      </div>
                      <div className='w-50'>
                        <img src={item.rating} className='w-25'></img>
                        <div>12세 이용가</div>
                      </div>
                    </div>
                    <img src={item.poster_url} className='w-100' />
                    <h4>{item.info}</h4>
                    <div className='bottom-container'>
                      <div className='button-container'>
                        <button
                          type='button'
                          className='btn btn-primary m-1'
                          onClick={gototicketingpage}
                        >
                          예매하러 가기
                        </button>
                        <button
                          type='button'
                          className='btn btn-secondary m-1'
                          onClick={closeModal}
                        >
                          닫기
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Modal>
              <button
                key={item.movie_id}
                className='btn btn-white'
                onClick={clickHandler.bind(item)}
              >
                <img src={item.poster_url} className='w-100' />
                <h4>{item.title}</h4>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
