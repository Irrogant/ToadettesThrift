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

import { BACKEND_URL } from "./variables.js";

// TODO: fix clickable links? 
export default function ListObject({ id, title, imageURL, price, message }) {
    const { addToCart, removeFromCart, inCart } = useCartContext();

    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar
                    src={`${BACKEND_URL}${imageURL}`}
                    alt={title}
                    sx={{ width: 40, height: 40 }}
                />
            </ListItemAvatar>
            <ListItemText primary={title} secondary={
                <>
                    <span style={{ color: "white" }}>{price}</span>
                    {message && (
                        <div style={{ color: "orange", fontSize: 12 }}>
                            {message}
                        </div>
                    )}
                </>
            } />
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
