import React, { useEffect, useState } from 'react';
import Modal from 'react-awesome-modal';
import serverapi from '../services/serverapi';
import StaffImageAddForm from '../form/StaffImageAddForm';
import ImageComponent from '../components/ImageComponent';

import '../styles/components/page-container.scss';

export default function StaffImagePage() {
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [imageList, setImageList] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getImageList();
  }, []);

  const getImageList = async () => {
    const api = '/movie/image/getList';
    const token = localStorage.getItem('staffToken');
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      setLoading(true);

      const response = await serverapi.get(api, options);
      console.log('response', response.data);

      setImageList(response.data);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const showImageModal = () => {
    setImageModalOpen(true);
  };

  const closeImageModal = () => {
    setImageModalOpen(false);
  };

  return (
    <>
      <div className='add-button-container'>
        <button class='btn btn-success' onClick={showImageModal}>
          {isLoading ? (
            <div className='spinner-border' role='status'>
              <span className='sr-only' />
            </div>
          ) : (
            <span>사진 추가</span>
          )}
        </button>
        {imageModalOpen && <Modal setImageModalOpen={showImageModal} />}
        <Modal
          visible={imageModalOpen}
          effect='fadeInDown'
          onClickAway={closeImageModal}
        >
          <StaffImageAddForm
            closeImageModal={closeImageModal}
            setImageList={setImageList}
          />
        </Modal>
      </div>
      <div className='list-container'>
        <table class='table table-striped'>
          <thead>
            <tr>
              <th scope='col'>사진코드</th>
              <th scope='col'>파일 이름</th>
              <th scope='col'>보기</th>
              <th scope='col'>삭제</th>
              <th scope='col'>수정</th>
            </tr>
          </thead>
          <tbody>
            {imageList.map((image) => {
              return (
                <ImageComponent
                  key={image.imageId}
                  image={image}
                  setImageList={setImageList}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
