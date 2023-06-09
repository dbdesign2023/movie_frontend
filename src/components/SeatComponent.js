import React, { useState } from 'react';

export default function SeatComponent(props) {
  const seat = props.seat;

  return (
    <tr key={seat.code}>
      <td>{seat.code}</td>
      <td>{seat.name}</td>
    </tr>
  );
}
