import { createContext } from 'react';

const FlightPubContext = createContext({
    authenticated:false,
    searched:false,
    user: null,
    setAuthenticated: (auth) => {},
    setSearched: (search) => {},
    setUser: (user) => {},
});

export default FlightPubContext;