import React from "react";
import styles from './MyButton.module.css';

const MyButton = ({ className = '', invert, children, field, form, ...other }) => {
   return (
      <button
         {...other}
         className={invert
            ? `${styles.my_button} ${styles.my_button_invert} ${className}`
            : `${styles.my_button} ${className}`}
      >
         {children}
      </button>
   )
}

export default MyButton;