import React, { useEffect, useRef, useState } from 'react';
import Button from '~/components/Button';
import classNames from 'classnames/bind';
import styles from '../ModalPopper.module.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const cx = classNames.bind(styles);

function EditDangKyNhuCauHoc({ setModalEdit, viewPost }) {
    const [inputData, setInputData] = useState({madangky:viewPost.data[0].madangky, taikhoandki:viewPost.data[0].taikhoandki, manhucau:viewPost.data[0].manhucau});
    const textErr = useRef();
    const navigat = useNavigate();
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
        setModalEdit(false);
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
        await axios.put(`http://localhost:3000/v1/api/dknhucau/${inputData.madangky}`,inputData,
        {
            headers:{
                Authorization:"Bearer "+localStorage.getItem('token')
            }
        })
        .then(res => {
            alert('Cập nhật nhu cầu học thành công!!')
            navigat('/dangkynhucauhoc')
            window.location.reload();
        })
    };
    return (
        <>
            <h2 className={cx('title')}>Sửa thông tin nhu cầu học đã đăng ký</h2>
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

export default EditDangKyNhuCauHoc;
