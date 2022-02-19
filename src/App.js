import React from 'react';
import Main from './components/Main/Main.jsx';
import Header from './components/Header/Header.jsx';
import AuthService from './API/AuthService.js';
import { useQuery } from 'react-query';
import Loader from './components/Loader/Loader.jsx';
import { useAuth } from './hooks/useAuth.js';


function App() {
   const { setUserSuccess, setUserError, isInitialized } = useAuth()
   const res = useQuery(['authData', isInitialized],
      async () => {
         if (isInitialized) return;
         try {
            const res = await AuthService.authUser();
            setUserSuccess(res)
         } catch (err) {
            setUserError()
         }
      },
      {
         retry: false,
         refetchOnWindowFocus: false,
         refetchOnMount: false,
      });

   return (
      <>
         {!isInitialized
            ? <Loader />
            : <>
               <Header />
               <Main />
            </>}
      </>
   );
}

export default App;
