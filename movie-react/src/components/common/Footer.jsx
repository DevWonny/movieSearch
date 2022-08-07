// react
import React, { useState, useEffect } from 'react';

// style
import styled from 'styled-components';

// moment
import moment from 'moment';

const Footer = () => {
  // 오늘 날짜 및 시간 실시간으로 보여주기
  const [today, setToday] = useState('');
  useEffect(() => {
    setInterval(() => {
      setToday(moment().format('YYYY. MM. DD. hh:mm'));
    }, 1000);
  }, []);

  return <FooterContainer>{today}</FooterContainer>;
};

export default Footer;

// style
const FooterContainer = styled.div`
  width: 100%;
  height: 100px;
  position: fixed;
  bottom: 0;
  border-top: 2px solid #cee9b6;
  background: #8fc79a;
  color: #2d8d79;
  font-weight: bold;
  font-size: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;
