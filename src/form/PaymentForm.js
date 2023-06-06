import React, { useState } from 'react';
import Modal from 'react-awesome-modal';
import CustomerTicketForm from './CustomerTicketForm';

export default function PaymentForm() {
    //const ticket_data = JSON.parse(localStorage.getItem('ticket_data'))
    const ticket_data = {
        ticketId: 1,
        ticketTime: "2023-06-05 11:00:00",
        movieId: 1,
        movieTitle: "test",
        theaterName: "1관",
        floor: 1,
        startTime: "2023-06-05 11:00:00",
        runningtime: 150,
        posterFileName: "https://upload.wikimedia.org/wikipedia/ko/b/bc/%EB%B0%B1%EB%91%90%EC%82%B0_%EC%98%81%ED%99%94_%ED%8F%AC%EC%8A%A4%ED%84%B0.jpg",
        seats:[{
            seatId:"A1",
            theaterId:1,
            row:"A",
            column:"1",
            price: 15000
        },{
            seatId:"A2",
            theaterId:1,
            row:"A",
            column:"2",
            price: 15000
        },{
            seatId:"A3",
            theaterId:1,
            row:"A",
            column:"3",
            price: 15000
        }],
        discount: "1000KR"
    }
    const [method, setMethod] = useState()
    const clickHandler = ()=>{
    }
    const loading = ()=>{
        if(ticket_data){
            return <CustomerTicketForm ticket={ticket_data}/>
        }
    }
    return (
        <div className="payment-ticketing-form-container">
            {loading()}
            <h2>
                결제 방식 선택 {}
                <select class="selectpicker" onChange={e=>{
                    setMethod(e.target.value)
                }}>
                    <option value="PM002">신용카드 결제</option>
                    <option value="PM001">무통장 입금</option>
                    <option value="PM000">포인트 결제</option>
                </select>
            </h2>
            <div>
              <button type="button" className="btn btn-primary m-1" onClick={clickHandler}>결제</button>
            </div>
        </div>
    );
}