import axios from 'axios';

const NaverMovieAPI = async ({ query }) => {
  const headers = {
    'X-Naver-Client-Id': '3K3Q44KwIDZ5eFYBFISX',
    'X-Naver-Client-Secret': '1QALDriLde',
  };
  const res = await axios.get(`/v1/search/movie.json?query=${query}`, { headers });
  console.log(res);
  return res;
};

export default NaverMovieAPI;
