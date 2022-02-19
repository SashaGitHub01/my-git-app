import React, { useState } from "react";
import styles from './RepoDescription.module.css'
import title from '../../../commonStyles/title.module.css'
import { GoPencil } from "react-icons/go";

import RepoDescriptionForm from "./RepoDescriptionForm/RepoDescriptionForm";

const RepoDescription = ({ description, isOwner, updateDescription }) => {
   const [editMode, setEditMode] = useState(false);

   return (
      <>
         {description
            ? <div className={styles.repo_description}>
               <div className={title.title_repo}>
                  Description
               </div>
               <div className={styles.repo_description_body}>
                  <div className={styles.repo_description_text}>
                     {description}
                  </div>
                  {isOwner
                     && <GoPencil
                        className={styles.edit_icon}
                        onClick={() => setEditMode(true)}
                     />}
               </div>
            </div>
            : <div className={styles.empty}>
               <div className={styles.empty_text}>No description</div>
               {isOwner
                  && <GoPencil
                     className={styles.edit_icon}
                     onClick={() => setEditMode(true)}
                  />}
            </div>}
         <RepoDescriptionForm
            description={description}
            editMode={editMode}
            setEditMode={setEditMode}
            updateDescription={updateDescription}
         />
      </>
   )
}

export default RepoDescription;