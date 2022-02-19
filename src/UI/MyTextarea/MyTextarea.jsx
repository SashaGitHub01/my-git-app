import React from "react";
import styles from './MyTextarea.module.css';

const MyTextarea = ({ className, field, form, ...other }) => {
   return (
      <textarea
         className={className
            ? `${className} ${styles.my_textarea}`
            : styles.my_textarea}
         rows='2'
         {...other}
         {...field}
      />
   )
}

export default MyTextarea;