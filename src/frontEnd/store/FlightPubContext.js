import { createContext } from 'react';

const FlightPubContext = createContext({
    authenticated:false,
    searched:false,
    user: '',
    userDetails: {
        fName:'',
        lName:'',
        dob:'',
        emailAdd:'',
        pword:'',
    },
    ip:'',
    lat:'',
    long:'',
    weatherData:'',

    setAuthenticated: (auth) => {},
    setSearched: (search) => {},
    setUser: (user) => {},
    setUserDetails: (details) => {},
    setIP: (_ip) => {},
    setLat: (latitude) =>{},
    setLong: (longitude) => {},
    setWeatherData: (weather) => {}

});

export default FlightPubContext;