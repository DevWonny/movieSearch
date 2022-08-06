import axios from 'axios';

const index = axios.create({
  baseURL: 'https://openapi.naver.com/',
});

export default index;
