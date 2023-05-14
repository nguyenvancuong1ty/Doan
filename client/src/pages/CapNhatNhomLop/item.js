import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './CapNhatNhomLop.module.scss';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

export default function Item(props) {
    const { data } = props;
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 20;

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(data.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, data]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
    };

    return (
        <>
            <table className={cx('table')}>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã nhóm</th>
                        <th>Tên nhóm</th>
                        <th>Xem chi tiết</th>
                        <th>Sửa</th>
                        <th>Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((value) => (
                        <tr key={value.id}>
                            <td>{value.id}</td>
                            <td>{value.title}</td>
                            <td>{value.body}</td>
                            <td>
                                <button className={cx('table-icon')} onClick={() => props.reviewPost(value.id)}>
                                    <FontAwesomeIcon icon={faEye}/>
                                </button>
                            </td>
                            <td>
                                <button className={cx('table-icon')} onClick={() => props.editPost(value.id)}>
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </button>
                            </td>
                            <td>
                                <button className={cx('table-icon')}>
                                    <FontAwesomeIcon icon={faXmark} onClick={() => props.deletePost(value.id)}/>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ReactPaginate
                breakLabel="..."
                nextLabel="Sau >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel="< Trước"
                renderOnZeroPageCount={null}
                containerClassName={cx('pagination')}
                pageLinkClassName={cx('page-num')}
                previousLinkClassName={cx('page-num')}
                nextLinkClassName={cx('page-num')}
                activeLinkClassName={cx('active')}
            />
        </>
    );
}
