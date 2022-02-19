import React from "react";
import styles from './RepoActivity.module.css'
import { useQuery } from "react-query";
import ReposService from "../../../API/ReposService";

import title from '../../../commonStyles/title.module.css'
import getDayActivity from '../../../utils/getDayActivity';
import Loader from "../../Loader/Loader";

const RepoActivity = ({ ownerLogin, repo }) => {
   const { data, isLoading } = useQuery(
      ['commitActivity', ownerLogin, repo],
      async () => {
         const res = await ReposService.getRepoCommitActivity(ownerLogin, repo);

         return (res.slice(-4, res.length));
      }
   )

   const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', "Thursday", 'Friday', 'Saturday'];

   if (isLoading) return <Loader />

   return (
      data
         ? <div className={styles.repo_activity}>
            <div className={title.title_repo}>
               Last month activity
            </div>
            <div className={styles.activity_cont}>
               <div className={styles.activity}>
                  <div className={styles.activity_days}>
                     {days.map((day) => (
                        <div className={styles.day} key={day}>
                           {day}
                        </div>
                     ))}
                  </div>
                  {data.map(({ days, total }, i) => (
                     <div className={styles.activity_column} key={i + '' + total}>
                        {days.map((day, i) => (
                           <div
                              key={i}
                              className={styles.activity_item}
                              style={{ backgroundColor: getDayActivity(day) }}>
                           </div>
                        ))}
                     </div>
                  ))}
               </div>
            </div>
         </div>
         : null
   )
}

export default RepoActivity;