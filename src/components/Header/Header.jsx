import React from "react";
import logo from '../../assets/logo.png';
import { Link, useNavigate } from "react-router-dom";
import styles from './Header.module.css';
import { useAuth } from "../../hooks/useAuth";

const Header = () => {
   const { user } = useAuth()
   const nav = useNavigate();

   return (
      <header className={styles.header}>
         <div className={styles.header_row}>
            <div className={styles.header_logo}>
               <img
                  src={logo}
                  alt="logo"
                  onClick={() => nav('/repositories')}
               />
            </div>
            <nav className={styles.header_nav}>
               <ul className={styles.nav_list}>
                  <li className={styles.nav_link}>
                     {user
                        ? <Link to={`/profile/${user.login}`}>
                           Profile
                        </Link>
                        : null}
                  </li>
                  <li className={styles.nav_link}>
                     <Link to='/repositories'>
                        Repositories
                     </Link>
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
                        href={`${process.env.REACT_APP_SERVER}/auth`}
                        className={styles.signup_link}
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