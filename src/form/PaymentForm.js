import React, { useState } from 'react';
import Modal from 'react-awesome-modal';
import CustomerTicketForm from './CustomerTicketForm';

export default function PaymentForm() {
    const data = JSON.parse(localStorage.getItem('FinSeatList'))
    return (
        <div className="payment-ticketing-form-container">
            결제페이지
            <CustomerTicketForm seat={data}/>
        </div>
    );
}