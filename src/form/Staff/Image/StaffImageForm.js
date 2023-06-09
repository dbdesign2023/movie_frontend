import React from 'react';

import '../../../styles/components/form-container.scss';
import '../../../styles/components/modal-container.scss';

export default function StaffImageForm(props) {
  const closeImageModal = props.closeImageModal;
  const fileURL = props.fileURL;
  const info = props.info;

  if (!info || !info.profileImage || !info.poster) {
    return null;
  }

  return (
    <div className='modal-container'>
      <div className='btn-close'>
        <button
          type='button'
          className='btn-close'
          aria-label='Close'
          onClick={closeImageModal}
        ></button>
      </div>
      <div className='title-text-center-container'>이미지 보기</div>
      <div className='form-container'>
        {fileURL === '/api/profileImage?fileName=' ? (
          <img
            src={
              process.env.REACT_APP_API_ORIGIN +
              fileURL +
              info.profileImage.fileName
            }
            className='w-100'
            alt='profileImage_image'
          />
        ) : (
          <img
            src={
              process.env.REACT_APP_API_ORIGIN + fileURL + info.poster.fileName
            }
            className='w-100'
            alt='poster_image'
          />
        )}
      </div>
    </div>
  );
}
