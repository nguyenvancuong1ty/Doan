import React, { useEffect, useRef, useState } from 'react';
import Button from '~/components/Button';
import classNames from 'classnames/bind';
import styles from '../ModalPopper.module.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

function ModuleDangKyNhuCauHoc({setOpenModal}) {
    const [inputData, setInputData] = useState({madangky:'', taikhoandki:'', manhucau:''});
    const textErr = useRef();
    const navigat = useNavigate()
    const [persons, setPersons] = useState([]);
    const [persons1, setPersons1] = useState([]);
    useEffect(() => {
        const layDuLieu = async () => {
            try {
                const url =`http://localhost:3000/v1/api/users`
                await axios
                    .get(url)
                    .then((res) => {
                        const persons = res.data.data;
                        setPersons(persons);
                    })
                    .catch((error) => console.log(error));
            } catch (error) {
                console.log(error);
            }
        };
        layDuLieu();
    }, []);
    useEffect(() => {
        const layDuLieu = async () => {
            try {
                const url =`http://localhost:3000/v1/api/nhucauhoc`
                await axios
                    .get(url)
                    .then((res) => {
                        const persons = res.data.data;
                        setPersons1(persons);
                    })
                    .catch((error) => console.log(error));
            } catch (error) {
                console.log(error);
            }
        };
        layDuLieu();
    }, []);
    const handleSumit = async (e) => {
        e.preventDefault();
        if (!inputData.madangky) {
            textErr.current.innerText = 'Vui lòng điền đầy đủ thông tin';
            return;
        }
        if (!inputData.taikhoandki) {
            textErr.current.innerText = 'Vui lòng điền đầy đủ thông tin';
            return;
        }
        if (!inputData.manhucau) {
            textErr.current.innerText = 'Vui lòng điền đầy đủ thông tin';
            return;
        }
         else {
            // console.log(inputData);
            textErr.current.innerText = '';
        }
        await axios
            .post('http://localhost:3000/v1/api/dknhucau', inputData, {
                headers: {
                    Authorization:"Bearer "+localStorage.getItem('token')
                },
            })
            .then((res) => {
                alert('Đã thêm Đăng ký nhu cầu học thành công');
                navigat('/dangkynhucauhoc');
                setOpenModal(false);
                window.location.reload();
            })
            .catch((err) => console.log(err));
    };
    
  return (
    <>
            <h2 className={cx('title')}>Đăng ký nhu cầu học</h2>
            <p className={cx('item-left__error')} ref={textErr}></p>
            <div className={cx('body')}>
                <div className={cx('group-form')}>
                    <label htmlFor="">
                        Mã đăng ký <span>*</span>:
                    </label>
                    <input
                        type="text"
                        id="madangky"
                        name="madangky"
                        placeholder="Mã đăng ký"
                        value={inputData.madangky}
                        onChange={(e) => setInputData({...inputData, madangky: e.target.value})}
                    />
                </div>
                <div className={cx('group-form')}>
                    <label htmlFor="">
                        Tài khoản đăng ký <span>*</span>:
                    </label>
                    <select onChange={(e) => setInputData({...inputData, taikhoandki: e.target.value})} value={inputData.taikhoandki}>
                        <option value="0">Chọn tài khoản</option>
                        {
                            persons.map(data => (
                                <option key={data.id} value={data.id}>{data.username}</option>
                            ))
                        }
                    </select>
                </div>
                <div className={cx('group-form')}>
                    <label htmlFor="">
                        Nhu cầu học <span>*</span>:
                    </label>
                    <select onChange={(e) => setInputData({...inputData, manhucau: e.target.value})} value={inputData.manhucau}>
                        <option value="0">Chọn nhu cầu học</option>
                        {
                            persons1.map(data => (
                                <option key={data.manhucau} value={data.manhucau}>{data.tennhucau}</option>
                            ))
                        }
                    </select>
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
