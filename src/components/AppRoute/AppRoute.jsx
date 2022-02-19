import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
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
         <Routes>
            <Route index element={<Repos />} />
            <Route path='/repositories' element={<Repos />} />
            <Route path='/login' element={<Login />} />
            <Route path='/profile/:userLogin' element={<UserCurrentPage />} />
            <Route path='/users' element={<Users />} />
            <Route path='/:ownerLogin/:repo/*' element={<RepoCurrentPage />} />
            <Route path='*' element={<Error404 />} />
         </Routes>
      </Suspense>
   )
}

export default AppRoute;