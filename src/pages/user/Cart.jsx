import React, { useEffect, useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import Announcement from "../../components/user/Announcement";
import Footer from "../../components/user/Footer";
import Navbar from "../../components/user/Navbar";
import { mobile } from "../../responsive";
import CartList from "../../components/user/CardProductList";
import Confirmation from "../../components/admin/alert/Confirmation";
import {  connect, useSelector } from "react-redux"
import { FormControl, MenuItem, Select } from "@mui/material";
import { Link } from "react-router-dom";
import NumberFormat from 'react-number-format'


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

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
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

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
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

class Cart extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        dbCartList:[],
        deleteId: '',
        alertDelete: false,
        dbSum: [],
        user: this.props.user,
        delivery: null,
    }

  }

  componentDidMount() {
    this.getCartList();
    this.getSumTotal();
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

  onDeleteConfirmButton = () => {
    this.setState({alertDelete: false});
    Axios.delete(process.env.REACT_APP_API+ `/cart/products/${this.state.deleteId}`)
    .then((response) => {
      alert('Successfully Deleted!');
      this.getCartList();
      this.setState({deleteId: null});
    })
    .catch((err) => {
      console.log(err);
      alert(err);
    })
  }

  onButtonCancelDelete = () => {
    this.setState({alertDelete: false});
    this.setState({deleteId: null});
  }
  
  onDeleteButton = (id) => {
    this.setState({alertDelete: true});
    this.setState({deleteId: id});
  }

  addQty = (id,quantity) => {
    let qty = quantity+1;
    if(qty == 0 ){
      alert("Product Qty Cannot be 0");
    }
    else{
      Axios.patch(process.env.REACT_APP_API+ `/cart/products/${id}`, {qty: qty})
      .then((response) => {
        console.log("Successfully Added!");
        this.setState({dbSum: []});
        this.getCartList();

        this.getSumTotal();
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      })
    }
  }

  reduceQty = (id,quantity) => {
    let qty = quantity-1;
    if(qty == 0 ){
      alert("Product Qty Cannot be 0");
    }
    else{
      Axios.patch(process.env.REACT_APP_API+ `/cart/products/${id}`, {qty: qty})
      .then((response) => {
        console.log("Successfully Reduced!");
        this.getCartList();
        this.setState({dbSum: []});
        this.getSumTotal();
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      })
    }
  }

  getSumTotal = () => {
    Axios.get(process.env.REACT_APP_API+ `/cart/total/${this.state.user}`)
    .then((response) =>{
      this.setState({dbSum: response.data});
    })
    .catch((err) =>{
      console.log(err);
      alert(err);
    })
  }

  handleUserInput (e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
  }

        
  render() {
    let subTotal = 0;
    const calculateSubTotal = () => {
      this.state.dbCartList.map((item,index) => {
        subTotal+= item.qty * item.price;
      })
    }
    return (
      <Container>
        <Navbar />
        <Announcement />
        <Wrapper>
          <Title>YOUR BAG</Title>
          <Top>
            <TopButton>CONTINUE SHOPPING</TopButton>
            <TopTexts>
              <TopText>Shopping Bag({this.state.dbCartList.length})</TopText>
              <TopText>Your Wishlist (0)</TopText>
            </TopTexts>
            <TopButton type="filled"><StyledLink to='/check-out'>CHECKOUT NOW</StyledLink></TopButton>
          </Top>
          <Bottom>
            <Info>
              {this.state.dbCartList.map((item, index) => {
                return(
                  <CartList
                    item = {item}
                    onDelete = {() => this.onDeleteButton(item.id)}
                    onAdd = {() => this.addQty(item.id,item.qty)}
                    onReduce = {() => this.reduceQty(item.id, item.qty)}
                  />
                )
              })}
            </Info>
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                {calculateSubTotal()}
                <SummaryItemPrice>
                  <NumberFormat
                      value={subTotal}
                      thousandSeparator={'.'} 
                      decimalSeparator={','}
                      prefix={'Rp '}
                      displayType={'text'}
                    ></NumberFormat>
                </SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Delivery</SummaryItemText>
                <SummaryItemPrice>NOT YET CALCULATED</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Tax</SummaryItemText>
                <SummaryItemPrice>
                  <NumberFormat
                    value={subTotal*5/100}
                    thousandSeparator={'.'} 
                    decimalSeparator={','}
                    prefix={'Rp '}
                    displayType={'text'}
                  ></NumberFormat>
                </SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>
                  <NumberFormat
                      value={subTotal+=subTotal*5/100}
                      thousandSeparator={'.'} 
                      decimalSeparator={','}
                      prefix={'Rp '}
                      displayType={'text'}
                    ></NumberFormat>
                </SummaryItemPrice>
              </SummaryItem>
              <Button><StyledLink to='/check-out'>CHECKOUT NOW</StyledLink></Button>
            </Summary>
            <Confirmation isOpen= {this.state.alertDelete} title ="Confirmation Delete" onCancel = {this.onButtonCancelDelete} onConfirm = {this.onDeleteConfirmButton}/>
          </Bottom>
        </Wrapper>
        <Footer />
      </Container>
    );
  }
};

const mapStateToProps = state => ({
  user: state.user.user_id,
})


export default connect(mapStateToProps, null)(Cart);
