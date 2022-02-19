import React from "react";
import base64 from 'base-64'
import styles from './RepoReadme.module.css';
import { useQuery } from "react-query";
import ReposService from "../../../API/ReposService";
import Loader from "../../Loader/Loader";
import MarkdownIt from "markdown-it";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";

const RepoReadme = ({ ownerLogin, repo }) => {

   const { data, isLoading, error } = useQuery(
      ['readme', ownerLogin, repo],
      async () => {
         const res = await ReposService.getRepoReadme(ownerLogin, repo);
         const decoded = base64.decode(res.content);
         const md = new MarkdownIt({ highlight: true });

         const result = md.render(decoded);
         return { __html: result };
      },
      {
         refetchOnWindowFocus: false,
         retry: false,
      }
   )

   if (isLoading) return <Loader />

   if (error) return <ErrorMessage />

   return (
      <div className={styles.readme_cont}>
         <div className={styles.pre} dangerouslySetInnerHTML={data} />
      </div>
   )
}

export default RepoReadme
