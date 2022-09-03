import React, { useEffect, useRef, useState } from 'react';

import styled from 'styled-components';

import MovieCard from '../components/movieCard';

import { PopularMovieAPI, SearchMovieAPI } from '../api/MovieAPI';

import SearchIcon from '../assets/icon/serachIcon.svg';
import TopButton from '../components/common/TopButton';
import Loading from '../components/common/Loading';
import Pagination from '../components/Pagination';

const Main = () => {
  // 영화 목록
  const [movieList, setMovieList] = useState([]);

  // lading
  const [isLoading, setIsLoading] = useState(false);

  // scrollTop
  const [targetScrollTop, setTargetScrollTop] = useState(null);

  // 영화 제목
  const [movieTitle, setMovieTitle] = useState('');

  // total contents
  const [totalContents, setTotalContents] = useState(null);
  // total page
  const [totalPage, setTotalPage] = useState(null);
  // current page
  const [currentPage, setCurrentPage] = useState(1);

  // main Container Ref
  const mainContainerRef = useRef();

  // infinite scroll Ref
  const observeRef = useRef();

  // api 호출
  // 초기 인기순 api 호출
  const initPopularApi = async () => {
    setIsLoading(true);
    const res = await PopularMovieAPI(currentPage);

    if (res) {
      setTotalPage(res.total_pages);
      setTotalContents(res.total_results);
      setMovieList(res.results);
    }
    setIsLoading(false);
  };

  // 검색 호출
  const getSearchMovieApi = async () => {
    setIsLoading(true);

    const res = await SearchMovieAPI(movieTitle);

    if (res) {
      setTotalPage(res.total_pages);
      setTotalContents(res.total_results);
      setMovieList(res.results);
    }
    setIsLoading(false);
  };

  // 검색 안한 상태에서 무한 스크롤
  const getScrollMovieApi = async () => {
    setIsLoading(true);

    const res = await PopularMovieAPI(currentPage);
    console.log(res);
    setMovieList((prev) => [...prev, ...res.results]);

    setIsLoading(false);
  };

  // 검색 한 상태에서 무한스크롤
  // const getScrollSearchMovieApi = async() =>{}

  useEffect(() => {
    if (currentPage > 1 && !movieTitle) {
      getScrollMovieApi();
    }
  }, [currentPage]);

  // 더보기 클릭 시 호출 api
  //   const moreMovieApi = async () => {
  //     if (movieTitle) {
  //       setIsLoading(true);
  //       const res = await NaverMovieAPI({ query: movieTitle, start: movieStart + 10 });

  //       if (res) {
  //         setMovieList((prev) => [...prev, ...res.data.items]);
  //       }
  //       setIsLoading(false);
  //     }
  //   };

  // 현재 페이지 변경시 호출 api
  // const paginationApi = async () => {
  //   if (movieTitle) {
  //     setIsLoading(true);
  //     const res = await NaverMovieAPI({ query: movieTitle, start: movieStart + 10 });
  //     if (res) {
  //       // 더보기 및 infinite scroll 활성화 시 활용
  //       setMovieList((prev) => [...prev, ...res.data.items]);

  //       // pagination 활성화 시 활용
  //       // setMovieList(res.data.items);
  //     }
  //     setIsLoading(false);
  //   }
  // };

  const handler = (e) => {
    const target = e.target;
    setTargetScrollTop(target.scrollTop);
  };

  // intersection
  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      setCurrentPage(currentPage + 1);
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    let observer;
    if (observeRef.current) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.4,
      });
      observer.observe(observeRef.current);
    }
    return () => observer && observer.disconnect();
  }, [onIntersect]);

  // 더보기 활성화 시 활용
  // useEffect(() => {
  //     setCurrentPage(Math.ceil(movieList.length / 10));
  // }, [movieList])

  // pagination 활성화 시 활용
  // useEffect(()=>{
  //     paginationApi();
  //     mainContainerRef.current.scrollTop= 0;
  // },[currentPage])

  // 초기값 호출
  useEffect(() => {
    initPopularApi();
  }, []);

  return (
    <>
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
                getSearchMovieApi();
              }
            }}
          />
          <SearchIconDiv>
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

        {/* More Button 처리 */}
        {/*{movieList?.length > 0 && (currentPage !== totalPage) &&*/}
        {/*    <MoreButton onClick={async () => {*/}
        {/*        setMovieStart(movieStart + 10)*/}
        {/*        await moreMovieApi()*/}
        {/*    }}>더보기</MoreButton>}*/}

        {/* pagination 처리*/}
        {/*{totalPage && <Pagination totalPage={totalPage} setMovieStart={setMovieStart} movieStart={movieStart} currentPage={currentPage} setCurrentPage={setCurrentPage}/>}*/}

        {/* infinite scroll 처리*/}
        {movieList.length > 0 && <TargetDiv ref={observeRef}></TargetDiv>}

        {/* Top Button */}
        {targetScrollTop > 200 && <TopButton mainContainerRef={mainContainerRef} />}
      </MainContainer>
      {/* loading page */}
      {isLoading && <Loading text="영화 목록을 불러오는 중입니다..." />}
    </>
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
  color: #f8d49a;
  background-color: transparent;
  border: 1px solid #cee9b6;
  border-radius: 10px;
  outline: none;

  &::placeholder {
    color: #f8d49a;
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

const MoreButton = styled.div`
  margin: 10px auto;
  width: 200px;
  height: 50px;
  border: 1px solid #8fc79a;
  border-radius: 10px;
  color: #f8d49a;
  font-size: 24px;
  text-align: center;
  line-height: 50px;
  cursor: pointer;

  &:hover {
    background-color: #8fc79a;
  }
`;

const TargetDiv = styled.div`
  width: 100%;
  height: 10px;
`;
