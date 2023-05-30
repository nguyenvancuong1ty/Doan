import React, { useRef, useState } from 'react';
import Button from '~/components/Button';
import classNames from 'classnames/bind';
import styles from '../ModalPopper.module.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const cx = classNames.bind(styles);

function ModuleCapNhatNhomLop({ setOpenModal }) {
    const [inputData, setInputData] = useState({ manhom: '', tennhom: '' });
    const textErr = useRef();
    const navigat = useNavigate();
    const handleSumit = async (e) => {
        e.preventDefault();
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
        await axios
            .post('http://localhost:3000/v1/api/nhomlop', inputData, {
                headers: {
                    Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6ImFkbWluMTIzIn0sImlhdCI6MTY4NDYxMzM5MiwiZXhwIjoxNjg0NjE2OTkyfQ.QqJp9b6HX_kDQGpc2_7O6DXWhrcX-7ppQOFPPv666Ko',
                },
            })
            .then((res) => {
                alert('Đã thêm thành công');
                navigat('/capnhatnhomlop');
                setOpenModal(false);
                window.location.reload();
            })
            .catch((err) => console.log(err));
    };
    return (
        <>
            <h2 className={cx('title')}>Thêm nhóm học</h2>
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
                        onChange={(e) => setInputData({ ...inputData, manhom: e.target.value })}
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
                        onChange={(e) => setInputData({ ...inputData, tennhom: e.target.value })}
                    />
                </div>
            </div>
            <div className={cx('footer')}>
                <Button
                    onClick={() => {
                        setOpenModal(false);
                    }}
                    primary
                >
                    Quay lại
                </Button>

                <Button blus onClick={handleSumit}>
                    Thêm thông tin
                </Button>
            </div>
        </>
    );
}

export default ModuleCapNhatNhomLop;
