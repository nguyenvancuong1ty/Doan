import React, { useRef, useState } from 'react';
import Button from '~/components/Button';
import classNames from 'classnames/bind';
import styles from '../ModalPopper.module.scss';
import axios from 'axios';
const cx = classNames.bind(styles);

function EditCapNhatNhom({ setModalEdit, viewPost, handleAddNew }) {
    const [manhom, setManhom] = useState(viewPost.data[0].manhom);
    const [tennhom, setTennhom] = useState(viewPost.data[0].tennhom);
    const textErr = useRef();
    const handleSumit = async (e) => {
        e.preventDefault();
        setModalEdit(false);
        if (!manhom) {
            textErr.current.innerText = 'Vui lòng điền đầy đủ thông tin';
            return;
        }
        if (!tennhom) {
            textErr.current.innerText = 'Vui lòng điền đầy đủ thông tin';
            return;
        } else {
            // console.log({ manhom, tennhom });
            textErr.current.innerText = '';
        }
        let res = await axios.put(`http://localhost:3000/v1/api/nhomlop/${manhom}`,
        {
            headers:{
                Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6ImFkbWluMTIzIn0sImlhdCI6MTY4NDYxMzM5MiwiZXhwIjoxNjg0NjE2OTkyfQ.QqJp9b6HX_kDQGpc2_7O6DXWhrcX-7ppQOFPPv666Ko"
            }
        })
        if (res && res.data) {
            let newData = res.data;
            handleAddNew(newData);
        }
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
                        value={manhom}
                        onChange={(e) => setManhom(e.target.value)}
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
                        value={tennhom}
                        onChange={(e) => setTennhom(e.target.value)}
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
