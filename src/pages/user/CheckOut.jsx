import { Accordion, AccordionDetails, AccordionSummary, Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, Stack, TextField, Typography} from "@mui/material";
import React from "react";
import Navbar from "../../components/user/Navbar";
import styled from "styled-components";
import { mobile } from "../../responsive";
import Announcement from "../../components/user/Announcement";
import Axios from "axios";
import {  connect, useSelector } from "react-redux"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link, Navigate, useNavigate } from "react-router-dom";
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { green } from "@mui/material/colors";
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
  min-height: 50vh;
  max-height: 110vh;
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

const styledTitle = styled.h3`
    font-size: 24px;
    font-weight: 200;
`

const titleForm = styled.h5`
    font-size: 15px;
    font-weight: 200;
`

const detailsText = styled.h6`
    font-size: 12px;
    font-weight: 100;
`

const CustomButtonSubmit = styled.button`
  width: 20%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const OutlineButton = styled.button`
    width: 20%;
    padding: 10px;
    color: white;
    font-weight: 600;
    border: filled;
`
const Input = styled('input')({
  display: 'none',
});

const HrLine = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const CustomLink = styled(Link)`
  color: black;
  text-decoration: none;
`;
class CheckOut extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dbCartList:[],
            cartList:[],
            dbSum: [],
            user: this.props.user,
            delivery: null,
            deliveryId: null,
            dbAddress: [],
            deliveryAddress: [],
            addOpen: false,
            address: null,
            postal: null,
            city: null,
            province: null,
            label: null,
            lat:0.0,
            long:0.0,
            openDetails:false,
            deliveryFee:0,
            transaction: [],
            img_url:null,
            successOpen: false
        }
    
      }

    componentDidMount() {
        this.getCartList();
        this.getAddress();
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

    getAddress = () => {
      Axios.get(process.env.REACT_APP_API+`/checkout/address/${this.state.user}`)
      .then((response) => {
          this.setState({dbAddress: response.data})
      })
      .catch((err) => {
          console.log(err);
          alert(err);
      })
  }

  getAddressById = () => {
      Axios.get(process.env.REACT_APP_API+`/user/checkout/address/${this.state.deliveryId}`)
      .then((response) => {
          this.setState({deliveryAddress: response.data})
      })
      .catch((err) => {
          console.log(err);
          alert(err);
      })
  }

  addAddress = () => {
      Axios.post(process.env.REACT_APP_API+`/checkout/address`, {user_id: this.state.user, user_address: this.state.address, postal: this.state.postal, city: this.state.city, province: this.state.province, label: this.state.label, lat: this.state.lat, long: this.state.long})
      .then((response) => {
          alert("Succesfully Add Address");
          this.setState({deliveryAddress: response.data})
          this.setState({addOpen: false})
          this.setState({address: null})
          this.setState({postal: null})
          this.setState({city: null})
          this.setState({province: null})
          this.setState({label: null})
          this.setState({lat: null})
          this.setState({long: null})
      })
      .catch((err) => {
          console.log(err);
          alert(err);
          this.setState({addOpen: false})
          this.setState({address: null})
          this.setState({postal: null})
          this.setState({city: null})
          this.setState({province: null})
          this.setState({label: null})
          this.setState({lat: null})
          this.setState({long: null})
      })
  }

  RandNum = () => {
    return Math.floor(Math.random() * (9 - 1 + 1)) + 1;
  }

  onSubmitTransaction = (subTotal) => {

    this.setState({successOpen: true})
    let tcode = "TR" + this.RandNum() + this.RandNum() + this.RandNum();
    const formData = new FormData();
    formData.append("tcode", tcode);
    formData.append("warehouse_id", 1);
    formData.append("user_id", this.state.user);
    formData.append("grand_total", subTotal);
    formData.append("address", this.state.deliveryAddress[0].address);
    formData.append("city", this.state.deliveryAddress[0].city);
    formData.append("postal", this.state.deliveryAddress[0].postal);
    formData.append("province", this.state.deliveryAddress[0].province);
    formData.append("lat", this.state.deliveryAddress[0].latitude);
    formData.append("long", this.state.deliveryAddress[0].longitude);
    formData.append("file", this.state.img_url);

    Axios.post(process.env.REACT_APP_API + `/checkout/products`, formData)
    .then((response) => {
      console.log(response.data);
      this.setState({successOpen: true})
    })
    .catch((err) => {
        console.log(err);
        alert(err);
    })
  }

  handleUserInput (e) {
      const name = e.target.name;
      const value = e.target.value;
      this.setState({[name]: value});
  }
  
  onSaveAddressButton = () => {
      this.setState({openDetails: true});
      this.getAddressById();
  }

  printDeliveryDetails = () => {
      return(
          <Box>
              <styledTitle>Detail Delivery Address</styledTitle>
              <Hr/>
              {this.state.deliveryAddress.map((item,index) => {
                  return(
                      <Box display='flex' flexDirection='column'>
                          <detailsText>Label: {item.label} </detailsText>
                          <detailsText>Address: {item.address} </detailsText>
                          <detailsText>City:  {item.city} </detailsText>
                          <detailsText>Province:  {item.province} </detailsText>
                          <detailsText>Post Code: {item.postal} </detailsText>
                      </Box>
                  )
              })}
          </Box>
      )
  }
  
  

  printAddress = () => {
      return(
          <Box display='flex' flexDirection='column'>
              <styledTitle>Delivery Address</styledTitle>
              <Hr/>
              <FormControl>
                  <Select
                      value={this.state.deliveryId}
                      name="deliveryId"
                      required
                      onChange={(event) => this.handleUserInput(event)}
                  >
                      {this.state.dbAddress.map((item,index) => {
                          return(
                              <MenuItem
                                  value={item.id}
                              >
                                  <Box display='flex' flexDirection='column'>
                                      {item.label},{item.address}
                                  </Box>
                              </MenuItem>
                          )
                      })}
                  </Select>
              </FormControl>
              <Stack spacing={5} direction='row' marginTop='20px'>
                  <CustomButton onClick={() => this.onSaveAddressButton()}>SAVE ADDRESS</CustomButton>
                  <CustomButton onClick={() => this.setState({addOpen: true})}>ADD NEW ADDRESS</CustomButton>
              </Stack>
          </Box>
      )
  }


  AddressForm = () => {
      return(
          <Box>
              <titleForm>Address Information</titleForm>
              <Box marginBottom='30px'>
                  <Hr/>
                  <FormControl>
                      <TextField label="Label" 
                          fullWidth 
                          required 
                          helperText="Please input the label of the address"
                          onChange={(event) => this.handleUserInput(event)}
                          value = {this.state.label}
                          name="label"
                      />
                  </FormControl>
                  <Hr/>
                  <FormControl>
                      <TextField label="Address" 
                          fullWidth 
                          required 
                          onChange={(event) => this.handleUserInput(event)}
                          value = {this.state.address}
                          name="address"
                      />
                  </FormControl>
                  <Hr/>
                  <FormControl>
                      <TextField 
                          label="Post Code" 
                          fullWidth 
                          required 
                          helperText="E.g 23873"
                          onChange={(event) => this.handleUserInput(event)}
                          value = {this.state.postal}
                          name="postal"
                      />
                  </FormControl>
                  <Hr/>
                  <Stack spacing={5} direction='row'>
                      <FormControl>
                          <TextField label="City" 
                              fullWidth 
                              required
                              onChange={(event) => this.handleUserInput(event)}
                              value = {this.state.city}
                              name="city"
                          />
                      </FormControl>
                      <FormControl>
                          <TextField 
                              label="Province" 
                              fullWidth 
                              required
                              onChange={(event) => this.handleUserInput(event)}
                              value = {this.state.province}
                              name="province"
                          />
                      </FormControl>
                  </Stack>
                  <Hr/>
                  <Stack spacing={5} direction='row'>
                      <FormControl>
                          <TextField 
                              label="Latitude" 
                              fullWidth 
                              required 
                              helperText="E.g -6.26979813"
                              onChange={(event) => this.handleUserInput(event)}
                              value = {this.state.lat}
                              name="latitude"
                          />
                      </FormControl>
                      <FormControl>
                          <TextField 
                              label="Longitude" 
                              fullWidth 
                              required 
                              helperText="E.g 6.26979813"
                              onChange={(event) => this.handleUserInput(event)}
                              value = {this.state.long}
                              name="longitude"
                          />
                      </FormControl>
                  </Stack>
              </Box>
              <CustomButtonSubmit onClick={() => this.addAddress()}>SAVE ADDRESS</CustomButtonSubmit>
          </Box>
      )
  }

  AddressFormExtends = () => {
      return(
          <Box>
              <titleForm>Address Information</titleForm>
              <Box marginBottom='30px'>
                  <Hr/>
                  <FormControl>
                      <TextField label="Label" 
                          fullWidth 
                          required 
                          helperText="Please input the label of the address"
                          onChange={(event) => this.handleUserInput(event)}
                          value = {this.state.label}
                          name="label"
                      />
                  </FormControl>
                  <Hr/>
                  <FormControl>
                      <TextField label="Address" 
                          fullWidth 
                          required 
                          onChange={(event) => this.handleUserInput(event)}
                          value = {this.state.address}
                          name="address"
                      />
                  </FormControl>
                  <Hr/>
                  <FormControl>
                      <TextField 
                          label="Post Code" 
                          fullWidth 
                          required 
                          helperText="E.g 23873"
                          onChange={(event) => this.handleUserInput(event)}
                          value = {this.state.postal}
                          name="postal"
                      />
                  </FormControl>
                  <Hr/>
                  <Stack spacing={5} direction='row'>
                      <FormControl>
                          <TextField label="City" 
                              fullWidth 
                              required
                              onChange={(event) => this.handleUserInput(event)}
                              value = {this.state.city}
                              name="city"
                          />
                      </FormControl>
                      <FormControl>
                          <TextField 
                              label="Province" 
                              fullWidth 
                              required
                              onChange={(event) => this.handleUserInput(event)}
                              value = {this.state.province}
                              name="province"
                          />
                      </FormControl>
                  </Stack>
                  <Hr/>
                  <Stack spacing={5} direction='row'>
                      <FormControl>
                          <TextField 
                              label="Latitude" 
                              fullWidth 
                              required 
                              helperText="E.g -6.26979813"
                              onChange={(event) => this.handleUserInput(event)}
                              value = {this.state.lat}
                              name="lat"
                          />
                      </FormControl>
                      <FormControl>
                          <TextField 
                              label="Longitude" 
                              fullWidth 
                              required 
                              helperText="E.g 6.26979813"
                              onChange={(event) => this.handleUserInput(event)}
                              value = {this.state.long}
                              name="long"
                          />
                      </FormControl>
                  </Stack>
              </Box>
              <Stack spacing={5} direction='row'>
                  <CustomButtonSubmit onClick={() => this.addAddress()}>SAVE ADDRESS</CustomButtonSubmit>
                  <CustomButtonSubmit onClick={() => this.setState({addOpen: false})}>CANCEL</CustomButtonSubmit>
              </Stack>
          </Box>
      )
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
                                  <Box padding='10px' marginTop='10px'>
                                  {
                                      this.state.dbAddress.length == 0 ?
                                      this.AddressForm()
                                      : 
                                      this.printAddress()
                                  }
                                  <Hr/>
                                  {
                                      this.state.addOpen == true ?
                                      this.AddressFormExtends()
                                      :
                                      <div></div>
                                  }
                                  {
                                      this.state.openDetails == true ?
                                      this.printDeliveryDetails()
                                      :
                                      <div></div>
                                  }
                              </Box>
                            </InformationBox>
                            <Hr/>
                            <InformationBox>
                                <InfoTitle>DELIVERY</InfoTitle>
                                <Box display='flex' flexDirection='column' padding='10px' marginTop='10px' >
                                  <styledTitle>Delivery Courier</styledTitle>
                                  <Hr/>
                                  <FormControl>
                                      <Select
                                          value={this.state.deliveryFee}
                                          name="deliveryFee"
                                          required
                                          onChange={(event) => this.handleUserInput(event)}
                                      >
                                          <MenuItem value={10000}>Tiki, Rp 10.000</MenuItem>
                                          <MenuItem value={12000}>JNE, Rp 12.000</MenuItem>
                                          <MenuItem value={9000}>SiCepat, Rp 9.000</MenuItem>
                                      </Select>
                                  </FormControl>
                            </Box>
                            </InformationBox>
                            <Hr/>
                            <InformationBox>
                                <InfoTitle>PAYMENT</InfoTitle>
                                <Box display='flex' flexDirection='column' padding='10px' marginTop='10px'>
                                    <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
                                      <styledTitle>Virtual Account</styledTitle>
                                      <Hr/>
                                      <InfoTitle>5556052961315825</InfoTitle>
                                    </Box>
                                    <Hr/>
                                </Box>
                                <styledTitle>Upload Proof of Payment</styledTitle>
                                <Hr/> 
                                <Box color='neutral' display='flex' flex-direction='column' justifyContent='center' alignItems='center' width='100%' height='150px' border='1px dotted #508dcd'>
                                  <Stack spacing={2} alignItems="center">
                                    <label htmlFor="paymentProof">
                                      <Input accept="image/*" id="paymentProof" multiple type="file" onChange={(e) => this.setState({img_url: e.target.files[0]})}/>
                                      <Button variant="contained" component="span" sx={{backgroundColor: 'black'}}>
                                        UPLOAD IMAGE
                                      </Button>
                                    </label>
                                    <Box>
                                      {
                                        this.state.img_url == null ?
                                        "No File Uploded"
                                        :
                                        "File Uploaded"
                                      }
                                    </Box>
                                  </Stack>
                                </Box>
                            </InformationBox>
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
                                <SummaryItemPrice>
                                  {
                                    this.state.deliveryFee == 0 ?
                                    "NOT YET CALCULATED"
                                    :
                                    <NumberFormat
                                        value={this.state.deliveryFee}
                                        thousandSeparator={'.'} 
                                        decimalSeparator={','}
                                        prefix={'Rp '}
                                        displayType={'text'}
                                    ></NumberFormat>
                                  }
                                </SummaryItemPrice>
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
                                        value={subTotal+=subTotal*5/100+this.state.deliveryFee}
                                        thousandSeparator={'.'} 
                                        decimalSeparator={','}
                                        prefix={'Rp '}
                                        displayType={'text'}
                                    ></NumberFormat>
                                </SummaryItemPrice>
                            </SummaryItem>
                            <CustomButton onClick={() => this.onSubmitTransaction(subTotal)}><StyledLink to='/check-out'>COMPLETE PURCHASE</StyledLink></CustomButton>
                            <Hr/>
                            <Accordion>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                              >
                                <SummaryItemText>VIEW ORDER DETAILS</SummaryItemText>
                              </AccordionSummary>
                              <AccordionDetails>
                                  {
                                    this.state.dbCartList.map((item,index) => {
                                      return (
                                        <Box>
                                          <Stack direction="row" spacing={5}>
                                            <img src={item.img_url} width="10%"/>
                                            <Stack direction="column" spacing={5}>
                                                <SummaryItemText>{item.name}</SummaryItemText>
                                                <SummaryItemText>{item.price}</SummaryItemText>
                                            </Stack>
                                          </Stack>
                                          <HrLine/>
                                        </Box>
                                      )
                                    })
                                  }
                              </AccordionDetails>
                            </Accordion>
                        </Summary>
                    </Bottom>
                </Wrapper>
                <Modal
                  open={this.state.successOpen}
                >
                  <Box sx={style}>
                    <Stack alignItems="center">
                      <CheckCircleOutlineRoundedIcon sx={{ color: green[500], fontSize: 100}}/>
                      <Typography sx={{ mt: 2, fontWeight: 'bold'}}>
                        Transaction Has Been Succesfully Made.
                      </Typography>
                      <Button onClick={() => this.setState({successOpen: false})}><CustomLink to="/" text-decoration= "none">Close</CustomLink></Button>
                    </Stack>
                  </Box>
                </Modal>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.user_id,
})

export default connect(mapStateToProps, null)(CheckOut);