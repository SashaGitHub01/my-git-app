import React from "react";
import styles from './SmallLoader.module.css'

const SmallLoader = () => {
   return (
      <div className={styles.cont}>
         <div className={styles['lds-spinner']}>
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
         </div>
      </div>
   )
}

export default SmallLoader
