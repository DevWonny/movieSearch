import React, { useEffect, useState, useRef } from 'react';

import { Link } from 'react-router-dom';

import styled from 'styled-components';

import MovieCard from '../components/MovieCard';

import NaverMovieAPI from '../api/NaverMovieAPI';

import SearchIcon from '../assets/icon/serachIcon.svg';
import TopButton from '../components/common/TopButton';
import Loading from '../components/common/Loading';

const Main = () => {
  // 영화 목록
  const [movieList, setMoiveList] = useState([]);

  // lading
  const [isLoading, setIsLoading] = useState(false);

  // main Container Ref
  const mainContainerRef = useRef();

  // api 호출
  const naverMovieApi = async () => {
    setIsLoading(true);
    const res = await NaverMovieAPI();

    if (res) {
      setIsLoading(false);
      setMoiveList(res.data.items);
    }
  };

  useEffect(() => {
    naverMovieApi();
  }, []);

  return (
    <MainContainer ref={mainContainerRef} className="scrollTop">
      <MainHeader>
        <Link to="/serach" className="search-bar">
          검색어를 입력해주세요.
          <img src={SearchIcon} alt="searchIcon" />
        </Link>
      </MainHeader>
      {/* Component */}
      {movieList.length > 0 &&
        movieList.map((el, index) => {
          return <MovieCard key={`Main-movie-card-${index}`} el={el} />;
        })}

      {/* Top Button */}
      <TopButton mainContainerRef={mainContainerRef} />

      {/* loading page */}
      {isLoading && <Loading text="영화 목록을 불러오는 중입니다..." />}
    </MainContainer>
  );
};

export default Main;

// style
const MainContainer = styled.div`
  width: 100%;
  height: calc(100vh - 202px);
  overflow: scroll;
  background-color: #2d8d79;
  padding: 101px 0;
  position: relative;

  // scroll dispaly hidden
  &::-webkit-scrollbar {
    display: none;
  }
`;

const MainHeader = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100px;
  border-bottom: 1px solid #cee9b6;
  background: #2d8d79;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;

  & .search-bar {
    width: 50%;
    height: 40px;
    padding: 0 10px;
    color: #cee9b6;
    background-color: transparent;
    border: 1px solid #cee9b6;
    border-radius: 10px;
    cursor: pointer;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: space-between;

    & img {
      width: 30px;
      height: 30px;
    }
  }
`;
