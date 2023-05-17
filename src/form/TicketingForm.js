import React, { useEffect } from 'react';
import Modal from 'react-awesome-modal';
import { useState } from 'react';
import '../styles/components/modal-container.scss';
import '../styles/components/form-container.scss';
import '../styles/MovieRegisterPage.scss';
import { useNavigate } from 'react-router-dom';

export default function TicketingForm() {
    const [rundate,setRundate] = useState("")
    const [modalstate,setModalstate] = useState(false)
    const [scheduledata,setScheduledata] = useState();
    useEffect(() => {
        //날짜 변경시 상영일정 db에서 가져오기
      },[rundate]);
    const navigate = useNavigate()
    function clickHandler(){
        setScheduledata(this)
        setModalstate(true)
    }
    const closeModal = () => {
        setModalstate(false)
    }
    function ok(){
        navigate('/payment')
    }
    function clickSeatHandler(){
        const expires = new Date()
        expires.setMinutes(expires.getMinutes() + 60)
        navigate('/payment')
    }
    const data = [
        {
            schedule_id:1,
            movie_title:"아바타 물의 길",
            theater_name:"제 1관",
            start_time:"2023-05-10 09:00:00",
            running_time:150
        },
        {
            schedule_id:2,
            movie_title:"아바타 물의 길",
            theater_name:"제 1관",
            start_time:"2023-05-10 12:00:00",
            running_time:150
        },
        {
            schedule_id:3,
            movie_title:"아바타 물의 길",
            theater_name:"제 1관",
            start_time:"2023-05-10 15:00:00",
            running_time:150
        },
        {
            schedule_id:4,
            movie_title:"아바타 물의 길",
            theater_name:"제 1관",
            start_time:"2023-05-10 18:00:00",
            running_time:150
        },
        {
            schedule_id:5,
            movie_title:"아바타 물의 길",
            theater_name:"제 3관",
            start_time:"2023-05-10 10:00:00",
            running_time:150
        },
        {
            schedule_id:6,
            movie_title:"아바타 물의 길",
            theater_name:"제 3관",
            start_time:"2023-05-10 13:00:00",
            running_time:150
        },
        {
            schedule_id:7,
            movie_title:"아바타 물의 길",
            theater_name:"제 3관",
            start_time:"2023-05-10 16:00:00",
            running_time:150
        },
        {
            schedule_id:8,
            movie_title:"아바타 물의 길",
            theater_name:"제 3관",
            start_time:"2023-05-10 19:00:00",
            running_time:150
        },
        {
            schedule_id:9,
            movie_title:"가디언즈 오브 갤럭시: Volume 3",
            theater_name:"제 2관",
            start_time:"2023-05-10 09:00:00",
            running_time:150
        },
        {
            schedule_id:10,
            movie_title:"가디언즈 오브 갤럭시: Volume 3",
            theater_name:"제 2관",
            start_time:"2023-05-10 12:00:00",
            running_time:150
        },
        {
            schedule_id:11,
            movie_title:"가디언즈 오브 갤럭시: Volume 3",
            theater_name:"제 2관",
            start_time:"2023-05-10 15:00:00",
            running_time:150
        },
        {
            schedule_id:12,
            movie_title:"가디언즈 오브 갤럭시: Volume 3",
            theater_name:"제 2관",
            start_time:"2023-05-10 18:00:00",
            running_time:150
        },
    ]
    const pdata = []
    let ppdata = data.map((tmp,idx)=>{
        let start_time = new Date(tmp.start_time)
        let end_time = new Date(start_time)
        let start_h = start_time.getHours()
        let start_m = start_time.getMinutes()
        end_time.setMinutes(end_time.getMinutes()+tmp.running_time)
        let end_h = end_time.getHours()
        let end_m = end_time.getMinutes()
        if(start_h < 10){
            start_h = "0"+start_h
        }
        if(start_m < 10){
            start_m = "0"+start_m
        }
        if(end_h < 10){
            end_h = "0"+end_h
        }
        if(end_m < 10){
            end_m = "0"+end_m
        }
        start_time = start_h+":"+start_m
        end_time = end_h+":"+end_m
        if(pdata.length === 0){
            pdata.push({
                movie_title:tmp.movie_title,
                schedule:[
                    {
                        theater_name:tmp.theater_name,
                        start_time:[   
                            start_time
                        ],
                        end_time:[
                            end_time
                        ]
                    }
                ]
            })
        }
        else if(data[idx-1].movie_title === tmp.movie_title){
            if(data[idx-1].theater_name === tmp.theater_name){
                pdata[pdata.length-1].schedule[pdata[pdata.length-1].schedule.length-1].start_time.push(start_time)
                pdata[pdata.length-1].schedule[pdata[pdata.length-1].schedule.length-1].end_time.push(end_time)
            }
            else{
                pdata[pdata.length-1].schedule.push({
                    theater_name:tmp.theater_name,
                    start_time:[
                        start_time
                    ],
                    end_time:[
                        end_time
                    ]
                })
            }
        }
        else{
            pdata.push({
                movie_title:tmp.movie_title,
                schedule:[
                    {
                        theater_name:tmp.theater_name,
                        start_time:[   
                            start_time
                        ],
                        end_time:[
                            end_time
                        ]
                    }
                ]
            })
        }
    })
    return (
        <div className="customer-ticketing-form-container">
            <div className='title-text-container'> 예매 페이지</div>
            <div className='form-container'>
                <div className='row justify-content-center'>
                    <input type="date" className="inputField w-50" value={rundate} onChange={(event) => setRundate(event.target.value)}/>
                </div>
                <div className='row justify-content-evenly'>
                    {rundate === "" && <div>날짜를 선택해주세요</div>}
                    {rundate !== "" && pdata.map((item, idx)=>(
                        <div key={idx} className='row'>
                            <h3>
                                {item.movie_title}
                            </h3>
                            {
                                item.schedule.map((sc,idx)=>(
                                    <div key={idx}>
                                        <div>
                                            {sc.theater_name}
                                        </div>
                                        {
                                            sc.start_time.map((time,idx) => (
                                            <button key={idx} className="btn btn-info m-2" onClick={clickHandler.bind(time)}>
                                                <div>
                                                    시작시간 {time}
                                                </div>
                                                <div>
                                                    끝시간 {sc.end_time[idx]}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                            ))}
                        </div>
                    ))}
                </div>
                <Modal                                
                    visible={modalstate}
                    effect='fadeInDown'
                    onClickAway={closeModal}
                >
                    <div className='modal-container'>
                        <div className='title-text-center-container'>
                            {scheduledata} 에 예매 하시겠습니까?
                        </div>
                        <div className='bottom-container'>
                            <div className='button-container'>
                                <button type="button" className="btn btn-primary m-1" onClick={ok}>예</button>
                                <button type="button" className="btn btn-secondary m-1" onClick={closeModal}>아니오</button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    );
  }