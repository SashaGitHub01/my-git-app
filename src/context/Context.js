import React from "react";
import { useReducer } from "react";

const SET_USER_SUCCESS = 'SET_USER_SUCCESS'
const SET_USER_ERROR = 'SET_USER_ERROR'

const initialState = {
   user: null,
   isInitialized: false
}

export const Context = React.createContext({
   ...initialState,
   setUserSuccess: (data) => { },
   setUserError: () => { }
});

const authReducer = (state, action) => {
   switch (action.type) {
      case SET_USER_SUCCESS:
         return {
            ...state,
            user: action.payload,
            isInitialized: true
         }

      case SET_USER_ERROR:
         return {
            ...state,
            isInitialized: true
         }

      default:
         return state
   }
}

export const AuthProvider = ({ children }) => {
   const [state, dispatch] = useReducer(authReducer, initialState)

   const setUserSuccess = (data) => {
      dispatch({ type: SET_USER_SUCCESS, payload: data })
   }

   const setUserError = () => {
      dispatch({ type: SET_USER_ERROR })
   }

   return (
      <Context.Provider value={{
         setUserSuccess,
         setUserError,
         ...state
      }}>
         {children}
      </Context.Provider>
   )
}