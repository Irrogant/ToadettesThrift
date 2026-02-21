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
import { useNavigate } from 'react-router-dom';

import coin from '../assets/icons/coin.png';

export default function MultiActionAreaCard({ id, title, description, imageUrl, price, soldAt, dateCreated, owner, seller, buyer }) {
  const cardMaxWidth = 300
  const cardMaxHeight = 300
  const itemDescription = description ? ((description.length > 40) ? (description.substring(0, 40).trim()) : description) : "";
  const itemTitle = (title.length > 20) ? (title.substring(0, 20).trim()) : title;
  const { addToCart, removeFromCart, inCart } = useCartContext();
  const { username, isLoggedIn } = useAuth()
  const [isUserInvolved, setIsUserInvolved] = useState(false)
  const [isSold, setIsSold] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    setIsSold([seller, buyer].includes(username))
  }, [])

  useEffect(() => {
    setIsUserInvolved([owner, seller, buyer].includes(username))
  }, [])


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
          image={`/images/${imageUrl}`}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 1,
            overflow: 'hidden',
          }}>
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
          <Typography variant="body2" sx={{
            color: 'text.secondary',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 1,
            overflow: 'hidden',
          }}>
            {itemDescription}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions sx={{ backgroundColor: 'white', justifyContent: "space-between", alignItems: "center", borderTop: '1px solid grey', }}>
        {!isUserInvolved && (
          inCart(id) ? (
            <Button
              onClick={() => {
                if (!isLoggedIn) {
                  navigate("/login");
                } else {
                  removeFromCart(id);
                }
              }}
              size="small"
              color="primary"
            >
              <RemoveShoppingCartIcon />
            </Button>
          ) : (
            <Button
              onClick={() => {
                if (!isLoggedIn) {
                  navigate("/login");
                } else {
                  addToCart(id);
                }
              }}
              size="small"
              color="primary"
            >
              <AddShoppingCartIcon />
            </Button>
          )
        )}
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