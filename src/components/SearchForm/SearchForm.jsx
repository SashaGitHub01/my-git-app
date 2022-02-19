import React from "react";
import { Formik, Form, Field } from 'formik';
import styles from './SearchForm.module.css';

import MyButton from "../../UI/MyButton/MyButton";
import MyInput from "../../UI/MyInput/MyInput";

const SearchForm = ({ onSubmit, initialValues, name }) => {
   return (
      <Formik
         initialValues={initialValues}
         onSubmit={onSubmit}
      >
         <Form className={styles.form}>
            <Field
               name={name}
               type='text'
               component={MyInput}
               placeholder='Search'
               className={styles.form_input}
            />
            <Field
               type="submit"
               component={MyButton}
               children='Search'
            />
         </Form>
      </Formik>
   )
}

export default SearchForm;