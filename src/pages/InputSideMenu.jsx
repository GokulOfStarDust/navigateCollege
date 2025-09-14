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

        'Entrance' : { lat: 11.034783, lng: 77.033802 },
        'Brahmam Hall' : { lat: 11.034228, lng: 77.033987 },
        'GRD Auditorium' : { lat: 11.032390, lng: 77.033279 },
        'E-Block' : { lat: 11.032880, lng: 77.034473 }, 
        'Aided Office - G Floor' : { lat: 11.033190, lng: 77.034094 },
        'Indoor Stadium' : { lat: 11.033656, lng: 77.035304 },
        'SF Office' : { lat: 11.033085, lng: 77.033445 },
        'Podhigai Hall' : { lat: 11.033406, lng: 77.033290 },
        'Food Court - 1' : { lat: 11.033733, lng: 77.034293 },
        'Food Court - 2' : { lat: 11.032024, lng: 77.032622 },
        "Men's Restroom - 1" : { lat: 11.034067, lng: 77.034277 },
        "Men's Restroom - 2" : { lat: 11.032058, lng: 77.034127 },
        "Women's Restroom - 1" : { lat: 11.034209, lng: 77.034242 },
        "Women's Restroom - 2" : { lat: 11.032211, lng: 77.033467 },
        'daffodil' : { lat: 11.032932, lng: 77.035521 },
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

        <div className='font-bold text-xl p-4 border-b border-gray-200 hover:cursor-pointer'
        onClick={()=>setIsSearchOpen(!isSearchOpen)}>
            {isSearchOpen ? "---" : "+"}
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
                        <MenuItem value="E-Block">E-Block</MenuItem>
                        <MenuItem value="Food Court - 1">Food Court - 1</MenuItem>
                        <MenuItem value="Entrance">Entrance</MenuItem>
                        <MenuItem value="daffodil">Daffodil</MenuItem>
                        <MenuItem value="Aided Office - G Floor">Aided Office - G Floor</MenuItem>
                        <MenuItem value="Indoor Stadium">Indoor Stadium</MenuItem>
                        <MenuItem value="SF Office">SF Office</MenuItem>
                        <MenuItem value="Podhigai Hall">Podhigai Hall</MenuItem>
                        <MenuItem value="Food Court - 2">Food Court - 2</MenuItem>
                        <MenuItem value="Men's Restroom - 1">Men's Restroom - 1</MenuItem>
                        <MenuItem value="Women's Restroom - 1">Women's Restroom - 1</MenuItem>
                        <MenuItem value="Men's Restroom - 2">Men's Restroom - 2</MenuItem>
                        <MenuItem value="Women's Restroom - 2">Women's Restroom - 2</MenuItem>

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
                        <MenuItem value="E-Block">E-Block</MenuItem>
                        <MenuItem value="Food Court - 1">Food Court - 1</MenuItem>
                        <MenuItem value="Entrance">Entrance</MenuItem>
                        <MenuItem value="daffodil">Daffodil</MenuItem>
                        <MenuItem value="Aided Office - G Floor">Aided Office - G Floor</MenuItem>
                        <MenuItem value="Indoor Stadium">Indoor Stadium</MenuItem>
                        <MenuItem value="SF Office">SF Office</MenuItem>
                        <MenuItem value="Podhigai Hall">Podhigai Hall</MenuItem>
                        <MenuItem value="Food Court - 2">Food Court - 2</MenuItem>
                        <MenuItem value="Men's Restroom - 1">Men's Restroom - 1</MenuItem>
                        <MenuItem value="Women's Restroom - 1">Women's Restroom - 1</MenuItem>
                        <MenuItem value="Men's Restroom - 2">Men's Restroom - 2</MenuItem>
                        <MenuItem value="Women's Restroom - 2">Women's Restroom - 2</MenuItem>

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
