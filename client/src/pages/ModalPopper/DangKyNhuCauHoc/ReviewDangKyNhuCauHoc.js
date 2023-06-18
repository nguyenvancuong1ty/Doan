import React from 'react';
import Button from '~/components/Button';
import classNames from 'classnames/bind';
import styles from '../ModalPopper.module.scss';
const cx = classNames.bind(styles);

function ReviewDangKyNhuCauHoc({ setModalReview, viewPost, setModalEdit }) {
    const handleClick = () => {
        setModalReview(false);
        setModalEdit(true)
    }
    return (
        <>
            <h2 className={cx('title')}>Xem nhu cầu học đã đăng ký</h2>
            <div className={cx('body')}>
                <div className={cx('group-form')}>
                    <label htmlFor="">
                        Mã đăng ký:
                    </label>
                    <p className={cx('group-form--text')}>{viewPost.data[0].madangky}</p>
                </div>
                <div className={cx('group-form')}>
                    <label htmlFor="">
                        Tên tài khoản:
                    </label>
                    <p className={cx('group-form--text')}>{viewPost.data[0].username}</p>
                </div>
                <div className={cx('group-form')}>
                    <label htmlFor="">
                        Nhu cầu học:
                    </label>
                    <p className={cx('group-form--text')}>{viewPost.data[0].tennhucau}</p>
                </div>
            </div>
            <div className={cx('footer')}>
                <Button
                    onClick={() => {
                        setModalReview(false);
                    }}
                    primary
                >
                    Quay lại
                </Button>

                <Button blus onClick={handleClick}>
                    Sửa
                </Button>
            </div>
        </>
    );
}

export default ReviewDangKyNhuCauHoc;
