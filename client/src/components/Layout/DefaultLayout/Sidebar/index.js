import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Tippy from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import styles from './Sidebar.module.scss';
import images from '~/assets/images';
import SideItem from './SideItem';
import { faBars, faUser, faBook, faChartLine, faCog, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Image from '~/components/Images';
// import { Wrapper as PropperWrapper } from '../../Popper';

const cx = classNames.bind(styles);

const SIDE_ITEM = [
    {
        id: 1,
        icon: <FontAwesomeIcon icon={faBook} />,
        link: '/',
        title: 'Cập nhật danh sách',
        active: 'active',
        menu: [
            {
                id: 1,
                title: 'Cập nhật lớp',
                link: '/capnhatlop',
                active1: 'active1',
            },
            {
                id: 2,
                title: 'Cập nhật nhóm lớp',
                link: '/capnhatnhomlop',
                active1: 'active1',
            },
            {
                id: 3,
                title: 'Cập nhật nhu cầu học',
                link: '/capnhatnhucauhoc',
                active1: 'active1',
            },
        ],
    },
    {
        id: 2,
        icon: <FontAwesomeIcon icon={faChartLine} />,
        link: '/upload',
        title: 'Cập nhật học viên',
        active: 'active',
    },
    {
        id: 3,
        icon: <FontAwesomeIcon icon={faCog} />,
        link: '/b',
        title: 'Đăng ký nhu cầu học',
        active: 'active',
    },
    {
        id: 4,
        icon: <FontAwesomeIcon icon={faRightFromBracket} />,
        link: '/c',
        title: 'Đăng ký lịch học',
        active: 'active',
    },
    {
        id: 5,
        icon: <FontAwesomeIcon icon={faRightFromBracket} />,
        link: '/d',
        title: 'Điểm danh',
        active: 'active',
    },
    {
        id: 6,
        icon: <FontAwesomeIcon icon={faRightFromBracket} />,
        link: '/e',
        title: 'Đổi mật khẩu',
        active: 'active',
    },
    {
        id: 7,
        icon: <FontAwesomeIcon icon={faRightFromBracket} />,
        link: '/f',
        title: 'Thoát',
        active: 'active',
    },
];

function Sidebar({ children }) {
    const [hide, setHide] = useState(true);
    const [visible, setVisible] = useState(false);
    const show = () => setVisible(true);
    const hidee = () => setVisible(false);
    return (
        <div className={cx('wrapper')}>
            <div className={hide ? cx('section') : cx('section', 'sectionFull')}>
                <div className={cx('top_navbar')}>
                    <div className={cx('hamburger')}>
                        <Tippy content="Ẩn Công cụ">
                            <p onClick={() => setHide(!hide)}>
                                <FontAwesomeIcon icon={faBars} />
                            </p>
                        </Tippy>
                        <Tippy content="Thông tin tài khoản">
                            <div className={cx('hamburger__right')} onClick={visible ? hidee : show}>
                                <p className={cx('hamburger__right-icon')}>
                                    <FontAwesomeIcon icon={faUser} />
                                </p>
                                <p className={cx('hamburger__right-text')}>
                                    Xin chào: <span>Hữu Hùng</span>
                                </p>
                            </div>
                        </Tippy>
                    </div>
                </div>
                <div className={cx('container')}>{children}</div>
            </div>
            {hide && (
                <div className={cx('sidebar')}>
                    <div className={cx('profile')}>
                        <Image src={images.adminLogin} alt="profile_picture" />
                        <h3>Anamika Roy</h3>
                        <p>Designer</p>
                    </div>
                    <ul>
                        <SideItem items={SIDE_ITEM} />
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Sidebar;
