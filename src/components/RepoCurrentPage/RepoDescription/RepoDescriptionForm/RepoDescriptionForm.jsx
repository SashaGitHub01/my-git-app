import React from "react"
import styles from './RepoDescriptionForm.module.css'
import { useMutation } from "react-query";
import { Field } from "formik";
import Modal from "../../../Modal/Modal";
import RepoService from "../../../../API/RepoService";
import { useParams } from "react-router";

import MyTextarea from '../../../../UI/MyTextarea/MyTextarea';

const RepoDescriptionForm = ({ editMode, setEditMode, description, updateDescription }) => {
   const { ownerLogin, repo } = useParams();

   const mutation = useMutation(({ login, repoName, body }) => {
      return RepoService.updateRepo(login, repoName, body)
   }, {
      onSuccess: async (data) => {
         updateDescription(data.description);
      }
   });

   const initialValues = {
      description: description || '',
   }

   const onSubmit = (value) => {
      mutation.mutate({ login: ownerLogin, repoName: repo, body: value });
   }


   return (
      <Modal
         isActive={editMode}
         onSubmit={onSubmit}
         onCancel={() => setEditMode(false)}
         title='Change description'
         initialValues={initialValues}
      >
         <div className={styles.input_cont}>
            <div className={styles.input_title}>
               Description
            </div>
            <Field
               className={styles.input}
               name='description'
               component={MyTextarea}
               type='textarea'
               autoFocus={true}
            />
         </div>
      </Modal>
   )
}

export default RepoDescriptionForm;
