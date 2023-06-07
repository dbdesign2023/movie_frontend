import React, { useEffect, useState } from 'react';
import serverapi from '../services/serverapi';
import CustomerComponent from '../components/CustomerComponent';

import '../styles/components/page-container.scss';

export default function StaffCustomerPage() {
  const [customerList, setCustomerList] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getCustomerList();
  }, []);

  const getCustomerList = async () => {
    const api = '/customer/getCustomerData'; // customer로 바꾸기
    const token = localStorage.getItem('staffToken');
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      setLoading(true);

      const response = await serverapi.get(api, options);
      console.log('response', response.data);

      setCustomerList(response.data);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    } finally {
      setLoading(false);
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
              <th scope='col'>
                {isLoading ? (
                  <div className='spinner-border' role='status'>
                    <span className='sr-only' />
                  </div>
                ) : (
                  <span>자세히 보기</span>
                )}
              </th>
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
