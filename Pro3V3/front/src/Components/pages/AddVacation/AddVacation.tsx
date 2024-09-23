import './AddVacation.css';
import { DevTool } from '@hookform/devtools';
import { useForm, SubmitHandler, Form } from 'react-hook-form';
import axios from 'axios';
import vars from '../../utils/Variants';

//
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import TextField from '@mui/material/TextField';
import Sheet from '@mui/joy/Sheet';
import { useEffect, useState } from 'react';
import { CheckJWT } from '../../utils/JWT';
import { store } from '../../../redux/store';
import { useNavigate } from 'react-router-dom';
import { LoadPic } from '../LoadPic/LoadPic';

export function AddVacation(): JSX.Element {
  let today = Date.now();
  let oneYearMax = '2025-09-01';
  const navigate = useNavigate();
  const [newVacId, setNewVacId] = useState<number>(0);

  type VacationInput = {
    vacationId: 0;
    destination: string;
    vacInfo: string;
    startDate: Date;
    endDate: Date;
    price: number;
  };
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<VacationInput>();

  const onSubmit: SubmitHandler<VacationInput> = async (
    data: VacationInput,
    event?: React.BaseSyntheticEvent<object, any, any>
  ) => {
    console.log(data);
    event?.preventDefault();
    if (!CheckJWT()) {
      navigate('/login');
      return;
    }
    let token = store.getState().login.jwt;
    //let isAdmin = store.getState().login.isAdmin;
    const newVac = {
      vacationId: 0,
      destination: data.destination,
      vacInfo: data.vacInfo,
      startDate: new Date(data.startDate).toISOString().split('T')[0],
      endDate: new Date(data.endDate).toISOString().split('T')[0],
      price: +data.price,
    };
    try {
      const response = await axios.post(vars.ADD_VAC_URL, newVac, {
        headers: { 'Authorization': `${token}` },
      });
      console.log('Vacation added successfully:', response.data);
      let id = response.data.result;
      //console.log('id',newVacId)
      if (id != 0) {
        setNewVacId(id);
        navigate('/loadPicture', { state: { newVacId: id } });
        return newVacId;
      } else {
        console.log('newVacId in addvac:', newVacId);
      }
    } catch (error) {
      console.error('Error adding vacation:', error);
      throw error;
    }
  };
  useEffect(() => {
    if (!CheckJWT()) {
      navigate('/login');
      return;
    }
    if (!store.getState().login.isAdmin) {
      console.log('You are not allowed to be here!');

      return;
    }
  }, []);

  return (
    <div className='AddVacation'>
      <main>
        <CssBaseline />
        <Sheet
          sx={{
            width: 500,
            mx: 'auto',
            my: 2,
            py: 3,
            px: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            borderRadius: 'sm',
            boxShadow: 'md',
            alignItems: 'center',
          }}
          variant='outlined'
        >
          <div>
            <Typography level='h4' component='h1'>
              <b>Add New Vacation</b>
              <p></p>
            </Typography>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <FormLabel htmlFor='destination'>Destination</FormLabel>
              <input
                id='destination'
                type='text'
                {...register('destination', {
                  required: true,
                  maxLength: 20,
                  minLength: 2,
                })}
              />
              {errors.destination?.type === 'required' && (
                <span className='error-text'>This is required</span>
              )}
              {errors.destination?.type === 'maxLength' && (
                <span className='error-text'>Max length exceeded</span>
              )}
              {errors.destination?.type === 'minLength' && (
                <span className='error-text'>Min length exceeded</span>
              )}
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='vacInfo'>Vacation Info</FormLabel>

              <TextField
                id='vacInfo'
                multiline
                rows={4}
                variant='filled'
                {...register('vacInfo', {
                  required: true,
                  maxLength: 2500,
                  minLength: 2,
                })}
              />
              {errors.vacInfo?.type === 'required' && (
                <span className='error-text'>This is required</span>
              )}
              {errors.vacInfo?.type === 'maxLength' && (
                <span className='error-text'>Max length exceeded</span>
              )}
              {errors.vacInfo?.type === 'minLength' && (
                <span className='error-text'>Min length exceeded</span>
              )}
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='startDate'>Start Date</FormLabel>
              <input
                id='startDate'
                type='date'
                min={today}
                {...register('startDate', { required: true })}
              />
              {errors.vacInfo?.type === 'required' && (
                <span className='error-text'>This is required</span>
              )}
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='endDate'>End Date</FormLabel>
              <input
                id='endDate'
                type='date'
                max={oneYearMax}
                {...register('endDate', { required: true })}
              />
              {errors.vacInfo?.type === 'required' && (
                <span className='error-text'>This is required</span>
              )}
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='price'>Price</FormLabel>
              <input
                id='price'
                type='number'
                {...register('price', { required: true })}
              />
              {errors.vacInfo?.type === 'required' && (
                <span className='error-text'>This is required</span>
              )}
            </FormControl>

            <br />
            <input type='submit' value='Submit' className='submit-btn' />
          </form>

          <DevTool control={control} />
        </Sheet>
      </main>
    </div>
  );
}
