import React, { useState } from 'react';
import Modal from 'react-awesome-modal';
import serverapi from '../services/serverapi';
import StaffRoleModifyForm from '../form/Staff/Role/StaffRoleModifyForm';

export default function RoleComponent(props) {
  const role = props.role;
  const getMovieList = props.getMovieList;
  const info = props.info;

  const [roleModifyOpen, setRoleModifyOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const showRoleModify = () => {
    setRoleModifyOpen(true);
  };

  const closeRoleModify = () => {
    setRoleModifyOpen(false);
  };

  const deleteRole = async (id) => {
    console.log('id', id);
    const api = `/movie/${parseInt(info.movieId, 10)}/role/delete?castId=${id}`;
    const token = localStorage.getItem('staffToken');
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const yesOrNo = window.confirm('인물을 삭제하시겠습니까?');
    if (yesOrNo === false) {
      return;
    }

    try {
      setLoading(true);

      const response = await serverapi.delete(api, options);
      console.log('response', response.data);
      alert('삭제되었습니다');
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr key={role.key}>
      <td className='centered-cell'>
        <span>{role.starring === true ? '주연' : '조연'}</span>
      </td>
      <td className='centered-cell'>
        <span>{role.name}</span>
      </td>
      <td className='centered-cell'>
        <span>{role.role}</span>
      </td>
      <td>
        <button className='btn btn-warning' onClick={showRoleModify}>
          수정
        </button>
        {roleModifyOpen && <Modal setRoleModifyOpen={showRoleModify} />}
        <Modal
          visible={roleModifyOpen}
          effect='fadeInDown'
          onClickAway={closeRoleModify}
        >
          <StaffRoleModifyForm
            closeRoleModify={closeRoleModify}
            getMovieList={getMovieList}
            role={role}
            info={info}
          />
        </Modal>
      </td>
      <td>
        <button
          className='btn btn-danger'
          onClick={() => deleteRole(role.castId)}
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
