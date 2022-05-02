import { Routes, Route  } from 'react-router-dom';

import FlightPubHome from './frontEnd/pages/FlightPubHome';
import MapPage from './frontEnd/pages/Map';
import BookingsPage from './frontEnd/pages/Bookings';
import Layout from './frontEnd/components/layout/Layout';
import FlightPubContext from './frontEnd/store/FlightPubContext';

import {useState} from "react";
import LoginPage from "./frontEnd/pages/Login";
import RegisterPage from "./frontEnd/pages/Register";
import AccountPage from "./frontEnd/pages/Account";

function App() {
    const [authenticated, setAuthenticated] = useState (false);
    const [searched, setSearched] = useState (false);
    return (
        <FlightPubContext.Provider value={{authenticated,setAuthenticated,searched,setSearched }}>
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
    );
}

export default App;