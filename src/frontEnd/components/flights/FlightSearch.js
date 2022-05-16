import {useContext, useRef} from 'react';
import { useState } from "react";
import TextField from "@mui/material/TextField";
import List from "../list/List";
import DatePicker from "react-datepicker";
import { ListData } from "../list/ListData.js"


import Card from '../ui/Card';
import classes from './FlightSearch.module.css';
import "react-datepicker/dist/react-datepicker.css";
import FlightPubContext from "../../store/FlightPubContext";
import {Autocomplete} from "@mui/material";

function FlightSearch(props) {

    //var and method for searchbox in form
    //used to search list of destinations from user input
    let getSearchResults = () =>
    {
        var arr = [];

        ListData.map((el) =>
        {
            arr.push(el.text);
        })

        return arr;
    }

    const [oneWay, setOneWay] = useState(false);

    let toggleOneWay = () =>
    {
        if(oneWay)
        {
            setOneWay(false);
            return;
        }

        setOneWay(true);
        return;
    }

    const [flexiDeparture, setFlexiDeparture] = useState(false);

    let toggleFlexiDeparture = () =>
    {
        if(flexiDeparture)
        {
            setFlexiDeparture(false);
            return;
        }

        setFlexiDeparture(true);
        return;
    }

    const [flexiReturn, setFlexiReturn] = useState(false);

    let toggleFlexiReturn = () =>
    {
        if(flexiReturn)
        {
            setFlexiReturn(false);
            return;
        }

        setFlexiReturn(true);
        return;
    }

    const [soonestStartDate, setSoonestStartDate] = useState(new Date());
    const [latestStartDate, setLatestStartDate] = useState(new Date());
    const [soonestEndDate, setSoonestEndDate] = useState(new Date());
    const [latestEndDate, setLatestEndDate] = useState(new Date());
    const context = useContext(FlightPubContext);

    const [depLocation, setDepLocation] = useState("");
    const [arrLocation, setArrLocation] = useState("");

    const departureLocationInputRef = useRef();
    const destinationLocationInputRef = useRef();
    const numberOfPassengerInputRef = useRef();
    const oneWayTripInputRef = useRef();
    const flexibleReturnInputRef = useRef();
    const flexibleDepartureInputRef = useRef();

    function submitHandler(event) {
        event.preventDefault();

        const enteredDepartureLocation = depLocation;
        const enteredSoonestDepartureDate = soonestStartDate;
        const enteredLatestDepartureDate = latestStartDate;
        const enteredSoonestReturnDate = soonestEndDate;
        const enteredLatestReturnDate = latestEndDate;
        const enteredDestinationLocation = arrLocation;
        const enteredNumberOfPassenger = numberOfPassengerInputRef.current.value;
        const enteredOneWayTrip = oneWay;
        const enteredFlexibleReturn = flexiReturn;
        const enteredFlexibleDeparture = flexiDeparture;

        const flightSearchData = {
            departureLocation: enteredDepartureLocation,
            soonestDepartureDate: enteredSoonestDepartureDate,
            latestDepartureDate: enteredLatestDepartureDate,
            soonestReturnDate: enteredSoonestReturnDate,
            latestReturnDate: enteredLatestReturnDate,
            destinationLocation: enteredDestinationLocation,
            numOfPass: enteredNumberOfPassenger,
            oneWayTrip: enteredOneWayTrip,
            flexibleDeparture: enteredFlexibleDeparture,
            flexibleReturn: enteredFlexibleReturn,
        };
        context.setSearched(true);
        console.log(flightSearchData);

        props.exportQuery(flightSearchData);
    }

    function Return(e) {

        if(e.target)
        {
            return null;
        }

        return (
            <Arrival  target={e.flexi}/>
        );

    }

    function Departure(e) {
        if (e.target) {
            return (
                <div className={classes.control}>
                    <label htmlFor='soonestDeparture'>Soonest Departure</label>
                    <DatePicker
                        id='soonestDeparture'
                        dateFormat="dd/MM/yyyy"
                        selected={soonestStartDate}
                        onChange={(date) => setSoonestStartDate(date)}
                    />

                    <label htmlFor='latestDeparture'>Latest Departure</label>
                    <DatePicker
                        id='latestDeparture'
                        dateFormat="dd/MM/yyyy"
                        selected={latestStartDate}
                        onChange={(date) => setLatestStartDate(date)}
                    />
                </div>
            );
        }

        return (
            <div className={classes.control}>
                <label htmlFor='departureDate'>Departure Date</label>
                <DatePicker
                    id = 'departureDate'
                    dateFormat="dd/MM/yyyy"
                    selected={soonestStartDate}
                    onChange={(date) => setSoonestStartDate(date)}
                />
            </div>
        );
    }

    function Arrival(e) {
        if(e.target)
        {
            return (
                <div className={classes.control}>
                    <label htmlFor='soonestArrival'>Soonest Return</label>
                    <DatePicker
                        id = 'soonestArrival'
                        dateFormat="dd/MM/yyyy"
                        selected={soonestEndDate}
                        onChange={(date) => setSoonestEndDate(date)}
                    />

                    <label htmlFor='latestArrival'>Latest Return</label>
                    <DatePicker
                        id = 'latestArrival'
                        dateFormat="dd/MM/yyyy"
                        selected={latestEndDate}
                        onChange={(date) => setLatestEndDate(date)}
                    />
                </div>
            );
        }

        return (
            <div className={classes.control}>
                <label htmlFor='arrivalDate'>Return Date</label>
                <DatePicker
                    id = 'arrivalDate'
                    dateFormat="dd/MM/yyyy"
                    selected={soonestEndDate}
                    onChange={(date) => setSoonestEndDate(date)}
                />
            </div>
            );
        }

    return (
        <Card>
            <form id='searchForm' className={classes.form} onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='departureLocation'>Departure Location</label>
                    <Autocomplete id="departureLocation"
                                  freeSolo={true}
                                  options= {getSearchResults()}
                                  onChange={(event, value) => setDepLocation(value)}
                                  renderInput={(params) =>
                                      <TextField {...params}
                                                 variant="outlined"
                                                 fullWidth
                                                 ref={departureLocationInputRef}
                                                 label="Departure"/>}
                    />

                    <Departure target={flexiDeparture}/>

                    <label htmlFor='destinationLocation'>Destination Location</label>
                    <Autocomplete id="destinationLocation"
                                  freeSolo={true}
                                  options= {getSearchResults()}
                                  onChange={(event, value) => setArrLocation(value)}
                                  renderInput={(params) =>
                                      <TextField {...params}
                                                 variant="outlined"
                                                 fullWidth
                                                 ref={destinationLocationInputRef}
                                                 label="Destination"/>}
                    />
                </div>

                <Return target={oneWay} flexi={flexiReturn}/>

                <div className={classes.control}>
                    <label htmlFor='numberOfPassenger'>Number Of Passengers</label>
                    <input type='number' id='numberOfPassenger' ref={numberOfPassengerInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='oneWayTrip'>One Way</label>
                    <input type='checkbox' id='oneWayTrip' onClick={toggleOneWay} ref={oneWayTripInputRef} />

                    <label htmlFor='flexibleDeparture'>Flexible Departure</label>
                    <input type='checkbox' id='flexibleDeparture' onClick={toggleFlexiDeparture} ref={flexibleDepartureInputRef} />

                    <label htmlFor='flexibleReturn'>Flexible Return</label>
                    <input type='checkbox' id='flexibleReturn' onClick={toggleFlexiReturn} ref={flexibleReturnInputRef} />
                </div>
                <div className={classes.actions}>
                    <button>Search</button>
                </div>
            </form>
        </Card>
    );
}

export default FlightSearch;