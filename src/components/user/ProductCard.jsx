import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Button } from '@mui/material';

export default function ProductCard({productData}) {
  return (
    <Card sx={{ width: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="240"
          image={productData.picture}
          alt={`picture of ${productData.product_name}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {productData.product_name}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Rp {productData.price}
          </Typography>
          <Button variant='contained'>cart</Button>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
