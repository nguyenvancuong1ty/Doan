import React, { useRef, useState } from 'react';
import Button from '~/components/Button';
import classNames from 'classnames/bind';
import styles from '../ModalPopper.module.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const cx = classNames.bind(styles);

function EditCapNhatNhom({ setModalEdit, viewPost, handleAddNew }) {
    const [inputData, setInputData] = useState({ manhom: viewPost.data[0].manhom, tennhom: viewPost.data[0].tennhom });
    const textErr = useRef();
    const navigat = useNavigate();
    const handleSumit = async (e) => {
        e.preventDefault();
        setModalEdit(false);
        if (!inputData.manhom) {
            textErr.current.innerText = 'Vui lòng điền đầy đủ thông tin';
            return;
        }
        if (!inputData.tennhom) {
            textErr.current.innerText = 'Vui lòng điền đầy đủ thông tin';
            return;
        } else {
            // console.log({ manhom, tennhom });
            textErr.current.innerText = '';
        }
        await axios.put(`http://localhost:3000/v1/api/nhomlop/${inputData.manhom}`,inputData,
        {
            headers:{
                Authorization:"Bearer "+localStorage.getItem('token')
            }
        })
        .then(res => {
            alert('Cập nhật nhóm học thành công!!')
            navigat('/capnhatnhomlop')
            window.location.reload();
        })
    };
    return (
        <>
            <h2 className={cx('title')}>Sửa thông tin nhóm học</h2>
            <p className={cx('item-left__error')} ref={textErr}></p>
            <div className={cx('body')}>
                <div className={cx('group-form')}>
                    <label htmlFor="manhom">
                        Mã nhóm <span>*</span>:
                    </label>
                    <input
                        type="text"
                        id="manhom"
                        name="manhom"
                        placeholder="Mã nhóm"
                        value={inputData.manhom}
                        onChange={(e) => setInputData({...inputData, manhom: e.target.value})}
                        disabled
                    />
                </div>
                <div className={cx('group-form')}>
                    <label htmlFor="tennhom">
                        Tên nhóm <span>*</span>:
                    </label>
                    <input
                        type="text"
                        id="tennhom"
                        name="tennhom"
                        placeholder="Tên nhóm"
                        value={inputData.tennhom}
                        onChange={(e) => setInputData({...inputData, tennhom: e.target.value})}
                    />
                </div>
            </div>
            <div className={cx('footer')}>
                <Button
                    onClick={() => {
                        setModalEdit(false);
                    }}
                    primary
                >
                    Quay lại
                </Button>

                <Button blus onClick={handleSumit}>
                    Sửa thông tin
                </Button>
            </div>
        </>
    );
}

export default EditCapNhatNhom;
