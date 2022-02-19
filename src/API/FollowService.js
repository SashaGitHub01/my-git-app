import instanse from "./instanse";

class FollowService {
   static follow = async (username) => {
      const response = await instanse.put(`/user/following/${username}`);

      return response.data;
   }

   static unfollow = async (username) => {
      const response = await instanse.delete(`/user/following/${username}`);

      return response.data;
   }

   static isFollowing = async (username, targetUser) => {
      const response = await instanse.get(`/users/${username}/following/${targetUser}`);

      return response.data;
   }
}

export default FollowService;