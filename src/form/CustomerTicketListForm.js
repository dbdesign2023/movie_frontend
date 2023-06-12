import React, { useEffect, useState } from 'react';
import Modal from 'react-awesome-modal';
import axios from 'axios';
import CustomerTicketForm from './CustomerTicketForm';
import { baseUrl } from './axios';

export default function CustomerTicketListForm() {
    const ip = baseUrl;
    const[tickets, setTickets] = useState()
    const[detail, setDetail] = useState()
    const[modal, setModal] = useState(false)
    const closeModal = () => {
        setModal(false)
    }
    const getTicketList = async()=>{
        try{
            const url = ip+`/ticket/member/list`;
            const token = localStorage.getItem('customerToken')
            const header = {
                headers: {
                "Authorization": `Bearer ${token}`,
                "Access-Control-Allow-Origin": "*",
                "ngrok-skip-browser-warning": true
                },
            }
            const response = await axios.get(
                url,
                header
            )
            let tmpdata = response.data
            tmpdata.map((data)=>{
                let tmp = new Date(data.startTime)
                data.startTime = tmp.getFullYear()+"-"+(tmp.getMonth()<10?"0"+(tmp.getMonth()+1):(tmp.getMonth()+1))+"-"+(tmp.getDate()<10?"0"+tmp.getDate():tmp.getDate())+" "+(tmp.getHours()<10?"0"+tmp.getHours():tmp.getHours())+":"+(tmp.getMinutes()<10?"0"+tmp.getMinutes():tmp.getMinutes())+":"+(tmp.getSeconds()<10?"0"+tmp.getSeconds():tmp.getSeconds());
                tmp = new Date(data.ticketingTime)
                data.ticketingTime = tmp.getFullYear()+"-"+(tmp.getMonth()<10?"0"+(tmp.getMonth()+1):(tmp.getMonth()+1))+"-"+(tmp.getDate()<10?"0"+tmp.getDate():tmp.getDate())+" "+(tmp.getHours()<10?"0"+tmp.getHours():tmp.getHours())+":"+(tmp.getMinutes()<10?"0"+tmp.getMinutes():tmp.getMinutes())+":"+(tmp.getSeconds()<10?"0"+tmp.getSeconds():tmp.getSeconds());
            })
            setTickets(tmpdata)
        }
        catch(error){
            if(error.response.data.message)
                alert(error.response.data.message)
            else
                alert("알수 없는 에러.")
        }
    }
    const getTicketDetail = async(ticket)=>{
        try{
            const url = ip+`/ticket/member/detail?ticketId=` + ticket.ticketId;
            const token = localStorage.getItem('customerToken')
            const header = {
                headers: {
                "Authorization": `Bearer ${token}`,
                "Access-Control-Allow-Origin": "*",
                "ngrok-skip-browser-warning": true
                },
            }
            const response = await axios.get(
                url,
                header
            )
            setDetail(response.data)
        }
        catch(error){
            if(error.response.data.message)
                alert(error.response.data.message)
            else
                alert("알수 없는 에러.")
        }
    }
    useEffect(()=>{
        getTicketList()
    },[])
    const loading = ()=>{
        if(detail){
            return <CustomerTicketForm ticket={detail}/>
        }
    }
    function clickHandler(){
        getTicketDetail(this)
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
                    {tickets.length ? "":"예매된 티켓이 존재하지 않습니다."}
                    {tickets.map((item)=>(
                        <div key={item.ticketId} style={style}>
                            <div style={{width:"100%", padding:10}}>
                                <div style={{display:"flex", justifyContent:"space-between"}}>
                                    <h6>
                                        ticket_no : {item.ticketId}
                                    </h6>
                                    <h6>
                                        예약시간 : {item.ticketingTime}
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
                                <div className='text-start'>
                                    결제 상태 : {item.payed?"결제 완료":"미결제"}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )
        }
        else{
            return(
                <h2>
                    로딩 중
                </h2>
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