import React, { useState, useContext } from 'react';
import Modal from 'react-awesome-modal';
import serverapi from '../services/serverapi';
import { AuthContext } from '../services/AuthContext';
import StaffRatingModifyForm from '../form/Staff/Rating/StaffRatingModifyForm';

export default function RatingComponent(props) {
  const { logout } = useContext(AuthContext);
  const rating = props.rating;
  const getRatingList = props.getRatingList;

  const [ratingModifyOpen, setRatingModifyOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const showRatingModify = () => {
    setRatingModifyOpen(true);
  };

  const closeRatingModify = () => {
    setRatingModifyOpen(false);
  };

  const deleteRating = async (id) => {
    const api = `/movie/rating/delete?id=${id}`;
    const token = localStorage.getItem('staffToken');
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
        'ngrok-skip-browser-warning': true,
      },
    };

    const yesOrNo = window.confirm('등급을 삭제하시겠습니까?');
    if (yesOrNo === false) {
      return;
    }

    try {
      setLoading(true);

      const response = await serverapi.delete(api, options);
      console.log('response', response.data);

      alert('삭제되었습니다');
      getRatingList();
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

  return (
    <tr key={rating.code}>
      <td className='centered-cell'>
        <span>{rating.code}</span>
      </td>
      <td className='centered-cell'>
        <span>{rating.name}</span>
      </td>
      <td>
        <button className='btn btn-warning' onClick={showRatingModify}>
          수정
        </button>
        {ratingModifyOpen && <Modal setRatingModifyOpen={showRatingModify} />}
        <Modal
          visible={ratingModifyOpen}
          effect='fadeInDown'
          onClickAway={closeRatingModify}
        >
          <StaffRatingModifyForm
            closeRatingModify={closeRatingModify}
            getRatingList={getRatingList}
            rating={rating}
          />
        </Modal>
      </td>
      <td>
        <button
          className='btn btn-danger'
          onClick={() => deleteRating(rating.code)}
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
