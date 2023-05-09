import React from 'react';
import classNames from 'classnames/bind';
import styles from './ModalPopper.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';


const cx = classNames.bind(styles);

export function ModalPopper({ setOpenModal, children }) {
    return (
        <div className={cx('modalBackground')}>
            <div className={cx('modalContainer')}>
                <div className={cx('titleCloseBtn')}>
                    <button
                        className={cx('icon-close')}
                        onClick={() => {
                            setOpenModal(false);
                        }}
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}


