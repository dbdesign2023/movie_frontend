import React, { useEffect, useState, useContext } from 'react';
import Modal from 'react-awesome-modal';
import serverapi from '../../services/serverapi';
import { AuthContext } from '../../services/AuthContext';
import StaffRoleAddForm from '../../form/Staff/Role/StaffRoleAddForm';
import MovieRoleComponent from '../../components/MovieRoleComponent';

import '../../styles/components/page-container.scss';

export default function StaffRolePage() {
  const { logout } = useContext(AuthContext);
  const [preMovieList, setPreMovieList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [info, setInfo] = useState({});
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState([]);
  const [castList, setCastList] = useState([]);

  useEffect(() => {
    getPreMovieList();
  }, []);

  const toggleItem = (itemId) => {
    setIsOpen((prevOpen) => {
      if (prevOpen.includes(itemId)) {
        return prevOpen.filter((id) => id !== itemId);
      } else {
        return [...prevOpen, itemId];
      }
    });
    getInfo(itemId);
  };

  useEffect(() => {
    console.log('info', info);
  }, [info]);

  const getInfo = async (id) => {
    const api = `/movie/detail?id=${parseInt(id, 10)}`;
    const token = localStorage.getItem('staffToken');
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
        'ngrok-skip-browser-warning': true,
      },
    };

    try {
      const response = await serverapi.get(api, options);
      console.log('response', response.data);

      const modifiedData = { ...response.data };
      let tmp = new Date(modifiedData.releaseDate);
      modifiedData.releaseDate =
        tmp.getFullYear() +
        '-' +
        (tmp.getMonth() < 9 ? '0' + (tmp.getMonth() + 1) : tmp.getMonth() + 1) +
        '-' +
        (tmp.getDate() < 10 ? '0' + tmp.getDate() : tmp.getDate());

      setInfo(modifiedData);
    } catch (error) {
      if (error.response.data === undefined) {
        logout();
        alert('토큰이 만료되었습니다. 다시 로그인해주세요.');
      } else {
        console.log(error);
        alert(error.response.data.message);
      }
    }
  };

  const getPreMovieList = async () => {
    const api = '/movie/all';
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

      const response = await serverapi.get(api, options);
      console.log('response', response.data);

      const updatedMovieList = response.data.map((movie) => {
        let tmp = new Date(movie.releaseDate);
        movie.releaseDate =
          tmp.getFullYear() +
          '-' +
          (tmp.getMonth() < 9
            ? '0' + (tmp.getMonth() + 1)
            : tmp.getMonth() + 1) +
          '-' +
          (tmp.getDate() < 10 ? '0' + tmp.getDate() : tmp.getDate());
        return movie;
      });

      setPreMovieList(response.data);
      setMovieList(updatedMovieList);
    } catch (error) {
      if (error.response.data === undefined) {
        logout();
        alert('토큰이 만료되었습니다. 다시 로그인해주세요.');
      } else {
        console.log(error);
        alert(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const getCastList = async () => {
    const api = '/movie/cast/getList';
    const token = localStorage.getItem('staffToken');
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
        'ngrok-skip-browser-warning': true,
      },
    };

    try {
      const response = await serverapi.get(api, options);
      console.log('response', response.data);

      setCastList(response.data);
    } catch (error) {
      if (error.response.data === undefined) {
        logout();
        alert('토큰이 만료되었습니다. 다시 로그인해주세요.');
      } else {
        console.log(error);
        alert(error.response.data.message);
      }
    }
  };

  const showRoleModal = () => {
    setRoleModalOpen(true);
    getCastList();
  };

  const closeRoleModal = () => {
    setRoleModalOpen(false);
  };

  return (
    <>
      <div className='add-button-container'>
        <button className='btn btn-success' onClick={showRoleModal}>
          {isLoading ? (
            <div className='spinner-border' role='status'>
              <span className='sr-only' />
            </div>
          ) : (
            <span>등장인물 추가</span>
          )}
        </button>
        {roleModalOpen && <Modal setRoleModalOpen={showRoleModal} />}
        <Modal
          visible={roleModalOpen}
          effect='fadeInDown'
          onClickAway={closeRoleModal}
        >
          <StaffRoleAddForm
            closeRoleModal={closeRoleModal}
            movieList={movieList}
            castList={castList}
          />
        </Modal>
      </div>
      <div class='accordion' id='accordionExample'>
        {movieList.map((movie) => {
          return (
            <MovieRoleComponent
              key={movie.movieId}
              movie={movie}
              getMovieList={getPreMovieList}
              toggleItem={toggleItem}
              isOpen={isOpen}
              info={info}
            />
          );
        })}
      </div>
    </>
  );
}
