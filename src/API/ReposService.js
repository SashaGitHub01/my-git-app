import axios from "axios";
import instanse from "./instanse";

const cors = 'https://cors-anywhere.herokuapp.com/';
const url = 'https://api.github.com';

class ReposService {
   static getRepos = async (pageParam) => {
      if (pageParam.query === undefined || pageParam.query === '') pageParam.query = 'stars:%3E1';

      const response = await instanse.get(
         `/search/repositories?q=${pageParam.query}&sort=stars&per_page=10&page=${pageParam.page}`
      );

      return response.data;
   }

   static getCurrentRepo = async (owner, repo) => {
      const response = await instanse.get(`/repos/${owner}/${repo}`);

      return response.data;
   }

   static getRepoContributors = async (owner, repo) => {
      const response = await instanse.get(`/repos/${owner}/${repo}/contributors`);

      return response.data;
   }

   static getRepoLanguages = async (owner, repo) => {
      const response = await instanse.get(`/repos/${owner}/${repo}/languages`);

      return response.data;
   }

   static getRepoCommitActivity = async (owner, repo) => {
      const response = await instanse.get(`/repos/${owner}/${repo}/stats/commit_activity`);

      return response.data;
   }

   static getRepoReadme = async (owner, repo) => {
      const response = await instanse.get(`/repos/${owner}/${repo}/readme`);

      return response.data;
   }

   static getRepoCode = async (owner, repo, pathName = '') => {
      const response = await instanse.get(`/repos/${owner}/${repo}/contents/${pathName}`);

      return response.data;
   }

   static downloadRepo = async (owner, repo) => {
      const response = await axios.get(`${cors}${url}/repos/${owner}/${repo}/zipball`,);

      return response.data;
   }
}

export default ReposService;