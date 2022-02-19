import React from "react";
import { AiFillWarning } from 'react-icons/ai'
import styles from './ErrorMessage.module.css';

const ErrorMessage = () => {
   return (
      <div className={styles.error}>
         <AiFillWarning className={styles.error_icon} />
         <div className={styles.error_message}>
            Sorry, something went wrong...
         </div>
      </div>
   )
}

export default ErrorMessage
