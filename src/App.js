import { Routes, Route  } from 'react-router-dom';
import axios from 'axios';

import FlightPubHome from './frontEnd/pages/FlightPubHome';
import MapPage from './frontEnd/pages/Map';
import BookingsPage from './frontEnd/pages/Bookings';
import Layout from './frontEnd/components/layout/Layout';
import FlightPubContext from './frontEnd/store/FlightPubContext';

import {useDarkMode} from "./frontEnd/components/DarkMode/DarkMode";
import {useState, useEffect} from "react";
import LoginPage from "./frontEnd/pages/Login";
import RegisterPage from "./frontEnd/pages/Register";
import AccountPage from "./frontEnd/pages/Account";
import ProfilePage from "./frontEnd/pages/Profile";

import {
    GlobalStyles,
    darkTheme,
    lightTheme,
} from "./frontEnd/components/DarkMode/darkmodestyle";
import styled, {ThemeProvider} from "styled-components";
import {ToggleButton} from "./frontEnd/components/DarkMode/ToggleButton";
//import React from "@types/react";



function App() {
    const [authenticated, setAuthenticated] = useState (false);
    const [searched, setSearched] = useState (false);
    const [bookingsSelected, setBookingsSelected] = useState(false);
    const [user,setUser] = useState(null);
    const [userDetails,setUserDetails] = useState(null);
    const [lat, setLat] = useState(0);
    const [long, setLong] = useState(0);
    const [weatherData,setWeatherData] = useState([]);
    const [theme, toggleTheme] = useDarkMode();
    const themeMode = theme === "light" ? lightTheme : darkTheme;

    useEffect(() => {
        const fetchData = async () => {
            navigator.geolocation.getCurrentPosition(function(position) {
                setLat(position.coords.latitude);
                setLong(position.coords.longitude);
            });

            await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
                .then(res => res.json())
                .then(result => {
                    setWeatherData(result)
                    console.log(result);
                });
            console.log(weatherData);
        }
        fetchData();

    }, [lat,long,setWeatherData])

    return (

        <ThemeProvider theme={themeMode}>
        <FlightPubContext.Provider value={{authenticated,setAuthenticated,searched,setSearched,bookingsSelected,setBookingsSelected,setUser,userDetails,setUserDetails,lat,setLat,long,setLong,weatherData,setWeatherData }}>
        <GlobalStyles />
        <ToggleButton theme={theme} toggleTheme={toggleTheme} />
        <Layout>
            <Routes>
                <Route path='/' element={<FlightPubHome />} />
                <Route path='/bookings' element={<BookingsPage />} />
                <Route path='/map' element={<MapPage />} />
                <Route path='/login' element = {<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/account' element={<AccountPage />} />
                <Route path='/profile' element={<ProfilePage />} />
            </Routes>
        </Layout>
        </FlightPubContext.Provider>
        </ThemeProvider>
    );
}

export default App;
