//client/src/App.js

import { Routes, Route  } from 'react-router-dom';

import FlightPubHome from './frontEnd/pages/FlightPubHome';
import MapPage from './frontEnd/pages/Map';
import BookingsPage from './frontEnd/pages/Bookings';
import Layout from './frontEnd/components/layout/Layout';
import FlightPubContext from './frontEnd/store/FlightPubContext';

import {useDarkMode} from "./frontEnd/components/DarkMode/DarkMode";
import {useState, useEffect, createContext} from "react";
import LoginPage from "./frontEnd/pages/Login";
import RegisterPage from "./frontEnd/pages/Register";
import AccountPage from "./frontEnd/pages/Account";
import ProfilePage from "./frontEnd/pages/Profile";

import WishListPage from "./frontEnd/pages/WishList";

import {
    GlobalStyles,
    darkTheme,
    lightTheme,
} from "./frontEnd/components/DarkMode/darkmodestyle";
import styled, {ThemeProvider} from "styled-components";
import {ToggleButton} from "./frontEnd/components/DarkMode/ToggleButton";
import useFetch from "./hooks/useFetch";
//import React from "@types/react";

export const UserContext = createContext({});

function App() {
    const [flights,setFlights] = useState([])
    const [loading,setLoading] = useState(true);
    const [userSession,setUserSession] = useState(true);
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
    const [destination, setDestination] = useState("");
    const [departure, setDeparture] = useState("");


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
                    //console.log(result);
                });
            //console.log(weatherData);
        }
        fetchData();

    }, [lat,long,setWeatherData])

    useEffect(() => {
        const fetchUserAuth = async () => {
            try {
                setLoading(true);
                const res = await fetch ('/user/isAuth', { mode: 'cors' })
                if(!res.ok) {
                    console.log('auth not ok')
                    setUserSession(false)
                    return setLoading(false);
                }
                const data = await res.json();
                setUserSession(data);
                setLoading(false)
                setUser(data.userName)
                console.log(data.userName)
            }catch (error){
                setLoading(false)
                console.log('There was an error authenticating user',error);
                return
            }
        }
        fetchUserAuth()
    },[user])
    // useEffect(() => {
    //     const fetchFlights = async () => {
    //         try {
    //             setLoading(true);
    //             const res = await fetch('/flight/')
    //             if(!res.ok) {
    //                 console.log(res)
    //                 console.log('flights not ok')
    //                 return setLoading(false);
    //             }
    //             const data = await res.json();
    //             setFlights(data)
    //         }catch (error){
    //             setLoading(false)
    //             console.log('There was an error fetching flights',error);
    //             return
    //         }
    //     }
    //     fetchFlights()
    // },[])

    return (
        <UserContext.Provider value={userSession}>

        <ThemeProvider theme={themeMode}>
            <FlightPubContext.Provider value={{authenticated,setAuthenticated,searched,setSearched,bookingsSelected,setBookingsSelected,setUser,userDetails,setUserDetails,lat,setLat,long,setLong,weatherData,setWeatherData, destination, setDestination, departure, setDeparture}}>
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
                        <Route path='/wishlist' element={<WishListPage />} />
                    </Routes>
                </Layout>
            </FlightPubContext.Provider>
        </ThemeProvider>
        </UserContext.Provider>
    );
}

export default App;
