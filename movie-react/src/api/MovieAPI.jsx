import axios from 'axios';

export const MovieAPI = async (movieNm, openStartDt) => {
  if (!movieNm) {
    return;
  }

  const key = '9644078c3d03b7e1e02b018fcf38050e';

  try {
    const res = await axios.get(
      `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=${key}&movieNm=${movieNm}`
    );
    if (res) {
      return res.data.movieListResult.movieList;
    }
  } catch (e) {
    console.log(e);
  }
};

export const MovieDetailAPI = async (movieCd) => {
  if (!movieCd) {
    return;
  }
  const key = '9644078c3d03b7e1e02b018fcf38050e';

  try {
    const res = await axios.get(
      `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=${key}&movieCd=${movieCd}`
    );
    return res.data.movieInfoResult.movieInfo;
  } catch (e) {
    console.log(e);
  }
};

export const PopularMovieAPI = async () => {
  const key = process.env.REACT_APP_TMDB_KEY;
  try {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${key}&page=1`);

    return res.data;
  } catch (e) {
    console.log(e);
  }
};
