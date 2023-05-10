import React from 'react';
import StaffLoginForm from '../form/StaffLoginForm';

export default function StaffLoginPage(props) {
  return (
    <StaffLoginForm setIsStaffLogin={props.setIsStaffLogin} />
  );
}
  