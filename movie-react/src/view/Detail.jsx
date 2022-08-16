import React, {useEffect, useState} from 'react';

import {useLocation, useNavigate, useParams} from 'react-router-dom';

import styled from 'styled-components';

import {MovieAPI, MovieDetailAPI} from '../api/MovieAPI';
import Loading from '../components/common/Loading';

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
    // 영상 시간
    const [movieShowTime, setMovieShowTime] = useState('');
    // 내용
    const [movieContents, setMovieContents] = useState('');

    // loading
    // movieCd Loading
    const [movieCdLoading, setMovieCdLoading] = useState(false);
    // movie detail Loading
    const [movieDetailLoading, setMovieDetailLoading] = useState(false);

    // api 호출
    // movieCd 가져오기
    const getMovieCd = async () => {
        if (movieCdLoading) {
            return;
        }
        setMovieCdLoading(true);
        const res = await MovieAPI(params.title, location.state.date);
        if (res) {
            res.filter((el) => {
                if (el.openDt.includes(location.state.date) && (el.movieNm === location.state.title)) setMovieCd(el.movieCd);
            });
        }
        setMovieCdLoading(false);
    };

    // movie Detail 정보 가져오기
    const getMovieDetail = async () => {
        if (movieDetailLoading) {
            return;
        }


        setMovieDetailLoading(true);
        const res = await MovieDetailAPI(movieCd);


        if (res) {
            setMovieTitle(res.movieNm);
            setMovieActor(res.actors);
            setMovieDirector(res.directors);
            setMovieOpenDate(res.openDt);
            setMovieCountry(res.nations[0].nationNm);
            setMovieGenre(res.genres);
            setMovieShowTime(res.showTm);
        }
        setMovieDetailLoading(false);
    };

    useEffect(() => {
        getMovieCd();
    }, []);

    useEffect(() => {
        if (movieCd) {
            getMovieDetail();
        }
    }, [movieCd]);

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
                    <img src={location.state.poster} alt="poster"/>
                </DetailPoster>
                <DetailDiv>{movieTitle}</DetailDiv>

                <DetailDiv>개봉일 : {movieOpenDate ? movieOpenDate : location.state.date}</DetailDiv>
                {movieCountry && <DetailDiv>국가 : {movieCountry}</DetailDiv>}
                {movieGenre.length > 0 && <DetailDiv>
                    장르 :{' '}
                    {movieGenre.map((el) => {
                        return el.genreNm + ' | ';
                    })}
                </DetailDiv>}

                {movieShowTime && <DetailDiv>러닝타임 : {movieShowTime}분</DetailDiv>}

                <DetailDiv>평점 : {location.state.rating}</DetailDiv>
                <DetailDiv>
                    감독 :
                    {movieDirector.length > 0 ? movieDirector.map(el => {
                        return `${el.peopleNm} (${el.peopleNmEn})`;
                    }) : location.state.director}

                </DetailDiv>
                <DetailDiv>
                    출연 :{' '}
                    {movieActor.length > 0 ? movieActor.map((el) => {
                        return `${el.peopleNm} (${el.peopleNmEn}) / `;
                    }) : location.state.actor}
                </DetailDiv>
            </DetailWrap>
            {(movieCdLoading || movieDetailLoading) && <Loading text="영화 목록을 불러오는 중입니다..."/>}
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
