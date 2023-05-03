import React, { useEffect } from 'react';
import Modal from 'react-awesome-modal';
import { useState } from 'react';
import '../../styles/components/modal-container.scss';
import '../../styles/components/form-container.scss';
import '../../styles/MovieRegisterPage.scss';

function RatingAddForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await new Promise((r) => setTimeout(r, 1000));
      const url = `movie/genre/add`;
      const response = await axios.post(url, data);

      console.log(response.data);
      alert('장르가 추가되었습니다.');
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    <div className='modal-container'>
      <div className='title-text-center-container'>등급 목록</div>
      <div className='form-container' onSubmit={handleSubmit(onSubmit)}>
        <div className='row'>// 등급 목록 api 받아서 보여주는 곳</div>
        <div className='row'>
          <div class='col-sm-3'>
            <div className='content-text-container'>새로 추가하기</div>
          </div>
          <div class='col-sm-7'>
            <input
              type='text'
              placeholder='장르를 입력하세요'
              aria-invalid={
                !isDirty ? undefined : errors.password ? 'true' : 'false'
              }
              {...register('password', {
                required: '비밀번호를 입력해주세요.',
              })}
              onChange={(event) => setRating(event.target.value)}
            />
          </div>
          <div class='col-2'>
            <div class='left'>
              <button type='button' class='btn btn-success'>
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
              onClick={closeRatingModal}
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MovieRegisterPage() {
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

  const [name, setName] = useState('');
  const [openingDate, setOpeningDate] = useState('');
  const [runningTime, setRunningTime] = useState(0);
  const [country, setCountry] = useState('');
  const [language, setLanguage] = useState('');

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
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div class='col-sm-2'>
            <div className='content-text-container'>등급</div>
          </div>
          <div class='col-4'>
            <div className='inner-form-container'>
              <div class='btn-group'>
                <button type='button' class='btn btn-secondary'>
                  hi
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
                <RatingAddForm />
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
              value={openingDate}
              onChange={(event) => setOpeningDate(event.target.value)}
            />
          </div>
          <div class='col-sm-2'>
            <div className='content-text-container'>상영시간</div>
          </div>
          <div class='col-sm-2'>
            <input
              type='number'
              class='form-control'
              value={runningTime}
              onChange={(event) => setRunningTime(event.target.value)}
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
              value={country}
              onChange={(event) => setCountry(event.target.value)}
            />
          </div>
          <div class='col-sm-2'>
            <div className='content-text-container'>언어</div>
          </div>
          <div class='col-3'>
            <input
              type='text'
              class='form-control'
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
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
              <div className='modal-container'>
                <div className='title-text-center-container'>장르 목록</div>
                <div className='form-container'>
                  <div className='row'>// 장르 목록 api 받아서 보여주는 곳</div>
                  <div className='row'>
                    <div class='col-sm-3'>
                      <div className='content-text-container'>
                        새로 추가하기
                      </div>
                    </div>
                    <div class='col-sm-7'>
                      <input
                        type='text'
                        class='form-control'
                        value={genre}
                        onChange={(event) => setGenre(event.target.value)}
                      />
                    </div>
                    <div class='col-2'>
                      <div class='left'>
                        <button type='button' class='btn btn-success'>
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
              <div className='modal-container'>
                <div className='title-text-center-container'>
                  <div className='center'>인물 등록</div>
                </div>
                <div className='form-container'>
                  <div class='row'>
                    <div class='col-sm-2'>
                      <div className='content-text-container'>이름</div>
                    </div>
                    <div class='col-10'>
                      <div class='half-inner-form-container'>
                        <input
                          type='text'
                          class='form-control'
                          value={officialName}
                          onChange={(event) =>
                            setOfficialName(event.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div class='row'>
                    <div class='col-sm-2'>
                      <div className='content-text-container'>생년월일</div>
                    </div>
                    <div class='col-10'>
                      <div class='half-inner-form-container'>
                        <input
                          type='date'
                          class='inputField'
                          value={officialDate}
                          onChange={(event) =>
                            setOfficialDate(event.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div class='row'>
                    <div class='col-sm-2'>
                      <div className='content-text-container'>사진</div>
                    </div>
                    <div class='col-10'>
                      <img
                        src={officialMainImg}
                        style={{ maxWidth: '110px' }}
                      ></img>
                    </div>
                  </div>
                  <div class='row'>
                    <div class='col-sm-2'></div>
                    <div class='col-10'>
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
                    <div class='col-sm-2'>
                      <div className='content-text-container'>국적</div>
                    </div>
                    <div class='col-10'>
                      <div class='half-inner-form-container'>
                        <input
                          type='text'
                          class='form-control'
                          value={nation}
                          onChange={(event) => setNation(event.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div class='row'>
                    <div class='col-sm-2'>
                      <div className='content-text-container'>정보</div>
                    </div>
                    <div class='col-sm-10'>
                      <input
                        type='text'
                        class='form-control'
                        value={officialInfo}
                        onChange={(event) =>
                          setOfficialInfo(event.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className='bottom-container'>
                    <div className='button-container'>
                      <button
                        type='button'
                        class='btn btn-secondary'
                        onClick={closeOfficialModal}
                      >
                        닫기
                      </button>
                    </div>
                    <div className='button-container'>
                      <button
                        type='button'
                        class='btn btn-outline-success  '
                        onClick={setOfficialReset}
                      >
                        초기화
                      </button>
                    </div>
                    <div className='button-container'>
                      <button type='button' class='btn btn-success'>
                        등록
                      </button>
                    </div>
                  </div>
                </div>
              </div>
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
                    <div className='modal-container'>
                      <div className='title-text-center-container'>
                        <div className='center'>인물 등록</div>
                      </div>
                      <div className='form-container'>
                        <div class='row'>
                          <div class='col-sm-2'>
                            <div className='content-text-container'>이름</div>
                          </div>
                          <div class='col-10'>
                            <div class='half-inner-form-container'>
                              <input
                                type='text'
                                class='form-control'
                                value={officialName}
                                onChange={(event) =>
                                  setOfficialName(event.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div class='row'>
                          <div class='col-sm-2'>
                            <div className='content-text-container'>
                              생년월일
                            </div>
                          </div>
                          <div class='col-10'>
                            <div class='half-inner-form-container'>
                              <input
                                type='date'
                                class='inputField'
                                value={officialDate}
                                onChange={(event) =>
                                  setOfficialDate(event.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div class='row'>
                          <div class='col-sm-2'>
                            <div className='content-text-container'>사진</div>
                          </div>
                          <div class='col-10'>
                            <img
                              src={officialMainImg}
                              style={{ maxWidth: '110px' }}
                            ></img>
                          </div>
                        </div>
                        <div class='row'>
                          <div class='col-sm-2'></div>
                          <div class='col-sm-10'>
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
                          <div class='col-sm-2'>
                            <div className='content-text-container'>국적</div>
                          </div>
                          <div class='col-10'>
                            <div class='half-inner-form-container'>
                              <input
                                type='text'
                                class='form-control'
                                value={nation}
                                onChange={(event) =>
                                  setNation(event.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div class='row'>
                          <div class='col-sm-2'>
                            <div className='content-text-container'>정보</div>
                          </div>
                          <div class='col-10'>
                            <input
                              type='text'
                              class='form-control'
                              value={officialInfo}
                              onChange={(event) =>
                                setOfficialInfo(event.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className='bottom-container'>
                          <div className='button-container'>
                            <button
                              type='button'
                              class='btn btn-secondary'
                              onClick={closeOfficialModal}
                            >
                              닫기
                            </button>
                          </div>
                          <div className='button-container'>
                            <button
                              type='button'
                              class='btn btn-outline-success  '
                              onClick={setOfficialReset}
                            >
                              초기화
                            </button>
                          </div>
                          <div className='button-container'>
                            <button type='button' class='btn btn-success'>
                              등록
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
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
