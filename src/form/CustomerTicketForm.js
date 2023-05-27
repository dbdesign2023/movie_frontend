import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';

export default function CustomerTicketForm() {
    const ex = {
        ticket_id:1,
        movie_data:{
            title:'asdf'
        },

    }
    const style ={
        background:'#BBBBBB88',
        borderRadius: 15
    }
    return(
        <div className='ticket-container m-3' style={style}>
            <h4 className='text-start p-1'>
                ticket_no : {"1"}
            </h4>
            <h2 className='text-start m-1 pb-1'>
                영화 제목 : {"teststeste"}
            </h2>
            <h3 className='text-start m-1'>
                    상영관 : {"1관"}
            </h3>
            <h4 className='text-start m-1 pb-1'>
                    좌석 : {"a-1, a-2"}
            </h4>
            <h3 className='text-start m-1'>
                    상영시간 : {'2023-05-26 9:00:00'}
            </h3>
            <h3 className='text-start m-1'>
                    결제금액 : {'15000￦'}
            </h3>
        </div>
    )
}