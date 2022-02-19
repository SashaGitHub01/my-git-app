import React, { useState } from "react";
import { useQuery } from "react-query";
import ReposService from "../../API/ReposService";
import { Routes, Route, useParams, useNavigate, useMatch } from "react-router-dom";
import styles from './RepoCurrentPage.module.css';

import Loader from '../../components/Loader/Loader';
import RepoLangsInfo from "./RepoLangsInfo/RepoLangsInfo";
import RepoActivity from "./RepoActivity/RepoActivity";
import RepoContrs from "./RepoContrs/RepoContrs";
import RepoAbout from "./RepoAbout/RepoAbout";
import RepoDescription from "./RepoDescription/RepoDescription";
import RepoNav from "./RepoNav/RepoNav";
import RepoTitle from "./RepoTitle/RepoTitle";
import RepoReadme from "./RepoReadme/RepoReadme";
import RepoCode from "./RepoCode/RepoCode";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";

const ReposCurrentPage = () => {
   const nav = useNavigate()
   const [isOwner, setIsOwner] = useState(false)
   const [descr, setDescr] = useState('');
   const [repoName, setRepoName] = useState('');

   const { user: me } = useAuth()
   const { ownerLogin, repo } = useParams();
   const match = useMatch('/:ownerLogin/:repo/*')

   useEffect(() => {
      if (match.params['*'] === '') nav(`tab/code`)
   }, [match.params])

   const {
      data,
   } = useQuery(
      ['repo', ownerLogin, repo],
      async () => {
         const res = await ReposService.getCurrentRepo(ownerLogin, repo);

         setDescr(res.description);
         setRepoName(res.name);

         return res;
      },

      { refetchOnWindowFocus: false }
   )

   useEffect(() => {
      if (me?.login === ownerLogin) setIsOwner(true);
   }, [me, ownerLogin])

   if (!data) return <Loader />

   return (
      <div className={styles.repo_page}>
         <div className={styles.repo_content}>
            <RepoTitle
               isOwner={isOwner}
               repoName={repoName}
               updateName={setRepoName}
            />
            <RepoAbout
               name={repoName}
               owner={data.owner}
               language={data.language}
               visibility={data.visibility}
               watchers={data.watchers}
               topics={data.topics}
               isOwner={isOwner}
            />
         </div>
         <RepoNav
            ownerLogin={ownerLogin}
            repo={repo}
         />
         <div className={styles.repo_tab_content}>
            <Routes>
               <Route path={`tab/description`} element={(
                  <RepoDescription
                     description={descr}
                     isOwner={isOwner}
                     updateDescription={setDescr}
                  />
               )} />
               <Route path={`tab/languages`} element={(
                  <RepoLangsInfo
                     ownerLogin={ownerLogin}
                     repo={repo}
                  />
               )} />
               <Route path={`tab/contributors`} element={(
                  <RepoContrs
                     ownerLogin={ownerLogin}
                     repo={repo}
                  />
               )} />
               <Route path={`tab/activity`} element={
                  <RepoActivity
                     ownerLogin={ownerLogin}
                     repo={repo}
                  />
               } />
               <Route path={`tab/readme`} element={
                  <RepoReadme
                     ownerLogin={ownerLogin}
                     repo={repo}
                  />
               } />
               <Route path={`tab/code/*`} element={
                  <RepoCode
                     ownerLogin={ownerLogin}
                     repo={repo}
                  />
               } />
            </Routes>
         </div>
      </div>
   )
}

export default ReposCurrentPage;