import React, { useState } from 'react';
import TicketingSeatForm from './TicketingSeatForm';
import Modal from 'react-awesome-modal';

export default function PaymentForm() {
    return (
        <div className="payment-ticketing-form-container">
            <TicketingSeatForm/>
        </div>
    );
}