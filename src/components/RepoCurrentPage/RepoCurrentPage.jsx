import React, { useState } from "react";
import { Redirect, useParams, useRouteMatch } from "react-router";
import { useQuery } from "react-query";
import ReposService from "../../API/ReposService";
import { Switch, Route } from "react-router";

import styles from './RepoCurrentPage.module.css';
import title from '../../commonStyles/title.module.css'

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
   const [isOwner, setIsOwner] = useState(false)
   const [descr, setDescr] = useState('');
   const [repoName, setRepoName] = useState('');

   const { user: me } = useAuth()
   const { path, url } = useRouteMatch();
   const { ownerLogin, repo } = useParams();

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
            <Switch>
               <Route exact path={`${path}`}>
                  <Redirect to={`${url}/tab/code`} />
               </Route>
               <Route exact path={`${path}/tab/description`}>
                  <RepoDescription
                     description={descr}
                     isOwner={isOwner}
                     updateDescription={setDescr}
                  />
               </Route>
               <Route exact path={`${path}/tab/languages`}>
                  <RepoLangsInfo
                     ownerLogin={ownerLogin}
                     repo={repo}
                  />
               </Route>
               <Route exact path={`${path}/tab/contributors`}>
                  <RepoContrs
                     ownerLogin={ownerLogin}
                     repo={repo}
                  />
               </Route>
               <Route exact path={`${path}/tab/activity`}>
                  <RepoActivity
                     ownerLogin={ownerLogin}
                     repo={repo}
                  />
               </Route>
               <Route exact path={`${path}/tab/readme`}>
                  <RepoReadme
                     ownerLogin={ownerLogin}
                     repo={repo}
                  />
               </Route>
               <Route path={`${path}/tab/code`}>
                  <RepoCode
                     ownerLogin={ownerLogin}
                     repo={repo}
                  />
               </Route>
            </Switch>
         </div>
      </div>
   )
}

export default ReposCurrentPage;