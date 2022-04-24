import {useContext} from 'react';

import FlightList from '../components/flights/FlightList';
import FlightSearch from "../components/flights/FlightSearch";
import FlightPubContext from "../store/FlightPubContext";

const DUMMY_DATA = [
    {
        flightId: 'AA2431',
        departureDate: '22/10/2022',
        departureTime: '9:30AM',
        arrivalTime: '10:45PM',
        destination: 'MADRID',
    },
    {
        flightId: 'CC7296',
        departureDate: '03/07/2022',
        departureTime: '9:00PM',
        arrivalTime: '03:45AM',
        destination: 'NORWAY',
    },
];

function FlightPubHomePage() {

    const context = useContext(FlightPubContext);

    function clearForm() {
        document.getElementById('searchForm').reset();
        context.setSearched(false);
    }

    if (!context.searched) {
        return (
            <section>
                <h1>Flight Search</h1>
                <FlightSearch/>
            </section>
        );
    } else {
        return (
            <section>
                <h1>Flight Search</h1>
                <FlightSearch />
                <div>
                    <h2>Search Results</h2>

                    <FlightList flights={DUMMY_DATA}/>
                    <button onClick={clearForm}>Clear</button>
                </div>

            </section>
        );
    }
}

export default FlightPubHomePage;