import instanse from "./instanse";

class UsersService {
   static getUsers = async (pageParam) => {
      if (pageParam.query === '') pageParam.query = 'followers:%3E1';

      const response = await instanse.get(
         `/search/users?q=${pageParam.query}&sort=followers&per_page=10&page=${pageParam.page}`
      );

      return response.data;
   }

   static getCurrentUser = async (login) => {
      const response = await instanse.get(`/users/${login}`);

      return response.data;
   }

   static getUserRepos = async (login) => {
      const response = await instanse.get(`/users/${login}/repos`);

      return response.data;
   }
}

export default UsersService;