import React, { useState } from 'react';
import Modal from 'react-awesome-modal';
import serverapi from '../services/serverapi';
import StaffRatingModifyForm from '../form/StaffRatingModifyForm';

export default function RatingComponent(props) {
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
      console.log(error);
      alert(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr key={rating.code}>
      <td>{rating.code}</td>
      <td>{rating.name}</td>
      <td>
        <button class='btn btn-warning' onClick={showRatingModify}>
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
        <button class='btn btn-danger' onClick={deleteRating(rating.code)}>
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
