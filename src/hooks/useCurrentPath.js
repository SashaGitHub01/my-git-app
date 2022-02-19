import { useLocation } from "react-router-dom";

const useCurrentPath = (defaultValue) => {
   const location = useLocation().pathname.split('/').slice(-2);

   if (location[0] !== 'tab') return defaultValue;

   return location[1];
}

export default useCurrentPath;