import React, { useEffect } from 'react';
import { useState } from 'react';
import '../styles/components/modal-container.scss';
import '../styles/components/form-container.scss';
import '../styles/components/page-container.scss';
import Modal from 'react-awesome-modal';
import seat from '../img/seat.png'
import seat_gray from '../img/seat_gray.png'
import seat_choose from '../img/seat_choosepng.png'
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
        localStorage.setItem('SeatList', JSON.stringify([]));
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
                    pdata[tmp.row_num-1].ticketed.push(3)
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
    const [choosenseat, setSeat] = useState({})
    function chooseSeat(){
        const tmp = this
        setTimeout(function() {
          reservation(tmp)
        }, 100);
        //setSeatmodal(true)
    }
    const choosenSeat = ()=>{
      alert("이미 예매/선택된 좌석입니다.")
    }

    const navigate = useNavigate();
    const reservation = (seat) =>{
      if(seat.row){
        let seatlist = JSON.parse(localStorage.getItem('SeatList'))
        let string = seat.row.toString() + '-' + seat.col.toString()
        if(!seatlist.includes(string)){
          pdata[seat.row-1].ticketed[seat.col-1] = 2
          seatlist.push(string)
          localStorage.setItem('SeatList', JSON.stringify(seatlist));
          setSeat(seat)
        }
      }
    }
    const gotopaymentpage = () =>{
      let seatlist = JSON.parse(localStorage.getItem('SeatList'))
      if(seatlist.length !==0){
        navigate('/payment')
      }
      else{
        alert("좌석을 선택해 주세요.")
      }
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
                        {item.ticketed.map((tmp,idx2)=>(
                            <div key={idx2} style={{width:size[idx1].toString()+'%'}} className='p-0'>
                                <img src={tmp===0?seat: tmp === 1?seat_gray:seat_choose} onClick={tmp===0?chooseSeat.bind({col:item.col_num[idx2],row:item.row_num}):choosenSeat} className={tmp===3?"hidden":""}style={image_style}></img>
                            </div>
                        ))}
                        </div>
                    ))}
                </div>
            </div>
            <div>
              <button type="button" className="btn btn-primary m-1" onClick={gotopaymentpage}>결제</button>
            </div>
        </div>
    );
  }
