import React, { useEffect, useState } from "react";
import title from '../../commonStyles/title.module.css'
import styles from './Users.module.css'
import { Link } from "react-router-dom";
import { useInfiniteQuery } from "react-query";
import UsersService from "../../API/UsersService";

import Loader from '../Loader/Loader';
import UsersForm from './UsersForm/UsersForm';
import MyButton from "../../UI/MyButton/MyButton";
import SmallLoader from "../SmallLoader/SmallLoader";

const Users = () => {
   const [query, setQuery] = useState('');

   const perPage = 10;

   const {
      data,
      error,
      isLoading,
      isFetchingNextPage,
      fetchNextPage,
      hasNextPage,
   } = useInfiniteQuery(
      ['users', query],
      ({ pageParam = { query: query, page: 1 } }) => UsersService.getUsers(pageParam),
      {
         getNextPageParam: (lastPage, pages) => {
            if (Math.ceil(lastPage.total_count / perPage) > pages.length) {
               return { page: pages.length + 1, query: query };
            }
         }
      }
   )

   const handleScroll = () => {
      if (document.documentElement.clientHeight + document.documentElement.scrollTop === document.documentElement.scrollHeight) {
         fetchNextPage();
      };
   }

   useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   if (isLoading) return <Loader />

   if (error) return <div>Smth went wrong...</div>

   return (
      <div className={styles.users}>
         <div className={title.main_title}>Users</div>
         <UsersForm setQuery={setQuery} />
         <div className={styles.users_column}>
            {
               data.pages.map(({ items }) => (
                  items.map(({ login, avatar_url, id, company }) => (
                     <div className={styles.users_item} key={id}>
                        <div className={styles.item_img}>
                           <img src={avatar_url} alt="ava" />
                        </div>
                        <div className={styles.item_name}>
                           <Link
                              children={login}
                              to={`profile/${login}`}
                           />
                           <div className={styles.item_loc}>
                              {company}
                           </div>
                        </div>
                     </div>
                  )))
               )
            }
            {isFetchingNextPage && <SmallLoader />}
            {!hasNextPage && <div>'No more data'</div>}
         </div>
      </div>
   )
}

export default Users;