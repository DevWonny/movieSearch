import axios from 'axios';

const NaverMovieAPI = async ({ query, start }) => {
  if(!start){
    return;
  }
  const headers = {
    'X-Naver-Client-Id': '3K3Q44KwIDZ5eFYBFISX',
    'X-Naver-Client-Secret': '1QALDriLde',
  };
  const res = await axios.get(`/v1/search/movie.json?query=${query}&start=${start}`, { headers });
  return res;
};

export default NaverMovieAPI;
