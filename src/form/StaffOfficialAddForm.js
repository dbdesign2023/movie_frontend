import { useForm } from 'react-hook-form';

export default function StaffOfficialAddForm(props) {
    return (
        <div className='modal-container'>
            <div className='title-text-center-container'>
            <div className='center'>인물 등록</div>
            </div>
            <div className='form-container'>
            <div class='row'>
                <div class='col-sm-2'>
                <div className='content-text-container'>이름</div>
                </div>
                <div class='col-10'>
                <div class='half-inner-form-container'>
                    <input
                    type='text'
                    class='form-control'
                    />
                </div>
                </div>
            </div>
            <div class='row'>
                <div class='col-sm-2'>
                <div className='content-text-container'>
                    생년월일
                </div>
                </div>
                <div class='col-10'>
                <div class='half-inner-form-container'>
                    <input
                    type='date'
                    class='inputField'
                    />
                </div>
                </div>
            </div>
            <div class='row'>
                <div class='col-sm-2'>
                <div className='content-text-container'>사진</div>
                </div>
                <div class='col-10'>
                </div>
            </div>
            <div class='row'>
                <div class='col-sm-2'></div>
                <div class='col-sm-10'>
                <input
                    class='form-control'
                    type='file'
                    id='formFile'
                    placeholder=''
                />
                </div>
            </div>
            <div class='row'>
                <div class='col-sm-2'>
                <div className='content-text-container'>국적</div>
                </div>
                <div class='col-10'>
                <div class='half-inner-form-container'>
                    <input
                    type='text'
                    class='form-control'
                    />
                </div>
                </div>
            </div>
            <div class='row'>
                <div class='col-sm-2'>
                <div className='content-text-container'>정보</div>
                </div>
                <div class='col-10'>
                <input
                    type='text'
                    class='form-control'
                />
                </div>
            </div>
            <div className='bottom-container'>
                <div className='button-container'>
                <button
                    type='button'
                    class='btn btn-secondary'
                >
                    닫기
                </button>
                </div>
                <div className='button-container'>
                <button
                    type='button'
                    class='btn btn-outline-success'
                >
                    초기화
                </button>
                </div>
                <div className='button-container'>
                <button type='button' class='btn btn-success'>
                    등록
                </button>
                </div>
            </div>
            </div>
        </div>
    )
}