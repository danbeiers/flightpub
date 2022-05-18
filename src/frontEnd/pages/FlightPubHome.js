import {useContext} from 'react';
import {useState} from "react";

import FlightList from '../components/flights/FlightList';
import FlightSearch from "../components/flights/FlightSearch";
import FlightPubContext from "../store/FlightPubContext";

const DUMMY_DATA = [
    {
        flightId: 'AA2431',
        departureDate: new Date('May 18, 2022 09:30:00'),
        departureTime: '9:30AM',
        arrivalTime: '10:45PM',
        destination: 'SYDNEY',
        departure: 'NEWCASTLE',
        price: 500,
    },
    {
        flightId: 'CC7296',
        departureDate: new Date('May 20, 2022 21:00:00'),
        departureTime: '9:00PM',
        arrivalTime: '03:45AM',
        destination: 'NEWCASTLE',
        departure: 'SYDNEY',
        price: 450,
    },
    {
        flightId: 'CC7296',
        departureDate: new Date('May 20, 2022 22:00:00'),
        departureTime: '10:00PM',
        arrivalTime: '03:45AM',
        destination: 'NEWCASTLE',
        departure: 'SYDNEY',
        price: 550,
    },
];

const flightSearchData = {
    departureLocation: "Sydney",
    soonestDepartureDate: new Date(),
    latestDepartureDate: new Date(),
    soonestReturnDate: new Date(),
    latestReturnDate: new Date(),
    destinationLocation: "Brisbane",
    numOfPass: 2,
    oneWayTrip: false,
    flexibleDeparture: false,
    flexibleReturn: false,
};

function FlightPubHomePage() {

    const context = useContext(FlightPubContext);

    const [query, setQuery] = useState({});

    function clearForm() {
        context.setSearched(false);
    }

    if (!context.searched) {
        return (
            <section>
                <h2>Flight Search</h2>
                <FlightSearch
                    exportQuery={query => setQuery(query)}/>
            </section>
        );
    } else {

        return (
            <div>
                <div>

                    <h2>Search Results</h2>

                    <FlightList flights={DUMMY_DATA} searchQuery={query}/>
                    <button onClick={clearForm}>Clear</button>
                </div>

            </div>
        );
    }
}

export default FlightPubHomePage;