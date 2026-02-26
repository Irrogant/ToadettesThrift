import {
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Button,
} from '@mui/material';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

import { useCartContext } from './CartContext';
import coin from '../assets/icons/coin.png';  // Import the coin image

export default function ListObject({ id, title, imageURL, price }) {
    const { addToCart, removeFromCart, inCart } = useCartContext();

    return (
        <ListItem
            sx={{
                backgroundColor: 'white', // Apply white background here
                marginBottom: '8px', // Optional: add margin between items
                padding: '12px', // Optional: add padding inside the item
                borderRadius: '8px', // Optional: rounded corners for items
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)" // Optional: add subtle shadow to items
            }}
        >
            <ListItemAvatar>
                <Avatar
                    src={`/images/${imageURL}`}
                    alt={title}
                    sx={{ width: 40, height: 40 }}
                />
            </ListItemAvatar>
            <ListItemText
                primary={title}
                secondary={
                    <>
                        <span style={{ color: "#BA51A0" }}>
                            {price} {/* Price in pink */}
                        </span>
                        <img
                            src={coin}
                            alt="Coin"
                            style={{
                                width: "1em",
                                height: "1em",
                                marginLeft: "0.5em" // Small gap between the price and the coin icon
                            }}
                        />
                    </>
                }
                sx={{
                    color: "#BA51A0", // Pink color for the text
                    '& .MuiListItemText-primary': {
                        color: "#BA51A0", // Pink color for the primary (title)
                    },
                    '& .MuiListItemText-secondary': {
                        color: "#BA51A0", // Pink color for the secondary (price and message)
                    },
                }}
            />
            {
                inCart(id) ?
                    (<Button onClick={() => removeFromCart(id)} size="small" color="primary">
                        <RemoveShoppingCartIcon />
                    </Button>
                    ) :
                    (
                        <Button onClick={() => addToCart(id)} size="small" color="primary">
                            <AddShoppingCartIcon />
                        </Button>
                    )
            }
        </ListItem>
    );
}