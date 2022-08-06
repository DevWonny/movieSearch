import axios from 'axios';

const MovieAPI = async () => {
  const key = process.env.REACT_APP_MOVIE_KEY;
  console.log('key: ', key);

  try {
    const res = await axios.get(
      `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=${key}`
    );
    if (res) {
      console.log('res', res);
    }
  } catch (e) {
    console.log(e);
  }
};

export default MovieAPI;
