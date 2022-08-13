import React from 'react';

import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

const Detail = () => {
  // navigate
  const navigate = useNavigate();

  return (
    <DetailContainer>
      <BackButton
        onClick={() => {
          navigate('/');
        }}>
        목록보기
      </BackButton>

      <DetailWrap>
        <DetailPoster>Poster</DetailPoster>
        <DetailDiv>Title</DetailDiv>
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
