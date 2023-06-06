import React, { useState } from 'react';
import Modal from 'react-awesome-modal';
import serverapi from '../services/serverapi';
import StaffRatingModifyForm from '../form/StaffRatingModifyForm';

export default function RatingComponent(props) {
  const rating = props.rating;
  const getRatingList = props.getRatingList;

  const [ratingModifyOpen, setRatingModifyOpen] = useState(false);

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

    try {
      console.log('staffToken', token);
      const response = await serverapi.delete(api, options);
      console.log('response', response.data);

      getRatingList();
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    <tr key={rating.ratingId}>
      <td>{rating.name}</td>
      <td>{rating.minAge}</td>
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
        <button
          class='btn btn-danger'
          onClick={() => deleteRating(rating.ratingId)}
        >
          삭제
        </button>
      </td>
    </tr>
  );
}
