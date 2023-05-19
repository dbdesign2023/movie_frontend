import React, { useEffect } from 'react';
import { useState } from 'react';
import Modal from 'react-awesome-modal';
import seat from '../img/seat.png'
import seat_gray from '../img/seat_gray.png'
import { useNavigate } from 'react-router-dom';

export default function TicketingSeatForm(){

    function setData(){
        const data = []
        for(var i = 1; i < 20; i++){
            for(var j =1; j<20;j++){
                if(j%5 == 0){
                    continue
                }
                const random = Math.random()
                data.push({
                    seat_id:i,
                    row_num:i,
                    col_num:j,
                    ticketed:random < 0.7? 0:1
                })
            }
        }
        return data
    }
    const data = setData()

    const [pdata, setPdata] = useState([])
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
                var coltmp = data[idx-1].col_num+1
                while(coltmp != tmp.col_num){
                    coltmp++
                    pdata[tmp.row_num-1].col_num.push(tmp.col_num)
                    pdata[tmp.row_num-1].ticketed.push(2)
                }
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
        setPdata(pdata)
    },[])
    const [error, setError] = useState(false)
    const [choosenseat, setSeat] = useState({})
    const [seatmodal,setSeatmodal] = useState(false)
    function chooseSeat(){
        setSeat(this)
        setSeatmodal(true)
    }
    const closeSeatmodal = () =>{
        setSeatmodal(false)
    }
    const choosenSeat = ()=>{
        setError(true)
    }
    const closeError = ()=>{
        setError(false)
    }
    const navigate = useNavigate();
    const gotopaymentpage = () =>{
        navigate('/payment')
    }
    return (
        <div>
            <div className='title-text-center-container'>
                좌석 목록
            </div>
            <div className='seat-container'>
                <div className='row'>
                    {pdata && pdata.map((item,idx1)=>(
                        <div key={idx1} className='row justify-content-center m-1'>
                        {item.col_num.map((tmp,idx2)=>(
                            <div key={idx2}style={{width:"auto"}}>
                                <img src={item.ticketed[idx2]==0?seat:seat_gray} onClick={item.ticketed[idx2]==0?chooseSeat.bind({col:tmp,row:item.row_num}):choosenSeat} className={item.ticketed[idx2]==2?"hidden":""} width={25}></img>
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
                <Modal                    
                    visible={seatmodal}
                    effect='fadeInDown'
                    onClickAway={closeSeatmodal}>
                        <div className='content-text-container'>
                            좌석 {choosenseat.row}-{choosenseat.col} 을 예매하시겠습니까?
                        </div>
                        <div className='button-container'>
                            <button type="button" className="btn btn-primary m-1" onClick={gotopaymentpage}>예매하기</button>
                            <button type="button" className="btn btn-secondary m-1" onClick={closeSeatmodal}>닫기</button>
                        </div>
                </Modal>
            </div>
          ))}
        </div>
        <Modal visible={error} effect='fadeInDown' onClickAway={closeError}>
          <div style={{ color: 'red' }}>이미 예매된 좌석입니다.</div>
        </Modal>
      </div>
      <div className='bottom-container'>
        <div className='button-container'>
          <button
            type='button'
            className='btn btn-secondary m-1'
            onClick={closeModal}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
