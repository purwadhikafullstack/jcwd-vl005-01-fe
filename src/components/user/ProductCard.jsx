import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Button, Link, Box } from '@mui/material';
import { useNavigate, useParams} from "react-router-dom";
import Axios from "axios";
import { useSelector } from 'react-redux';

export default function ProductCard({productData}) {
  const Navigate = useNavigate();
  const userData = useSelector((state) => state.user.user_id)
  const isVerified = useSelector((state) => state.user.status)

  const clickProductCard = () => {
        Navigate(`/products/${productData.id}`)
  }
  const onClickButton = (product_id, qty) => {
    let quantity = qty+1;
    Axios.post(process.env.REACT_APP_API + '/cart/products', {user_id: userData, product_id: product_id, qty:quantity})
    .then((response) => {
      alert("Succesfully Add Product To Cart");
    })
    .catch((err) => {
      console.log(err);
      alert(err);
    })
    Navigate(`/cart`)
  }

  return (
    <Card sx={{ width: 345, margin: 2 }} >
      <CardActionArea onClick={clickProductCard}>
        <CardMedia
          component="img"
          height="240"
          image={productData.img_url}
          alt={`picture of ${productData.name}`}
        />
      </CardActionArea>
        <CardContent>
          <Link underline="hover" onClick={clickProductCard} gutterBottom variant="h5" component="button">
            {productData.name}
          </Link>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6" >
              Rp {parseInt(productData.price).toLocaleString('de')}
            </Typography>
            <Typography variant="h6" color="text.secondary">Stock : {productData.stock}</Typography>
          </Box>
          { isVerified == "active" ? 
            <Button onClick={() => {
              if(productData.stock == null || productData.stock == 0){
                alert("Product Out Of Stock")
              }
              else{
                onClickButton(productData.id, productData.qty)
              }
  
            }} variant='contained'>cart</Button>
            :
            <Button variant='contained' disabled>cart</Button>
          }
        </CardContent>
      
    </Card>
  );
}
