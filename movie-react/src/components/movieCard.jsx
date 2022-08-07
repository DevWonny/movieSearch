// react
import React from 'react';

// style
import styled from 'styled-components';

const MovieCard = () => {
  return (
    <Card.Container>
      <Card.Poster></Card.Poster>
      <Card.ContentContainer>
        <Card.Title>제목</Card.Title>
        <Card.Grade>평점</Card.Grade>
        <Card.DirectorActor>감독 및 출연</Card.DirectorActor>
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
    height: 200px;
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
    width: 150px;
    height: 100%;
    border: 1px solid black;
    box-sizing: border-box;
  `,

  ContentContainer: styled.div`
    width: 80%;
    height: 100%;
    /* background-color: aqua; */
    position: relative;
  `,

  Title: styled.div`
    width: 100%;
    height: 15px;
    background-color: red;
  `,

  Grade: styled.div`
    width: 100%;
    height: 15px;
    background-color: blue;
  `,

  DirectorActor: styled.div`
    width: 100%;
    height: 15px;
    background-color: yellow;
  `,

  Introduction: styled.div`
    width: 100%;
    height: 15px;
    background-color: green;
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
