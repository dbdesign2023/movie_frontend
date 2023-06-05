import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';

export default function CustomerTicketForm(props) {
    const style ={
        background:'#BBBBBB88',
        borderRadius: 15,
        width: 1000,
        display: 'flex'
    }
    const [string,setString] =useState()
    useEffect(()=>{
        let string = ''
        console.log(props.seat)
        props.seat.map((tmp)=>{
        if(string === ''){
            string = tmp
        }
        else{
            string = string + ', ' + tmp
        }
        setString(string)
        })
    },[])
    const movie = props.movie
    const img = movie.img
    return(
        <div className='ticket-container m-3' style={style}>
            <div style={{width:'50%'}}>
                <h4 className='text-start p-1'>
                    ticket_no : {movie.ticket_id}
                </h4>
                <h2 className='text-start m-1 pb-1'>
                    영화 제목 : {movie.title}
                </h2>
                <h3 className='text-start m-1'>
                        상영관 : {movie.theater}
                </h3>
                <h4 className='text-start m-1 pb-1'>
                        좌석 : {string}
                </h4>
                <h3 className='text-start m-1'>
                        시작시간 : {movie.start_time}
                </h3>
                <h3 className='text-start m-1'>
                        금액 : {movie.bill}
                </h3>
                <h3 className='text-start m-1'>
                        할인율 : {movie.discount}
                </h3>
                <h3 className='text-start m-1'>
                        최종결제금액 : {movie.fin_bill}
                </h3>
            </div>
            <div style={{width:'30%'}}>
                <img src={img} style={{height:'100%', padding:10}}>
                </img>
            </div>
        </div>
    )
}