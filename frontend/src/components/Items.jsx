import MultiActionAreaCard from "./Card.jsx";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';


function Items({ items }) {

    return (
        <Box sx={{ height: 1/4, width: 2/4, mx: "auto",}}>
            <Grid container spacing={2} justifyContent="center"> {items.map((item) => (
                <Grid key={item.id} xs={4}>
                <MultiActionAreaCard
                    id={item.id}
                    title={item.title}
                    description={item.description}
                    imageName="brussel"
                    price={item.price}
                    dateAdded={item.date_added}
                />
                </Grid>
            ))}
            </Grid>
          </Box>
    );
}

export default Items;