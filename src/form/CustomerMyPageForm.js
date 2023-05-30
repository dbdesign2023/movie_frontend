import React, { useEffect, useState } from 'react';
import Modal from 'react-awesome-modal';
import axios from 'axios';

export default function CustomerMyPageForm() {
    const getdata = async()=>{
        try{
            const token = localStorage.getItem('customerToken')
            const header = {
                headers: {
                "Authorization": `Bearer ${token}`,
                "Access-Control-Allow-Origin": "*"
                },
            }
            const url = `http://localhost:8080/customer/getCustomerData`;
            const response = await axios.get(
                url,
                header
            )
            return response.data
        }
        catch (error) {
            console.log(error)
        }
    }
    const patchdata = async()=>{
        try{
            const token = localStorage.getItem('customerToken')
            const header = {
                headers: {
                "Authorization": `Bearer ${token}`,
                "Access-Control-Allow-Origin": "*"
                },
            }
            const url = `http://localhost:8080/customer/modify`;
            const formData = new FormData();
            formData.append("name", name)
            formData.append("loginId",login_id)
            formData.append("nickname", nickname)
            formData.append("birthdate", birthdate)
            formData.append("email", email)
            formData.append("phoneNo", phone_number)
            const response = await axios.post(
                url,
                formData,
                header
            )
            console.log(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getdata().then((tmp)=>{
            const data=tmp
            const birthday = new Date(data.birthdate).toISOString().substring(0,10)
            setName(data.name);
            setId(data.loginId);
            setNickname(data.nickname);
            setBirthdate(birthday);
            setPhonenumber(data.phoneNo);
            setPoint(data.point)
            setEmail(data.email)
        });
    },[])
    const [name, setName] = useState();
    const [login_id, setId] = useState();
    const [nickname, setNickname] = useState();
    const [birthdate, setBirthdate] = useState();
    const [phone_number, setPhonenumber] = useState();
    const [email, setEmail] = useState();
    const [point, setPoint] = useState();
    const [modalstate, setModalstate] = useState(false)
    const [checkstate, setCheckstate] = useState(false)
        const clickHandler = ()=>{
        setModalstate(true)
    }
    const closeModal = ()=>{
        setModalstate(false)
    }
    var check_phone_number = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/
    var check_email = /^[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*\.[a-zA-Z]{2,}$/i

    const clickokHandler = ()=>{
        if(check_phone_number.test(phone_number) && check_email.test(email)){
            patchdata()
            closeModal()
        }
        else{
            setCheckstate(true)
            closeModal()
        }
    }
    return (
    <div>
        <div className='title-text-container'>내 정보</div>
        <div className='row'>
            <div className="col-sm-4">
                <div className='content-text-container'>이름</div>
            </div>
            <div className="col-sm-4">
                <input type="text" className="form-control" value={name} onChange={(event) => setName(event.target.value)}/>
            </div>
        </div>
        <div className='row'>
            <div className="col-sm-4">
                <div className='content-text-container'>아이디</div>
            </div>
            <div className="col-sm-4">
                <div className='content-text-container'>{login_id}</div>
            </div>
        </div>
        <div className='row'>
            <div className="col-sm-4">
                <div className='content-text-container'>닉네임</div>
            </div>
            <div className="col-sm-4">
                <input type="text" className="form-control" value={nickname} onChange={(event) => setNickname(event.target.value)}/>
            </div>
        </div>
        <div className='row'>
            <div className="col-sm-4">
                <div className='content-text-container'>생년월일</div>
            </div>
            <div className="col-sm-4">
                <input type="date" className="form-control" value={birthdate} onChange={(event) => setBirthdate(event.target.value)}/>
            </div>
        </div>
        <div className='row'>
            <div className="col-sm-4">
                <div className='content-text-container'>전화번호</div>
            </div>
            <div className="col-sm-4">
                <input type="text" className="form-control" value={phone_number} onChange={(event) => setPhonenumber(event.target.value)}/>
            </div>
            <div className="col-sm-4 justify-content-start">
                {checkstate && !check_phone_number.test(phone_number) && <div style={{color:'red'}}>유효한 전화번호를 입력하세요.</div>}
            </div>
        </div>
        <div className='row'>
            <div className="col-sm-4">
                <div className='content-text-container'>이메일</div>
            </div>
            <div className="col-sm-4">
                <input type="text" className="form-control" value={email} onChange={(event) => setEmail(event.target.value)}/>
            </div>
            <div className="col-sm-4 justify-content-start">
                {checkstate && !check_email.test(email) && <div style={{color:'red'}}>유효한 이메일을 입력하세요.</div>}
            </div>
        </div>
        <div className='row'>
            <div className="col-sm-4">
                <div className='content-text-container'>포인트</div>
            </div>
            <div className="col-sm-4">
                <div className='content-text-container'>{point}</div>
            </div>
        </div>
        <Modal
            visible={modalstate}
            effect='fadeInDown'
            onClickAway={closeModal}>
                <div>
                    <div className='title-text-container'>정말 수정하시겠습니까?</div>
                </div>
                <div>
                    <button className="btn btn-primary m-1" onClick={clickokHandler}>확인</button>
                    <button className="btn btn-secondary m-1" onClick={closeModal}>닫기</button>
                </div>
        </Modal>
        <button className="btn btn-primary m-1" onClick={clickHandler}>수정하기</button>
    </div>
  );
}