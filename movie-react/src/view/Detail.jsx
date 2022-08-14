import React, { useState, useEffect } from 'react';

import { useLocation, useNavigate, useParams } from 'react-router-dom';

import styled from 'styled-components';

import { MovieAPI, MovieDetailAPI } from '../api/MovieAPI';

const Detail = () => {
  // navigate
  const navigate = useNavigate();
  // location
  const location = useLocation();
  // params
  const params = useParams();

  // movieCd
  const [movieCd, setMovieCd] = useState('');
  // movie Title
  const [movieTitle, setMovieTitle] = useState('');
  // movie Actor
  const [movieActor, setMovieActor] = useState([]);
  // movie Director
  const [movieDirector, setMovieDirector] = useState([]);
  // 개봉일
  const [movieOpenDate, setMovieOpenDate] = useState('');
  // 국가
  const [movieCountry, setMovieCountry] = useState('');
  // 장르
  const [movieGenre, setMovieGenre] = useState([]);
  // 제작사
  const [movieProducer, setMovieProducer] = useState([]);
  // 영상 시간
  const [movieShowTime, setMovieShowTime] = useState('');
  // 내용
  const [movieContents, setMovieContents] = useState('');

  // api 호출
  // movieCd 가져오기
  const getMovieCd = async () => {
    const res = await MovieAPI(params.title, location.state.Date);

    res.filter((el) => {
      if (el.openDt.includes(location.state.Date)) setMovieCd(el.movieCd);
    });
  };

  // movie Detail 정보 가져오기
  const getMovieDetail = async () => {
    const res = await MovieDetailAPI(movieCd);

    if (res) {
      setMovieTitle(res.movieNm);
      setMovieActor(res.actors);
      setMovieDirector(res.directors);
      setMovieOpenDate(res.openDt);
      setMovieCountry(res.nations[0].nationNm);
      setMovieGenre(res.genres);
      setMovieProducer(res.companys);
      setMovieShowTime(res.showTm);
    }
  };

  useEffect(() => {
    getMovieCd();
  }, []);

  useEffect(() => {
    getMovieDetail();
  }, [movieCd]);

  console.log(movieDirector);
  return (
    <DetailContainer>
      <BackButton
        onClick={() => {
          navigate(-1);
        }}>
        목록보기
      </BackButton>

      <DetailWrap>
        <DetailPoster>
          <img src={location.state.poster} alt="poster" />
        </DetailPoster>
        <DetailDiv>{movieTitle}</DetailDiv>
        <DetailDiv>
          {movieDirector[0]?.peopleNm} ({movieDirector[0]?.peopleNmEn})
        </DetailDiv>
        <DetailDiv>actor / director</DetailDiv>
        <DetailDiv>개봉일</DetailDiv>
        <DetailDiv>국가</DetailDiv>
        <DetailDiv>유형</DetailDiv>
        <DetailDiv>장르</DetailDiv>
        <DetailDiv>제작사</DetailDiv>
        <DetailDiv>Grade</DetailDiv>
        <DetailDiv>관람객 수</DetailDiv>
        <DetailContent>내용</DetailContent>
      </DetailWrap>
    </DetailContainer>
  );
};

export default Detail;

// style
const DetailContainer = styled.div`
  width: 100%;
  height: calc(100vh - 202px);
  overflow: scroll;
  background-color: #2d8d79;
  padding: 101px 0;
  position: relative;

  // scroll display hidden
  &::-webkit-scrollbar {
    display: none;
  }
`;

const BackButton = styled.button`
  position: absolute;
  top: 50px;
  left: 10%;
  width: 100px;
  height: 50px;
  border: 1px solid #8fc79a;
  border-radius: 10px;
  background: inherit;
  color: #f8d49a;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #8fc79a;
  }
`;

const DetailWrap = styled.div`
  width: 80%;
  height: 95%;
  position: relative;
  margin: 10px auto 0;
`;

const DetailPoster = styled.div`
  width: 180px;
  height: 250px;
  background-color: azure;
  margin: 0 auto 10px;
  & img {
    width: 100%;
    height: 100%;
  }
`;

const DetailDiv = styled.div`
  width: 100%;
  height: 25px;
  margin-bottom: 10px;
  line-height: 25px;
  color: #f8d49a;
`;
const DetailContent = styled.div`
  width: 100%;
  height: 100px;
  color: #f8d49a;
  border: 1px solid black;
  box-sizing: border-box;
`;
