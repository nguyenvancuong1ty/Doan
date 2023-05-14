import React, { useEffect, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './CapNhatNhomLop.module.scss';
import Item from './item';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { ModalPopper } from '../ModalPopper';
import ModuleCapNhatNhomLop from '../ModalPopper/CapNhatNhomHoc/ModuleCapNhatNhomLop';
import ReviewCapNhatNhom from '../ModalPopper/CapNhatNhomHoc/ReviewCapNhatNhom';
import EditCapNhatNhom from '../ModalPopper/CapNhatNhomHoc/EditCapNhatNhom';

const cx = classNames.bind(styles);
function CapNhatNhomLop() {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalReview, setModalReview] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [viewPost, setViewPost] = useState([]);
    const [post, setPost] = useState([]);
    const [query, setQuery] = useState('');

    useEffect(() => {
        const layDuLieu = async () => {
            try {
                await axios
                    .get(`https://jsonplaceholder.typicode.com/posts?q=${query}`)
                    .then((res) => {
                        const persons = res.data;
                        setPost(persons);
                    })
                    .catch((error) => console.log(error));
            } catch (error) {
                console.log(error);
            }
        };
        if (query.length === 0 || query.length > 2) layDuLieu();
        // Khi có post thì sẽ phải nhúng api thực tế vào không phếch api sẽ bị lỗi
    }, [query , post ]);
    const handleAddNew = (data) => {
        let dulieu = post;
        dulieu.unshift(data);
        setModalOpen(false);
        setPost(dulieu);
    };
    const deletePost = async (id) => {
        // Phần xóa tham khảo link: https://hocwebchuan.com/tutorial/reactjs/reactjs_mysql_delete.php

        // Xóa khi gọi api
        /* await axios
            .delete(`https://jsonplaceholder.typicode.com/posts?id=${id}`)
            .then((res) => {
                setPost(
                    post.filter((item) => {
                        return item.id !== id;
                    }),
                );
            })
            .catch((error) => console.log(error));
        */
        //    Xóa bên người dùng khi F5 sẽ hiện lại
        let dulieu = post;
        dulieu = dulieu.filter((item) => item.id !== id);
        setPost(dulieu);
    };
    const reviewPost = async (id) => {
        await axios
            .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then((res) => {
                const persons = res.data;
                setViewPost(persons);
            })
            .catch((error) => console.log(error));

        setModalReview(true);
    };
    const editPost = async (id) => {
        await axios
            .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
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
                        <h1 className={cx('title')}>Cập nhật nhóm học</h1>
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
                        <Item
                            data={post}
                            deletePost={deletePost}
                            reviewPost={reviewPost}
                            viewPost={viewPost}
                            editPost={editPost}
                        />
                    </div>
                </div>
            </div>
            {modalOpen && (
                <ModalPopper setOpenModal={setModalOpen}>
                    <ModuleCapNhatNhomLop setOpenModal={setModalOpen} handleAddNew={handleAddNew} />
                </ModalPopper>
            )}
            {modalReview && (
                <ModalPopper setOpenModal={setModalReview}>
                    <ReviewCapNhatNhom setModalReview={setModalReview} viewPost={viewPost} />
                </ModalPopper>
            )}
            {modalEdit && (
                <ModalPopper setOpenModal={setModalEdit}>
                    <EditCapNhatNhom setModalEdit={setModalEdit} viewPost={viewPost} handleAddNew={handleAddNew}/>
                </ModalPopper>
            )}
        </>
    );
}

export default CapNhatNhomLop;
