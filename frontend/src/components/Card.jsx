import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Typography, Button } from '@mui/material';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { Link } from "react-router-dom";
import { useCartContext } from "./CartContext"
import { useAuth } from "./AuthContext";

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

export default function MultiActionAreaCard({ id, title, description, imageName, price, dateAdded, owner, seller, buyer }) {
  const cardMaxWidth = 300
  const cardMaxHeight = 300
  const itemDescription = description ? ((description.length > 20) ? (description.substring(0, 20).trim() + '...') : description) : "";
  const itemTitle = (title.length > 12) ? (title.substring(0, 12).trim()) : title;
  const { addToCart, removeFromCart, inCart } = useCartContext();
  const { username, email } = useAuth()
  const isUserInvolved = [owner, seller, buyer].includes(username);

  // TODO: only prevent SA item to be added to backend cart  

  return (
    <Card sx={{ '&:hover': { color: 'green' }, maxWidth: cardMaxWidth, cardMaxHeight }}>
      <CardActionArea sx={{ backgroundColor: 'white' }} component={Link} to={`/item/?id=${id}`}>
        <CardMedia
          component="img"
          height="140"
          image={`/assets/images/cards/${imageName}.jpg`}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {itemTitle}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {price}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', maxHeight: 4 }}>
            {itemDescription}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions sx={{ backgroundColor: 'white', justifyContent: "space-between", alignItems: "center", borderTop: '1px solid grey', }}>
        {(isUserInvolved) ?
          null :
          (
            (inCart(id)) ?
              (<Button onClick={() => removeFromCart(id)} size="small" color="primary">
                <RemoveShoppingCartIcon />
              </Button>
              ) :
              (
                <Button onClick={() => addToCart(id)} size="small" color="primary">
                  <AddShoppingCartIcon />
                </Button>
              )

          )
        }
        <Typography sx={{ pr: 1.5 }} variant="body2"> {dateAdded} </Typography>
      </CardActions>
    </Card>
  );
}