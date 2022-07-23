import React from "react";
import styled from "styled-components";

const Paging = styled.a`
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  border-radius: 2px;
  border: 1px solid grey;
  margin-left: 2px;
  &:hover {
    background-color: green;
  }&:focus {
    background-color: green;
    color: white;
  }
`;

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (e, number) => {
    e.preventDefault();
    paginate(number);
  };

  return (
    <div>
      {pageNumbers.map((number, index) => (
        <>
          <Paging onClick={(e) => handleClick(e, number)} href="">
            {number}
          </Paging>
        </>
      ))}
    </div>
  );
};

export default Pagination;
