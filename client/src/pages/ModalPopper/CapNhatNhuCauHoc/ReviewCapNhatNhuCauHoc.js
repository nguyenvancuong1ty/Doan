import React from 'react';
import Button from '~/components/Button';
import classNames from 'classnames/bind';
import styles from '../ModalPopper.module.scss';
const cx = classNames.bind(styles);

function ReviewCapNhatNhuCauHoc({ setModalReview, viewPost, setModalEdit }) {
    const handleClick = () => {
        setModalReview(false);
        setModalEdit(true)
    }
    return (
        <>
            <h2 className={cx('title')}>Xem nhu cầu học</h2>
            <div className={cx('body')}>
                <div className={cx('group-form')}>
                    <label htmlFor="">
                        Mã nhu cầu:
                    </label>
                    <p className={cx('group-form--text')}>{viewPost.data[0].manhucau}</p>
                </div>
                <div className={cx('group-form')}>
                    <label htmlFor="">
                        Tên nhu cầu:
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

export default ReviewCapNhatNhuCauHoc;
