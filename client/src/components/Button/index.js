import React from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Button({ to, href, children, primary, leftIcon, rightIcon, disabled, login, capnhatlop , blus, onClick, ...passProps }) {
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps,
    };
    // Xóa sự kiện khi disabled
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }
    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }
    const classes = cx('wrapper', {
        primary,
        login,
        blus,
        capnhatlop
    });
    return (
        <div>
            <Comp className={classes} {...props}>
                {/* {leftIcon && <span className={cx('icon')}>{leftIcon}</span>} */}
                <span>{children}</span>
                {/* {rightIcon && <span className={cx('icon')}>{rightIcon}</span>} */}
            </Comp>
        </div>
    );
}

export default Button;
