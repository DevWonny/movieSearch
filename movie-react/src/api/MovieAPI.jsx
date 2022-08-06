import axios from 'axios';

const MovieAPI = async () => {
  const key = '9644078c3d03b7e1e02b018fcf38050e';

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
