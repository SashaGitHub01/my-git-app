import React, { useState } from "react";
import styles from './UserAbout.module.css';
import FollowService from "../../../API/FollowService";

import { GoLocation, GoBriefcase } from "react-icons/go";
import { AiOutlineMail } from "react-icons/ai";
import { useMutation, useQuery } from "react-query";
import numFormatter from "../../../utils/numFormatter";
import MyButton from '../../../UI/MyButton/MyButton';
import Loader from "../../Loader/Loader";

const UserAbout = ({ user, isOwner, me }) => {
   const [isFollowing, setIsFollowing] = useState(false);

   const { isLoading } = useQuery((['isFollowing', user?.login, me?.login]), () => {
      if (!me?.login || !user?.login) {
         return;
      }
      FollowService.isFollowing(me.login, user.login)
         .then(res => setIsFollowing(true))
         .catch(err => setIsFollowing(false))
   }, {
      retry: false,
      refetchOnWindowFocus: false,
   })

   const follow = useMutation((username) => {
      return FollowService.follow(username)
   }, {
      retry: false,
   })

   const unfollow = useMutation((username) => {
      return FollowService.unfollow(username)
   }, {
      retry: false,
   })

   const handleFollow = () => {
      follow.mutate(login);

      setIsFollowing(true);
   }

   const handleUnfollow = () => {
      unfollow.mutate(login);

      setIsFollowing(false);
   }

   const { login, avatar_url, location, name, email, company, blog, followers, created_at } = user;

   if (isLoading) return <Loader />

   return (
      <div className={styles.user_about}>
         <div className={styles.about_left}>
            <div className={styles.about_image}>
               <img src={avatar_url} alt="avatar" />
            </div>
            <div className={styles.about_left_body}>
               <div className={styles.followers}>
                  {numFormatter(followers)}
                  <span>followers</span>
               </div>
               {!isOwner
                  ? <div className={styles.follow}>
                     <MyButton
                        className={styles.follow_btn}
                        invert={isFollowing}
                        onClick={isFollowing
                           ? handleUnfollow
                           : handleFollow}
                     >
                        {isFollowing
                           ? 'Unfollow'
                           : 'Follow'}
                     </MyButton>
                  </div>
                  : null}
            </div>
         </div>
         <div className={styles.about_main}>
            <div className={styles.login}>
               {login}
            </div>
            {name &&
               <div className={styles.name}>
                  {name}
               </div>}
            {location &&
               <div className={`${styles.location} ${styles.about_item}`}>
                  <GoLocation className={styles.icon} />
                  {location}
               </div>}
            {company &&
               <div className={`${styles.company} ${styles.about_item}`}>
                  <GoBriefcase className={styles.icon} />
                  {company}
               </div>}
            {email &&
               <div className={`${styles.about_item}`}>
                  <AiOutlineMail className={styles.icon} />
                  <a className={styles.email} href={email}>
                     {email}
                  </a>
               </div>}
            {blog &&
               <a className={styles.blog} href={blog}>
                  {blog}
               </a>}
         </div>
         <div className={styles.about_right}>
            <div className={styles.about_ago}>
               Joined {new Date(created_at).getFullYear()}
            </div>
         </div>
      </div>
   )
}

export default UserAbout;