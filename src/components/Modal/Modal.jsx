import React from "react"
import styles from './Modal.module.css';
import MyButton from '../../UI/MyButton/MyButton';
import { Formik, Form, Field } from "formik";

const Modal = ({ children, title, onSubmit, onCancel, isActive, initialValues }) => {

   const handleSubmit = (values) => {
      onSubmit(values);
      onCancel();
   }

   return (
      isActive
         ? <div className={styles.overlay} onClick={onCancel}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
               <Formik
                  onSubmit={handleSubmit}
                  initialValues={initialValues}
               >
                  <Form className={styles.modal_column} >
                     <div className={styles.modal_header}>
                        {title}
                     </div>
                     <div className={styles.modal_body}>
                        {children}
                     </div>
                     <div className={styles.modal_footer}>
                        <div className={styles.modal_btns}>
                           <div className={styles.modal_btn}>
                              <Field
                                 children='Submit'
                                 component={MyButton}
                              />
                           </div>
                           <div className={styles.modal_btn}>
                              <MyButton
                                 type='submit'
                                 onClick={onCancel}
                                 invert
                                 children='Cancel'
                              />
                           </div>
                        </div>
                     </div>
                  </Form>
               </Formik>
            </div>
         </div>
         : null
   )
}

export default Modal