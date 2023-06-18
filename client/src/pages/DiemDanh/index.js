import React from 'react';
import classNames from 'classnames/bind';
import styles from './DiemDanh.module.scss'
import Button from '~/components/Button';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DiemDanhItem from './DiemDanhItem';
const cx = classNames.bind(styles)

function DiemDanh() {
    const [persons, setPersons] = useState([]);
    const [query, setQuery] = useState('');
    useEffect(() => {
        const layDuLieu = async () => {
            try {
                const url = query
                    ? `http://localhost:3000/v1/api/student?q=${query}`
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
                    <h1 className={cx('title')}>Danh sách điểm danh</h1>
                    {/* <Button
                        capnhatlop
                        primary
                        // onClick={() => {
                        //     setModalOpen(true);
                        // }}
                    >
                        <FontAwesomeIcon icon={faUserPlus} />
                    </Button> */}
                </div>
                <div className={cx('box-body')}>
                    <div className={cx('search')}>
                        <input
                            type="text"
                            placeholder="Nhập tên học viên..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>
                    <Button diemdanh>Điểm danh</Button>
                    <DiemDanhItem data={persons}/>
                </div>
            </div>
        </div>
    </>
    );
}

export default DiemDanh;