import styled from "styled-components";
import Product from "./ProductCard";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Pagination } from "@mui/material";
import Paginations from "./Paginations";
import ProductPagination from "./ProductsPagination";

const Box = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
`;
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const Title = styled.h2`
  padding: 20px;
  display: flex;
  justify-content: center;
`;

const Products = () => {
  const [products, setProducts] = useState([]);
  // const [category, setCategory] = useState("");
  // const [searchQuery, setsearchQuery] = useState("");
  // const [sortOrder, setSortOrder] = useState("");
  // const [page, setPage] = useState(1);
  // const [productsPerPage, setProductsPerPage] = useState(5);

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
          ?.filter((instore) => {
            if (searchTerm)
              return instore?.product_name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            if (searchCate === "all") return instore;
            if (searchCate === "male") return instore?.gender === "male";
            if (searchCate === "female") return instore?.gender === "women";
          })
          .sort((a, b) => {
            if (searchSort === "high price") return b.price - a.price;
            if (searchSort === "low price") return a.price - b.price;
            if (searchSort === "latest") return b.product_id - a.product_id;
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
    <Box className="position-relative">
      {/* <Title>Men</Title> */}
      <Container className="mb-5">
        {currentPosts?.map((product, index) => (
          <Product productData={product} key={index} />
        ))}
      </Container>
      {/* <ProductPagination/> */}
      <Paginations
        paginate={paginate}
        postsPerPage={postsPerPage}
        totalPosts={products.length}
      />
      {/* <Pagination 
        count={count} 
        page={page}
        onChange={handleChange}
        variant="outlined" /> */}
    </Box>
  );
};

export default Products;
