import {useContext} from 'react';
import {useState} from "react";

import FlightList from '../components/flights/FlightList';
import FlightSearch from "../components/flights/FlightSearch";
import ConfirmBooking from "../components/flights/ConfirmBooking"
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
        sponsored: false,
    },
    {
        flightId: 'AA2431',
        departureDate: new Date('May 20, 2022 09:30:00'),
        departureTime: '9:30AM',
        arrivalTime: '10:45PM',
        destination: 'SYDNEY',
        departure: 'NEWCASTLE',
        price: 500,
        sponsored: false,
    },
    {
        flightId: 'CC7296',
        departureDate: new Date('May 31, 2022 21:00:00'),
        departureTime: '9:00PM',
        arrivalTime: '03:45AM',
        destination: 'NEWCASTLE',
        departure: 'SYDNEY',
        price: 450,
    },
    {
        flightId: 'CC7296',
        departureDate: new Date('May 20, 2022 21:00:00'),
        departureTime: '9:00PM',
        arrivalTime: '03:45AM',
        destination: 'NEWCASTLE',
        departure: 'SYDNEY',
        price: 450,
        sponsored: false,
    },
    {
        flightId: 'CC7298',
        departureDate: new Date('May 20, 2022 22:00:00'),
        departureTime: '10:00PM',
        arrivalTime: '03:45AM',
        destination: 'NEWCASTLE',
        departure: 'SYDNEY',
        price: 550,
        sponsored: true,
    },
    {
        flightId: 'CC7209',
        departureDate: new Date('May 20, 2022 08:00:00'),
        departureTime: '08:00AM',
        arrivalTime: '9:45AM',
        destination: 'BRISBANE',
        departure: 'SYDNEY',
        price: 725,
        sponsored: false,
    },
    {
        flightId: 'CC7209',
        departureDate: new Date('May 20, 2022 10:00:00'),
        departureTime: '10:00AM',
        arrivalTime: '9:45AM',
        destination: 'BRISBANE',
        departure: 'SYDNEY',
        price: 725,
        sponsored: true,
    },
    {
        flightId: 'CC7234',
        departureDate: new Date('May 31, 2022 12:00:00'),
        departureTime: '12:00PM',
        arrivalTime: '01:45PM',
        destination: 'SYDNEY',
        departure: 'BRISBANE',
        price: 725,
        sponsored: false,
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
    const [selectedFlights, setSelectedFlights] = useState([{}]);

    function clearForm() {
        context.setSearched(false);
        context.setBookingsSelected(false);
    }

    if (!context.searched) {
        return (
            <section>
                <h2>Flight Search</h2>
                <FlightSearch
                    exportQuery={query => setQuery(query)}/>
            </section>
        );
    } else if(!context.bookingsSelected){

        return (
            <div>
                <div>

                    <h2>Search Results</h2>

                    <FlightList flights={DUMMY_DATA} searchQuery={query}
                        exportFlights={flights => setSelectedFlights(flights)}/>
                    <button onClick={clearForm}>Clear</button>
                </div>

            </div>
        );
    }
    else
    {
        return (
            <div>
                <ConfirmBooking flights={selectedFlights} oneWay={query.oneWayTrip}/>
                <button onClick={clearForm}>Clear</button>
            </div>
        );
    }
}

export default FlightPubHomePage;
