import { createContext } from 'react';

const FlightPubContext = createContext({
    authenticated:false,
    searched:false,
    user: '',
    setAuthenticated: (auth) => {},
    setSearched: (search) => {},
    setUser: (user) => {},
});

export default FlightPubContext;