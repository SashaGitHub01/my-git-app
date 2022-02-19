import axios from "axios";

const instanse = axios.create({
   baseURL: 'https://api.github.com',
})

export default instanse;