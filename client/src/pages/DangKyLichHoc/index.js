import classNames from 'classnames/bind';
import styles from './DangKyLichHoc.module.scss'
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DangKyLichHocItem from './DangKyLichHocItem';
const cx = classNames.bind(styles)

function DangKyLichHoc() {
    const [persons, setPersons] = useState([]);
    const [query, setQuery] = useState('');
    useEffect(() => {
        const layDuLieu = async () => {
            try {
                const url = query
                    ? `https://jsonplaceholder.typicode.com/users?q=${query}`
                    : `https://jsonplaceholder.typicode.com/users`;
                await axios
                    .get(url)
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
                        <h1 className={cx('title')}>Đăng ký lịch học </h1>
                        <Button
                            capnhatlop
                            primary
                            // onClick={() => {
                            //     setModalOpen(true);
                            // }}
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
                        <DangKyLichHocItem data={persons}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DangKyLichHoc;