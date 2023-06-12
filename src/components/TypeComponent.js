import React, { useState, useContext } from 'react';
import Modal from 'react-awesome-modal';
import serverapi from '../services/serverapi';
import { AuthContext } from '../services/AuthContext';
import StaffTypeModifyForm from '../form/Staff/Theater/StaffTypeModifyForm';

export default function TypeComponent(props) {
  const { logout } = useContext(AuthContext);
  const type = props.type;
  const getTypeList = props.getTypeList;

  const [typeModifyOpen, setTypeModifyOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const showTypeModify = () => {
    setTypeModifyOpen(true);
  };

  const closeTypeModify = () => {
    setTypeModifyOpen(false);
  };

  const deleteType = async (id) => {
    const api = `/theater/type/delete?id=${id}`;
    const token = localStorage.getItem('staffToken');
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
        'ngrok-skip-browser-warning': true,
      },
    };

    const yesOrNo = window.confirm('상영관 종류를 삭제하시겠습니까?');
    if (yesOrNo === false) {
      return;
    }

    try {
      setLoading(true);

      const response = await serverapi.delete(api, options);
      console.log('response', response.data);

      alert('삭제되었습니다');
      getTypeList();
    } catch (error) {
      if (error.response.data === undefined) {
        logout();
        alert('토큰이 만료되었습니다. 다시 로그인해주세요.');
      } else {
        console.log(error);
        alert(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr key={type.code}>
      <td className='centered-cell'>
        <span>{type.code}</span>
      </td>
      <td className='centered-cell'>
        <span>{type.name}</span>
      </td>
      <td>
        <button className='btn btn-warning' onClick={showTypeModify}>
          수정
        </button>
        {typeModifyOpen && <Modal setTypeModifyOpen={showTypeModify} />}
        <Modal
          visible={typeModifyOpen}
          effect='fadeInDown'
          onClickAway={closeTypeModify}
        >
          <StaffTypeModifyForm
            closeTypeModify={closeTypeModify}
            getTypeList={getTypeList}
            type={type}
          />
        </Modal>
      </td>
      <td>
        <button
          className='btn btn-danger'
          onClick={() => deleteType(type.code)}
        >
          {isLoading ? (
            <div className='spinner-border' role='status'>
              <span className='sr-only' />
            </div>
          ) : (
            <span>삭제</span>
          )}
        </button>
      </td>
    </tr>
  );
}
