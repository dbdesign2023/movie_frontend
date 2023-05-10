import { useForm } from 'react-hook-form';
import Modal from 'react-awesome-modal';
import { useState } from 'react';
import axios from 'axios';

import StaffOfficialAddForm from '../form/StaffOfficialAddForm.js';
import StaffGenreAddForm from '../form/StaffGenreAddForm.js';
import StaffRatingAddForm from '../form/StaffRatingAddForm.js';

export default function StaffMovieAddForm(props) {

  const [officialModalOpen, setOfficialModalOpen] = useState(false);
  const [genreModalOpen, setGenreModalOpen] = useState(false);
  const [ratingModalOpen, setRatingModalOpen] = useState(false);
  const [officialDate, setOfficialDate] = useState('');
  const [officialMainImg, setOfficialMainImg] = useState('');

  const showOfficialModal = () => {
    setOfficialModalOpen(true);
  };

  const closeOfficialModal = () => {
    setOfficialModalOpen(false);
    setOfficialReset();
  };

  const showGenreModal = () => {
    setGenreModalOpen(true);
  };

  const closeGenreModal = () => {
    setGenreModalOpen(false);
    setGenre('');
  };

  const showRatingModal = () => {
    setRatingModalOpen(true);
  };

  const closeRatingModal = () => {
    setRatingModalOpen(false);
    setRating('');
  };

  const [officialName, setOfficialName] = useState('');
  const [nation, setNation] = useState('');
  const [officialInfo, setOfficialInfo] = useState('');

  const setOfficialReset = () => {
    setOfficialName('');
    setOfficialDate('');
    setNation('');
    setOfficialInfo('');
    setOfficialMainImg('');
  };

  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');

  const setPreviewImg = (event) => {
    var reader = new FileReader();

    reader.onload = function (event) {
      setOfficialMainImg(event.target.result);
    };
    try {
      reader.readAsDataURL(event.target.files[0]);
    } catch (error) {
      console.log(error);
    }
  };
    return (
        <div className='movie-register-form-container'>
      <div className='title-text-container'>영화 등록</div>
      <div className='form-container'>
        <div className='row'>
          <div class='col-sm-2'>
            <div className='content-text-container'>이름</div>
          </div>
          <div class='col-sm-4'>
            <input
              type='text'
              class='form-control'
            />
          </div>
          <div class='col-sm-2'>
            <div className='content-text-container'>등급</div>
          </div>
          <div class='col-4'>
            <div className='inner-form-container'>
              <div class='btn-group'>
                <button type='button' class='btn btn-secondary'>
                  {rating}
                </button>
                <button
                  type='button'
                  class='btn btn-secondary dropdown-toggle dropdown-toggle-split'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  <span class='visually-hidden'>Toggle Dropdown</span>
                </button>
                <ul class='dropdown-menu'>
                  <li>
                    <a class='dropdown-item' href='#'>
                      //등급 불러오기 API
                    </a>
                  </li>
                  <li>
                    <a class='dropdown-item' href='#'>
                      //등급 불러오기 API
                    </a>
                  </li>
                  <li>
                    <a class='dropdown-item' href='#'>
                      //등급 불러오기 API
                    </a>
                  </li>
                  <li>
                    <a class='dropdown-item' href='#'>
                      //등급 불러오기 API
                    </a>
                  </li>
                </ul>
              </div>
              <div className='content-text-container'></div>
              <button
                type='button'
                class='btn btn-outline-secondary'
                onClick={showRatingModal}
              >
                수정
              </button>
              <Modal
                visible={ratingModalOpen}
                effect='fadeInDown'
                onClickAway={closeRatingModal}
              >
                <StaffRatingAddForm />
              </Modal>
            </div>
          </div>
        </div>
        <div class='row'>
          <div class='col-sm-2'>
            <div className='content-text-container'>개봉일자</div>
          </div>
          <div class='col-sm-4'>
            <input
              type='date'
              class='inputField'
            />
          </div>
          <div class='col-sm-2'>
            <div className='content-text-container'>상영시간</div>
          </div>
          <div class='col-sm-2'>
            <input
              type='number'
              class='form-control'
            />
          </div>
          <div class='col-2'>
            <div className='content-text-container'>분</div>
          </div>
        </div>
        <div class='row'>
          <div class='col-sm-2'>
            <div className='content-text-container'>국가</div>
          </div>
          <div class='col-sm-4'>
            <input
              type='text'
              class='form-control'
            />
          </div>
          <div class='col-sm-2'>
            <div className='content-text-container'>언어</div>
          </div>
          <div class='col-3'>
            <input
              type='text'
              class='form-control'
            />
          </div>
        </div>
        <div class='row'>
          <div class='col-sm-2'>
            <div className='content-text-container'>장르</div>
          </div>
          <div class='col-4'>
            <div class='btn-group'>
              <button type='button' class='btn btn-secondary'>
                선택된 장르
              </button>
              <button
                type='button'
                class='btn btn-secondary dropdown-toggle dropdown-toggle-split'
                data-bs-toggle='dropdown'
                aria-expanded='false'
              >
                <span class='visually-hidden'>Toggle Dropdown</span>
              </button>
              <ul class='dropdown-menu'>
                <li>
                  <a class='dropdown-item' href='#'>
                    //장르 불러오기 API
                  </a>
                </li>
                <li>
                  <a class='dropdown-item' href='#'>
                    //장르 불러오기 API
                  </a>
                </li>
                <li>
                  <a class='dropdown-item' href='#'>
                    //장르 불러오기 API
                  </a>
                </li>
                <li>
                  <a class='dropdown-item' href='#'>
                    //장르 불러오기 API
                  </a>
                </li>
              </ul>
            </div>
            <div className='content-text-container'></div>
            <button
              type='button'
              class='btn btn-outline-secondary'
              onClick={showGenreModal}
            >
              수정
            </button>
            <Modal
              visible={genreModalOpen}
              effect='fadeInDown'
              onClickAway={closeGenreModal}
            >
              <StaffGenreAddForm />
            </Modal>
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-2' />
          <div className='col-10'>//선택한 장르 보여주는 곳</div>
        </div>
        <div className='row'>
          <div class='col-sm-2'>
            <div className='content-text-container'>감독</div>
          </div>
          <div class='col-4'>
            <div class='btn-group'>
              <button type='button' class='btn btn-secondary'>
                선택된 감독
              </button>
              <button
                type='button'
                class='btn btn-secondary dropdown-toggle dropdown-toggle-split'
                data-bs-toggle='dropdown'
                aria-expanded='false'
              >
                <span class='visually-hidden'>Toggle Dropdown</span>
              </button>
              <ul class='dropdown-menu'>
                <li>
                  <a class='dropdown-item' href='#'>
                    //인물 불러오기 API
                  </a>
                </li>
                <li>
                  <a class='dropdown-item' href='#'>
                    //인물 불러오기 API
                  </a>
                </li>
                <li>
                  <a class='dropdown-item' href='#'>
                    //인물 불러오기 API
                  </a>
                </li>
                <li>
                  <a class='dropdown-item' href='#'>
                    //인물 불러오기 API
                  </a>
                </li>
              </ul>
            </div>
            <div className='content-text-container'></div>
            <button
              type='button'
              class='btn btn-outline-secondary'
              onClick={showOfficialModal}
            >
              추가
            </button>
            <Modal
              visible={officialModalOpen}
              effect='fadeInDown'
              onClickAway={closeOfficialModal}
            >
              <StaffOfficialAddForm />
            </Modal>
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-2'>
            <div className='content-text-container'>배우</div>
          </div>
          <div className='col-8'>
            <div className='actor-form-container'>
              <div class='row'>
                <div class='col-6'>
                  <div class='btn-group'>
                    <button type='button' class='btn btn-secondary'>
                      선택된 감독
                    </button>
                    <button
                      type='button'
                      class='btn btn-secondary dropdown-toggle dropdown-toggle-split'
                      data-bs-toggle='dropdown'
                      aria-expanded='false'
                    >
                      <span class='visually-hidden'>Toggle Dropdown</span>
                    </button>
                    <ul class='dropdown-menu'>
                      <li>
                        <a class='dropdown-item' href='#'>
                          //인물 불러오기 API
                        </a>
                      </li>
                      <li>
                        <a class='dropdown-item' href='#'>
                          //인물 불러오기 API
                        </a>
                      </li>
                      <li>
                        <a class='dropdown-item' href='#'>
                          //인물 불러오기 API
                        </a>
                      </li>
                      <li>
                        <a class='dropdown-item' href='#'>
                          //인물 불러오기 API
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className='content-text-container'></div>
                  <button
                    type='button'
                    class='btn btn-outline-secondary'
                    onClick={showOfficialModal}
                  >
                    추가
                  </button>
                  <Modal
                    visible={officialModalOpen}
                    effect='fadeInDown'
                    onClickAway={closeOfficialModal}
                  >
                    <StaffOfficialAddForm />
                  </Modal>
                </div>
                <div className='col-3'>
                  <input
                    type='text'
                    class='form-control'
                    placeholder='극중 이름 입력'
                    onChange={(event) => setOfficialInfo(event.target.value)}
                  />
                </div>
                <div className='col-3'>
                  <button type='button' class='btn btn-secondary'>
                    주연
                  </button>
                  <button
                    type='button'
                    class='btn btn-secondary dropdown-toggle dropdown-toggle-split'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                  >
                    <span class='visually-hidden'>Toggle Dropdown</span>
                  </button>
                  <ul class='dropdown-menu'>
                    <li>
                      <a class='dropdown-item' href='#'>
                        주연
                      </a>
                    </li>
                    <li>
                      <a class='dropdown-item' href='#'>
                        조연
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className='col-1'>
            <button type='button' class='btn btn-secondary'>
              추가
            </button>
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-2' />
          <div className='col-10'>//선택한 배우 보여주는 곳</div>
        </div>
        <div class='row'>
          <div class='col-sm-2'>
            <div className='content-text-container'>줄거리</div>
          </div>
          <div class='col-sm-9'>
            <input
              type='text'
              class='form-control'
              value={officialInfo}
              onChange={(event) => setOfficialInfo(event.target.value)}
            />
          </div>
        </div>
        <div class='row'>
          <div class='col-sm-2'>
            <div className='content-text-container'>사진</div>
          </div>
          <div class='col-10'>
            <img src={officialMainImg} style={{ maxWidth: '110px' }}></img>
          </div>
        </div>
        <div class='row'>
          <div class='col-sm-2'></div>
          <div class='col-9'>
            <input
              class='form-control'
              type='file'
              id='formFile'
              placeholder=''
              onChange={setPreviewImg}
            />
          </div>
        </div>
        <div class='row'>
          <div class='col-sm-2'></div>
          <div class='col-sm-9'>
            <button type='button' class='btn btn-secondary btn-lg'>
              추가
            </button>
          </div>
        </div>
      </div>
    </div>
    );
}