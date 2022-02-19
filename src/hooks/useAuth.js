import { Context } from "../context/Context";
import { useContext } from "react";

export const useAuth = () => {
   return useContext(Context)
}