import React, { useState } from "react";
import styles from './RepoTitle.module.css';
import title from '../../../commonStyles/title.module.css';
import { GoPencil } from "react-icons/go";
import RepoTitleForm from "./RepoTitleForm/RepoTitleForm";

const RepoTitle = ({ repoName, isOwner, updateName }) => {
   const [editMode, setEditMode] = useState(false);

   return (
      <div className={`${title.title_repo} ${styles.title}`}>
         <div className={styles.title_text}>
            {repoName}
         </div>
         {isOwner &&
            <GoPencil
               className={styles.edit_icon}
               onClick={() => setEditMode(true)} />}
         {editMode &&
            <RepoTitleForm
               updateName={updateName}
               onCancel={() => setEditMode(false)}
               editMode={editMode}
               repoName={repoName}
            />}
      </div>
   )
}

export default RepoTitle
