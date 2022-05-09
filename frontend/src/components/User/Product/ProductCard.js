import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


export default function ProductCard() {
  const theme = useTheme();

  return (
    <Card sx={{ display: 'flex' ,background:"#F4D7C0", borderRadius:0, padding:1}}>
      <CardMedia
        component="img"
        sx={{ width: 200,height:200, ml: "auto"}}
        image="http://localhost:8000/files/5d2ca5838324280e32a9738cf989fb12"
        alt="شلوار"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems:'self-end' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography  component="div" variant="h5">
            شلوار جین بگی
          </Typography>
           <Typography mt={5} variant="subtitle1" color="text.secondary" component="div">
            ۷۵۰,۰۰۰ تومان 
          </Typography> 
        </CardContent>
       
      </Box>
    </Card>
  );
}