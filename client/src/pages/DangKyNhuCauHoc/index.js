import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './DangKyNhuCauHoc.module.scss'
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import DangKyNhuCauHocItem from './DangKyNhuCauHocItem';
import { ModalPopper } from '../ModalPopper';
import ModuleDangKyNhuCauHoc from '../ModalPopper/DangKyNhuCauHoc/ModuleDangKyNhuCauHoc';
import ReviewDangKyNhuCauHoc from '../ModalPopper/DangKyNhuCauHoc/ReviewDangKyNhuCauHoc';
import EditDangKyNhuCauHoc from '../ModalPopper/DangKyNhuCauHoc/EditDangKyNhuCauHoc';
const cx = classNames.bind(styles)

const DangKyNhuCauHoc = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [persons, setPersons] = useState([]);
    const [query, setQuery] = useState('');
    const [modalReview, setModalReview] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [viewPost, setViewPost] = useState([]);
    useEffect(() => {
        const layDuLieu = async () => {
            try {
                const url = query
                    ? `http://localhost:3000/v1/api/dknhucau?search=${query}`
                    : `http://localhost:3000/v1/api/dknhucau`;
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
    const deletePost = async (id) => {
        if ( window.confirm('Bạn có chắc chắn muốn xóa nhu cầu học này không?')) {
            await axios.patch(`http://localhost:3000/v1/api/dknhucau/${id}`,`madangky: ${id}`,
        {
            headers:{
                Authorization:"Bearer "+localStorage.getItem('token')
            }
        })
            .then((res) => {
                alert('Bạn đã xóa thành công nhu cầu học học!')
                window.location.reload();
            })
            .catch((error) => console.log(error));
        } 
    };
    const reviewPost = async (id) => {
        await axios
            .get(`http://localhost:3000/v1/api/dknhucau/${id}`)
            .then((res) => {
                const persons = res.data;
                setViewPost(persons);
            })
            .catch((error) => console.log(error));

        setModalReview(true);
    };
    const editPost = async (id) => {
        await axios
            .get(`http://localhost:3000/v1/api/dknhucau/${id}`)
            .then((res) => {
                const persons = res.data;
                setViewPost(persons);
            })
            .catch((error) => console.log(error));
        setModalEdit(true);
    };
    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <div className={cx('box-title')}>
                        <h1 className={cx('title')}>Đăng ký nhu cầu học </h1>
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
                        <DangKyNhuCauHocItem data={persons} viewPost={viewPost} reviewPost={reviewPost} editPost={editPost} deletePost={deletePost}/>
                    </div>
                </div>
            </div>
            {modalOpen && (
                <ModalPopper setOpenModal={setModalOpen}>
                    <ModuleDangKyNhuCauHoc setOpenModal={setModalOpen} />
                </ModalPopper>
            )}
            {modalReview && (
                <ModalPopper setOpenModal={setModalReview}>
                    <ReviewDangKyNhuCauHoc
                        setModalReview={setModalReview}
                        viewPost={viewPost}
                        setModalEdit={setModalEdit}
                    />
                </ModalPopper>
            )}
            {modalEdit && (
                <ModalPopper setOpenModal={setModalEdit}>
                    <EditDangKyNhuCauHoc setModalEdit={setModalEdit} viewPost={viewPost}/>
                </ModalPopper>
            )}
        </>
    );
};

export default DangKyNhuCauHoc;