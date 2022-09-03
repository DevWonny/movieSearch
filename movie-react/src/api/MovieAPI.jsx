import axios from 'axios';
const key = process.env.REACT_APP_TMDB_KEY;
// 인기순 호출(메인 페이지 처음 들어 간 경우)
export const PopularMovieAPI = async () => {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${key}&page=1&language=ko-KR&include_adult=false`
    );

    return res.data;
  } catch (e) {
    console.log(e);
  }
};

// 상세보기 페이지
export const DetailMovieAPI = async (movieId) => {
  if (!movieId) {
    return;
  }

  try {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}&language=ko-KR`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
// 상세보기 페이지 - 배우 및 제작자 조회
export const DetailPersonAPI = async (movieId) => {
  if (!movieId) {
    return;
  }

  try {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${key}&language=ko-KR`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

// 검색 API
export const SearchMovieAPI = async (movieTitle) => {
  if (!movieTitle) {
    return;
  }

  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${movieTitle}&language=ko-KR`
    );

    return res.data;
  } catch (e) {
    console.log(e);
  }
};
