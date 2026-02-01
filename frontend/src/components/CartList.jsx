import List from '@mui/material/List';
import ListObject from './CartListObject';

export default function FolderList({ items, messages }) {

    console.log("AAAAAAAAAAAAAAAAAAAAAAAAABFIUELGFWIU GWGIUFWAHIOPFPGAWFG(NPAHWOÅ")
    console.log(items)

    return (
        <List sx={{ width: '100%', maxWidth: 360 }}> {items.map((item) => (
            <ListObject key={item.id}
                id={item.id}
                title={item.title}
                imageURL={item.image}
                price={item.price}
                message={messages?.[item.id]}
            >
            </ListObject>
        ))}
        </List>
    )

}
