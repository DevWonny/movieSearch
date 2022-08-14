import { TailSpin } from 'react-loader-spinner';
import styled from 'styled-components';

const Loading = ({ text }) => {
  return (
    <LoadingContainer>
      <TailSpin width={80} height={80} color="#CEE9B6" />
      <LoadingText>{text ? text : '로딩 중...'}</LoadingText>
    </LoadingContainer>
  );
};

export default Loading;

// style
const LoadingContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #2d8d79;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
`;

const LoadingText = styled.p`
  width: 100%;
  position: relative;
  top: 10px;
  text-align: center;
  font-size: 30px;
  /* font-weight: 700; */
  color: #cee9b6;
`;
