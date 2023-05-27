import React, { useEffect, useState } from 'react';
import serverapi from '../services/serverapi';
import CustomerComponent from '../components/CustomerComponent';

import '../styles/components/page-container.scss';

export default function StaffCustomerPage() {
  const [customerList, setCustomerList] = useState([]);

  useEffect(() => {
    //getCustoemrList();
    setCustomerList([
      {
        customerId: 1,
        name: '가나다',
        loginId: '가나다',
        password: '가나다',
        nickname: '까나따',
        birthdate: 12351111,
        gender: 'F',
        phoneNumber: 1012351235,
        email: '가나다@gmail.com',
        point: 111,
        가입일자: 12351111,
      },
      {
        customerId: 2,
        name: '라마바',
        loginId: '라마바',
        password: '라마바',
        nickname: '라마빠',
        birthdate: 12352222,
        gender: 'M',
        phoneNumber: 1012351235,
        email: '사아자@gmail.com',
        point: 222,
        가입일자: 12352222,
      },
      {
        customerId: 2,
        name: '사아자',
        loginId: '사아자',
        password: '사아자',
        nickname: '싸아짜',
        birthdate: 12353333,
        gender: 'M',
        phoneNumber: 1012351235,
        email: '사아자@gmail.com',
        point: 333,
        가입일자: 12353333,
      },
    ]);
  }, []);

  const getCustomerList = async () => {
    const api = '/movie/rating/list'; // customer로 바꾸기
    const token = localStorage.getItem('staffToken');
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      console.log('staffToken', token);
      const response = await serverapi.get(api, options);
      console.log('response', response.data);

      setCustomerList(response.data);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <div className='list-container'>
        <table class='table table-striped'>
          <thead>
            <tr>
              <th scope='col'>고객코드</th>
              <th scope='col'>이름</th>
              <th scope='col'>아이디</th>
              <th scope='col'>생년월일</th>
              <th scope='col'>성별</th>
              <th scope='col'>자세히 보기</th>
            </tr>
          </thead>
          <tbody>
            {customerList.map((customer) => {
              return <CustomerComponent customer={customer} />;
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
