import React from "react";
import { Field } from "formik";
import { useParams } from "react-router";
import { useMutation } from "react-query";
import styles from './RepoTitleForm.module.css';

import Modal from "../../../Modal/Modal";
import MyInput from '../../../../UI/MyInput/MyInput';
import RepoService from "../../../../API/RepoService";

const RepoTitleForm = ({ updateName, onCancel, editMode, repoName }) => {
   const { ownerLogin, repo } = useParams();

   const mutation = useMutation(({ owner, repo, body }) => {
      return RepoService.updateRepo(owner, repo, body)
   }, {
      onSuccess: (data) => {
         updateName(data.name)
      },
   })

   const initialValues = {
      name: repoName,
   }

   const onSubmit = (values) => {
      mutation.mutate({ owner: ownerLogin, repo, body: values });
   }

   return (
      <Modal
         title='Rename current repository'
         isActive={editMode}
         onCancel={onCancel}
         onSubmit={onSubmit}
         initialValues={initialValues}
      >
         <div className={styles.field_cont}>
            <div className={styles.field_title}>
               Name
            </div>
            <Field
               className={styles.field}
               name='name'
               component={MyInput}
            />
         </div>
      </Modal>
   )
}

export default RepoTitleForm
