import React, { useEffect } from 'react';
import RoleComponent from './RoleComponent';

function AccordionBody(props) {
  const info = props.info;
  const getMovieList = props.getMovieList;

  useEffect(() => {
    console.log('info.roleList', info.roleList);
  }, [info]);

  if (!info.roleList) return;

  return (
    <div className='accordion-body'>
      <div className='list-container'>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th scope='col'>주연여부</th>
              <th scope='col'>이름</th>
              <th scope='col'>극 중 이름</th>
              <th scope='col'>수정</th>
              <th scope='col'>삭제</th>
            </tr>
          </thead>
          <tbody>
            {info.roleList.map((role, index) => {
              return (
                <RoleComponent
                  key={index}
                  role={role}
                  info={info}
                  getMovieList={getMovieList}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default function MovieRoleComponent(props) {
  const movie = props.movie;
  const getMovieList = props.getMovieList;
  const toggleItem = props.toggleItem;
  const isOpen = props.isOpen;
  const info = props.info;

  return (
    <div className='accordion-item' key={movie.movieId}>
      <h2 className='accordion-header' id={`heading${movie.movieId}`}>
        <button
          className={`accordion-button${
            isOpen.includes(movie.movieId) ? ' active' : ''
          }`}
          type='button'
          data-bs-toggle='collapse'
          data-bs-target={`#collapse${movie.movieId}`}
          aria-expanded={isOpen.includes(movie.movieId) ? 'true' : 'false'}
          aria-controls={`collapse${movie.movieId}`}
          onClick={() => toggleItem(movie.movieId)}
        >
          ({movie.releaseDate}){movie.title}
        </button>
      </h2>
      <div
        id={`collapse${movie.movieId}`}
        className={`accordion-collapse collapse${
          isOpen.includes(movie.movieId) ? ' show' : ''
        }`}
        aria-labelledby={`heading${movie.movieId}`}
        data-bs-parent='#accordionExample'
      >
        <AccordionBody info={info} getMovieList={getMovieList} />
      </div>
    </div>
  );
}
