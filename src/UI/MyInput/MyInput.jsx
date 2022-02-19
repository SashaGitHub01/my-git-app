import React from "react";
import styles from './MyInput.module.css';

const MyInput = ({ className, field, form, ...other }) => {
   return (
      <input
         className={className
            ? `${className} ${styles.my_input}`
            : styles.my_input}
         {...other}
         {...field}
      />
   )
}

export default MyInput;