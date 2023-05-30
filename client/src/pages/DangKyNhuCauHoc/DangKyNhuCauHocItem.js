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
                        <th>STT</th>
                        <th>Ngày đăng ký</th>
                        <th>Họ và tên</th>
                        <th>Tài khoản học viên</th>
                        <th>Họ tên</th>
                        <th>Tên nhu cầu</th>
                        <th>Xem chi tiết</th>
                        <th>Sửa</th>
                        <th>Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(currentItems) &&
                        currentItems.map((value, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{value.username}</td>
                                <td>{value.name}</td>
                                <td>{value.username}</td>
                                <td>{value.name}</td>
                                <td>{value.address.street}</td>
                                <td>
                                    <button className={cx('table-icon')}>
                                        <FontAwesomeIcon icon={faEye} />
                                    </button>
                                </td>
                                <td>
                                    <button className={cx('table-icon')}>
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </button>
                                </td>
                                <td>
                                    <button className={cx('table-icon')}>
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