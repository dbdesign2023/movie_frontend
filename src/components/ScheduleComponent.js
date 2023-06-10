import React, { useState } from 'react';
import Modal from 'react-awesome-modal';
import serverapi from '../services/serverapi';
import StaffScheduleModifyForm from '../form/Staff/Schedule/StaffScheduleModifyForm';

export default function ScheduleComponent(props) {
  const schedule = props.schedule;
  const theaterList = props.theaterList;
  const getTheaterList = props.getTheaterList;

  const [scheduleModifyOpen, setScheduleModifyOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const showScheduleModify = () => {
    setScheduleModifyOpen(true);
    getTheaterList();
  };

  const closeScheduleModify = () => {
    setScheduleModifyOpen(false);
  };

  const deleteSchedule = async (id) => {
    const api = `/schedule/${id}/delete`;
    const token = localStorage.getItem('staffToken');
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
        'ngrok-skip-browser-warning': true,
      },
    };

    const yesOrNo = window.confirm('상영 일정을 삭제하시겠습니까?');
    if (yesOrNo === false) {
      return;
    }

    try {
      setLoading(true);

      const response = await serverapi.delete(api, options);
      console.log('response', response.data);
      alert('삭제되었습니다');
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr key={schedule.key}>
      <td className='centered-cell'>
        <span>{schedule.movieName}</span>
      </td>
      <td className='centered-cell'>
        <span>{schedule.theaterDTO.name}</span>
      </td>
      <td className='centered-cell'>
        <span>{schedule.startTime}</span>
      </td>
      <td>
        <button className='btn btn-warning' onClick={showScheduleModify}>
          수정
        </button>
        {scheduleModifyOpen && (
          <Modal setScheduleModifyOpen={showScheduleModify} />
        )}
        <Modal
          visible={scheduleModifyOpen}
          effect='fadeInDown'
          onClickAway={closeScheduleModify}
        >
          <StaffScheduleModifyForm
            closeScheduleModify={closeScheduleModify}
            schedule={schedule}
            theaterList={theaterList}
          />
        </Modal>
      </td>
      <td>
        <button
          className='btn btn-danger'
          onClick={() => deleteSchedule(schedule.scheduleId)}
        >
          {isLoading ? (
            <div className='spinner-border' role='status'>
              <span className='sr-only' />
            </div>
          ) : (
            <span>삭제</span>
          )}
        </button>
      </td>
    </tr>
  );
}
