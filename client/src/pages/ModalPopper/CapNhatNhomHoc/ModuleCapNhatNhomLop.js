import React, { useRef, useState } from 'react';
import Button from '~/components/Button';
import classNames from 'classnames/bind';
import styles from '../ModalPopper.module.scss';
import axios from 'axios';
const cx = classNames.bind(styles);

function ModuleCapNhatNhomLop({ setOpenModal, handleAddNew }) {
    const [manhom, setManhom] = useState('');
    const [tennhom, setTennhom] = useState('');
    const textErr = useRef();
    const handleSumit = async (e) => {
        e.preventDefault();
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
        let data = {
            title: manhom,
            body: tennhom,
        };
        let res = await axios.post('https://jsonplaceholder.typicode.com/posts', data);
        if (res && res.data) {
            let newData = res.data;
            handleAddNew(newData);
        }
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
