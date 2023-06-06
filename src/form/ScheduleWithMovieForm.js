import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-awesome-modal';
import { useNavigate } from 'react-router-dom';

export default function ScheduleWithMovieForm() {
    //const movie = JSON.parse(localStorage.getItem("movie"));
    const movie = {
        movieId: 0,
        title: "testtest",
        releaseDate: "2023-06-06T08:55:50.063Z",
        runningTime: 0,
        info: "hi",
        countryCode: "KR",
        language: "Korean",
        poster: {
          imageId: 0,
          uuid: "string",
          fileName: "string",
          fileUrl: "https://upload.wikimedia.org/wikipedia/ko/b/bc/%EB%B0%B1%EB%91%90%EC%82%B0_%EC%98%81%ED%99%94_%ED%8F%AC%EC%8A%A4%ED%84%B0.jpg"
        },
        director: {
          castId: 0,
          name: "string"
        },
        rating: "string",
        genreList: [
          "string"
        ]
      }
    const schedule_data = [
        {
          scheduleId: 0,
          startTime: "2023-06-06 08:55:50",
          discount: "10%",
          movieId: 0,
          theaterDTO: {
            theaterId: 0,
            name: "1관",
            typeCode: "string",
            typeName: "string",
            floor: 0
          },
          totalSeat: 0,
          filledSeat: 0
        },
        {
            scheduleId: 0,
            startTime: "2023-06-06 08:55:50",
            discount: "10%",
            movieId: 0,
            theaterDTO: {
              theaterId: 0,
              name: "1관",
              typeCode: "string",
              typeName: "string",
              floor: 0
            },
            totalSeat: 0,
            filledSeat: 0
          },
          {
            scheduleId: 0,
            startTime: "2023-06-06 08:55:50",
            discount: "10%",
            movieId: 0,
            theaterDTO: {
              theaterId: 0,
              name: "1관",
              typeCode: "string",
              typeName: "string",
              floor: 0
            },
            totalSeat: 0,
            filledSeat: 0
          }
      ]
    const ip = `http://localhost:8080`;
    const [schedule, setSchedule] = useState(schedule_data)
    const [scheduledetail, setScheduledetail] = useState()
    const [modal, setModal] = useState(false)
    const getMovieSchedule = async()=>{
        const url = ip+`/schedule/moive/`+movie.movieId;
        const header = {
            headers: {
            "Access-Control-Allow-Origin": "*"
            },
        }
        const response = await axios.get(
            url,
            header
        )
        setSchedule(response.data)
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
        //getMovieSchedule()
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
            <img src={movie.poster.fileUrl}/>
            <div>
                {schedule.map((item,idx)=>(
                    <button key={idx} className="btn btn-light m-2" onClick={clickHandler.bind(item)}>
                        <div>
                            {item.startTime.slice(0,10)}
                        </div>
                        <div>
                            {item.startTime.slice(-8,)} ~
                        </div>
                        <div>
                            남은 좌석 {item.totalSeat-item.filledSeat}/{item.totalSeat}
                        </div>
                    </button>
                ))}
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