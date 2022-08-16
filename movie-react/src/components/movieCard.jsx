import React, {useEffect, useState} from 'react';

import {useNavigate} from 'react-router-dom';

import styled from 'styled-components';

const MovieCard = (props) => {
    const navigate = useNavigate();
    const [movieTitle, setMovieTitle] = useState('');

    useEffect(() => {
        setMovieTitle(props.el.title.replaceAll('<b>', '').replaceAll('</b>', '').replaceAll('&amp;', '&'));
    }, []);
    
    // 더보기 클릭시 상세 페이지로 이동
    const onDetailClick = () => {
        navigate(`/detail/${movieTitle}`, {
            state: {
                poster: props.el.image,
                date: props.el.pubDate,
                rating: props.el.userRating,
                title: movieTitle,
                director: props.el.director,
                actor: props.el.actor
            },
        });
    };


    return (
        <Card.Container>
            <Card.Poster>
                <Card.Image src={props.el.image}/>
            </Card.Poster>
            <Card.ContentContainer>
                <Card.EtcDiv>{movieTitle && movieTitle}</Card.EtcDiv>
                <Card.EtcDiv>{props.el.pubDate}</Card.EtcDiv>
                <Card.EtcDiv>{props.el.userRating}</Card.EtcDiv>
                <Card.EtcDiv>
                    {props.el.director}
                    {props.el.actor}
                </Card.EtcDiv>
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
