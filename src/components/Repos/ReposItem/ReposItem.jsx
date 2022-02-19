import React from "react";
import styles from './ReposItem.module.css'
import { Link } from "react-router-dom";
import { AiOutlineStar } from "react-icons/ai";

const ReposItem = ({ item, setQuery }) => {
   const { name, owner, language, topics, description, watchers_count } = item;

   return (
      <div className={styles['repos_item']}>
         <div className={styles["repos_content"]}>
            <div className={styles["repos_title"]}>
               <Link
                  children={name}
                  to={`/${owner.login}/${name}`}
                  className={styles.repos_title_t}
               />
               <div className={styles.repos_stars}>
                  <AiOutlineStar
                     className={styles.repos_star_icon}
                     viewBox='0 0 1000 1000'
                  />
                  <div className={styles.watchers_count}>
                     {watchers_count}
                  </div>
               </div>
            </div>
            <div className={styles.repos_body}>
               {description}
            </div>
            <div className={styles.repos_info}>
               <div className={styles.repos_lang}>
                  {language ? language : 'Other'}
               </div>
               {
                  topics && topics.slice(0, 3).map((topic) => (
                     <div
                        className={styles.repos_tag}
                        key={name + topic}
                        onClick={() => setQuery(topic)}
                     >
                        #{topic}
                     </div>)
                  )
               }
            </div>
         </div>
         <div className={styles.repos_owner}>
            Author: {owner.login}
         </div>
      </div>
   )
}

export default ReposItem;