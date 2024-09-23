import './VacationItem.css';
//
import Card from '@mui/joy/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CardMedia from '@mui/material/CardMedia';

import { Vacation } from '../../models/Vacation';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useEffect, useState } from 'react';
import { store } from '../../../redux/store';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import vars from '../../utils/Variants';

type VacationItemProps = {
  vacation: Vacation;
};

export function VacationItem(props: VacationItemProps): JSX.Element {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isFavChanged, setIsFavChanged] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  
  const navigate = useNavigate();

  store.subscribe(() => {
    setIsAdmin(store.getState().login.isAdmin);
    setIsLogged(store.getState().login.isLogged);
  });
  
  const goToEdit = () => {
    console.log('Clicked Edit', props.vacation.vacationId);
    navigate(`/updateVacation/${props.vacation.vacationId}`);
  };
  const goToDelete = () => {
    console.log('Clicked Delete', props.vacation.vacationId);
  };
  const AdminOptions = () => {
    return (
      <div>
        <input type='button' onClick={(e) => goToEdit()} value={'Edit'} />
        <input type='button' onClick={(e) => goToDelete()} value={'Delete'} />
      </div>
    );
  };
  //user functions:
  const onLike = async () => {
    let token = store.getState().login.jwt;
    let userId = store.getState().login.userId;

    let vacId = +props.vacation.vacationId;
    let isFav = props.vacation.isFavorite;
    console.log('isFavorite:', isFav);
    if (isFav) {
      console.log('UnFollow Req');
      const res = await axios.delete(
        `${vars.UNFOLLOW_URL}${vacId}`,
        {
          headers: { 'Authorization': `${token}` },
          data: { userId: +userId },
        }
      );
      console.log('UnFollow res:', res);
      if (res.status === 204) {
        console.log('unfullow successful!');
        setIsFavChanged(true);
        //navigate('/vacations')
      }
    } else {
      console.log('Follow Req');
      const res = await axios.post(
        `${vars.FOLLOW_URL}${vacId}`,
        { userId: +userId },
        { headers: { 'Authorization': `${token}` } }
      );
      if (res.status === 201) {
        console.log('fullow successful!');
        setIsFavChanged(true);
      } else {
        throw new Error('not working');
      }
    }
  };
  
  const UserOptions = () => {
    return (
      <>
        <CardActions disableSpacing>
          <IconButton
            aria-label='add to favorites'
            color={props.vacation.isFavorite ? 'primary' : 'default'}
            onClick={()=> setIsFavChanged(true)}
          >
            <FavoriteIcon />
          </IconButton>
        </CardActions>
      </>
    );
  };

  return (
    <Card size='lg' variant='outlined' sx={{ maxWidth: 345 }}>
      <CardHeader
        action={<IconButton aria-label='settings'></IconButton>}
        title={`${props.vacation.vacationId}.${props.vacation.destination}`}
      />
      <h4>
        {`${props.vacation.startDate}`} until {`${props.vacation.endDate}`}
      </h4>
      <CardMedia
        component='img'
        height='194'
        image={props.vacation.pictureUrl}
        alt={props.vacation.destination}
      />
      <CardContent>
        <Typography variant='body2' sx={{ color: 'text.secondary' }}>
          {props.vacation.vacInfo}
        </Typography>
      </CardContent>
      {isAdmin ? AdminOptions() : UserOptions()}
    </Card>
  );
}
