import React, { useEffect, useState, useRef } from 'react';

import styled from 'styled-components';

import MovieCard from '../components/movieCard';

import NaverMovieAPI from '../api/NaverMovieAPI';

import SearchIcon from '../assets/icon/serachIcon.svg';
import TopButton from '../components/common/TopButton';
import Loading from '../components/common/Loading';

const Main = () => {
  // 영화 목록
  const [movieList, setMoiveList] = useState([]);

  // lading
  const [isLoading, setIsLoading] = useState(false);

  // scrollTop
  const [targetScrollTop, setTargetScrollTop] = useState(null);

  // 영화 제목
  const [movieTitle, setMovieTitle] = useState('');

  // main Container Ref
  const mainContainerRef = useRef();

  // api 호출
  const naverMovieApi = async () => {
    setIsLoading(true);
    const res = await NaverMovieAPI({ query: movieTitle });

    if (res) {
      setIsLoading(false);
      setMoiveList(res.data.items);
    }
  };

  const handler = (e) => {
    const target = e.target;
    setTargetScrollTop(target.scrollTop);
  };

  return (
    <MainContainer ref={mainContainerRef} className="scrollTop" onScroll={handler}>
      <MainHeader>
        <SearchInput
          type="text"
          placeholder="검색어를 입력해주세요."
          id="search"
          value={movieTitle}
          onChange={(e) => {
            setMovieTitle(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              naverMovieApi();
            }
          }}
        />
        <SearchIconDiv onClick={() => naverMovieApi()}>
          <img src={SearchIcon} alt="searchIcon" />
        </SearchIconDiv>
      </MainHeader>
      {/* Component */}
      {movieList.length > 0 ? (
        movieList.map((el, index) => {
          return <MovieCard key={`Main-movie-card-${index}`} el={el} />;
        })
      ) : (
        <NonList>영화를 검색해주세요!</NonList>
      )}

      {/* Top Button */}
      {targetScrollTop > 200 && <TopButton mainContainerRef={mainContainerRef} />}

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
`;

const SearchInput = styled.input`
  width: 50%;
  height: 40px;
  padding: 0 10px;
  color: #cee9b6;
  background-color: transparent;
  border: 1px solid #cee9b6;
  border-radius: 10px;
  outline: none;
  &::placeholder {
    color: #cee9b6;
  }
`;

const SearchIconDiv = styled.div`
  width: 35px;
  height: 35px;
  position: relative;
  left: -50px;
  cursor: pointer;
  & img {
    width: 100%;
    height: 100%;
  }
`;

const NonList = styled.div`
  font-size: 30px;
  color: #f8d49a;
  width: 100%;
  height: calc(100vh - 202px);
  display: flex;
  align-items: center;
  justify-content: center;
`;
