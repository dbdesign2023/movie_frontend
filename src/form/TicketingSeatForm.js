import React, { useEffect } from 'react';
import { useState } from 'react';
import '../styles/components/modal-container.scss';
import '../styles/components/form-container.scss';
import '../styles/components/page-container.scss';
import Modal from 'react-awesome-modal';
import seat from '../img/seat.png'
import seat_gray from '../img/seat_gray.png'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function TicketingSeatForm(){
    const ip = `http://25.14.225.33:8080`;
    function setData(){
        const data = []
        for(var i = 1; i < 30; i++){
            for(var j =1; j<30;j++){
                if(j%5 === 0){
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
    const [size, setSize] = useState([])
    const getdata = async(date)=>{
        try{
            const token = localStorage.getItem('customerToken')
            const schedule = localStorage.getItem('schedule_id')
            const header = {
                headers: {
                "Authorization": `Bearer ${token}`,
                "Access-Control-Allow-Origin": "*"
                },
            }
            const url = ip+`/schedule/date/`+date;
            const response = await axios.get(
                url,
                header
            )
            setData(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        const pdata = []
        const size = []
        let row = 0
        data.map((tmp,idx)=>{
            if(pdata.length === 0){
                size.push(0)
                pdata.push({
                    row_num:tmp.row_num,
                    col_num:[tmp.col_num],
                    ticketed:[tmp.ticketed]
                })
                size[row]++
            }
            else if(data[idx-1].row_num === tmp.row_num){
                var coltmp = data[idx-1].col_num+1
                while(coltmp !== tmp.col_num){
                    coltmp++
                    pdata[tmp.row_num-1].col_num.push(tmp.col_num)
                    pdata[tmp.row_num-1].ticketed.push(2)
                    size[row]++
                }
                pdata[tmp.row_num-1].col_num.push(tmp.col_num)
                pdata[tmp.row_num-1].ticketed.push(tmp.ticketed)
                size[row]++
            }
            else{
                pdata.push({
                    row_num:tmp.row_num,
                    col_num:[tmp.col_num],
                    ticketed:[tmp.ticketed]
                })
                size[row] = parseInt(100/size[row])
                size.push(0)
                row++
                size[row]++
            }
        })
        size[row] = parseInt(100/size[row])
        setPdata(pdata)
        setSize(size)
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
    const image_style = {
        width:'100%',
        height:'100%',
      }
    return (
        <div>
            <div className='title-text-center-container'>
                좌석 목록
            </div>
            <div className='seat-container'>
                <div className='row'>
                    {pdata && pdata.map((item,idx1)=>(
                        <div key={idx1} className='row justify-content-center'>
                        {item.col_num.map((tmp,idx2)=>(
                            <div key={idx2} style={{width:size[idx1].toString()+'%'}} className='p-0'>
                                <img src={item.ticketed[idx2]===0?seat:seat_gray} onClick={item.ticketed[idx2]===0?chooseSeat.bind({col:tmp,row:item.row_num}):choosenSeat} className={item.ticketed[idx2]===2?"hidden":""}style={image_style}></img>
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
        </div>
    );
  }