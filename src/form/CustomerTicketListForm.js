import React, { useEffect, useState } from 'react';
import Modal from 'react-awesome-modal';
import axios from 'axios';
import CustomerTicketForm from './CustomerTicketForm';

export default function CustomerTicketListForm() {
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
    const ip = `http://localhost:8080`;
    const[tickets, setTickets] = useState()
    const[detail, setDetail] = useState()
    const[modal, setModal] = useState(false)
    const closeModal = () => {
        setModal(false)
    }
    const getTicketList = async()=>{
        const url = ip+`/ticket/list/member`;
        const token = localStorage.getItem('customerToken')
        const header = {
            headers: {
            "Authorization": `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*"
            },
        }
        const response = await axios.get(
            url,
            header
        )
        setTickets(response.data)
    }
    const getTicketDetail = async(ticket)=>{
        const url = ip+`/ticket/detail/member?ticketId=` + ticket.Id;
        const token = localStorage.getItem('customerToken')
        const header = {
            headers: {
            "Authorization": `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*"
            },
        }
        const response = await axios.get(
            url,
            header
        )
        setDetail(response.data)
    }
    useEffect(()=>{
        //getTicketList()
        setTickets([{
            ticketId:1,
            ticketingTime:"2023-06-06 06:00:00",
            movieName:"test",
            theaterName:"test",
            startTime:"2023-06-06 09:00:00"
        }])
    },[])
    const loading = ()=>{
        if(detail){
            return <CustomerTicketForm ticket={detail}/>
        }
    }
    function clickHandler(){
        //getTicketDetail(this)
        setDetail(ticket_data)
        setModal(true)
    }
    const style ={
        background:'#BBBBBB88',
        borderRadius: 15,
        display: 'flex',
        margin: 10
    }
    const button_style ={
        background:'#BBBBBB88',
    }
    const ticketform = ()=>{
        if(tickets){
            return(
                <div className='TicketList'>
                    {tickets.map((item)=>(
                        <div key={item.ticketId} style={style}>
                            <div style={{width:"100%", padding:10}}>
                                <div style={{display:"flex", justifyContent:"space-between"}}>
                                    <h6>
                                        ticket_no : {item.ticketId}
                                    </h6>
                                    <h6>
                                        결제시간 : {item.ticketingTime}
                                    </h6>
                                </div>
                                <div>
                                    <h5 className='text-start'>
                                        영화 제목 : {item.movieName}
                                    </h5>
                                    <h5 className='text-start'>
                                        상영관 이름 : {item.theaterName}
                                    </h5>
                                </div>
                                <div style={{display:"flex", justifyContent:"space-between"}}>
                                    <h5 className='text-start'>
                                        시작 시간 : {item.startTime}
                                    </h5>
                                    <button style={button_style} onClick={clickHandler.bind(item)}>자세히 보기</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )
        }
        else{
            return(
                <div>
                    로딩 중
                </div>
            )
        }
    }
    
    return (
        <div>
            {ticketform()}
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