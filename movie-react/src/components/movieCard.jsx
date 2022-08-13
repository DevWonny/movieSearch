import React from 'react';

import { Link } from 'react-router-dom';

import styled from 'styled-components';

const MovieCard = (props) => {
  return (
    <Card.Container>
      <Card.Poster>
        <Card.Image src={props.el.image} />
      </Card.Poster>
      <Card.ContentContainer>
        <Card.EtcDiv>{props.el.title.replaceAll('<b>', '').replaceAll('</b>', '')}</Card.EtcDiv>
        <Card.EtcDiv>{props.el.userRating}</Card.EtcDiv>
        <Card.EtcDiv>
          {props.el.director}
          {props.el.actor}
        </Card.EtcDiv>
        <Card.Introduction>소개글</Card.Introduction>
        <Link to="/detail" className="Detail">
          더보기
        </Link>
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
    width: 180px;
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
