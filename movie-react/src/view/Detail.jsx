import React, { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import styled from 'styled-components';

import { DetailMovieAPI, DetailPersonAPI } from '../api/MovieAPI';
import Loading from '../components/common/Loading';

const Detail = () => {
  // navigate
  const navigate = useNavigate();
  // params
  const params = useParams();

  // movie poster
  const [moviePoster, setMoviePoster] = useState('');
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
  // 영상 시간
  const [movieRunTime, setMovieRunTime] = useState('');
  // 평점
  const [movieAverage, setMovieAverage] = useState('');
  // 내용
  const [movieContents, setMovieContents] = useState('');

  // loading
  // movie detail Loading
  const [movieDetailLoading, setMovieDetailLoading] = useState(false);

  const imageUrl = process.env.REACT_APP_TMDB_IMAGE_URL;

  // api 호출
  // 영화 상세 정보 호출
  const getDetailMovie = async () => {
    const res = await DetailMovieAPI(params.title);
    console.log(res);

    if (res) {
      setMoviePoster(res.poster_path);
      setMovieTitle(res.title);
      setMovieOpenDate(res.release_date);
      setMovieCountry(res.production_countries[0].name);
      setMovieGenre(res.genres);
      setMovieRunTime(res.runtime);
      setMovieAverage(res.vote_average);
      setMovieContents(res.overview);
    }
  };
  // 감독 및 배우 호출
  const getDetailPerson = async () => {
    const res = await DetailPersonAPI(params.title);

    setMovieActor(
      res.cast
        .filter((el) => {
          if (el.known_for_department === 'Acting') return el;
        })
        .slice(0, 5)
    );

    res.crew.filter((el) => {
      if (el.job === 'Director') setMovieDirector(el.name);
    });
  };

  useEffect(() => {
    getDetailMovie();
    getDetailPerson();
  }, []);
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
          <img src={`${imageUrl}${moviePoster}`} alt="poster" />
        </DetailPoster>
        <DetailDiv>제목 : {movieTitle}</DetailDiv>

        <DetailDiv>개봉일 : {movieOpenDate} </DetailDiv>
        <DetailDiv>국가 : {movieCountry}</DetailDiv>
        <DetailDiv>
          장르 :{' '}
          {movieGenre?.map((genre) => {
            return `${genre.name} | `;
          })}{' '}
        </DetailDiv>

        <DetailDiv>러닝타임 : {movieRunTime}분</DetailDiv>

        <DetailDiv>평점 : {movieAverage}</DetailDiv>
        <DetailDiv>감독 : {movieDirector}</DetailDiv>
        <DetailDiv className="test">
          출연 :
          <ActorContainer>
            {movieActor.map((actor, index) => {
              return (
                <ActorProfile key={`Detail-actor-profile-${index}`}>
                  <ActorProfileImg>
                    <img src={`${imageUrl}${actor.profile_path}`} alt="profileImg" />
                  </ActorProfileImg>
                  <ActorProfileName>{actor.name}</ActorProfileName>
                </ActorProfile>
              );
            })}
          </ActorContainer>
        </DetailDiv>
        <DetailDiv>줄거리 : {movieContents}</DetailDiv>
      </DetailWrap>
      {movieDetailLoading && <Loading text="영화 목록을 불러오는 중입니다..." />}
    </DetailContainer>
  );
};

export default Detail;

// style
const DetailContainer = styled.div`
  width: 100%;
  height: calc(100vh - 302px);
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
  width: 200px;
  height: 270px;
  margin: 0 auto 10px;

  & img {
    width: 100%;
    height: 100%;
  }
`;

const DetailDiv = styled.div`
  width: 100%;
  overflow: hidden;
  margin-bottom: 20px;
  line-height: 25px;
  color: #f8d49a;
`;

const ActorContainer = styled.div`
  width: 100%;
  height: 270px;
  position: relative;
  display: flex;
  justify-content: space-between;
`;

const ActorProfile = styled.div`
  width: 200px;
  height: 270px;
  position: relative;
`;

const ActorProfileImg = styled.div`
  width: 100%;
  height: 250px;
  & img {
    width: 100%;
    height: 100%;
  }
`;

const ActorProfileName = styled.div`
  width: 100%;
  height: 20px;
`;
