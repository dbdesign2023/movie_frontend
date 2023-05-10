import { useForm } from 'react-hook-form';
import axios from 'axios';


export default function StaffRatingAddForm(props) {
    const closeRatingModal = props.closeRatingModal;

    const {
      register,
      formState: { isDirty, errors },
    } = useForm();
  
    const onSubmit = async (data) => {
      try {
        await new Promise((r) => setTimeout(r, 1000));
        const url = `movie/genre/add`;
        const response = await axios.post(url, data);
  
        console.log(response.data);
        alert('장르가 추가되었습니다.');
      } catch (error) {
        console.log(error);
        alert(error.response.data.message);
      }
    };
  
    return (
      <div className='modal-container'>
        <div className='title-text-center-container'>등급 목록</div>
        <div className='form-container'>
          <div className='row'>// 등급 목록 api 받아서 보여주는 곳</div>
          <div className='row'>
            <div class='col-sm-3'>
              <div className='content-text-container'>새로 추가하기</div>
            </div>
            <div class='col-sm-7'>
              <input
                type='text'
                placeholder='장르를 입력하세요'
                aria-invalid={
                  !isDirty ? undefined : errors.password ? 'true' : 'false'
                }
                {...register('password', {
                  required: '비밀번호를 입력해주세요.',
                })}
              />
            </div>
            <div class='col-2'>
              <div class='left'>
                <button type='button' class='btn btn-success'>
                  등록
                </button>
              </div>
            </div>
          </div>
          <div className='bottom-container'>
            <div className='button-container'>
              <button
                type='button'
                class='btn btn-secondary'
                onClick={closeRatingModal}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }