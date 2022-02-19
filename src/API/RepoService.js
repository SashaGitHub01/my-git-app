import instanse from "./instanse";

class RepoService {
   static deleteRepo = async (owner, repo) => {
      const response = await instanse.delete(`/repos/${owner}/${repo}`);

      return response.data;
   }

   static updateRepo = async (owner, repo, body) => {
      const response = await instanse.patch(`/repos/${owner}/${repo}`, body);

      return response.data;
   }
}

export default RepoService;