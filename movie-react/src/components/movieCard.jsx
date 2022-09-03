import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

const MovieCard = (props) => {
  const navigate = useNavigate();
  const imageUrl = process.env.REACT_APP_TMDB_IMAGE_URL;

  // 더보기 클릭시 상세 페이지로 이동
  const onDetailClick = () => {
    navigate(`/detail/${props.el.id}`);
  };

  return (
    <Card.Container>
      <Card.Poster>
        <Card.Image src={`${imageUrl}${props.el.poster_path}`} />
      </Card.Poster>
      <Card.ContentContainer>
        <Card.EtcDiv>제목 : {props.el.title}</Card.EtcDiv>
        <Card.EtcDiv>개봉일 : {props.el.release_date}</Card.EtcDiv>
        <Card.EtcDiv>평점 : {props.el.vote_average}</Card.EtcDiv>
        <Card.EtcDiv>{props.el.overview.substr(0, 300)}</Card.EtcDiv>
        <div
          className="Detail"
          onClick={() => {
            onDetailClick();
          }}>
          더보기
        </div>
      </Card.ContentContainer>
    </Card.Container>
  );
};

export default MovieCard;

// style
const Card = {
  Container: styled.div`
    width: 80%;
    height: 250px;
    border: 1px solid #cee9b6;
    border-radius: 5px;
    position: relative;
    margin: 10px auto 0;
    display: flex;
    justify-content: space-between;
    padding: 5px;
    color: #f8d49a;

    & .Detail {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 100px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      border: 1px solid #8fc79a;
      border-radius: 10px;
      cursor: pointer;
      text-decoration: none;
      color: #f8d49a;

      &:hover {
        background-color: #8fc79a;
      }
    }
  `,

  Poster: styled.div`
    width: 200px;
    height: 100%;
  `,
  Image: styled.img`
    width: 100%;
    height: 100%;
    border-radius: 10px;
    box-sizing: border-box;
  `,

  ContentContainer: styled.div`
    width: 80%;
    height: 100%;
    position: relative;
  `,
  EtcDiv: styled.div`
    width: 100%;
    height: 30px;
    line-height: 30px;
    margin-bottom: 10px;
  `,

  Introduction: styled.div`
    width: 100%;
    height: 80px;
    line-height: 1.5;
    overflow: hidden;
    margin-bottom: 10px;
  `,
};
