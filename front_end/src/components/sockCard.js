import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { addToCart } from '../app/userSlice';
import { authCheck } from '../app/authSlice';


export default function MediaCard(props) {
    const auth = useSelector( state => state.auth.isAuth )
    const [sock, editSock] = React.useState(props.sock)
    const user = useSelector(state => state.users)
    const dispatch = useDispatch()

    useEffect( () => {
      dispatch(authCheck())
    }, [auth])

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

  return (
    <Card sx={{ maxWidth: 360, minWidth:360 }}>
      {!props.isCart ? 
      <CardMedia
        className='sock-img'
        height="250"
        sx={{ height: 440 }}
        image={sock.image}
      />
      :''
      }
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {sock.name}
        </Typography>
        {!props.isCart ? 
        <Typography variant="body2" color="text.secondary">
          {sock.description}
        </Typography>
        :''
        }
        <Typography variant="body2" color="text.secondary">
          {formatter.format(sock.price)}
        </Typography>
      </CardContent>
      <CardActions>
      {!props.isCart && auth ? 
      <div>

        <Button onClick={()=>dispatch(addToCart({email:user.email, item: sock._id}))} size="small">Add to cart</Button>
        <Button size="small">Favorite</Button>
      </div>
      : ''}
      </CardActions>
    </Card>
  );
}