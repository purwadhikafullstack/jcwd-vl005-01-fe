import { Add, Remove } from "@mui/icons-material";
import styled from "styled-components";
import Announcement from "../../components/user/Announcement";
import Footer from "../../components/user/Footer";
import Navbar from "../../components/user/Navbar";
import Newsletter from "../../components/user/Newsletter";
import { mobile } from "../../responsive";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IconButton, Button } from "@mui/material";
import { useSelector } from "react-redux";



const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;
const TitleCat = styled.h3`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const ContainerP = styled.div`
  width: 80%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

// const Button = styled.button`
//   padding: 15px;
//   border: 2px solid teal;
//   background-color: white;
//   cursor: pointer;
//   font-weight: 500;

//   &:hover {
//     background-color: #f8f4f4;
//   }
// `;

const Product = () => {
  const [productData, setProductData] = useState([]);
  const [qty, setQty] = useState(0);
  const params = useParams()
  const userData = useSelector((state) => state.user.user_id)
  const isVerified = useSelector((state) => state.user.status)

  useEffect(() => {
    Axios.get(process.env.REACT_APP_API + `/products/${params.id}`)
      .then((res) => {
        setProductData(() => res.data);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const addToCart = (product_id) => {
    Axios.post(process.env.REACT_APP_API + '/cart/products', {user_id: userData, product_id: product_id, qty: qty})
    .then((response) => {
      alert("Succesfully Add Product To Cart");
      setQty(0)
    })
    .catch((err) => {
      console.log(err);
      alert(err);
      setQty(0)
    })
  }

  return (
    <Container>
      <Navbar />
      <Announcement />
      {productData.map(product => (
      <Wrapper key={product.id}>
        <ImgContainer>
          <Image src={product.img_url} />
        </ImgContainer>
        <InfoContainer>
          <TitleCat>{product.categoryName}</TitleCat>
          <Title>{product.name}</Title>
          <Desc>
            {product.description}
          </Desc>
          <ContainerP>
            <Price>Rp {parseInt(product.price).toLocaleString('de')}</Price>
            <Price>{product.weight_gram} gram</Price>
          </ContainerP>
          <AddContainer>
            <AmountContainer>
              <Price>Stock : {product.stock}</Price>
              <IconButton onClick={() => {
                if(qty==0) {
                  alert("Quantity Cannot Be Less Than 0")
                }
                else{
                  setQty(qty-1)
                }
              }}>
                  <Remove/>
              </IconButton>
              <Amount>{qty}</Amount>
              <IconButton onClick={() => {
                if(qty >= product.stock){
                  alert("Product Quantity Exceeds Product Stock")
                }
                else{
                  setQty(qty+1)
                }
              }}><Add /></IconButton>
            </AmountContainer>
            {isVerified == "active" ?
            <Button onClick={() => {
              if(productData.stock == null || productData.stock == 0){
                alert("Product Out Of Stock")
              }
              else{
                addToCart(productData.id, productData.qty)
              }
  
            }} variant='contained'>ADD TO CART</Button>
             :
            <Button variant='contained' disabled>ADD TO CART</Button>}
          </AddContainer>
        </InfoContainer>
      </Wrapper>))}
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
