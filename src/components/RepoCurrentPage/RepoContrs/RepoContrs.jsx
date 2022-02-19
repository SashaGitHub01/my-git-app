import React from "react";
import styles from './RepoContrs.module.css';
import title from '../../../commonStyles/title.module.css'
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import ReposService from "../../../API/ReposService";
import Loader from "../../Loader/Loader";

const RepoContrs = ({ ownerLogin, repo }) => {
   const { data, isLoading } = useQuery(
      ['contrs', ownerLogin, repo],
      () => ReposService.getRepoContributors(ownerLogin, repo)
   )

   if (isLoading) return <Loader />

   return (
      data &&
      <div className={styles.repo_contrs}>
         <div className={title.title_repo}>
            Top 10 contributors
         </div>
         <ul className={styles.contrs_list}>
            {data.slice(0, 10).map(({ login, avatar_url, id }) => (
               <li key={id} className={styles.contr_item}>
                  <div className={styles.contr_body}>
                     <div className={styles.contr_avatar}>
                        <img src={avatar_url} alt="avatar" />
                     </div>
                     <Link className={styles.contr_login} to={`/profile/${login}`}>
                        {login}
                     </Link>
                  </div>
               </li>
            ))}
         </ul>
      </div>
   )
}

export default RepoContrs;