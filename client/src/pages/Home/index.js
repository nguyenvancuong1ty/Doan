import React from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('title')}>Chào mừng bạn đến với hệ thống quản lý học viên của trung tâm tiếng anh</p>
            <p className={cx('text')}>Chúc các bạn một ngày mới làm việc hiệu quả</p>
            <p className={cx('text')}>Hãy chọn các chức năng ở danh mục menu để thực hiện các chức năng của hệ thống!</p>
        </div>
    );
}

export default Home;
