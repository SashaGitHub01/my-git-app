import React, { useContext, useState } from "react";
import styles from './UserCurrentPage.module.css';
import {  useParams } from "react-router";
import { useQuery } from "react-query";
import UsersService from '../../API/UsersService'
import { useAuth } from '../../hooks/useAuth'

import Loader from '../Loader/Loader';
import UserAbout from "./UserAbout/UserAbout";
import UserRepos from "./UserRepos/UserRepos";
import { useEffect } from "react";
import { useMatch } from 'react-router-dom'

const UserCurrentPage = () => {
   const match = useMatch('/profile/:userLogin')
   console.log(match);
   const [isOwner, setIsOwner] = useState(false)
   const { userLogin } = useParams();
   const { user: me } = useAuth();

   const { data: user, status: userStatus } = useQuery(
      ['user', userLogin],
      async () => {
         return await UsersService.getCurrentUser(userLogin)
      }
   )

   const { data: repos, status: reposStatus } = useQuery(
      ['userRepos', userLogin],
      () => UsersService.getUserRepos(userLogin)
   )

   useEffect(() => {
      if (me?.login === user?.login) setIsOwner(true);
   }, [user, me])

   if (userStatus === 'loading' || reposStatus === 'loading') return <Loader />

   return (
      <div className={styles.user}>
         <div className={styles.user_column}>
            {user
               && <UserAbout user={user} isOwner={isOwner} me={me} />}
            <UserRepos repos={repos} login={userLogin} isOwner={isOwner} />
         </div>
      </div>
   )
}

export default UserCurrentPage;