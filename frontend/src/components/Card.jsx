import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

import { useAuth } from './AuthContext';
import { useCartContext } from './CartContext';
import { BACKEND_URL } from "./variables.js";

import coin from '../assets/icons/coin.png';
export default function MultiActionAreaCard({ id, title, description, imageUrl, price, soldAt, dateCreated, owner, seller, buyer }) {
  const cardMaxWidth = 300
  const cardMaxHeight = 300
  const itemDescription = description ? ((description.length > 20) ? (description.substring(0, 20).trim() + '...') : description) : "";
  const itemTitle = (title.length > 12) ? (title.substring(0, 12).trim()) : title;
  const { addToCart, removeFromCart, inCart } = useCartContext();
  const { username, email } = useAuth()
  const [isUserInvolved, setIsUserInvolved] = useState(false)
  const [isSold, setIsSold] = useState(false)

  useEffect(() => {
    setIsSold([seller, buyer].includes(username))
  }, [])

  useEffect(() => {
    setIsUserInvolved([owner, seller, buyer].includes(username))
  }, [])

  console.log("AAAAAAAAAAAAAAAAAAAAAa", description, imageUrl)
  console.log("URLLLL", `${BACKEND_URL}${imageUrl}`)

  // TODO: only prevent SA item to be added to backend cart  
  return (
    <Card sx={{ '&:hover': { color: 'green' }, maxWidth: cardMaxWidth, cardMaxHeight }}>
      <CardActionArea
        sx={{ backgroundColor: 'white' }}
        component={isSold ? 'div' : Link}
        to={isSold ? undefined : `/item/?id=${id}`}
      >
        <CardMedia
          component="img"
          height="140"
          image={`${BACKEND_URL}${imageUrl}`}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {itemTitle}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            <Typography
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.25em",
              }}
            >
              {price}
              <img
                src={coin}
                alt="Coin"
                style={{
                  width: "1em",
                  height: "1em",
                }}
              />
            </Typography>
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
        <Typography sx={{ pr: 1.5 }} variant="body2">
          {

            (dateCreated) ?
              (dateCreated) :
              ("Sold " + soldAt)
          }
        </Typography>
      </CardActions>
    </Card>
  );
}