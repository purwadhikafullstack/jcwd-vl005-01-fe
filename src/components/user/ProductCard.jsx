import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Button, Link } from '@mui/material';
import { useNavigate, useParams } from "react-router-dom";

export default function ProductCard({productData}) {
  const Navigate = useNavigate();
  const clickProductCard = () => {
        Navigate(`/products/${productData.id}`)
    }
  const onClickButton = () => {
        Navigate(`/`)
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
          <Typography variant="h6" color="text.secondary">
            Rp {parseInt(productData.price).toLocaleString('de')}
          </Typography>
          <Button onClick={onClickButton} variant='contained'>cart</Button>
        </CardContent>
      
    </Card>
  );
}
