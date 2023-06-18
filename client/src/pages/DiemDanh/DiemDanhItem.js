import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './DiemDanh.module.scss';
import ReactPaginate from 'react-paginate';
const cx = classNames.bind(styles);
function DiemDanhItem (props){
    const { data } = props;
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 8;

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
                        <th>Mã học viên</th>
                        <th>Tên học viên</th>
                        <th>Điểm danh</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(currentItems) &&
                        currentItems.map((value, index) => (
                            <tr key={index}>
                                <td>{value.masv}</td>
                                <td>{value.fullname}</td>
                                <td>
                                    <input type='checkbox' className={cx('checkboxdd')}></input>
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
export default DiemDanhItem;