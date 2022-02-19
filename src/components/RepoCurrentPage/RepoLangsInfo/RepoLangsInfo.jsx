import React from "react";
import styles from './RepoLangsInfo.module.css'
import title from '../../../commonStyles/title.module.css'
import { useQuery } from "react-query";
import ReposService from "../../../API/ReposService";

import getLangBgc from "../../../utils/getLangBgc";
import getLangsInfo from '../../../utils/getLangsInfo';
import Loader from "../../Loader/Loader";

const RepoLangsInfo = ({ ownerLogin, repo }) => {

   const { data, isLoading } = useQuery(
      ['langs', ownerLogin, repo],
      () => ReposService.getRepoLanguages(ownerLogin, repo)
   )

   const langInfo = getLangsInfo(data);

   if (isLoading) return <Loader />

   return (
      data &&
      <div className={styles.repo_langs}>
         <div className={`${title.title_repo}`}>
            Languages
         </div>
         <div className={styles.langs_info}>
            <div className={styles.lang_diagram}>
               {langInfo.counts.map((val, i) => (
                  <div
                     key={val + i}
                     className={styles.diagram_item}
                     style={{ width: `${val}%`, backgroundColor: getLangBgc(langInfo.names[i]) }}>
                  </div>
               ))}
            </div>
            <div className={styles.langs_body}>
               <div className={styles.langs_names}>
                  {langInfo.names.map((name) => (
                     <div key={name} className={styles.lang_name}>
                        <div
                           className={styles.lang_color}
                           style={{ backgroundColor: getLangBgc(name) }}
                        >
                        </div>
                        {name}:
                     </div>
                  ))}
               </div>
               <div className="r">
                  <div className={styles.langs_counts}>
                     {langInfo.counts.map((val, index) => (
                        <div key={index} className={styles.lang_count}>
                           {val}%
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default RepoLangsInfo;