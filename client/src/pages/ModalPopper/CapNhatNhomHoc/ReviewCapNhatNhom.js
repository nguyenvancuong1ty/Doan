import React from 'react';
import Button from '~/components/Button';
import classNames from 'classnames/bind';
import styles from '../ModalPopper.module.scss';
const cx = classNames.bind(styles);

function ReviewCapNhatNhom({ setModalReview, viewPost }) {
    return (
        <>
            <h2 className={cx('title')}>Xem nhóm học</h2>
            <div className={cx('body')}>
                <div className={cx('group-form')}>
                    <label htmlFor="manhom">
                        Mã nhóm :
                    </label>
                    <p className={cx('group-form--text')}>{viewPost.title}</p>
                </div>
                <div className={cx('group-form')}>
                    <label htmlFor="tennhom">
                        Tên nhóm :
                    </label>
                    <p className={cx('group-form--text')}>{viewPost.body}</p>
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

                <Button blus>
                    Sửa
                </Button>
            </div>
        </>
    );
}

export default ReviewCapNhatNhom;
