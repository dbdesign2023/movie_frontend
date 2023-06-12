import React from 'react';

import '../../../styles/components/form-container.scss';
import '../../../styles/components/modal-container.scss';

export default function StaffImageForm(props) {
  const closeImageModal = props.closeImageModal;
  const fileURL = props.fileURL;
  const info = props.info;

  return (
    <div className='modal-container' style={{height:"1000px", padding:0}}>
        {fileURL === '/api/profileImage?fileName=' ? (
          <img
            src={
              process.env.REACT_APP_API_ORIGIN +
              fileURL +
              info.profileImage.fileName
            }
            className='w-100'
            alt='profileImage_image'
            style={{height:"100%"}}
          />
        ) : (
          <img
            src={
              process.env.REACT_APP_API_ORIGIN + fileURL + info.poster.fileName
            }
            className='w-100'
            alt='poster_image'
            style={{height:"100%"}}
          />
        )}
    </div>
  );
}
