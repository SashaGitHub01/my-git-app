import React, { useEffect } from "react";
import styles from './RepoCode.module.css';
import { useQuery } from "react-query";
import ReposService from "../../../API/ReposService";
import {
   BsFillFolderFill as Folder,
   BsFillFileEarmarkCodeFill as File
} from 'react-icons/bs';
import { IoArrowBack as Back } from 'react-icons/io5'
import { AiFillFileZip as Zip } from 'react-icons/ai'
import base64 from 'base-64'
import Loader from '../../Loader/Loader';
import { Link, useLocation, useNavigate } from "react-router-dom";
import prism from 'prismjs';
import "prismjs/themes/prism-coy.css";

const RepoCode = ({ ownerLogin, repo }) => {
   const nav = useNavigate()
   const { pathname } = useLocation();
   const dir = pathname.split('/').slice(5).join('/');

   const { data, isLoading } = useQuery(['code', ownerLogin, repo, dir], async () => {
      const res = await ReposService.getRepoCode(ownerLogin, repo, dir);

      if (res.content) return base64.decode(res.content);

      const dirs = res.filter(({ type }) => type === 'dir');
      const files = res.filter(({ type }) => type === 'file');

      return { dirs, files }
   }, {
      retry: false,
   })

   useEffect(() => {
      prism.highlightAll()
   }, [data])

   const goBack = () => {
      nav(-1)
   }

   if (isLoading) return <Loader />

   return (
      <div className={styles.code_column}>
         <div className={styles.head}>
            <button className={styles.back_btn} onClick={goBack}>
               <Back className={styles.back_icon} />
               <span>Back</span>
            </button>
            <div className={styles.download}>
               <Zip className={styles.zip_icon} />
               <a
                  href={`https://api.github.com/repos/${ownerLogin}/${repo}/zipball/`}
                  className={styles.download_text}>
                  Download repo archive
               </a>
            </div>
         </div>
         <div className={styles.code}>
            {typeof data === 'object' && data.dirs.map(({ download_url, name }) => (
               <div
                  key={download_url + name}
                  className={styles.code_item}
               >
                  <Folder className={`${styles.code_icon} ${styles.icon_fd}`} />
                  <Link
                     className={styles.file_name}
                     to={`${pathname}/${name}`}
                  >
                     {name}
                  </Link>
               </div>
            ))}
            {typeof data === 'object' && data.files.map(({ download_url, name }) => (
               <Link
                  key={download_url + name}
                  to={`${pathname}/${name}`}
                  className={styles.code_item}
               >
                  <File className={`${styles.code_icon} ${styles.icon_fl}`} />
                  <div className={styles.file_name}>
                     {name}
                  </div>
               </Link>
            ))}
            {typeof data === 'string'
               ? <div className={styles.code_content}>
                  <pre className='language-js'>
                     <code className={`${styles.pre} language-js`}>
                        {data}
                     </code>
                  </pre>
               </div>
               : null}
         </div>
      </div>
   )
}

export default RepoCode;
