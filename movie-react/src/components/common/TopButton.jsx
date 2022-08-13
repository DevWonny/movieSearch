import React from 'react';

import styled from 'styled-components';

import ArrowTop from '../../assets/icon/arrowTop.svg';

const TopButton = ({ mainContainerRef }) => {
  const onTop = () => {
    document.querySelector('.scrollTop').scrollTo({
      top: mainContainerRef.current.offsetTop,
      behavior: 'smooth',
    });
  };

  return (
    <TopButtonContainer onClick={() => onTop()}>
      <img src={ArrowTop} alt="topButton" />
    </TopButtonContainer>
  );
};

export default TopButton;

// style
const TopButtonContainer = styled.div`
  position: fixed;
  bottom: 130px;
  right: 3%;
  width: 50px;
  height: 50px;
  border: 1px solid #8fc79a;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #8fc79a;
  }
  & img {
    width: 70%;
    height: 70%;
  }
`;
