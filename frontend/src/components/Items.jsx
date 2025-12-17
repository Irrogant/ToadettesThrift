import { useState } from 'react'; 
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { Box } from '@mui/material';



export default function MultiActionAreaCard({ title, description, imageName, price, dateAdded }) {
  const cardMaxWidth = 200
  const itemDescription = (description.length > 20) ? (description.substring(0,20).trim() + '...') : description;
  const itemTitle = (title.length > 12) ? (title.substring(0,12).trim()) : title;

  return (
    <Card sx={{ maxWidth: cardMaxWidth, maxHeight: 300 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={`/assets/images/cards/${imageName}.jpg`}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {itemTitle}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {price}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', maxHeight: 4}}>
            {itemDescription}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions sx={{justifyContent: "space-between", alignItems: "center", borderTop: '1px solid grey', }}>
        <Button size="small" color="primary">
          <Typography gutterBottom variant="h6"> Buy </Typography>
        </Button>
        <Typography sx={{ pr: 1.5 }} variant="body2"> {dateAdded} </Typography>
      </CardActions>
    </Card>
  );
}