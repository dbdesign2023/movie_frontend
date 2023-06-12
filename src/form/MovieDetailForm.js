import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from './axios';
import { useState } from 'react';
import Modal from 'react-awesome-modal';
import '../styles/components/modal-container.scss';

export default function MovieDetailForm(){
    const ip = baseUrl
    const posterurl = ip+`/api/posters?fileName=`;
    const profileurl = ip+`/api/profileImage?fileName=`;
    const [moviedetail,setMoviedetail] = useState(JSON.parse(localStorage.getItem("detailmovie")))
    const [castid,setCastid] = useState()
    const [castdetail, setCastdetail] = useState()
    const [modal, setModal] = useState(false)
    function openmodal(){
        setCastid(this)
        setModal(true)
    }
    const closemodal = ()=>{
        setModal(false)
    }
    const navigate = useNavigate();
    useEffect(()=>{
        if(moviedetail){
  
        }
        else{
            navigate('../')
        }
    },[])
    useEffect(()=>{
        if(castid){
            getcastdetail()
        }
    },[castid])
    const getcastdetail = async()=>{
        try{
            const url = ip+`/movie/cast/detail?castId=`+castid;
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
            let data=response.data
            let tmp = new Date(data.birthDate)
            data.birthDate = tmp.getFullYear()+"-"+(tmp.getMonth()<10?"0"+(tmp.getMonth()+1):(tmp.getMonth()+1))+"-"+(tmp.getDate()<10?"0"+tmp.getDate():tmp.getDate());
            setCastdetail(data)
        }
        catch (error) {
            if(error.response.data.message)
                alert(error.response.data.message)
            else
                alert("알수 없는 에러.")
        }
    }
    return (
        <div>
            {moviedetail &&(
                <div>
                    <h1 style={{padding:10}}>
                        {moviedetail.title}
                    </h1>
                    <img src={posterurl+moviedetail.poster.fileName} style={{width:400}} alt='poster_image'/>
                    <h4 className='text-start'>
                        개봉일 : {moviedetail.releaseDate}
                    </h4>
                    <h4 className='text-start'>
                        제작 국가 : {moviedetail.countryCode}
                    </h4>
                    <h4 className='text-start'>
                        언어 : {moviedetail.language}
                    </h4>
                    <h4 className='text-start'>
                        상영시간 : {moviedetail.runningTime} 분
                    </h4>
                    <h4 className='text-start'>
                        상영등급 : {moviedetail.rating}
                    </h4>
                    <h4 className='text-start'>
                        장르 : {moviedetail.genrestring}
                    </h4>
                    <h3>
                        줄거리
                    </h3>
                    <h4>
                        {moviedetail.info}
                    </h4>
                    <h3 className='text-start'>
                        감독
                    </h3>
                    <div className='justify-content-start' style={{display:"flex"}}>
                        <button onClick={openmodal.bind(moviedetail.director.castId)}>
                            <img src={profileurl+moviedetail.director.fileName} style={{width:200}} alt='cast_image'/>
                        </button>
                        <div className='row' style={{paddingLeft:30}}>
                            <h4 className='text-start'>
                                이름 : {moviedetail.director.name}
                            </h4>
                            <h4 className='text-start'>
                                생년월일 : {moviedetail.director.birthDate}
                            </h4>
                            <h4 className='text-start'>
                                국적 : {moviedetail.director.nationality}
                            </h4>
                        </div>
                    </div>
                    <h3 className='text-start'>
                        등장 인물
                    </h3>
                    <div className='justify-content-start' style={{display:"flex"}}>
                        {moviedetail.roleList.map((item,idx)=>(
                        <div key={idx}>
                            <div>
                                {item.starring?"주연":"조연"}
                            </div>
                            <button onClick={openmodal.bind(item.castId)}>
                                <img src={profileurl+item.profileImage} style={{width:150}} alt='cast_image'/>
                            </button>
                            <div className='text-start'>
                                역할 : {item.role}
                            </div>
                            <div className='text-start'>
                                본명 : {item.name}
                            </div>
                        </div>
                        ))}
                        {moviedetail.roleList.length ? "":"등장인물 정보가 없습니다."}
                    </div>
                </div>
            )}
            <Modal 
                visible={modal}
                effect='fadeInDown'
                onClickAway={closemodal}>
                {castdetail &&(
                <div className='modal-container'>
                    <h1>
                        배우 정보
                    </h1>
                    <div className='form-container'>
                        <img src={profileurl+castdetail.profileImage.fileName} style={{width:400}} alt='cast_image'/>
                        <h3 className='text-start pt-3'>
                            이름 : {castdetail.name}
                        </h3>
                        <h3 className='text-start'>
                            생년월일 : {castdetail.birthDate}
                        </h3>
                        <h3 className='text-start'>
                            국적 : {castdetail.nationality}
                        </h3>
                        <h3 className='text-start' style={{whiteSpace:'pre-line'}}>
                            정보 : {castdetail.info}
                        </h3>
                    </div>
                </div>
                )}
            </Modal>
        </div>
    );

}
