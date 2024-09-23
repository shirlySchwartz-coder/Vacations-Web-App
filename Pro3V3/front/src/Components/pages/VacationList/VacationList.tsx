import './VacationList.css';
import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
//import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

//import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
//import Grid from '@mui/material/Grid';

import { Vacation } from '../../models/Vacation';
import { VacationItem } from '../VacationItem/VacationItem';
import { CheckJWT } from '../../utils/JWT';
import { store } from '../../../redux/store';
import { saveFavorites, saveVacations } from '../../../redux/VacationReducer';

import vars from '../../utils/Variants';
import { Favorite } from '../../models/Favorite';

export function VacationList(): JSX.Element {
  const [vacations, setVacations] = useState<Vacation[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [isLogged, setLogged] = useState(false);
  const [id, setId] = useState<number>();
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState<string>();

  const navigate = useNavigate();

  store.subscribe(() => {
    //setIsAdmin(store.getState().login.isAdmin);
    setToken(store.getState().login.jwt);
    setVacations(store.getState().vacations.allVacations);
    setFavorites(store.getState().vacations.userFavorites);
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!CheckJWT()) {
        navigate('/login');
      } else {
        let id = +store.getState().login.userId;
        let token = store.getState().login.jwt;
        //console.log('start', id, token);
        await getAllData();
      }
    };
    fetchData();
  }, []);

  const getAllData = async () => {
    const resultVacation = await getVacations();
    const resultFavorites = await getFavorites();
    //console.log(resultVacation, resultFavorites);
    const userVacations = fixUserFav(resultVacation,resultFavorites);
    setVacations(userVacations);
  };

  const getVacations = async () => {
    let token = store.getState().login.jwt;
    const resVac = await axios
      .get(vars.VACATIONS_URL, {
        headers: { 'Authorization': `${token}` },
      })
      .then((res) => {
        //setVacations(res.data);
        console.log(res.data);
        return res.data;
      })
      .catch((error) => {
        console.log('Error', error.message);
      });
      store.dispatch(saveVacations(resVac))
      return resVac;

  };
  const getFavorites = async () => {
    let token = store.getState().login.jwt;
    let id = +store.getState().login.userId;
    const resFav = await axios
      .get(`${vars.FAVORITES_URL}${id}`, {
        headers: { 'Authorization': `${token}` },
      })
      .then((res) => {
        setFavorites(res.data);
        console.log(res.data);
        return res.data;
      })
      .catch((error) => {
        console.log('Error', error.message);
      });
      console.log(resFav);
      store.dispatch(saveFavorites(resFav))
      return resFav;
  };

  const fixUserFav = (vacations: Vacation[], favorites: Favorite[]) => {
    console.log('call fixUserFav:', vacations, favorites);
    const tempVacArray = vacations;
    for (let i = 0; i < favorites.length; i++) {
      tempVacArray.forEach((item) => {
        if (item.vacationId != favorites[i].idVacation) return;
        else item.isFavorite = true;
      });
    }
    console.log('Yes You got it :', tempVacArray, vacations);
    return tempVacArray;
  };

  const UserList = () => {
    return (
      <>
        {vacations.map((item) => (
          <VacationItem key={item.vacationId} vacation={item} />
        ))}
      </>
    );
  };

  const AdminList = () => {
    return (
      <>
        {vacations.map((item, index) => (
          <VacationItem key={item.vacationId} vacation={item} />
        ))}
      </>
    );
  };

  return (
    <div className='VacationList'>
      <CssBaseline />
      {isAdmin ? <h2>Admin List</h2> : <h2>Vacation List</h2>}
      <Box
        sx={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
          gap: 2,
        }}
      >
        {isAdmin ? AdminList() : UserList()}
      </Box>
    </div>
  );
}
