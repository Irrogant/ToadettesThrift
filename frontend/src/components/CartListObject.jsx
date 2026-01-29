import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import { Button } from '@mui/material';
import { useCartContext } from './CartContext';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

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
