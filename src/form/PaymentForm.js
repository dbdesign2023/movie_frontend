import React, { useEffect, useState } from 'react';
import Modal from 'react-awesome-modal';
import CustomerTicketForm from './CustomerTicketForm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from './axios';

export default function PaymentForm() {
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
    }
    */
    const ip = baseUrl;
    const navigate = useNavigate();
    const [methodlist, setMethodlist] = useState()
    const [ticket_data, setticketData] = useState()
    const getmethod = async()=>{
        try{
            const url = ip+`/payment/method/list`;
            const header = {
                headers: {
                "Access-Control-Allow-Origin": "*"
                },
            }
            const response = await axios.get(
                url,
                header
            )
            setMethodlist(response.data)
        }
        catch(error){
            if(error.response.data.message)
                alert(error.response.data.message)
            else
                alert("알수 없는 에러.")
        }
    }
    const setdata = ()=>{
        const data = JSON.parse(localStorage.getItem('ticket_data'))
        if(data){
            let tmp = new Date(data.startTime)
            data.startTime = tmp.getFullYear()+"-"+(tmp.getMonth()<10?"0"+(tmp.getMonth()+1):(tmp.getMonth()+1))+"-"+(tmp.getDate()<10?"0"+tmp.getDate():tmp.getDate())+" "+(tmp.getHours()<10?"0"+tmp.getHours():tmp.getHours())+":"+(tmp.getMinutes()<10?"0"+tmp.getMinutes():tmp.getMinutes())+":"+"00";
            tmp = new Date(data.ticketingTime)
            data.ticketingTime = tmp.getFullYear()+"-"+(tmp.getMonth()<10?"0"+(tmp.getMonth()+1):(tmp.getMonth()+1))+"-"+(tmp.getDate()<10?"0"+tmp.getDate():tmp.getDate())+" "+(tmp.getHours()<10?"0"+tmp.getHours():tmp.getHours())+":"+(tmp.getMinutes()<10?"0"+tmp.getMinutes():tmp.getMinutes())+":"+"00";
            setticketData(data)
        }
        else{

        }
    }
    useEffect(()=>{
        getmethod()
        setdata()
    },[])
    const [method, setMethod] = useState("PM000")
    const clickHandler = async()=>{
        try{
            const formData = new FormData();
            formData.append("ticketId", ticket_data.ticketId);
            formData.append("code", method);
            const datatmp = {
                ticketId: ticket_data.ticketId,
                code: method
            }
            const url = ip+`/payment/pay`;
            const token = localStorage.getItem('customerToken')
            const header = {
                headers: {
                "Authorization": `Bearer ${token}`,
                "Access-Control-Allow-Origin": "*"
                },
            }
            const response = await axios.post(
                url,
                formData,
                header,
            )
            localStorage.setItem('payment_data', JSON.stringify(response.data))
            alert("결제가 완료되었습니다.")
            navigate('/')
        }
        catch(error){
            if(error.response.data.message)
                alert(error.response.data.message)
            else
                alert("알수 없는 에러.")
        }
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
                    {methodlist &&(methodlist.map((item,idx)=>(
                        <option key={idx} value={item.code}>{item.name}</option>
                    )))}
                </select>
            </h2>
            <div>
              <button type="button" className="btn btn-primary m-1" onClick={clickHandler}>결제</button>
            </div>
        </div>
    );
}