import React, { useState } from 'react';
import serverapi from '../../../services/serverapi';
import { useForm } from 'react-hook-form';

import '../../../styles/components/form-container.scss';
import '../../../styles/components/modal-container.scss';

export default function StaffSeatAddForm(props) {
  const closeSeatModal = props.closeSeatModal;
  const theaterId = props.theaterId;
  const getSeatList = props.getSeatList;

  const [isLoading, setLoading] = useState(false);
  const [seatList, setSeatList] = useState([]);

  const {
    register,
    handleSubmit,
    resetField,
    formState: { isValid, isDirty, errors },
  } = useForm();

  const resetData = () => {
    resetField('minRow');
    resetField('maxRow');
    resetField('maxColumn');
    setSeatList([]);
  };

  const onSubmit = async (data) => {
    console.log(data);

    const api = `/theater/${parseInt(theaterId, 10)}/seat/register`;
    const token = localStorage.getItem('staffToken');
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
        'ngrok-skip-browser-warning': true,
      },
    };

    try {
      if (data.minRow > data.maxRow) {
        alert('행을 순서에 맞게 선택해주세요');
        return;
      } else if (data.maxColumn < 1) {
        alert('등록할 열은 0보다 커야합니다');
        return;
      }

      setLoading(true);

      for (
        let row = data.minRow.charCodeAt(0);
        row <= data.maxRow.charCodeAt(0);
        row++
      ) {
        for (let column = 1; column <= data.maxColumn; column++) {
          const seat =
            String.fromCharCode(row) + column.toString().padStart(2, '0');
          seatList.push(seat);
        }
      }

      const { maxColumn, minRow, maxRow, ...requestData } = data;
      requestData.seatIds = seatList;

      const response = await serverapi.post(api, requestData, options);
      console.log('response', response.data);

      closeSeatModal();
      alert('좌석이 등록되었습니다');
      resetData();
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
          onClick={closeSeatModal}
        ></button>
      </div>
      <div className='title-text-center-container'>좌석 한 번에 추가</div>
      <div className='form-container'>
        <form className='staff-seat-add-form' onSubmit={handleSubmit(onSubmit)}>
          <div className='row'>
            <div className='col-sm-3'>
              <div className='content-text-container'>열(A~Z)</div>
            </div>
            <div className='col-sm-2'>
              <input
                className='form-control'
                type='text'
                placeholder='A~Z'
                aria-invalid={
                  !isDirty ? undefined : errors.minRow ? 'true' : 'false'
                }
                {...register('minRow')}
              />
            </div>
            <div className='col-sm-1'>~</div>
            <div className='col-sm-2'>
              <input
                className='form-control'
                type='text'
                placeholder='A~Z'
                aria-invalid={
                  !isDirty ? undefined : errors.maxRow ? 'true' : 'false'
                }
                {...register('maxRow')}
              />
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-3'>
              <div className='content-text-container'>행(1~50)</div>
            </div>
            <div className='col-sm-2'>1</div>
            <div className='col-sm-1'>~</div>
            <div className='col-sm-2'>
              <input
                className='form-control'
                type='number'
                placeholder='1~50'
                aria-invalid={
                  !isDirty ? undefined : errors.maxColumn ? 'true' : 'false'
                }
                {...register('maxColumn')}
              />
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
              <button className='btn btn-secondary' onClick={resetData}>
                초기화
              </button>
              &nbsp; &nbsp; &nbsp;
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
