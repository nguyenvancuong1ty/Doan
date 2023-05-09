import React, { useRef, useState } from 'react';
import Button from '~/components/Button';
import classNames from 'classnames/bind';
import styles from './ModalPopper.module.scss';
const cx = classNames.bind(styles);

function ModalCapNhatNhomLop({ setOpenModal }) {
    const [nhomlop, setNhomlop] = useState('');
    const textErr = useRef();
    const handleSumit = (e) => {
        e.preventDefault();
        if (!nhomlop) {
            textErr.current.innerText = 'Vui lòng điền đầy đủ thông tin';
            return;
        }else {
            console.log({ nhomlop });
            textErr.current.innerText = '';
        }
    };
    return (
        <>
            <h2 className={cx('title')}>Thêm lớp mới</h2>
            <p className={cx('item-left__error')} ref={textErr}></p>
            <div className={cx('body')}>
                <div className={cx('group-form')}>
                    <label htmlFor="nhomlop">
                        Mã nhóm <span>*</span>:
                    </label>
                   <input type="text" id="nhomlop" name="nhomlop" placeholder="Nhóm lớp" />
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

export default ModalCapNhatNhomLop;
