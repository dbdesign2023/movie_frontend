import React, { useState } from 'react';
import Modal from 'react-awesome-modal';
import StaffCustomerForm from '../form/StaffCustomerForm';

export default function CustomerComponent(props) {
  const customer = props.customer;

  const [customerModalOpen, setCustomerModalOpen] = useState(false);

  const showCustomerModal = () => {
    setCustomerModalOpen(true);
  };

  const closeCustomerModal = () => {
    setCustomerModalOpen(false);
  };

  return (
    <tr key={customer.customerId}>
      <td>{customer.customerId}</td>
      <td>{customer.name}</td>
      <td>{customer.loginId}</td>
      <td>{customer.birthdate}</td>
      <td>
        <button class='btn btn-primary' onClick={showCustomerModal}>
          자세히 보기
        </button>
        {customerModalOpen && (
          <Modal setCustomerModalOpen={showCustomerModal} />
        )}
        <Modal
          visible={customerModalOpen}
          effect='fadeInDown'
          onClickAway={closeCustomerModal}
        >
          <StaffCustomerForm
            closeCustomerModal={closeCustomerModal}
            customer={customer}
          />
        </Modal>
      </td>
    </tr>
  );
}
