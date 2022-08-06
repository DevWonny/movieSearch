import axios from 'axios';
import index from '.';

const NaverMovieAPI = async (query) => {
  const headers = {
    'X-Naver-Client-Id': '3K3Q44KwIDZ5eFYBFISX',
    'X-Naver-Client-Secret': '1QALDriLde',
  };
  if (!query) {
    return;
  }

  try {
    const res = await axios.get('https://openapi.naver.com/v1/search/movie.json?query=아이언 맨', { headers });

    if (res) {
      console.log('naverRes', res);
    }
  } catch (err) {
    console.log(err);
  }
};

export default NaverMovieAPI;
