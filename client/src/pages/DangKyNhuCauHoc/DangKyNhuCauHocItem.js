import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './DangKyNhuCauHoc.module.scss'
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function DangKyNhuCauHocItem (props){
    const { data } = props;
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 10;

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        Array.isArray(data) && setCurrentItems(data.slice(itemOffset, endOffset));
        Array.isArray(data) &&  setPageCount(Math.ceil(data.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, data]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
    };
    return(
        <>
         <table className={cx('table')}>
                <thead>
                    <tr>
                        <th>Mã đăng ký</th>
                        <th>Tài khoản đăng ký</th>
                        <th>Mã nhu cầu</th>
                        <th>Xem chi tiết</th>
                        <th>Sửa</th>
                        <th>Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(currentItems) &&
                        currentItems.map((value, index) => (
                            <tr key={index}>
                                <td>{value.madangky}</td>
                                <td>{value.username}</td>
                                <td>{value.tennhucau}</td>
                                <td>
                                    <button className={cx('table-icon')} onClick={() => props.reviewPost(value.madangky)}>
                                        <FontAwesomeIcon icon={faEye} />
                                    </button>
                                </td>
                                <td>
                                    <button className={cx('table-icon')} onClick={() => props.editPost(value.madangky)}>
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </button>
                                </td>
                                <td>
                                    <button className={cx('table-icon')} onClick={() => props.deletePost(value.madangky)}>
                                        <FontAwesomeIcon icon={faXmark} />
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
    )
}
export default DangKyNhuCauHocItem;