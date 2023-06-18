import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import classNames from 'classnames/bind';
import styles from './CapNhatLop.module.scss';
import { ModalPopper } from '../ModalPopper';
import ModalCapNhatLop from '../ModalPopper/CapNhatLop/ModalCapNhatLop';
import CapNhatLopItem from './CapNhatLopItem';
import ReviewCapNhatLop from '../ModalPopper/CapNhatLop/ReviewCapNhatLop';
import EditCapNhatLop from '../ModalPopper/CapNhatLop/EditCapNhatLop';

const cx = classNames.bind(styles);

function CapNhatLop() {
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
                    ? `http://localhost:3000/v1/api/lop/search?search=${query}`
                    : `http://localhost:3000/v1/api/lop`;
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
            .get(`http://localhost:3000/v1/api/lop/${id}`)
            .then((res) => {
                const persons = res.data;
                setViewPost(persons);
            })
            .catch((error) => console.log(error));

        setModalReview(true);
    };
    const editPost = async (id) => {
        await axios
            .get(`http://localhost:3000/v1/api/lop/${id}`)
            .then((res) => {
                const persons = res.data;
                setViewPost(persons);
            })
            .catch((error) => console.log(error));
        setModalEdit(true);
    };
    const deletePost = async (id) => {
        if ( window.confirm('Bạn có chắc chắn muốn xóa lớp này không?')) {
            await axios.patch(`http://localhost:3000/v1/api/lop/${id}`,`malop: ${id}`,
        {
            headers:{
                Authorization:"Bearer "+localStorage.getItem('token')
            }
        })
            .then((res) => {
                alert('Bạn đã xóa thành công lớp học!')
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
                            <input
                                type="text"
                                placeholder="Nhập từ khóa cần tìm..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            {/* <button>Tìm kiếm</button> */}
                        </div>
                        <CapNhatLopItem data={persons} viewPost={viewPost} reviewPost={reviewPost} editPost={editPost}  deletePost={deletePost}/>
                    </div>
                </div>
            </div>
            {modalOpen && (
                <ModalPopper setOpenModal={setModalOpen}>
                    <ModalCapNhatLop setOpenModal={setModalOpen} />
                </ModalPopper>
            )}
            {modalReview && (
                <ModalPopper setOpenModal={setModalReview}>
                    <ReviewCapNhatLop
                        setModalReview={setModalReview}
                        viewPost={viewPost}
                        setModalEdit={setModalEdit}
                    />
                </ModalPopper>
            )}
            {modalEdit && (
                <ModalPopper setOpenModal={setModalEdit}>
                    <EditCapNhatLop setModalEdit={setModalEdit} viewPost={viewPost} />
                </ModalPopper>
            )}
        </>
    );
}

export default CapNhatLop;
