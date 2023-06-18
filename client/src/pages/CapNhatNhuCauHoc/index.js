import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './CapNhatNhuCauHoc.module.scss'
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import CapNhatNhuCauHocItem from './CapNhatNhuCauHocItem';
import axios from 'axios';
import { ModalPopper } from '../ModalPopper';
import ModuleCapNhatNhuCauHoc from '../ModalPopper/CapNhatNhuCauHoc/ModuleCapNhatNhuCauHoc';
import ReviewCapNhatNhuCauHoc from '../ModalPopper/CapNhatNhuCauHoc/ReviewCapNhatNhuCauHoc';
import EditCapNhatNhuCauHoc from '../ModalPopper/CapNhatNhuCauHoc/EditCapNhatNhuCauHoc';

const cx = classNames.bind(styles)
function CapNhatNhuCauHoc() {
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
                    ? `http://localhost:3000/v1/api/nhucauhoc?search=${query}`
                    : `http://localhost:3000/v1/api/nhucauhoc`;
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
    const reviewPost = async (id) => {
        await axios
            .get(`http://localhost:3000/v1/api/nhucauhoc/${id}`)
            .then((res) => {
                const persons = res.data;
                setViewPost(persons);
            })
            .catch((error) => console.log(error));

        setModalReview(true);
    };
    const editPost = async (id) => {
        await axios
            .get(`http://localhost:3000/v1/api/nhucauhoc/${id}`)
            .then((res) => {
                const persons = res.data;
                setViewPost(persons);
            })
            .catch((error) => console.log(error));
        setModalEdit(true);
    };
    const deletePost = async (id) => {
        if ( window.confirm('Bạn có chắc chắn muốn xóa nhu cầu học này không?')) {
            await axios.patch(`http://localhost:3000/v1/api/nhucauhoc/${id}`,`manhucau: ${id}`,
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
    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <div className={cx('box-title')}>
                        <h1 className={cx('title')}>Cập nhật nhu cầu học </h1>
                        <Button
                            capnhatlop
                            primary
                            onClick={() => {
                                setModalOpen(true);
                            }}
                        >
                            <FontAwesomeIcon icon={faUserPlus}/>
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
                        <CapNhatNhuCauHocItem data={persons} viewPost={viewPost} reviewPost={reviewPost} editPost={editPost} deletePost={deletePost}/>
                    </div>
                </div>
            </div>
            {modalOpen && (
                <ModalPopper setOpenModal={setModalOpen}>
                    <ModuleCapNhatNhuCauHoc setOpenModal={setModalOpen} />
                </ModalPopper>
            )}
            {modalReview && (
                <ModalPopper setOpenModal={setModalReview}>
                    <ReviewCapNhatNhuCauHoc
                        setModalReview={setModalReview}
                        viewPost={viewPost}
                        setModalEdit={setModalEdit}
                    />
                </ModalPopper>
            )}
            {modalEdit && (
                <ModalPopper setOpenModal={setModalEdit}>
                    <EditCapNhatNhuCauHoc setModalEdit={setModalEdit} viewPost={viewPost}/>
                </ModalPopper>
            )}
        </>
    );
}

export default CapNhatNhuCauHoc;
