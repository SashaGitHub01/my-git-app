import React from "react";
import styles from './Loader.module.css';

const Loader = ({ style }) => {
   return (
      <div className={styles.lds_container} style={style}>
         <div className={styles["lds-spinner"]}>
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
         </div>
      </div>
   )
}

export default Loader;