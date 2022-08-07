// react
import React from 'react';

// style
import styled from 'styled-components';

// component
import MovieCard from '../components/MovieCard';

const Main = () => {
  return (
    <MainContainer>
      <MainHeader>
        <SearchBar placeholder="검색어를 입력해주세요." />
      </MainHeader>
      {/* Component */}
      <MovieCard />
    </MainContainer>
  );
};

export default Main;

// style
const MainContainer = styled.div`
  width: 100%;
  height: calc(100vh - 202px);
  overflow: auto;
  background-color: #2d8d79;
  padding: 101px 0;
  position: relative;
`;

const MainHeader = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100px;
  border-bottom: 1px solid #cee9b6;
  background: #2d8d79;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
`;

const SearchBar = styled.input`
  width: 50%;
  height: 40px;
  outline: none;
  padding: 0 10px;
  color: #cee9b6;
  background-color: transparent;
  border: 1px solid #cee9b6;
  border-radius: 10px;
  &::placeholder {
    color: #cee9b6;
  }
`;
