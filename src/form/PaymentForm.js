import React, { useState } from 'react';
import TicketingSeatForm from './TicketingSeatForm';
import Modal from 'react-awesome-modal';

export default function PaymentForm() {
    const [modalstate, setModalstate] = useState(false)
    const openModal = ()=>{
        setModalstate(true)
    }
    const closeModal = ()=>{
        setModalstate(false)
    }
    return (
        <div className="payment-ticketing-form-container">
            <div className='title-text-container'>
                좌석선택
            </div>
            <button onClick={openModal}>좌석 선택</button>
            <Modal              
                visible={modalstate}
                effect='fadeInDown'
                onClickAway={closeModal}>
                <TicketingSeatForm closeModal={closeModal}/>
            </Modal>
        </div>
    );
}