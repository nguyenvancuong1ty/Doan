import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './CapNhatHocVien.module.scss'
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import CapNhatHocVienItem from './CapNhatHocVienItem';
import { ModalPopper } from '../ModalPopper';
import ModuleCapNhatHocVien from '../ModalPopper/CapNhatHocVien/ModuleCapNhatHocVien';
const cx = classNames.bind(styles)
function CapNhatHocVien() {
    const [modalOpen, setModalOpen] = useState(false);
    const [persons, setPersons] = useState([]);
    const [query, setQuery] = useState('');
    useEffect(() => {
        const layDuLieu = async () => {
            try {
                const url = query
                    ? `http://localhost:3000/v1/api/student?search=${query}`
                    : `http://localhost:3000/v1/api/student`;
                await axios
                    .get(url)
                    .then((res) => {
                        const persons = res.data.data;
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
                        <h1 className={cx('title')}>Cập nhật học viên </h1>
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
                            <input
                                type="text"
                                placeholder="Nhập từ khóa cần tìm..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>
                        <CapNhatHocVienItem data={persons}/>
                    </div>
                </div>
            </div>
            {modalOpen && (
                <ModalPopper setOpenModal={setModalOpen}>
                    <ModuleCapNhatHocVien setOpenModal={setModalOpen} />
                </ModalPopper>
            )}
        </>
    );
}

export default CapNhatHocVien;