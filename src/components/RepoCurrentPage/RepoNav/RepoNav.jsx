import React from "react"
import { Link } from "react-router-dom";
import styles from './RepoNav.module.css';
import useCurrentPath from '../../../hooks/useCurrentPath';

const items = [
   { title: 'Code', name: 'code' },
   { title: 'Description', name: 'description' },
   { title: 'Languages', name: 'languages' },
   { title: 'Activity', name: 'activity' },
   { title: 'Contributors', name: 'contributors' },
   { title: 'Readme', name: 'readme' },
]

const RepoNav = () => {
   const location = useCurrentPath('code');

   return (
      <div className={styles.nav}>
         <div className={styles.nav_list}>
            {items.map(({ title, name }) => (
               <Link
                  to={`tab/${name}`}
                  data-name={name}
                  className={location === name
                     ? `${styles.nav_item} ${styles.active}`
                     : styles.nav_item}
                  key={title}
               >
                  {title}
               </Link>
            ))}
         </div>
      </div>
   )
}

export default RepoNav
