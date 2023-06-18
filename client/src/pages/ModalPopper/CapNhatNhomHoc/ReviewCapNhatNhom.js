import React from 'react';
import Button from '~/components/Button';
import classNames from 'classnames/bind';
import styles from '../ModalPopper.module.scss';
const cx = classNames.bind(styles);

function ReviewCapNhatNhom({ setModalReview, viewPost, setModalEdit }) {
    const handleClick = () => {
        setModalReview(false);
        setModalEdit(true)
        // console.log(localStorage.getItem('token'))
    }
    return (
        <>
            <h2 className={cx('title')}>Xem nhóm học</h2>
            <div className={cx('body')}>
                <div className={cx('group-form')}>
                    <label htmlFor="manhom">
                        Mã nhóm :
                    </label>
                    <p className={cx('group-form--text')}>{viewPost.data[0].manhom}</p>
                </div>
                <div className={cx('group-form')}>
                    <label htmlFor="tennhom">
                        Tên nhóm :
                    </label>
                    <p className={cx('group-form--text')}>{viewPost.data[0].tennhom}</p>
                </div>
            </div>
            <div className={cx('footer')}>
                <Button
                    onClick={() => {
                        console.log(localStorage.getItem('token'))
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

export default ReviewCapNhatNhom;
