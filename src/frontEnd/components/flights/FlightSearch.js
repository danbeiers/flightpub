import {useContext, useRef} from 'react';
import { useState } from "react";
import DatePicker from "react-datepicker";

import Card from '../ui/Card';
import classes from './FlightSearch.module.css';
import "react-datepicker/dist/react-datepicker.css";
import FlightPubContext from "../../store/FlightPubContext";

function FlightSearch() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const context = useContext(FlightPubContext);

    const departureLocationInputRef = useRef();
    const destinationLocationInputRef = useRef();
    const numberOfPassengerInputRef = useRef();
    const oneWayTripInputRef = useRef();
    const flexibleReturnInputRef = useRef();
    const flexibleDepartureInputRef = useRef();

    function submitHandler(event) {
        event.preventDefault();

        const enteredDepartureLocation = departureLocationInputRef.current.value;
        const enteredDepartureDate = startDate;
        const enteredReturnDate = endDate;
        const enteredDestinationLocation = destinationLocationInputRef.current.value;
        const enteredNumberOfPassenger = numberOfPassengerInputRef.current.value;
        const enteredOneWayTrip = oneWayTripInputRef.current.value;
        const enteredFlexibleReturn = flexibleReturnInputRef.current.value;
        const enteredFlexibleDeparture = flexibleDepartureInputRef.current.value;

        const flightSearchData = {
            departureLocation: enteredDepartureLocation,
            departureDate: enteredDepartureDate,
            returnDate: enteredReturnDate,
            destinationLocation: enteredDestinationLocation,
            numOfPass: enteredNumberOfPassenger,
            oneWayTrip: enteredOneWayTrip,
            flexibleDeparture: enteredFlexibleDeparture,
            flexibleReturn: enteredFlexibleReturn,
        };
        context.setSearched(true);
        console.log(flightSearchData);
    }

    return (
        <Card>
            <form id='searchForm' className={classes.form} onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='departureLocation'>Departure Location</label>
                    <input type='text' id='departureLocation' ref={departureLocationInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='departureDate'>Departure Date</label>
                    <DatePicker
                        id = 'departureDate'
                        dateFormat="dd/MM/yyyy"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                    /><label htmlFor='returnDate'>Return Date</label>
                    <DatePicker
                        id = 'returnDate'
                        dateFormat="dd/MM/yyyy"
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                    />
                </div>
                <div className={classes.control}>
                    <label htmlFor='destinationLocation'>Destination Location</label>
                    <input type='text' id='destinationLocation' ref={destinationLocationInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='numberOfPassenger'>Number Of Passengers</label>
                    <input type='number' id='numberOfPassenger' ref={numberOfPassengerInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='oneWayTrip'>One Way</label>
                    <input type='checkbox' id='oneWayTrip' ref={oneWayTripInputRef} />

                    <label htmlFor='flexibleDeparture'>Flexible Departure</label>
                    <input type='checkbox' id='flexibleDeparture' ref={flexibleDepartureInputRef} />

                    <label htmlFor='flexibleReturn'>Flexible Return</label>
                    <input type='checkbox' id='flexibleReturn' ref={flexibleReturnInputRef} />
                </div>
                <div className={classes.actions}>
                    <button>Search</button>
                </div>
            </form>
        </Card>
    );
}

export default FlightSearch;