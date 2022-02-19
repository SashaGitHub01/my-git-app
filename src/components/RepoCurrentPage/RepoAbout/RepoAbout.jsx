import React, { useState } from "react";
import styles from './RepoAbout.module.css'
import { AiOutlineStar } from "react-icons/ai";
import { GoRepo } from "react-icons/go";
import numFormatter from "../../../utils/numFormatter";
import Modal from "../../Modal/Modal";
import { useMutation } from "react-query";
import RepoService from '../../../API/RepoService'

const RepoAbout = ({ name, owner, watchers, topics, language, visibility, isOwner }) => {
   const [modal, setModal] = useState(false);

   const mutation = useMutation(({ login, repoName }) => {
      return RepoService.deleteRepo(login, repoName)
   });

   const handleClick = () => {
      setModal(true);
   }

   return (
      <div className={styles.repo_owner_about}>
         <div className={styles.repo_owner_img}>
            <img src={owner.avatar_url} alt="" />
         </div>
         <div className={styles.repo_about}>
            <div className={styles.repo_about_item}>
               <span>Owner: </span>{owner.login}
            </div>
            <div className={styles.repo_about_item}>
               <span>Language: </span>
               <span className={styles.repo_about_lang}>{language}</span>
            </div>
            <div className={styles.repo_about_item}>
               <span>Visibility: </span>{visibility}
            </div>
            <div className={`${styles.repo_about_item} ${styles.repo_topics}`}>
               {topics && topics.map((topic) => (
                  <span key={topic} className={styles.repo_topic}>
                     #{topic}
                  </span>
               ))}
            </div>
            {isOwner &&
               <div className={styles.repo_about_item}>
                  <button className={styles.repo_delete_btn} onClick={handleClick}>
                     Delete this repo
                  </button>
               </div>
            }
         </div>
         <div className={styles.repo_stars}>
            <div className={styles.stars_count}>
               <AiOutlineStar className={styles.star_icon} />
               <span>{numFormatter(watchers)}</span>
            </div>
         </div>
         <Modal
            isActive={modal}
            title={`Are you sure you want to delete next repo?`}
            onSubmit={() => mutation.mutate({ login: owner.login, repoName: name })}
            onCancel={() => setModal(false)}
         >
            <div className={styles.repo_del}>
               <GoRepo className={styles.repo_del_icon} />
               <div className={styles.repo_del_name}>{name}</div>
            </div>
         </Modal>
      </div>

   )
}

export default RepoAbout;