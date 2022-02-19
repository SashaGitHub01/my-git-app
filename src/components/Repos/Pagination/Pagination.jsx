import React from "react";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import styles from './Pagination.module.css';

const Pagination = ({ setCurrentPage, currentPage, pagesCount }) => {
   const dispatch = useDispatch();

   const handleClick = (data) => {
      dispatch(setCurrentPage(+data.selected + 1));
   }

   return (
      <ReactPaginate
         initialPage={currentPage - 1}
         previousLabel='<<'
         nextLabel='>>'
         pageCount={pagesCount}
         pageRangeDisplayed={4}
         marginPagesDisplayed={2}
         onPageChange={handleClick}
         pageLinkClassName={styles.page}
         activeLinkClassName={styles.page_active}
         previousLinkClassName={styles.page}
         nextLinkClassName={styles.page}
         containerClassName={styles.pages}
         breakLinkClassName={styles.page}
      />

   )
}

export default Pagination;