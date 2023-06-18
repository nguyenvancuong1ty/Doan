import React, { useEffect, useRef, useState } from 'react';
import Button from '~/components/Button';
import classNames from 'classnames/bind';
import styles from '../ModalPopper.module.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const cx = classNames.bind(styles);

function ModalCapNhatLop({ setOpenModal }) {
    const [inputData, setInputData] = useState({ malop: '', tenlop: '',manhom: '' });
    const textErr = useRef();
    const navigat = useNavigate();
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        const layDuLieu = async () => {
            try {
                const url =`http://localhost:3000/v1/api/nhomlop`
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

    const handleSumit = async (e) => {
        e.preventDefault();
        if (!inputData.malop) {
            textErr.current.innerText = 'Vui lòng điền đầy đủ thông tin';
            return;
        }
        if (!inputData.tenlop) {
            textErr.current.innerText = 'Vui lòng điền đầy đủ thông tin';
            return;
        }
        if (!inputData.manhom) {
            textErr.current.innerText = 'Vui lòng điền đầy đủ thông tin';
            return;
        }
        else {
            console.log(inputData);
            textErr.current.innerText = '';
        }
        await axios
            .post('http://localhost:3000/v1/api/lop', inputData, {
                headers: {
                    Authorization:"Bearer "+localStorage.getItem('token')
                },
            })
            .then((res) => {
                alert('Đã thêm lớp thành công');
                navigat('/capnhatlop');
                setOpenModal(false);
                window.location.reload();
            })
            .catch((err) => console.log(err));
    };
    return (
        <>
            <h2 className={cx('title')}>Thêm lớp mới</h2>
            <p className={cx('item-left__error')} ref={textErr}></p>
            <div className={cx('body')}>
                <div className={cx('group-form')}>
                    <label htmlFor="malop">
                        Mã lớp <span>*</span>:
                    </label>
                    <input
                        type="text"
                        id="malop"
                        name="malop"
                        placeholder="Mã lớp"
                        value={inputData.malop}
                        onChange={(e) => setInputData({...inputData, malop: e.target.value})}
                    />
                </div>
                <div className={cx('group-form')}>
                    <label htmlFor="tenlop">
                        Tên lớp <span>*</span>:
                    </label>
                    <input
                        type="text"
                        id="tenlop"
                        name="tenlop"
                        placeholder="Mã lớp"
                        value={inputData.tenlop}
                        onChange={(e) => setInputData({...inputData, tenlop: e.target.value})}
                    />
                </div>
                <div className={cx('group-form')}>
                    <label htmlFor="manhom">
                        Mã nhóm <span>*</span>:
                    </label>
                    <select onChange={(e) => setInputData({...inputData, manhom: e.target.value})} value={inputData.manhom}>
                        <option value=""></option>
                        {
                            persons.map(data => (
                                <option key={data.manhom} value={data.manhom}>{data.tennhom}</option>
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
    );
}

export default ModalCapNhatLop;
