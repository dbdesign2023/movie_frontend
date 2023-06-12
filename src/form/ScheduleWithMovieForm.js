import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-awesome-modal';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from './axios';

export default function ScheduleWithMovieForm() {
    const movie = JSON.parse(localStorage.getItem("movie"));
    const ip = baseUrl;
    const img = ip+`/api/posters?fileName=`+movie.poster.fileName
    const [schedule, setSchedule] = useState()
    const [scheduledetail, setScheduledetail] = useState()
    const [modal, setModal] = useState(false)
    const getMovieSchedule = async()=>{
        try{
            const url = ip+`/schedule/movie/`+movie.movieId;
            const header = {
                headers: {
                "Access-Control-Allow-Origin": "*",
                "ngrok-skip-browser-warning": true
                },
            }
            const response = await axios.get(
                url,
                header
            )
            setSchedule(response.data)
        }
        catch(error){
            if(error.response.data.message)
                alert(error.response.data.message)
            else
                alert("알수 없는 에러.")
        }
    }
    function clickHandler(){
        setScheduledetail(this)
    }
    const closeModal = () => {
        setModal(false)
    }
    const navigate = useNavigate()
    const ok = () =>{
        localStorage.setItem('schedule_id', scheduledetail.scheduleId)
        navigate('/chooseseat')
    }
    useEffect(()=>{
        getMovieSchedule()
    },[])
    useEffect(()=>{
        if(scheduledetail){
            setModal(true)
        }
    },[scheduledetail])
    return (
        <div>
            <h2>
                {movie.title} 상영일정
            </h2>
            <img src={img}/>
            <div>
                {schedule &&(schedule.map((item,idx)=>(
                    <button key={idx} className="btn btn-light m-2" onClick={clickHandler.bind(item)}>
                        <div>
                            {item.startTime[0]}-{item.startTime[1]<10?'0'+item.startTime[1]:item.startTime[1]}-{item.startTime[2]<10?'0'+item.startTime[2]:item.startTime[2]}
                        </div>
                        <div>
                            {item.startTime[3]<10?'0'+item.startTime[3]:item.startTime[3]}:{item.startTime[4]<10?'0'+item.startTime[4]:item.startTime[4]} ~
                        </div>
                        <div>
                            남은 좌석 {item.totalSeat-item.filledSeat}/{item.totalSeat}
                        </div>
                    </button>
                )))}
            </div>
            {scheduledetail &&(<Modal                
                visible={modal}
                effect='fadeInDown'
                onClickAway={closeModal}>
                    <div className='modal-container'>
                        <h2 className='text-start'>
                            상영관 : {scheduledetail.theaterDTO.name}
                        </h2>
                        <h3 className='text-start'>
                            상영관 종류 : {scheduledetail.theaterDTO.typeName}
                        </h3>
                        <h3 className='text-start'>
                            시작 시간 : {scheduledetail.startTime}
                        </h3>
                        <h3 className='text-start'>
                            러닝 타임 : {movie.runningTime} 분
                        </h3>
                        <h3 className='text-start'>
                            할인율 : {scheduledetail.discount}
                        </h3>
                        <div className='bottom-container'>
                            <div className='button-container'>
                                <button type="button" className="btn btn-primary m-1" onClick={ok}>좌석 선택</button>
                                <button type="button" className="btn btn-secondary m-1" onClick={closeModal}>아니오</button>
                            </div>
                        </div>
                    </div>
            </Modal>)}
        </div>
      );
}