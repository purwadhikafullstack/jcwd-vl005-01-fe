import { Box } from "@mui/material";
import React from "react";
import Navbar from "../../components/user/Navbar";
import styled from "styled-components";
import { mobile } from "../../responsive";
import Announcement from "../../components/user/Announcement";
import Axios from "axios";
import {  connect, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import UserAddress from "../../components/user/checkout/UserAddress";


const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Info = styled.div`
    flex: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const InfoTitle = styled.h2`
    font-weight: 500;
`

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const InformationBox = styled.div`
    border: 0.5px solid lightgray;
    padding: 20px;
    width: 80%;
    height: 100%;
`

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
  margin-bottom: 10px;
  margin-top: 10px;
`;


const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const CustomButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

const StyledLinkTop = styled(Link)`
  text-decoration: none;
  color: black;
`;

class CheckOut extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dbCartList:[],
            cartList:[],
            deleteId: '',
            alertDelete: false,
            dbSum: [],
            user: this.props.user,
            delivery: null,
        }
    
      }

    componentDidMount() {
        this.getCartList();
    }
    
    getCartList = () => {
        Axios.get(process.env.REACT_APP_API+ `/cart/products/${this.state.user}`)
        .then((response) =>{
            this.setState({dbCartList: response.data});
        })
        .catch((err) =>{
            console.log(err);
            alert(err);
        })
    }
    render(){
        let subTotal = 0;
        const calculateSubTotal = () => {
            this.state.dbCartList.map((item,index) => {
                subTotal+= item.qty * item.price;
            })
        }

        return(
            <Container>
                <Navbar/>
                <Announcement/>
                <Wrapper>
                    <Title>CHECK OUT</Title>
                    <Top>
                        <TopButton><StyledLinkTop to='/cart'>BACK TO CART</StyledLinkTop></TopButton>
                        <TopTexts>
                        <TopText>Shopping Bag({this.state.dbCartList.length})</TopText>
                        </TopTexts>
                    </Top>
                    <Bottom>
                        <Info>
                            <InformationBox>
                                <InfoTitle>INFORMATION</InfoTitle>
                                <UserAddress/>
                            </InformationBox>
                            <Hr/>
                            <InformationBox>
                                <InfoTitle>DELIVERY</InfoTitle>
                            </InformationBox>
                            <Hr/>
                            <InformationBox>
                                <InfoTitle>PAYMENT</InfoTitle>
                            </InformationBox>
                        </Info>
                        <Summary>
                            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                            <SummaryItem>
                                <SummaryItemText>Subtotal</SummaryItemText>
                                {calculateSubTotal()}
                                <SummaryItemPrice>Rp {subTotal}</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem>
                                <SummaryItemText>Delivery</SummaryItemText>
                                <SummaryItemPrice>NOT YET CALCULATED</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem>
                                <SummaryItemText>Tax</SummaryItemText>
                                <SummaryItemPrice>Rp {subTotal*5/100}</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem type="total">
                                <SummaryItemText>Total</SummaryItemText>
                                <SummaryItemPrice>Rp {subTotal+=subTotal*5/100}</SummaryItemPrice>
                            </SummaryItem>
                            <CustomButton><StyledLink to='/check-out'>COMPLETE PURCHASE</StyledLink></CustomButton>
                        </Summary>
                    </Bottom>
                </Wrapper>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.user_id,
  })

export default connect(mapStateToProps, null)(CheckOut);