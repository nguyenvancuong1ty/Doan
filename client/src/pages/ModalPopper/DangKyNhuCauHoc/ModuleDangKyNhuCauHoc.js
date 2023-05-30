import React, { useRef, useState } from 'react';
import Button from '~/components/Button';
import classNames from 'classnames/bind';
import styles from '../ModalPopper.module.scss';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
const cx = classNames.bind(styles);

function ModuleDangKyNhuCauHoc({setOpenModal}) {
    const [inputData, setInputData] = useState({masv:'', fullname:'', brithday:'', address: '', email: '', phone: ''});
    const textErr = useRef();
    // const navigat = useNavigate()
    const handleSumit = async (e) => {
        e.preventDefault();
        if (!inputData.masv) {
            textErr.current.innerText = 'Vui lòng điền đầy đủ thông tin';
            return;
        }
        if (!inputData.fullname) {
            textErr.current.innerText = 'Vui lòng điền đầy đủ thông tin';
            return;
        }
        if (!inputData.brithday) {
            textErr.current.innerText = 'Vui lòng điền đầy đủ thông tin';
            return;
        }
        if (!inputData.address) {
            textErr.current.innerText = 'Vui lòng điền đầy đủ thông tin';
            return;
        }
        if (!inputData.email) {
            textErr.current.innerText = 'Vui lòng điền đầy đủ thông tin';
            return;
        }
        if (!inputData.phone) {
            textErr.current.innerText = 'Vui lòng điền đầy đủ thông tin';
            return;
        }
         else {
            // console.log({ masv, fullname });
            textErr.current.innerText = '';
        }
        // await axios.post('http://localhost:3000/v1/api/nhomlop',inputData,
        // {
        //     headers:{
        //         "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6ImFkbWluMTIzIn0sImlhdCI6MTY4NDYxMzM5MiwiZXhwIjoxNjg0NjE2OTkyfQ.QqJp9b6HX_kDQGpc2_7O6DXWhrcX-7ppQOFPPv666Ko"
        //     }
        // })
        // .then(res => {
        //     alert("Đã thêm thành công")
        //     navigat("/capnhatnhomlop")
        //     setOpenModal(false)
        //     window.location.reload();
        // }).catch(err => console.log(err))
    };
    
  return (
    <>
            <h2 className={cx('title')}>Thêm thông tin học viên</h2>
            <p className={cx('item-left__error')} ref={textErr}></p>
            <div className={cx('body')}>
                <div className={cx('group-form')}>
                    <label htmlFor="masinhvien">
                        Mã SV <span>*</span>:
                    </label>
                    <input
                        type="text"
                        id="masinhvien"
                        name="masinhvien"
                        placeholder="Mã sinh viên"
                        value={inputData.masv}
                        onChange={(e) => setInputData({...inputData, masv: e.target.value})}
                    />
                </div>
                <div className={cx('group-form')}>
                    <label htmlFor="hovaten">
                        Họ và tên <span>*</span>:
                    </label>
                    <input
                        type="text"
                        id="hovaten"
                        name="hovaten"
                        placeholder="Họ và tên"
                        value={inputData.fullname}
                        onChange={(e) => setInputData({...inputData, fullname: e.target.value})}
                    />
                </div>
                <div className={cx('group-form')}>
                    <label htmlFor="ngaysinh">
                        Ngày sinh <span>*</span>:
                    </label>
                    <input
                        type="date"
                        id="ngaysinh"
                        name="ngaysinh"
                        placeholder="Ngày sinh"
                        value={inputData.brithday}
                        onChange={(e) => setInputData({...inputData, brithday: e.target.value})}
                    />
                </div>
                <div className={cx('group-form')}>
                    <label htmlFor="diachi">
                        Địa chỉ <span>*</span>:
                    </label>
                    <input
                        type="text"
                        id="diachi"
                        name="diachi"
                        placeholder="Địa chỉ"
                        value={inputData.address}
                        onChange={(e) => setInputData({...inputData, address: e.target.value})}
                    />
                </div>
                <div className={cx('group-form')}>
                    <label htmlFor="email">
                        Email <span>*</span>:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={inputData.email}
                        onChange={(e) => setInputData({...inputData, email: e.target.value})}
                    />
                </div>
                <div className={cx('group-form')}>
                    <label htmlFor="phone">
                        Phone <span>*</span>:
                    </label>
                    <input
                        type="email"
                        id="phone"
                        name="phone"
                        placeholder="Số điện thoại"
                        value={inputData.phone}
                        onChange={(e) => setInputData({...inputData, phone: e.target.value})}
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
  )
}

export default ModuleDangKyNhuCauHoc
