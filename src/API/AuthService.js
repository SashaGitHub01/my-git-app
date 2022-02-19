import axios from "axios";

class AuthService {
   static authUser = async () => {
      const res = await axios.get(`${process.env.REACT_APP_SERVER}/auth`, {
         headers: {
            'Access-Control-Allow-Credentials': true,
         },
         withCredentials: true,
      });

      return res.data;
   }
}

export default AuthService;