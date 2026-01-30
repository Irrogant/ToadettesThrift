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

// TODO: link 
export default function ListObject({ id, title, imageName, price, message }) {
    const { addToCart, removeFromCart, inCart } = useCartContext();

    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar
                    src={`/assets/images/cards/brussel.jpg`}
                    alt={title}
                    sx={{ width: 40, height: 40 }}
                />
            </ListItemAvatar>
            <ListItemText primary={title} secondary={
                <>
                    {price}
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
