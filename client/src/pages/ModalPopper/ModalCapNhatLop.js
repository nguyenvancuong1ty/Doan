import React, { useRef, useState } from 'react';
import Button from '~/components/Button';
import classNames from 'classnames/bind';
import styles from './ModalPopper.module.scss';
const cx = classNames.bind(styles);

function ModalCapNhatLop({ setOpenModal }) {
    const [malop, setMalop] = useState('');
    const [tenlop, setTenlop] = useState('');
    const textErr = useRef();
    const handleSumit = (e) => {
        e.preventDefault();
        if (!malop) {
            textErr.current.innerText = 'Vui lòng điền đầy đủ thông tin';
            return;
        }
        if (!tenlop) {
            textErr.current.innerText = 'Vui lòng điền đầy đủ thông tin';
            return;
        } else {
            console.log({ malop, tenlop });
            textErr.current.innerText = '';
        }
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
                        value={malop}
                        onChange={(e) => setMalop(e.target.value)}
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
                        value={tenlop}
                        onChange={(e) => setTenlop(e.target.value)}
                    />
                </div>
                <div className={cx('group-form')}>
                    <label htmlFor="manhom">
                        Mã nhóm <span>*</span>:
                    </label>
                    <input type="text" id="manhom" name="manhom" placeholder="Mã lớp" />
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
