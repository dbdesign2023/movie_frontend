import React, { useState } from 'react';
import serverapi from '../../../services/serverapi';
import { useForm } from 'react-hook-form';

import '../../../styles/components/form-container.scss';
import '../../../styles/components/modal-container.scss';

export default function StaffSeatAddForm(props) {
  const closeSeatModify = props.closeSeatModify;
  const theaterId = props.theaterId;
  const selectedSeats = props.selectedSeats;
  const getSeatList = props.getSeatList;

  const [isLoading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isValid, isDirty, errors },
  } = useForm();

  const onSubmit = async (data) => {
    const api = `/theater/${parseInt(theaterId, 10)}/seat/modify`;
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

      data.seatIds = selectedSeats;
      console.log('Request body', data);

      const response = await serverapi.post(api, data, options);
      console.log('response', response.data);

      closeSeatModify();
      alert('좌석이 수정되었습니다');
      getSeatList();
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
          onClick={closeSeatModify}
        ></button>
      </div>
      <div className='title-text-center-container'>좌석 수정</div>
      <div className='form-container'>
        <form className='staff-seat-add-form' onSubmit={handleSubmit(onSubmit)}>
          <div className='row'>
            <div className='col-sm-3'>
              <div className='content-text-container'>선택한 좌석</div>
            </div>
            <div className='col-sm-9'>
              <div className='hstack gap-3'>
                {selectedSeats.map((seat) => (
                  <div className='bg-light border'>{seat}</div>
                ))}
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-3'>
              <div className='content-text-container'>가격</div>
            </div>
            <div className='col-sm-9'>
              <input
                className='form-control'
                type='number'
                placeholder='가격을 입력하세요'
                aria-invalid={
                  !isDirty ? undefined : errors.price ? 'true' : 'false'
                }
                {...register('price', {
                  required: '가격을 입력하세요',
                })}
              />
              {errors.price && (
                <small role='alert' className='input-alert'>
                  {errors.price.message}
                </small>
              )}
            </div>
          </div>
          <div className='bottom-container'>
            <div className='button-container'>
              <button
                type='submit'
                className='btn btn-success'
                disabled={!(isDirty && isValid)}
              >
                {isLoading ? (
                  <div className='spinner-border' seat='status'>
                    <span className='sr-only' />
                  </div>
                ) : (
                  <span>가격 수정</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
