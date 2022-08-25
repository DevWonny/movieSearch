import React, {useEffect, useRef, useState} from 'react';

import styled from 'styled-components';

import MovieCard from '../components/movieCard';

import NaverMovieAPI from '../api/NaverMovieAPI';

import SearchIcon from '../assets/icon/serachIcon.svg';
import TopButton from '../components/common/TopButton';
import Loading from '../components/common/Loading';
import Pagination from "../components/Pagination";

const Main = () => {
    // 영화 목록
    const [movieList, setMovieList] = useState([]);

    // lading
    const [isLoading, setIsLoading] = useState(false);

    // scrollTop
    const [targetScrollTop, setTargetScrollTop] = useState(null);

    // 영화 제목
    const [movieTitle, setMovieTitle] = useState('');

    // movie start state
    const [movieStart, setMovieStart] = useState(1);

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
    // 초기 검색 호출
    const initNaverMovieApi = async () => {
        if (movieTitle) {
            setIsLoading(true);
            const res = await NaverMovieAPI({query: movieTitle, start: movieStart});

            if (res) {
                setTotalPage(Math.ceil(res.data.total / 10));
                setTotalContents(res.data.total);
                setMovieList(res.data.items);
            }
            setIsLoading(false);
        }
    };

    // 더보기 클릭 시 호출 api
    const moreMovieApi = async () => {
        if (movieTitle) {
            setIsLoading(true);
            const res = await NaverMovieAPI({query: movieTitle, start: movieStart + 10});

            if (res) {
                setMovieList(prev => [...prev, ...res.data.items]);
            }
            setIsLoading(false);
        }
    }

    // 현재 페이지 변경시 호출 api
    const paginationApi = async()=>{
        if(movieTitle){
            setIsLoading(true);
            const res = await NaverMovieAPI({query: movieTitle, start: movieStart+10});
            if (res) {
                // 더보기 및 infinite scroll 활성화 시 활용
                setMovieList(prev => [...prev, ...res.data.items]);

                // pagination 활성화 시 활용
                // setMovieList(res.data.items);

            }
            setIsLoading(false);
        }
    }

    const handler = (e) => {
        const target = e.target;
        setTargetScrollTop(target.scrollTop);
    };

    // intersection
    const onIntersect = async ([entry], observer) => {
        if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            await paginationApi();
            observer.observe(entry.target);
        }
    };


    useEffect(() => {
        let observer;
        if(movieList.length === totalContents) return;
        if (observeRef.current) {
            observer = new IntersectionObserver(onIntersect, {
                threshold: 0.4,
            });
            observer.observe(observeRef.current);
        }
        return () => observer && observer.disconnect();
    }, [observeRef.current, movieList]);

    // 더보기 활성화 시 활용
    // useEffect(() => {
    //     setCurrentPage(Math.ceil(movieList.length / 10));
    // }, [movieList])

    // pagination 활성화 시 활용
    // useEffect(()=>{
    //     paginationApi();
    //     mainContainerRef.current.scrollTop= 0;
    // },[currentPage])

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
                            initNaverMovieApi();
                        }
                    }}
                />
                <SearchIconDiv onClick={() => initNaverMovieApi()}>
                    <img src={SearchIcon} alt="searchIcon"/>
                </SearchIconDiv>
            </MainHeader>
            {/* Component */}
            {movieList?.length > 0 ? (
                movieList?.map((el, index) => {
                    return <MovieCard key={`Main-movie-card-${index}`} el={el}/>;
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
            {targetScrollTop > 200 && <TopButton mainContainerRef={mainContainerRef}/>}



        </MainContainer>
    {/* loading page */}
    {isLoading && <Loading text="영화 목록을 불러오는 중입니다..."/>}
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
`

const TargetDiv = styled.div`
    width : 100%;
    height: 10px;
`;