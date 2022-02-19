import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router";
import Loader from "../Loader/Loader";

const Repos = lazy(() => import('../Repos/Repos'));
const RepoCurrentPage = lazy(() => import("../RepoCurrentPage/RepoCurrentPage"));
const Error404 = lazy(() => import('../Error404/Error404'));
const Users = lazy(() => import("../Users/Users"));
const Login = lazy(() => import("../Login/Login"));
const UserCurrentPage = lazy(() => import("../UserCurrentPage/UserCurrentPage"));

const AppRoute = () => {
   return (
      <Suspense fallback={<Loader />}>
         <Switch>
            <Route path='/repositories' component={Repos} />
            <Route path='/login' component={Login} />
            <Route path='/profile/:userLogin' component={UserCurrentPage} />
            <Route exact path='/users' component={Users} />
            <Route path='/:ownerLogin/:repo' component={RepoCurrentPage} />
            <Route path='*' component={Error404} />
         </Switch>
      </Suspense>
   )
}

export default AppRoute;