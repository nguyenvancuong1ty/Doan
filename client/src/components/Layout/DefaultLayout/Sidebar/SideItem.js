import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function SideItem({ items = [] }) {
    return (
        <>
            {items.map((value) => (
                <li key={value.id}>
                    <NavLink to={value.link} className={({ isActive }) => (isActive ? cx(value.active) : '')}>
                        <span className={cx('icon')}>{value.icon}</span>
                        <span className={cx('item')}>{value.title}</span>
                    </NavLink>
                    <ul className={cx('subul')}>
                        {value.menu?.map((data) => (
                            <li key={data.id}>
                                <NavLink
                                    to={data.link}
                                    className={({ isActive }) => (isActive ? cx(data.active1) : '')}
                                >
                                    <span className={cx('item')}>{data.title}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </li>
            ))}
        </>
    );
}

export default SideItem;
