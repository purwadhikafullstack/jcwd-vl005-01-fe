import React from "react";
import Axios from "axios";
import { Box, Button, IconButton } from "@mui/material";
import styled from "styled-components";
import { mobile } from "../../responsive";
import { Add, Remove } from "@mui/icons-material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 120px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 20px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const CartList = ({item, index, onDelete, onAdd, onReduce}) => {
    return(
      <Box>
            <Product>
                <Button color="error" sx={{marginRight: '10px'}} onClick={onDelete}><DeleteOutlineIcon/></Button>
                <ProductDetail>
                    <Image src={item.img_url}/>
                    <Details>
                        <ProductName>
                        <b>Product:</b> {item.name}
                        </ProductName>
                        <ProductId>
                        <b>ID:</b> {item.product_id}
                        </ProductId>
                    </Details>
                    </ProductDetail>
                <PriceDetail>
                <ProductAmountContainer>
                    <IconButton onClick={onAdd}><Add /></IconButton>
                    <ProductAmount>{item.qty}</ProductAmount>
                    <IconButton onClick={onReduce}><Remove /></IconButton>
                </ProductAmountContainer>
                <ProductPrice>{item.sum}</ProductPrice>
                </PriceDetail>
            </Product>
            <Hr />
        </Box>
    )
}

export default CartList;