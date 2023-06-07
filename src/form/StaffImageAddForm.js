import React, { useState } from 'react';
import serverapi from '../services/serverapi';
import { useForm } from 'react-hook-form';

import '../styles/components/form-container.scss';
import '../styles/components/modal-container.scss';

export default function StaffImageAddForm(props) {
  const closeImageModal = props.closeImageModal;
  const getImageList = props.getImageList;

  const [isLoading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isDirty, errors },
  } = useForm();

  const resetData = () => {
    setValue('image', null);
  };

  const onSubmit = async (data) => {
    const api = '/movie/image/add';
    const token = localStorage.getItem('staffToken');
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if (data.image == null) {
      alert('이미지 파일을 업로드해주세요.');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('image', data.image);
      //console.log('Request body', data);

      const response = await serverapi.post(api, formData, options);
      console.log('response', response.data);

      closeImageModal();
      alert('이미지가 등록되었습니다');
      getImageList();
      resetData();
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
          class='btn-close'
          aria-label='Close'
          onClick={closeImageModal}
        ></button>
      </div>
      <div className='title-text-center-container'>이미지 추가</div>
      <div className='form-container'>
        <form
          className='staff-image-add-form'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div class='row'>
            <div class='col-sm-2'>
              <div className='content-text-container'>사진</div>
            </div>
            <div class='col-10'>
              <input
                class='form-control'
                type='file'
                accept='image/jpg, image/jpeg, image/png'
                defaultValue={null}
                aria-invalid={
                  !isDirty ? undefined : errors.image ? 'true' : 'false'
                }
                {...register('image', {
                  required: '이미지 파일을 업로드해주세요.',
                })}
              />
            </div>
          </div>
          <div className='bottom-container'>
            <div className='button-container'>
              <div class='btn btn-secondary' onClick={resetData}>
                초기화
              </div>
              &nbsp; &nbsp; &nbsp;
              <button type='submit' class='btn btn-success'>
                {isLoading ? (
                  <div className='spinner-border' role='status'>
                    <span className='sr-only' />
                  </div>
                ) : (
                  <span>등록</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
