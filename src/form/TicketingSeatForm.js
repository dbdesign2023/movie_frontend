import React, { useEffect } from 'react';
import { useState } from 'react';
import '../styles/components/modal-container.scss';
import '../styles/components/form-container.scss';
import '../styles/MovieRegisterPage.scss';
import Modal from 'react-awesome-modal';


export default function TicketingSeatForm(props){
    const closeModal = props.closeModal;
    const data =[
        {
            row_num:1,
            col_num:1,
            ticketed:false
        },
        {
            row_num:1,
            col_num:2,
            ticketed:true
        },
        {
            row_num:1,
            col_num:3,
            ticketed:false
        },
        {
            row_num:1,
            col_num:4,
            ticketed:true
        },
        {
            row_num:1,
            col_num:5,
            ticketed:false
        },
        {
            row_num:2,
            col_num:1,
            ticketed:false
        },
        {
            row_num:2,
            col_num:2,
            ticketed:false
        },
        {
            row_num:2,
            col_num:3,
            ticketed:false
        },
        {
            row_num:2,
            col_num:4,
            ticketed:false
        },
        {
            row_num:2,
            col_num:5,
            ticketed:true
        },
        {
            row_num:3,
            col_num:1,
            ticketed:false
        },
        {
            row_num:3,
            col_num:2,
            ticketed:false
        },
        {
            row_num:3,
            col_num:3,
            ticketed:false
        },
        {
            row_num:3,
            col_num:4,
            ticketed:false
        },
        {
            row_num:3,
            col_num:5,
            ticketed:true
        },
    ]
    useEffect(()=>{
        const pdata = []
        let ppdata = data.map((tmp,idx)=>{
            if(pdata.length === 0){
                pdata.push({
                    row_num:tmp.row_num,
                    col_num:[tmp.col_num],
                    ticketed:[tmp.ticketed]
                })
            }
            else if(data[idx-1].row_num === tmp.row_num){
                pdata[tmp.row_num-1].col_num.push(tmp.col_num)
                pdata[tmp.row_num-1].ticketed.push(tmp.ticketed)
            }
            else{
                pdata.push({
                    row_num:tmp.row_num,
                    col_num:[tmp.col_num],
                    ticketed:[tmp.ticketed]
                })
            }
        })
        localStorage.setItem("pdata",JSON.stringify(pdata))
    },[])

    const pdata = JSON.parse(localStorage.getItem("pdata"))
    const [error, setError] = useState(false)
    const chooseSeat = ()=>{

    }
    const choosenSeat = ()=>{
        setError(true)
    }
    const closeError = ()=>{
        setError(false)
    }
    return (
        <div className='modal-container'>
            <div className='title-text-center-container'>
                좌석 목록
            </div>
            <div className='seat-container'>
                <div className='row'>
                    {pdata.map((item,idx1)=>(
                        <div key={idx1} className='row justify-content-evenly'>
                        {item.col_num.map((tmp,idx2)=>(
                            <div style={{width:"auto"}}>
                                {!item.ticketed[idx2] && <button type="button" className="btn btn-primary m-1" onClick={chooseSeat}>{item.row_num}-{tmp}</button>}
                                {item.ticketed[idx2] && <button type="button" className="btn btn-secondary m-1" onClick={choosenSeat}>{item.row_num}-{tmp}</button>}
                            </div>
                        ))}
                        </div>
                    ))}
                </div>
                <Modal
                    visible={error}
                    effect='fadeInDown'
                    onClickAway={closeError}>
                        <div style={{color:'red'}}>
                            이미 예매된 좌석입니다.
                        </div>
                </Modal>
            </div>
            <div className='bottom-container'>
                <div className='button-container'>
                    <button type="button" className="btn btn-secondary m-1" onClick={closeModal}>닫기</button>
                </div>
            </div>
        </div>
    );
  }
  