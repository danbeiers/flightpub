import { Routes, Route  } from 'react-router-dom';

import FlightPubHome from './frontEnd/pages/FlightPubHome';
import MapPage from './frontEnd/pages/Map';
import BookingsPage from './frontEnd/pages/Bookings';
import Layout from './frontEnd/components/layout/Layout';
import FlightPubContext from './frontEnd/store/FlightPubContext';

import {useDarkMode} from "./frontEnd/components/DarkMode/DarkMode";
import {useState} from "react";
import LoginPage from "./frontEnd/pages/Login";
import RegisterPage from "./frontEnd/pages/Register";
import AccountPage from "./frontEnd/pages/Account";

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
    const [theme, toggleTheme] = useDarkMode();
    const themeMode = theme === "light" ? lightTheme : darkTheme;

    return (
        <ThemeProvider theme={themeMode}>
        <FlightPubContext.Provider value={{authenticated,setAuthenticated,searched,setSearched }}>
            <GlobalStyles />
            <ToggleButton theme={theme} toggleTheme={toggleTheme} />
        <Layout>
            <Routes>

                <Route path='/' element={<FlightPubHome />}></Route>
                <Route path='/bookings' element={<BookingsPage />} />
                <Route path='/map' element={<MapPage />} />
                <Route path='/login' element = {<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/account' element={<AccountPage />} />

            </Routes>
        </Layout>
        </FlightPubContext.Provider>
        </ThemeProvider>
    );
}

export default App;
