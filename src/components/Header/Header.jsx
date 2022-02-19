import React from "react";
import logo from '../../assets/logo.png';
import { Link, Redirect, useHistory } from "react-router-dom";
import styles from './Header.module.css';
import { useAuth } from "../../hooks/useAuth";

const Header = () => {
   const { user } = useAuth()
   const history = useHistory();
   const client_id = '9160c88ebb87dee9f012';

   return (
      <header className={styles.header}>
         <div className={styles.header_row}>
            <div className={styles.header_logo}>
               <img
                  src={logo}
                  alt="logo"
                  onClick={() => history.push('/repositories')}
               />
            </div>
            <nav className={styles.header_nav}>
               <ul className={styles.nav_list}>
                  <li className={styles.nav_link}>
                     {user
                        ? <Link children='Profile' to={`/profile/${user.login}`} />
                        : <Redirect to='/users' />}
                  </li>
                  <li className={styles.nav_link}>
                     <Link children='Repositories' to='/repositories' />
                  </li>
                  <li className={styles.nav_link}>
                     <Link children='Users' to='/users' />
                  </li>
               </ul>
               {user
                  ? <div className={styles.user_info}>
                     <div className={styles.user_avatar}>
                        <img src={user.avatar_url} alt="avatar" />
                     </div>
                     <Link className={styles.user_login} to={`/profile/${user.login}`} >
                        {user.login}
                     </Link>
                  </div>
                  : <div className={styles.signup}>
                     <a
                        className={styles.signup_link}
                        href={`https://github.com/login/oauth/authorize?client_id=${client_id}`}
                     >
                        Sign Up
                     </a>
                  </div>}
            </nav>
         </div>
      </header>
   )
}

export default Header;