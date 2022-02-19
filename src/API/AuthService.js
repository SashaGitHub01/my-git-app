import axios from "axios";

class AuthService {
   static authUser = async () => {
      const res = await axios.get('http://localhost:4000/authme', {
         headers: {
            'Access-Control-Allow-Credentials': true,
         },
         withCredentials: true,
      });

      return res.data;
   }
}

export default AuthService;