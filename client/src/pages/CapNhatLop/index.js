import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import classNames from 'classnames/bind';
import styles from './CapNhatLop.module.scss';
import { ModalPopper } from '../ModalPopper';
import ModalCapNhatLop from '../ModalPopper/ModalCapNhatLop';
import CapNhatLopItem from './CapNhatLopItem';

const cx = classNames.bind(styles);

function CapNhatLop() {
    const [modalOpen, setModalOpen] = useState(false);
    const [persons, setPersons] = useState([]);
    const [query, setQuery] = useState('')

    useEffect(() => {
        const layDuLieu = async () => {
            try {
                await axios
                    .get(`https://jsonplaceholder.typicode.com/users?q=${query}`)
                    .then((res) => {
                        const persons = res.data;
                        setPersons(persons);
                    })
                    .catch((error) => console.log(error));
            } catch (error) {
                console.log(error);
            }
        };
        layDuLieu();
    }, [query]);
    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <div className={cx('box-title')}>
                        <h1 className={cx('title')}>Danh sách lớp </h1>
                        <Button
                            capnhatlop
                            primary
                            onClick={() => {
                                setModalOpen(true);
                            }}
                        >
                            <FontAwesomeIcon icon={faUserPlus} />
                        </Button>
                    </div>
                    <div className={cx('box-body')}>
                        <div className={cx('search')}>
                            <input type="text" placeholder="Nhập từ khóa cần tìm..." value={query} onChange={(e) => setQuery(e.target.value)}/>
                            {/* <button>Tìm kiếm</button> */}
                        </div>
                        <CapNhatLopItem data={persons} />
                    </div>
                </div>
            </div>
            {modalOpen && (
                <ModalPopper setOpenModal={setModalOpen}>
                    <ModalCapNhatLop setOpenModal={setModalOpen} />
                </ModalPopper>
            )}
        </>
    );
}

export default CapNhatLop;
