import React from "react";
import title from '../../../commonStyles/title.module.css';
import styles from './UserRepos.module.css'
import getLangBgc from '../../../utils/getLangBgc'

import { Link } from "react-router-dom";

const UserRepos = ({ repos, login }) => {
   return (
      <div className={styles.repos}>
         <div className={title.title_repo}>User repositories</div>
         <div className={styles.repos_row}>
            {repos.length &&
               repos.map(({ name, description, visibility, language }) => (
                  <div className={styles.repo_item} key={name}>
                     <div className={styles.repo_content}>
                        <div className={styles.repo_body}>
                           <Link
                              className={styles.repo_name}
                              children={name}
                              to={`/${login}/${name}`}
                           />
                           {description &&
                              <div className={styles.repo_descr}>
                                 {description}
                              </div>}
                           {language &&
                              <div
                                 className={styles.repo_lang}
                                 style={{ color: getLangBgc(language) }}
                              >
                                 {language}
                              </div>}
                        </div>
                        <div className={styles.repo_visible}>
                           <div className={styles.isVisible}>
                              {visibility}
                           </div>
                        </div>
                     </div>
                  </div>
               ))}
         </div>
      </div>
   )
}

export default UserRepos;