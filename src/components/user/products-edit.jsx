import styled from "styled-components";
import { popularProducts } from "../../data";
import Product from "./ProductCard";
import { Pagination } from "@mui/material";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Paginations from "../user/Paginations";

const Box = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
`;
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 50px;
`;
const Title = styled.h2`
  padding: 20px;
  display: flex;
  justify-content: center;
`;

const Productsxx = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [searchQuery, setsearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  // const [page, setPage] = useState(1);
  // const [productsPerPage, setProductsPerPage] = useState(6);

  const [search, setSearch] = useSearchParams();

  const searchTerm = search.get("filter") || "";
  const searchCate = search.get("category") || "";
  const searchSort = search.get("sort") || "";

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);

  const filtered =
    !searchTerm && !searchCate && !searchSort
      ? products
      : products
          ?.filter((s) => {
            if (searchTerm)
              return s?.name.toLowerCase().includes(searchTerm?.toLowerCase());
            if (searchCate === "all") return s;
            if (searchCate === `${s?.categoryId}`) return s;
          })
          .sort((a, b) => {
            if (searchSort === "high price") return b.price - a.price;
            if (searchSort === "low price") return a.price - b.price;
            if (searchSort === "latest") return b.id - a.id;
          });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filtered;

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [totalPage, setTotalPage] = useState();

  const [page, setPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(6)
  
  function pageChangeHandler(event, pageNumber = 1) {
      setPage(pageNumber)
  }

  useEffect(() => {
    Axios.get(process.env.REACT_APP_API + `/count`)
      .then((res) => {
        setTotalPage(Math.ceil(res.data[0].total/productsPerPage))
        console.log(totalPage)
      }) 
      .catch((error) => {
        console.log(error);
      });
  },[]);

  useEffect(() => {
    Axios.get(process.env.REACT_APP_API + `/products?page=${page}&limit=${productsPerPage}`)
      .then((res) => {
        setProducts(() => res.data);
        console.log(res);
      }) 
      .catch((error) => {
        console.log(error);
      });
  },[
    page,
    productsPerPage
  ]);

  return (
    <Box>
      {/* <Title>Men</Title> */}
      <Container>
        {currentPosts?.map((product, index) => (
          <Product productData={product} key={index} />
        ))}
        {/* {currentPosts.length === 0 && (
          <span>data di page {currentPage} tidak ada</span>
        )} */}
      </Container>
      {/* <Paginations
        paginate={paginate}
        postsPerPage={postsPerPage}
        totalPosts={products.length}
      /> */}
      <Pagination margin count={totalPage} variant="outlined" onChange={(event, pageNumber) => pageChangeHandler(event, pageNumber)} />
    </Box>
  );
};

export default Products;
