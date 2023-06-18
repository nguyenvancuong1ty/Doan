import React, { useEffect, useRef, useState } from 'react';
import Button from '~/components/Button';
import classNames from 'classnames/bind';
import styles from '../ModalPopper.module.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const cx = classNames.bind(styles);

function EditCapNhatLop({ setModalEdit, viewPost }) {
    const [inputData, setInputData] = useState({ malop: viewPost.data[0].malop, tenlop: viewPost.data[0].tenlop, manhom: viewPost.data[0].manhom });
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
        setModalEdit(false);
        if (!inputData.malop) {
            textErr.current.innerText = 'Vui lòng điền đầy đủ thông tin';
            return;
        }
        if (!inputData.tenlop) {
            textErr.current.innerText = 'Vui lòng điền đầy đủ thông tin';
            return;
        } else {
            console.log(inputData);
            textErr.current.innerText = '';
        }
        await axios.put(`http://localhost:3000/v1/api/lop/${inputData.malop}`,inputData,
        {
            headers:{
                Authorization:`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6ImFkbWluMTIzIn0sImlhdCI6MTY4NzAyMTUxMCwiZXhwIjoxNjg3MDI1MTEwfQ.rwg6YU_9Q9JqELlSG5Y01BEVzrL7-QPF9v4jWBaL4tY`
            }
        })
        .then(res => {
            alert('Cập nhật lớp thành công!!')
            navigat('/capnhatlop')
            window.location.reload();
        })
    };
    return (
        <>
            <h2 className={cx('title')}>Sửa thông tin nhóm học</h2>
            <p className={cx('item-left__error')} ref={textErr}></p>
            <div className={cx('body')}>
                <div className={cx('group-form')}>
                    <label htmlFor="malop">
                        Mã lớp :
                    </label>
                    <input
                        type="text"
                        id="malop"
                        name="malop"
                        placeholder="Mã lớp"
                        value={inputData.malop}
                        onChange={(e) => setInputData({...inputData, malop: e.target.value})}
                        disabled
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
                        placeholder="Tên lớp"
                        value={inputData.tenlop}
                        onChange={(e) => setInputData({...inputData, tenlop: e.target.value})}
                    />
                </div>
                <div className={cx('group-form')}>
                    <label htmlFor="manhom">
                        Mã nhóm <span>*</span>:
                    </label>
                    <select onChange={(e) => setInputData({...inputData, manhom: e.target.value})} value={inputData.manhom}>
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

export default EditCapNhatLop;
