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
  flex: 4;
  display: flex;
  flex-direction: column;
  position: relative;
`;
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin-bottom: 30px;
`;
const Title = styled.h2`
  padding: 20px;
  display: flex;
  justify-content: center;
`;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useSearchParams();

  const searchTerm = search.get("filter") || "";
  const searchCate = search.get("category") || "";
  const searchSort = search.get("sort") || "";

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);

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
  const currentPosts = filtered.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    Axios.get(process.env.REACT_APP_API + "/products")
      .then((res) => {
        setProducts(() => res.data);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Box>
      {/* <Title>Men</Title> */}
      <Container>
        {currentPosts?.map((product, index) => (
          <Product productData={product} key={index} />
        ))}
        {currentPosts.length === 0 && <span>data tidak ada, kembali ke page sebelumnya</span>}
      </Container>
      <Paginations
        paginate={paginate}
        postsPerPage={postsPerPage}
        totalPosts={products.length}
      />
      {/* <Pagination margin count={10} variant="outlined" /> */}
    </Box>
  );
};

export default Products;
