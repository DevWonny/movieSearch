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

  // 마지막 요소 확인
  const [target, setTarget] = useState(null);

  // 전체 영화 수
  const [totalMovieCount, setTotalMovieCount] = useState(null);
  // start state
  const [pageStart, setPageStart] = useState(1);

  // api 호출
  const naverMovieApi = async () => {
    setIsLoading(true);
    const res = await NaverMovieAPI({ query: movieTitle, start : pageStart });


    if (res) {
      setTotalMovieCount(res.data.total);
      setMoiveList((prevData)=>[...prevData, ...res.data.items]);
    }
    setIsLoading(false);
  };

  const handler = (e) => {
    const target = e.target;
    setTargetScrollTop(target.scrollTop);
  };
  console.log('out -totalMovieCount',totalMovieCount)
  console.log('out -movieList',movieList.length)

  // intersection
  const onIntersect = async ([entry], observer)=>{
    console.log('totalMovieCount',totalMovieCount)
    console.log('movieList',movieList.length)
    if(entry.isIntersecting && !isLoading){

      // IntersectionObserver.unobserve -> target element 에 대한 관찰을 멈추가 싶을 때 사용.
      if(totalMovieCount > movieList?.length){
        observer.unobserve(entry.target);
        await naverMovieApi();
        observer.observe(entry.target);
      }
    }
  }

  useEffect(()=>{
    // 처음 target이 변경 되기때문에 초기 1회 실행
    // 그래서 따로 초기 실행함수 필요 없음
    let observer;

    if(!!target){
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.4,
      });

      observer.observe(target);
    }
  },[target]);




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
      {movieList?.length > 0 ? (
        movieList?.map((el, index) => {
          return <MovieCard key={`Main-movie-card-${index}`} el={el} />;
        })
      ) : (
        <NonList>영화를 검색해주세요!</NonList>
      )}

      <div ref={setTarget} className="targetRef"></div>

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
  
  & .targetRef{
    width : 100%;
    height : 50px;
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
