import React, { useEffect, useState } from 'react';
import Modal from 'react-awesome-modal';
import axios from 'axios';
import { baseUrl } from './axios';
import { useNavigate } from 'react-router-dom';

export default function CustomerMyPageForm() {
    const ip = baseUrl
    const [deletemodal,setDeleteModal] = useState(false)
    const getdata = async()=>{
        try{
            const token = localStorage.getItem('customerToken')
            const header = {
                headers: {
                "Authorization": `Bearer ${token}`,
                "Access-Control-Allow-Origin": "*",
                "ngrok-skip-browser-warning": true
                },
            }
            const url = ip+`/customer/getCustomerData`;
            const response = await axios.get(
                url,
                header
            )
            return response.data
        }
        catch (error) {
            if(error.response.data.message)
                alert(error.response.data.message)
            else
                alert("알수 없는 에러.")
        }
    }
    const patchdata = async()=>{
        try{
            const token = localStorage.getItem('customerToken')
            const header = {
                headers: {
                "Authorization": `Bearer ${token}`,
                "Access-Control-Allow-Origin": "*",
                "ngrok-skip-browser-warning": true
                },
            }
            const url = ip+`/customer/modify`;
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
        }
        catch (error) {
            if(error.response.data.message)
                alert(error.response.data.message)
            else
                alert("알수 없는 에러.")
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
    const [password, setPassword] = useState()
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
    const navigate = useNavigate();
    const deletemember = async()=>{
        try{
            const url = ip+`/customer/delete`
            const token = localStorage.getItem('customerToken')
            let response
            const header = {
                headers: {
                "Authorization": `Bearer ${token}`,
                "Access-Control-Allow-Origin": "*",
                "ngrok-skip-browser-warning": true
                },
                data: password
            }
            response = await axios.delete(
                url,
                header
            )
            alert("탈퇴가 완료되었습니다.")
            navigate('/login')
        }
        catch(error){
            if(error.response.data.message)
                alert(error.response.data.message)
            else
                alert("알수 없는 에러.")
        }
    }
    const closeDeleteModal = ()=>{
        setDeleteModal(false)
    }
    const deleteclickHandler = ()=>{
        setDeleteModal(true)
    }
    const deletehandler = ()=>{
        if(password){
            deletemember()
        }
        else{
            alert("비밀번호를 입력해야합니다.")
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
        <Modal
                    visible={deletemodal}
                    effect='fadeInDown'
                    onClickAway={closeDeleteModal}
                    width="600">
                    <div>
                        <div className='content-text-container'>비밀번호를 입력하세요.</div>
                    </div>
                    <div style={{padding:10}}>
                        <input
                        type='password'
                        className='form-control'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <button
                        type='button'
                        className='btn btn-danger m-1'
                        onClick={deletehandler}
                    >
                        회원 탈퇴하기
                    </button>
                </Modal>
        <button className="btn btn-primary m-1" onClick={clickHandler}>수정하기</button>
        <button className="btn btn-danger m-1" onClick={deleteclickHandler}>회원 탈퇴</button>
    </div>
  );
}
