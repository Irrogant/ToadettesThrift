import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography, useTheme } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { useAuth } from './AuthContext';
import { useCartContext } from './CartContext';
import { useNavigate } from 'react-router-dom';
import ChaosButton from './ChaosButton';
import coin from '../assets/icons/coin.png';

export default function MultiActionAreaCard({ id, title, description, imageUrl, price, seller, buyer }) {
  const cardMaxWidth = 300;
  const cardMaxHeight = 300;
  const itemDescription = description ? ((description.length > 50) ? (description.substring(0, 50).trim()) : description) : "";
  const itemTitle = (title.length > 30) ? (title.substring(0, 30).trim()) : title;
  const { addToCart, removeFromCart, inCart } = useCartContext();
  const { username, isLoggedIn } = useAuth();
  const [isUserInvolved, setIsUserInvolved] = useState(false);
  const [isSold, setIsSold] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setIsSold([seller, buyer].includes(username));
  }, []);

  useEffect(() => {
    setIsUserInvolved([seller, buyer].includes(username));
  }, []);

  return (
    <Card sx={{
      '&:hover': { transform: 'scale(1.05)', boxShadow: '0px 10px 20px rgba(255, 0, 127, 0.6)', color: '#ff007f' },
      maxWidth: cardMaxWidth,
      cardMaxHeight,
      background: 'linear-gradient(to right, #ff66b2, #ff007f)',  // Pastel pink gradient
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      backgroundSize: 'cover',
      position: 'relative',
      zIndex: 1,
      boxShadow: '0px 10px 15px rgba(255, 105, 180, 0.2)', // Glittery box shadow
    }}>

      {/* Glitter background effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'url("https://i.imgur.com/tKz9iXk.png") repeat',
        opacity: 0.2,
        zIndex: -1,
      }}></div>

      <CardActionArea
        sx={{ backgroundColor: "rgb(252, 240, 249)", padding: 2 }}
        component={isSold ? 'div' : Link}
        to={isSold ? undefined : `/item/?id=${id}`}
      >
        <CardMedia
          component="img"
          height="160"
          image={`/images/${imageUrl}`}
          alt={title}
          sx={{ boxShadow: '0px 4px 10px rgba(255, 105, 180, 0.5)' }}
        />
        <CardContent sx={{ paddingTop: 1 }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              fontSize: '1.2rem',
              fontWeight: 'bold',
              color: theme.palette.primary.main,
              textAlign: 'center',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 1,
              overflow: 'hidden',
              textShadow: '2px 2px 5px rgba(255, 0, 127, 0.6)', // Glittery text shadow
            }}
          >
            {itemTitle}
          </Typography>
          <Typography gutterBottom variant="h6" component="div" sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: theme.palette.primary.main,
          }}>
          </Typography>
          <Typography variant="body2" sx={{
            color: theme.palette.primary.main,
            fontSize: '0.9rem',
            textAlign: 'center',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 1,
            overflow: 'hidden',
          }}>
            {itemDescription}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions sx={{
        backgroundColor: "rgb(252, 240, 249)",
        justifyContent: "space-between",
        alignItems: "center",
        borderTop: '2px solid #ff66b2',
        padding: '10px 15px',
      }}>
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
              color="secondary"
              sx={{
                color: '#fff',
                borderRadius: '20px',
                '&:hover': { backgroundColor: '#ff66b2' },
              }}
            >
              <RemoveShoppingCartIcon />
            </Button>
          ) : (
            <ChaosButton>
              <Button
                onClick={() => {
                  if (!isLoggedIn) {
                    navigate("/login");
                  } else {
                    addToCart(id);
                  }
                }}
                size="small"
                color="secondary"
                sx={{
                  backgroundColor: '#ff007f',
                  color: '#fff',
                  borderRadius: '20px',
                  '&:hover': { backgroundColor: '#ff66b2' },
                }}
              >
                <AddShoppingCartIcon />
              </Button>
            </ChaosButton>

          )
        )}
        <Typography sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.25em",
          color: theme.palette.primary.main,
        }}>
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
      </CardActions>
    </Card >
  );
}