// react
import React from 'react';

// style
import styled from 'styled-components';

const MovieCard = () => {
  return (
    <Card.Container>
      <Card.Poster>Poster</Card.Poster>
      <Card.ContentContainer>
        <Card.EtcDiv>제목</Card.EtcDiv>
        <Card.EtcDiv>평점</Card.EtcDiv>
        <Card.EtcDiv>감독 및 출연</Card.EtcDiv>
        <Card.Introduction>소개글</Card.Introduction>
        <Card.Detail>더보기</Card.Detail>
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
    margin-top: 10px;
    position: relative;
    margin: 10px auto 0;
    display: flex;
    justify-content: space-between;
    padding: 5px;
  `,

  Poster: styled.div`
    width: 180px;
    height: 100%;
    border: 1px solid black;
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
    color: #8fc79a;
  `,

  Introduction: styled.div`
    width: 100%;
    height: 80px;
    line-height: 1.5;
    color: #8fc79a;
    overflow: hidden;
    margin-bottom: 10px;
  `,

  Detail: styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border: 1px solid #8fc79a;
    border-radius: 10px;
    color: #8fc79a;
    cursor: pointer;
  `,
};
