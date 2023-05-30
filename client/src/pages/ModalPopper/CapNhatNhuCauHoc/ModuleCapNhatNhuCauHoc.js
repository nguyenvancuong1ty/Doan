import React, { useRef, useState } from 'react';
import Button from '~/components/Button';
import classNames from 'classnames/bind';
import styles from '../ModalPopper.module.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const cx = classNames.bind(styles);

function ModuleCapNhatNhuCauHoc({setOpenModal}) {
    const [inputData, setInputData] = useState({manhucau:'', tennhucau:''});
    const textErr = useRef();
    const navigat = useNavigate()
    const handleSumit = async (e) => {
        e.preventDefault();
        if (!inputData.manhucau) {
            textErr.current.innerText = 'Vui lòng điền đầy đủ thông tin';
            return;
        }
        if (!inputData.tennhucau) {
            textErr.current.innerText = 'Vui lòng điền đầy đủ thông tin';
            return;
        } else {
            // console.log({ manhucau, tennhucau });
            textErr.current.innerText = '';
        }
        await axios.post('http://localhost:3000/v1/api/nhomlop',inputData,
        {
            headers:{
                "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6ImFkbWluMTIzIn0sImlhdCI6MTY4NDYxMzM5MiwiZXhwIjoxNjg0NjE2OTkyfQ.QqJp9b6HX_kDQGpc2_7O6DXWhrcX-7ppQOFPPv666Ko"
            }
        })
        .then(res => {
            alert("Đã thêm thành công")
            navigat("/capnhatnhomlop")
            setOpenModal(false)
            window.location.reload();
        }).catch(err => console.log(err))
    };
    
  return (
    <>
            <h2 className={cx('title')}>Thêm nhu cầu học</h2>
            <p className={cx('item-left__error')} ref={textErr}></p>
            <div className={cx('body')}>
                <div className={cx('group-form')}>
                    <label htmlFor="manhucau">
                        Mã nhu cầu <span>*</span>:
                    </label>
                    <input
                        type="text"
                        id="manhucau"
                        name="manhucau"
                        placeholder="manhucau"
                        value={inputData.manhucau}
                        onChange={(e) => setInputData({...inputData, manhucau: e.target.value})}
                    />
                </div>
                <div className={cx('group-form')}>
                    <label htmlFor="tennhucau">
                        Tên nhu cầu <span>*</span>:
                    </label>
                    <input
                        type="text"
                        id="tennhucau"
                        name="tennhucau"
                        placeholder="tennhucau"
                        value={inputData.tennhucau}
                        onChange={(e) => setInputData({...inputData, tennhucau: e.target.value})}
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

export default ModuleCapNhatNhuCauHoc
