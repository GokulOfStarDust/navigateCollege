import React from 'react'
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  Checkbox,
  FormControlLabel,
  Button,
  IconButton,
  Menu as MuiMenu,
  MenuItem as MuiMenuItem,
  Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import UseLocRoute from './hook/UseLocRoute';


export default function InputSideMenu() {

    const [isSearchOpen, setIsSearchOpen] = React.useState(true);

    const LOCATIONS = {
        'Brahmam Hall' : { lat: 11.0324860, lng: 77.0329760 },
        'GRD Auditorium' : { lat: 11.033746, lng: 77.034188}
    }

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: { From: '', To: '' }
    });

    const {flyToUserPosition, setStartEndPos, userPosition} = UseLocRoute();

    const formDataHandler = (data) => {

        const startPos = data.From === 'userLocation' ? { lat: userPosition[0], lng: userPosition[1] } : LOCATIONS[data.From];

        setStartEndPos({ start: startPos, end: LOCATIONS[data.To] });
    };

  return (
    <section className='absolute sm:w-[80%] md:w-[50%] lg:w-[20%] bg-white z-[1200] top-10 right-0 border-radius-xl shadow-lg'>

        <div className='font-bold text-xl p-4 border-b border-gray-200'
        onClick={()=>setIsSearchOpen(!isSearchOpen)}>
            |<br/>v
        </div>

        <form id="loginForm" onSubmit={handleSubmit(formDataHandler)} className={`flex flex-col gap-4 p-4 ${isSearchOpen ? 'block' : 'hidden'}`}>
            <div className="flex flex-col gap-y-0">
                <Typography variant="body2" sx={{ mb: 0.5, color: '#616161' }}>
                    From
                </Typography>
                <Controller
                    name="From"
                    control={control}
                    rules={{ required: 'From location is required' }}
                    render={({ field, fieldState: { error } }) => (
                    <FormControl fullWidth size="small" error={!!error}>
                        <Select
                        {...field}
                        variant="outlined"
                        sx={{ borderRadius: '0.375rem', height: '5.2vh' }}
                        >
                        <MenuItem value='' disabled></MenuItem>
                        <MenuItem value="userLocation">Your location</MenuItem>
                        <MenuItem value="Brahmam Hall">Brahmam Hall</MenuItem>
                        <MenuItem value="GRD Auditorium">GRD Auditorium</MenuItem>
                        </Select>
                        {error && <span className="text-red-500 text-sm">{error.message}</span>}
                    </FormControl>
                    )}
                />
            </div>
            <div className="flex flex-col">
               <Typography variant="body2" sx={{ mb: 0.5, color: '#616161' }}>
                    To
                </Typography>
                <Controller
                    name="To"
                    control={control}
                    rules={{ required: 'To location is required' }}
                    render={({ field, fieldState: { error } }) => (
                    <FormControl fullWidth size="small" error={!!error}>
                        <Select
                        {...field}
                        variant="outlined"
                        sx={{ borderRadius: '0.375rem', height: '5.2vh' }}
                        >
                        <MenuItem value='' disabled></MenuItem>                        
                        <MenuItem value="Brahmam Hall">Brahmam Hall</MenuItem>
                        <MenuItem value="GRD Auditorium">GRD Auditorium</MenuItem>
                        </Select>
                        {error && <span className="text-red-500 text-sm">{error.message}</span>}
                    </FormControl>
                    )}
                />
            </div>

            <div className="flex flex-row items-center p-2 rounded-b-xl">
                <Button
                    type="submit"
                    form="loginForm"
                    variant="contained"
                    sx={{
                        width: '60%',
                        height: '4vh',
                        textTransform: 'none',
                        backgroundColor: '#04B7B1',
                        color: '#FFFFFF',
                        '&:hover': { backgroundColor: '#03A6A0' },
                    }}
                    >
                        Search
                </Button>
            </div>
            <div className="flex flex-row items-center p-2 rounded-b-xl">
                <Button
                    onClick={flyToUserPosition}
                    variant="contained"
                    sx={{
                        width: '60%',
                        height: '4vh',
                        textTransform: 'none',
                        backgroundColor: '#04B7B1',
                        color: '#FFFFFF',
                        '&:hover': { backgroundColor: '#03A6A0' },
                    }}
                    >
                        Current Location
                </Button>
            </div>
           
          </form>

        <div className="flex flex-col z-[100000] gap-4 p-4">
             
        </div>

    </section>
  )
}
