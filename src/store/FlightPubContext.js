import { createContext } from 'react';

const FlightPubContext = createContext({
    authenticated:false,
    searched:false,
    setAuthenticated: (auth) => {},
    setSearched: (search) => {}
});

export default FlightPubContext;