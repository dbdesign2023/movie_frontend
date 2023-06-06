import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CustomerTicketForm(props) {
    const ticket = props.ticket
    const [string,setString] =useState()
    const [movie,setMovie] =useState({payed:false})

    useEffect(()=>{
        let movie = {}
        let seat = []
        movie.ticket_id=ticket.ticketId
        movie.title=ticket.movieTitle
        movie.theater=ticket.theaterName
        movie.start_time=ticket.startTime
        movie.img=ticket.posterFileName
        movie.bill=0
        movie.discount=ticket.discount
        movie.payed=ticket.payed
        movie.schedule_id=ticket.scheduleId
        ticket.seats.map((item)=>{
            seat.push(item.seatId)
            movie.bill += item.price
        })
        if(movie.discount.at(-1) === "%"){
            let tmp = parseInt(movie.discount.slice(0,-1))
            movie.fin_bill = (movie.bill*(100-tmp))/100
        }
        else{
            let tmp = parseInt(movie.discount.slice(0,-1))
            movie.fin_bill = movie.bill-tmp*ticket.seats.length
        }
        let string = ''
        seat.map((tmp)=>{
            if(string === ''){
                string = tmp
            }
            else{
                string = string + ', ' + tmp
            }
            setString(string)
        })
        setMovie(movie)
    },[])
    const style ={
        background:'#BBBBBB88',
        borderRadius: 15,
    }
    const navigate = useNavigate();
    const modify = ()=>{
        localStorage.setItem("modifyticketid", movie.ticket_id)
        localStorage.setItem("modifyscheduleid", movie.schedule_id)
        navigate('/chooseseat')
    }
    return(
        <div>
            <div className='ticket-container m-3' style={style}>
                <div style={{display: 'flex'}}>
                    <div style={{width:'50%', padding:10}}>
                        {movie&&(<h5 className='text-start'>
                            ticket_no : {movie.ticket_id}
                        </h5>)}
                        {movie&&(<h2 className='text-start pb-1'>
                            영화 제목 : {movie.title}
                        </h2>)}
                        {movie&&(<h3 className='text-start'>
                                상영관 : {movie.theater}
                        </h3>)}
                        {movie&&(<h4 className='text-start pb-1'>
                                좌석 : {string}
                        </h4>)}
                        {movie&&(<h3 className='text-start'>
                                시작시간 : {movie.start_time}
                        </h3>)}
                        {movie&&(<h3 className='text-start'>
                                금액 : {movie.bill}
                        </h3>)}
                        {movie&&(<h3 className='text-start'>
                                할인율 : {movie.discount}
                        </h3>)}
                        {movie&&(<h3 className='text-start'>
                                최종결제금액 : {movie.fin_bill}
                        </h3>)}
                    </div>
                    <div style={{width:'50%'}}>
                        {movie&&(<img class="img-fluid" src={movie.img} style={{width:250,padding:10}}>
                        </img>)}
                    </div>
                </div>
                <div>
                    {!movie.payed &&           
                    <button
                        type='button'
                        className='btn btn-primary m-1'
                        onClick={modify}>
                        좌석 재선택
                    </button>
                    }
                </div>
            </div>
        </div>
    )
}