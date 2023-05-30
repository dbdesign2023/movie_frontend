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
        borderRadius: 15,
        width: 1000,
        display: 'flex'
    }
    const img = 'data:image/jpeg;base64,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'
    return(
        <div className='ticket-container m-3' style={style}>
            <div style={{width:'50%'}}>
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
            <div style={{width:'30%'}}>
                <img src={img} style={{height:'100%', padding:10}}>
                </img>
            </div>
        </div>
    )
}