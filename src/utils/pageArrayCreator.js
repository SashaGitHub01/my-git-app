
const getPaginationArray = (currentPage, totalCount, limit) => {
   let pagesArray = [];

   let pagesCount = Math.ceil(totalCount / limit);

   if (currentPage === 1) {
      pagesArray = [];
      pagesArray = [currentPage, +currentPage + 1, +currentPage + 2, +currentPage + 3, +currentPage + 4, '...', +pagesCount];
   }

   if (currentPage === 2) {
      pagesArray = [];
      pagesArray = [currentPage - 1, currentPage, +currentPage + 1, +currentPage + 2, +currentPage + 3, '...', +pagesCount];
   }

   if (currentPage > 2) {
      pagesArray = [];
      pagesArray = [1, '...', currentPage - 1, currentPage, +currentPage + 1, +currentPage + 2, +currentPage + 3, '...', +pagesCount]
   }

   if (currentPage > pagesCount - 5) {
      pagesArray = [];
      pagesArray = [1, '...', currentPage - 1, currentPage, +currentPage + 1, +currentPage + 2, +currentPage + 3, +pagesCount]
   }

   if (currentPage > pagesCount - 4) {
      pagesArray = [];
      pagesArray = [1, '...', pagesCount - 4, pagesCount - 3, pagesCount - 2, pagesCount - 1, pagesCount]
   }

   return pagesArray;
}

export default getPaginationArray;