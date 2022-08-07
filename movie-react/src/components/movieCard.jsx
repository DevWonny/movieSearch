// react
import React from 'react';

// style
import styled from 'styled-components';

const MovieCard = (props) => {
  console.log('props', props.el);
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
