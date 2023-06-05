import React, { useEffect } from 'react';
import Modal from 'react-awesome-modal';
import { useState } from 'react';
import '../styles/components/modal-container.scss';
import '../styles/components/form-container.scss';
import '../styles/components/page-container.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ChooseDateForm(date) {
    const ip = `http://25.14.225.33:8080`;
    const [rundate,setRundate] = useState("")
    const [modalstate,setModalstate] = useState(false)
    const [scheduledata,setScheduledata] = useState();
    const [data,setData] = useState();
    const [pdata,setPdata] = useState();
    const getdata = async(date)=>{
        try{
            const token = localStorage.getItem('customerToken')
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
    useEffect(() => {
        if(rundate){
            getdata(rundate)
        }
        //날짜 변경시 상영일정 db에서 가져오기
      },[rundate]);
    useEffect(() => {
        if(data){
            setPdata(dataprocessing2(dataprocessing(data)))
        }
        //날짜 변경시 상영일정 db에서 가져오기
      },[data]);
    const dataprocessing = (data)=>{
        const pdata = []
        data.map((tmp)=>{
            const schedule_id = tmp.scheduleId
            const movie_title = tmp.movieDTO.title
            const theater_name = tmp.theaterDTO.name
            const time = tmp.startTime
            const start_time = time[0].toString()+"-"+time[1].toString()+"-"+time[2].toString()+" "+time[3].toString()+":"+time[4].toString()+":00"
            const running_time = tmp.movieDTO.runningTime
            const total_seat = tmp.totalSeat
            const filled_seat = tmp.filledSeat
            pdata.push({
                schedule_id:schedule_id,
                movie_title:movie_title,
                theater_name:theater_name,
                start_time:start_time,
                running_time:running_time,
                total_seat:total_seat,
                filled_seat:filled_seat
            })
        })
        return pdata
    }
    const dataprocessing2 = (exdata)=>{
        const pdata = []
        exdata.map((tmp,idx)=>{
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
            const left_seat = tmp.total_seat-tmp.filled_seat
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
                            ],
                            schedule_id:[
                                tmp.schedule_id
                            ],
                            total_seat:[
                                tmp.total_seat
                            ],
                            left_seat:[
                                left_seat
                            ]
                        }
                    ]
                })
            }
            else if(exdata[idx-1].movie_title === tmp.movie_title){
                if(exdata[idx-1].theater_name === tmp.theater_name){
                    pdata[pdata.length-1].schedule[pdata[pdata.length-1].schedule.length-1].start_time.push(start_time)
                    pdata[pdata.length-1].schedule[pdata[pdata.length-1].schedule.length-1].end_time.push(end_time)
                    pdata[pdata.length-1].schedule[pdata[pdata.length-1].schedule.length-1].schedule_id.push(tmp.schedule_id)
                    pdata[pdata.length-1].schedule[pdata[pdata.length-1].schedule.length-1].total_seat.push(tmp.total_seat)
                    pdata[pdata.length-1].schedule[pdata[pdata.length-1].schedule.length-1].left_seat.push(left_seat)
                }
                else{
                    pdata[pdata.length-1].schedule.push({
                        theater_name:tmp.theater_name,
                        start_time:[
                            start_time
                        ],
                        end_time:[
                            end_time
                        ],
                        schedule_id:[
                            tmp.schedule_id
                        ],
                        total_seat:[
                            tmp.total_seat
                        ],
                        left_seat:[
                            left_seat
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
                            ],
                            schedule_id:[
                                tmp.schedule_id
                            ],
                            total_seat:[
                                tmp.total_seat
                            ],
                            left_seat:[
                                left_seat
                            ]
                        }
                    ]
                })
            }
        })
        return pdata
    }
    const navigate = useNavigate()
    function clickHandler(){
        setScheduledata(this.start)
        setModalstate(true)
        localStorage.setItem("schedule_id",this.id)
    }
    const closeModal = () => {
        setModalstate(false)
    }
    function ok(){
        navigate('/chooseseat')
    }
    return (
        <div className="customer-ticketing-form-container">
            <div className='title-text-container'> 예매 페이지</div>
            <div className='form-container'>
                <div className='row justify-content-center'>
                    <input type="date" className="inputField w-50" value={rundate} onChange={(event) => setRundate(event.target.value)}/>
                </div>
                <div className='row justify-content-evenly'>
                    {rundate === "" && <div>날짜를 선택해주세요</div>}
                    {pdata && rundate !== "" && pdata.map((item, idx)=>(
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
                                            sc.schedule_id.map((id,idx) => (
                                            <button key={idx} className="btn btn-light m-2" onClick={clickHandler.bind({id:id,start:sc.start_time[idx]})}>
                                                <div>
                                                    {sc.start_time[idx]} ~ {sc.end_time[idx]}
                                                </div>
                                                <div>
                                                    남은 좌석 {sc.left_seat[idx]}/{sc.total_seat[idx]}
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