import React, { useEffect } from 'react';
import ScheduleComponent from './ScheduleComponent';

function AccordionBody(props) {
  const date = props.date;
  const scheduleList = props.scheduleList;
  const theaterList = props.theaterList;
  const getTheaterList = props.getTheaterList;

  return (
    <div className='accordion-body'>
      <div className='list-container'>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th scope='col'>영화</th>
              <th scope='col'>상영관</th>
              <th scope='col'>시작 시간</th>
              <th scope='col'>할인</th>
              <th scope='col'>수정</th>
              <th scope='col'>삭제</th>
            </tr>
          </thead>
          <tbody>
            {scheduleList.map((schedule) => {
              return (
                <ScheduleComponent
                  key={schedule.Id}
                  schedule={schedule}
                  theaterList={theaterList}
                  getTheaterList={getTheaterList}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default function DateScheduleComponent(props) {
  const date = props.date;
  const toggleItem = props.toggleItem;
  const isOpen = props.isOpen;
  const scheduleList = props.scheduleList;
  const theaterList = props.theaterList;
  const getTheaterList = props.getTheaterList;

  return (
    <div className='accordion-item' key={date}>
      <h2 className='accordion-header' id={`heading${date}`}>
        <button
          className={`accordion-button${
            isOpen.includes(date) ? ' active' : ''
          }`}
          type='button'
          data-bs-toggle='collapse'
          data-bs-target={`#collapse${date}`}
          aria-expanded={isOpen.includes(date) ? 'true' : 'false'}
          aria-controls={`collapse${date}`}
          onClick={() => toggleItem(date)}
        >
          {date}
        </button>
      </h2>
      <div
        id={`collapse${date}`}
        className={`accordion-collapse collapse${
          isOpen.includes(date) ? ' show' : ''
        }`}
        aria-labelledby={`heading${date}`}
        data-bs-parent='#accordionExample'
      >
        <AccordionBody
          date={date}
          scheduleList={scheduleList}
          theaterList={theaterList}
          getTheaterList={getTheaterList}
        />
      </div>
    </div>
  );
}
