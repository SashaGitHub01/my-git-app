import React, { useEffect, useState } from "react";
import styles from './Repos.module.css'
import title from '../../commonStyles/title.module.css'
import { useInfiniteQuery } from "react-query";
import ReposService from "../../API/ReposService";

import ReposItem from "./ReposItem/ReposItem";
import Loader from "../Loader/Loader";
import SmallLoader from "../SmallLoader/SmallLoader";
import ReposForm from "./ReposForm/ReposForm";

const Repos = () => {
   const [query, setQuery] = useState('');
   const perPage = 10;

   const handleScroll = () => {
      if (document.documentElement.clientHeight + document.documentElement.scrollTop === document.documentElement.scrollHeight) {
         fetchNextPage();
      }
   }

   const {
      data,
      error,
      isLoading,
      isFetchingNextPage,
      fetchNextPage,
   } = useInfiniteQuery(['repos', query],
      ({ pageParam = { query: query, page: 1 } }) => {
         return ReposService.getRepos(pageParam)
      },
      {
         getNextPageParam: (lastPage, pages) => {
            if (Math.ceil(lastPage.total_count / perPage) > pages.length) {
               return { page: pages.length + 1, query: query };
            }
         }
      }
   )

   useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, [])

   if (isLoading) return <Loader />

   if (error) return <div>Smth went wrong...</div>

   return (
      <div className={styles.repos}>
         <h2 className={title.main_title}>
            Repositories
         </h2>
         <ReposForm
            query={query}
            setQuery={setQuery}
         />
         <div className={styles['repos-column']}>
            {
               data.pages.map(({ items }) => (
                  items.map((item) => <ReposItem item={item} key={item.id} setQuery={setQuery} />)
               ))
            }
            {isFetchingNextPage
               && <SmallLoader />}
         </div>
      </div>
   )
}

export default Repos;