import React from "react";
import Topbar from "../../../components/admin/topbar/Topbar";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import styled from "styled-components";
import Products from "../../../components/admin/product/productList";
import ProductList from "../productList/ProductList";
import "./product.css";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;
class AdminProductList extends React.Component{

  render(){
    return (
      <Container>
        <Topbar />
        <div className="productlistWrapper">
          <Sidebar />
          <div className="productList">
            <ProductList/>
            <Products />
          </div>
        </div>
      </Container>
    );
  }
}

export default AdminProductList;
