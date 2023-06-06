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
    const ip = `http://localhost:8080`;
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
    const getdata = async()=>{
        try{
            const token = localStorage.getItem('customerToken')
            const schedule = localStorage.getItem('schedule_id')
            let header = null
            if(token){
                header = {
                    headers: {
                    "Authorization": `Bearer ${token}`,
                    "Access-Control-Allow-Origin": "*"
                    },
                }
            }
            else{
                header = {
                    headers: {
                        "Access-Control-Allow-Origin": "*"
                        },
                }
            }
            const url = ip+`/schedule/`+schedule+`/seats`;
            const response = await axios.get(
                url,
                header
            )
            setSeatData(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }
    const [data, setSeatData] = useState([])
    const [pdata, setPdata] = useState([])
    const [size, setSize] = useState([])
    useEffect(()=>{
        getdata()
        localStorage.setItem('SeatList', JSON.stringify([]));
    },[])
    useEffect(()=>{
        if(data){
        const pdata = []
        const size = []
        let row = 0
        let maxrow = 0
        data.map((tmp,idx)=>{
            console.log(pdata)
            if(pdata.length === 0){
                size.push(0)
                pdata.push({
                    row_num:tmp.row,
                    col_num:[tmp.column],
                    ticketed:[tmp.empty?0:1]
                })
                size[row]++
            }
            else if(pdata[row].row_num === tmp.row){
                var coltmp = data[idx-1].column+1
                while(coltmp !== tmp.column){
                    coltmp++
                    pdata[row].col_num.push(tmp.column)
                    pdata[row].ticketed.push(3)
                    size[row]++
                }
                pdata[row].col_num.push(tmp.column)
                pdata[row].ticketed.push(tmp.empty?0:1)
                size[row]++
            }
            else{
                pdata.push({
                    row_num:tmp.row,
                    col_num:[tmp.column],
                    ticketed:[tmp.empty?0:1]
                })
                size[row] = parseInt(100/size[row])
                if(size[row]>maxrow)
                {
                    maxrow = size[row]
                    console.log(maxrow)
                }
                size.push(0)
                row++
                size[row]++
            }
        })
        size[row] = parseInt(100/size[row])
        setPdata(pdata)
        setSize(maxrow)
        console.log('A'.charCodeAt())
    }
    },[data])
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
        console.log(pdata)
        let seatlist = JSON.parse(localStorage.getItem('SeatList'))
        let string = seat.row.toString() + seat.col.toString()
        if(!seatlist.includes(string)){
          pdata[seat.row.charCodeAt()-'A'.charCodeAt()].ticketed[seat.col-1] = 2
          seatlist.push(string)
          localStorage.setItem('SeatList', JSON.stringify(seatlist));
          setSeat(seat)
        }
      }
    }
    const mem_post_ticket = async()=>{
        const seatlist = JSON.parse(localStorage.getItem('SeatList'))
        const formData = new FormData();
        const scid = localStorage.getItem("schedule_id")
        formData.append("scheduleId", scid)
        formData.append("seats", seatlist)
        const url = ip+`/ticket/reservation`;
        const token = localStorage.getItem('customerToken')
        const header = {
            headers: {
            "Authorization": `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*"
            },
        }
        const response = await axios.post(
            url,
            header,
            formData
        )
        console.log(response.data)
        localStorage.setItem('ticket_data', JSON.stringify(response.data))
    }
    const [phone, setPhone] = useState()
    const [password, setPassword] = useState()
    const [modal, setModal] = useState(false)

    const openModal = ()=>{
        setModal(true)
    }
    const closeModal = ()=>{
        setModal(false)
    }
    const nonmem_post_ticket = async()=>{
        const seatlist = JSON.parse(localStorage.getItem('SeatList'))
        const formData = new FormData();
        const scid = localStorage.getItem("schedule_id")
        formData.append("scheduleId", scid)
        formData.append("seats", seatlist)
        formData.append("phoneNo", phone)
        formData.append("password", password)
        const url = ip+`/ticket/reservation`;
        const header = {
            headers: {
            "Access-Control-Allow-Origin": "*"
            },
        }
        const response = await axios.post(
            url,
            header,
            formData
        )
        console.log(response.data)
        localStorage.setItem('ticket_data', JSON.stringify(response.data))
    }
    const gotopaymentpage = () =>{
        const seatlist = JSON.parse(localStorage.getItem('SeatList'))
        if(seatlist.length !==0){
            const token = localStorage.getItem("customerToken")
            if(token){
                mem_post_ticket()
                //navigate('/payment')
            }
            else{
                openModal()
            }
        }
        else{
            alert("좌석을 선택해 주세요.")
        }
    }
    var check_phone_number = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/
    const nonmemgotopaymentpage = () =>{
        if(check_phone_number.test(phone) && password){
            nonmem_post_ticket()
            //navigate('/payment')
        }
        else{
            alert("휴대폰 번호(-제외 11자리)와 비밀번호를 입력해주세요.")
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
                        <div key={idx1} className='row justify-content-start'>
                        {item.ticketed.map((tmp,idx2)=>(
                            <div key={idx2} style={{width:size.toString()+'%'}} className='p-0'>
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
            <Modal          
                visible={modal}
                effect='fadeInDown'
                onClickAway={closeModal}>
                <h4 style={{paddingTop:30,paddingRight:30,paddingLeft:30}}>
                    비회원은 휴대폰 번호와 비밀번호를 입력해야 합니다.
                </h4>
                <div>
                    <div className='content-text-container'>휴대폰 번호</div>
                </div>
                <div style={{paddingLeft:50,paddingRight:50}}>
                    <input
                        type='text'
                        className='form-control'
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                    />
                </div>
                <div>
                    <div className='content-text-container'>비밀번호</div>
                </div>
                <div style={{paddingLeft:50,paddingRight:50}}>
                    <input
                        type='text'
                        className='form-control'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <div style={{padding:10}}>
                    <button type="button" className="btn btn-primary m-1" onClick={nonmemgotopaymentpage}>결제</button>
                </div>
            </Modal>
        </div>
    );
  }
