import React from 'react';
import serverapi from '../services/serverapi';
import { useForm } from 'react-hook-form';

import '../styles/components/form-container.scss';
import '../styles/components/modal-container.scss';

export default function StaffCustomerForm(props) {
  const closeCustomerModal = props.closeCustomerModal;
  const customer = props.customer;

  return (
    <div className='modal-container'>
      <div className='btn-close'>
        <button
          type='button'
          class='btn-close'
          aria-label='Close'
          onClick={closeCustomerModal}
        ></button>
      </div>
      <div className='title-text-center-container'>고객 정보</div>
      <div className='form-container'>
        <div className='row'>
          <div class='col-sm-4'>
            <div className='content-text-container'>고객코드</div>
          </div>
          <div class='col-8'>
            <div className='content-subtext-container'>
              {customer.customerId}
            </div>
          </div>
        </div>
        <div className='row'>
          <div class='col-sm-4'>
            <div className='content-text-container'>이름</div>
          </div>
          <div class='col-8'>
            <div className='content-subtext-container'>{customer.name}</div>
          </div>
        </div>
        <div className='row'>
          <div class='col-sm-4'>
            <div className='content-text-container'>아이디</div>
          </div>
          <div class='col-8'>
            <div className='content-subtext-container'>{customer.loginId}</div>
          </div>
        </div>
        <div className='row'>
          <div class='col-sm-4'>
            <div className='content-text-container'>닉네임</div>
          </div>
          <div class='col-8'>
            <div className='content-subtext-container'>{customer.nickname}</div>
          </div>
        </div>
        <div className='row'>
          <div class='col-sm-4'>
            <div className='content-text-container'>생년월일</div>
          </div>
          <div class='col-8'>
            <div className='content-subtext-container'>
              {customer.birthdate}
            </div>
          </div>
        </div>
        <div className='row'>
          <div class='col-sm-4'>
            <div className='content-text-container'>성별</div>
          </div>
          <div class='col-8'>
            <div className='content-subtext-container'>{customer.gender}</div>
          </div>
        </div>
        <div className='row'>
          <div class='col-sm-4'>
            <div className='content-text-container'>휴대폰 번호</div>
          </div>
          <div class='col-8'>
            <div className='content-subtext-container'>
              {'0' + customer.phoneNumber}
            </div>
          </div>
        </div>
        <div className='row'>
          <div class='col-sm-4'>
            <div className='content-text-container'>이메일</div>
          </div>
          <div class='col-8'>
            <div className='content-subtext-container'>{customer.email}</div>
          </div>
        </div>
        <div className='row'>
          <div class='col-sm-4'>
            <div className='content-text-container'>포인트</div>
          </div>
          <div class='col-8'>
            <div className='content-subtext-container'>{customer.point}</div>
          </div>
        </div>
        <div className='row'>
          <div class='col-sm-4'>
            <div className='content-text-container'>가입일자</div>
          </div>
          <div class='col-8'>
            <div className='content-subtext-container'>
              {customer.createdAt}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
