import React from "react";

import styled from 'styled-components';

const Pagination = ({totalPage, currentPage, setCurrentPage,setMovieStart, movieStart})=>{

    // 이전 버튼 클릭 이벤트
    const onPrev = ()=>{
        if(currentPage-1 > 0){
            setCurrentPage(currentPage-1);
            setMovieStart(movieStart-10)
        } else{
            setCurrentPage(currentPage);
            setMovieStart(movieStart);
        }
    }

    // 다음 버튼 클릭 이벤트
    const onNext = ()=>{
        if(currentPage === totalPage){
            setCurrentPage(currentPage);
        } else{
            setCurrentPage(currentPage +1);
            setMovieStart(movieStart+10)
        }
    }

    return(
        <PaginationContainer>
            <Button onClick={()=>onPrev()}>&lt;</Button>
            {Array(totalPage).fill().map((_,index)=>(
                <Button key={`pagination-Button-${index+1}`} current={currentPage === index+1 ? "current" : null} onClick={()=>{
                    setCurrentPage(index+1);
                    setMovieStart(index*10+1);
                }}>{index+1}</Button>
            ))}
            <Button onClick={()=>onNext()}>&gt;</Button>
        </PaginationContainer>
    )
}

export default Pagination;

const PaginationContainer = styled.div`
  width : 100%;
  height : 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  border : 1px solid #8fc79a;
  box-sizing: border-box;
  border-radius: 5px;
  padding : 8px;
  font-size : 20px;
  color : #cee9b6;
  background : ${props=> props.current ? "#8fc79a" : "transparent" };  
  cursor: pointer;
  margin-left : 10px;

  &:hover {
    background-color: #8fc79a;
  }
`;


