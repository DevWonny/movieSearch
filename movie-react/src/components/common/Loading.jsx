import { TailSpin } from 'react-loader-spinner';
import styled from 'styled-components';

const Loading = ({ text }) => {
  return (
    <LoadingContainer>
      <TailSpin width={80} height={80} color="#F2E9CF" />
      <LoadingText>{text ? text : 'Loading...'}</LoadingText>
    </LoadingContainer>
  );
};

export default Loading;

// style
const LoadingContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #162719;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoadingText = styled.p`
  width: 100%;
  position: relative;
  top: 10px;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  color: #f2e8cf;
`;
