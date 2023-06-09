import React from 'react';

export default function SeatComponent(props) {
  const { seat, handleSeatSelection, isSelected } = props;

  const handleCheckboxChange = () => {
    handleSeatSelection(seat.seatId);
  };

  return (
    <tr key={seat.seatId}>
      <td>
        <input
          className='form-check-input'
          type='checkbox'
          checked={isSelected}
          onChange={handleCheckboxChange}
        />
      </td>
      <td>{seat.seatId}</td>
      <td>{seat.price}</td>
    </tr>
  );
}
