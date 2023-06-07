import React, { useEffect, useState } from 'react';
import CustomerTicketForm from './CustomerTicketForm';
import axios from 'axios';
import Modal from 'react-awesome-modal';
import { baseUrl } from './axios';

export default function NonmemberTicketForm() {
    /*
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
    }*/
    const ip = baseUrl;
    const[ticketId, setId] = useState()
    const[password, setPassword] = useState()
    const[detail, setDetail] = useState()
    const[modal, setModal] = useState(false)
    const closeModal = () => {
        setModal(false)
    }
    const getTicketDetail = async()=>{
        try{
            const url = ip+`/ticket/nonmember/detail?ticketId=`+ticketId+`&password=`+password;
            const header = {
                headers: {
                "Access-Control-Allow-Origin": "*"
                },
            }
            const response = await axios.get(
                url,
                header
            )
            setDetail(response.data)
            localStorage.setItem("nonmempassword",password)
        }
        catch(error){
            if(error.response.data.message)
                alert(error.response.data.message)
            else
                alert("알수 없는 에러.")
        }
    }
    const clickHandler = ()=>{
        if(ticketId && password){
        getTicketDetail()
        setModal(true)
        }
        else{
            alert("티켓번호화 비밀번호를 입력하세요.")
        }
    }
    const loading = ()=>{
        if(detail){
            return <CustomerTicketForm ticket={detail}/>
        }
    }
    return (
        <div>
            <div className='row pt-3 p-1'>
                <div className='col-sm-4'>
                    <div className='content-text-container'>티켓번호</div>
                </div>
                <div className='col-sm-4'>
                    <input
                    type='text'
                    className='form-control'
                    value={ticketId}
                    onChange={(event) => setId(event.target.value)}
                    />
                </div>
            </div>
            <div className='row p-1'>
                <div className='col-sm-4'>
                    <div className='content-text-container'>비밀번호</div>
                </div>
                <div className='col-sm-4'>
                    <input
                    type='text'
                    className='form-control'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
            </div>
            <button className='btn btn-primary m-1' onClick={clickHandler}>
              조회하기
            </button>
            <Modal 
                visible={modal}
                effect='fadeInDown'
                onClickAway={closeModal}
                width='1000'>
                    {loading()}
            </Modal>
        </div>
      );
}