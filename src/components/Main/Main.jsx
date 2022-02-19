import React from 'react';
import styles from './Main.module.css';

import AppRoute from '../AppRoute/AppRoute';

const Main = () => {
   return (
      <main className={styles.main}>
         <div className={styles.content}>
            <AppRoute />
         </div>
      </main>
   )
}

export default Main;