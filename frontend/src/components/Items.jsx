import { Box, Grid } from '@mui/material';
import MultiActionAreaCard from './Card.jsx';


function Items({ items }) {
    return (
        <Box sx={{ height: 1 / 4, width: 2 / 4, mx: "auto" }}>
            <Grid container spacing={2} justifyContent="center">
                {items.map((item) => {
                    console.log("Image URL for item:", item.image); // Log the imageUrl to the console
                    return (
                        <Grid key={item.id} size={4}>
                            <MultiActionAreaCard
                                id={item.id}
                                title={item.title}
                                description={item.description}
                                imageUrl={item.image}
                                price={item.price}
                                dateCreated={item.date_created}
                                soldAt={item.sold_at}
                                owner={item.owner}
                                seller={item.seller}
                                buyer={item.buyer}
                            />
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
}

export default Items;