import FlightItem from './FlightItem';
import classes from './FlightList.module.css';
import Card from "../ui/Card";
import {useState} from "react";
import {useContext} from 'react';
import FlightPubContext from "../../store/FlightPubContext";

import DropdownList from "react-widgets/DropdownList";
import {Button} from "@mui/material";


function FlightList(props) {

    const context = useContext(FlightPubContext);

    const [flightList, setFlightList] = useState([]);
    const [returnFlightList, setReturnFlightList] = useState([]);

    const [morningFilter, setMorningFilter] = useState(false);
    const [afternoonFilter, setAfternoonFilter] = useState(false);
    const [eveningFilter, setEveningFilter] = useState(false);

    const [flightSelected , setFlightSelected] = useState(false);
    const [selectedFlight, setSelectedFlight] = useState([]);
    const [returnFlightSelected, setReturnFlightSelected] = useState(false);
    const [selectedReturnFlight, setSelectedReturnFlight] = useState([]);

    let toggleMorningFilter = () =>
    {
        if(morningFilter)
        {
            setMorningFilter(false);
            return;
        }

        setMorningFilter(true);
        return;

    }

    let toggleAfternoonFilter = () =>
    {
        if(afternoonFilter)
        {
            setAfternoonFilter(false);
            return;
        }

        setAfternoonFilter(true);
        return;
    }

    let toggleEveningFilter = () =>
    {
        if(eveningFilter)
        {
            setEveningFilter(false);
            return;
        }

        setEveningFilter(true);
        return;
    }

    props.flights.map((el) =>
    {
        flightList.push(el);
        returnFlightList.push(el);
    });

    if(flightSelected)
    {
        console.log("wow ur trip to is selected");
    }

    if(returnFlightSelected)
    {
        console.log("wow way back selected");
    }

    //struct to store flights in a reverse linkedList
    //pattern for the multi-search algorithm
    function makeFlightStruct(e)
    {
        var flightRefs = e.split(' ');


        function constructor()
        {
            this[flightRefs[0]] = arguments[0];
            this[flightRefs[1]] = arguments[1];
        }
        return constructor;
    }

    function multiSearch()
    {
        //todo
        //create struct where each el has a ref to it's prev flightPoint except for the start of each search which uses null
        //replace iterating through map to find matches with, iterating through returned database results
        //
        //flightList.length = 0;
        //returnFlightList.length = 0;

        var FlightPoint = makeFlightStruct("prev curr");
        var flightPoints = [];

        flightList.length = 0;
        returnFlightList.length = 0;

        var startIndex = 0;

        props.flights.map((el) => {

            flightPoints.length = 0;
            //find next start point
            if(el.departure.toLowerCase() == props.searchQuery.departureLocation.toLowerCase())
            {
                var validTime = false;
                if(!props.searchQuery.flexibleDeparture
                    && el.departureDate.getFullYear() == props.searchQuery.soonestDepartureDate.getFullYear()
                    && el.departureDate.getMonth() == props.searchQuery.soonestDepartureDate.getMonth()
                    && el.departureDate.getDate() == props.searchQuery.soonestDepartureDate.getDate()
                    || props.searchQuery.flexibleDeparture
                    && el.departureDate.getFullYear() >= props.searchQuery.soonestDepartureDate.getFullYear()
                    && el.departureDate.getFullYear() <= props.searchQuery.latestDepartureDate.getFullYear()
                    && el.departureDate.getMonth() >= props.searchQuery.soonestDepartureDate.getMonth()
                    && el.departureDate.getMonth() <= props.searchQuery.latestDepartureDate.getMonth()
                    && el.departureDate.getDate() >= props.searchQuery.soonestDepartureDate.getDate()
                    && el.departureDate.getDate() <= props.searchQuery.latestDepartureDate.getDate())
                {
                    validTime = true;
                }

                if(validTime)
                {
                    if(el.destination.toLowerCase() == props.searchQuery.destinationLocation.toLowerCase())
                    {
                        //add to flight list
                        flightList.push([el])
                        //don't include other results as they are meaningless and create a loop
                    }
                    else
                    {
                        flightPoints.push(new FlightPoint(null, el));



                        //search for flights from this node
                        props.flights.map((el2) => {
                            if(el2.departure.toLowerCase() == flightPoints[startIndex].curr.destination.toLowerCase())
                            {
                                //check flight occurs after last flight
                                validTime = false;
                                var dayAfter = new Date();
                                dayAfter.setDate(el.departureDate.getDate() + 1);

                                if(el.departureDate.getFullYear() == el2.departureDate.getFullYear()
                                    && el.departureDate.getMonth() == el2.departureDate.getMonth()
                                    && el.departureDate.getDate() == el2.departureDate.getDate()
                                    ||
                                    dayAfter.getFullYear() == el2.departureDate.getFullYear()
                                    && dayAfter.getMonth() == el2.departureDate.getMonth()
                                    && dayAfter.getDate() == el2.departureDate.getDate())
                                {
                                    validTime = true;
                                }

                                if(validTime)
                                {
                                    if(el2.destination.toLowerCase() == props.searchQuery.destinationLocation.toLowerCase())
                                    {
                                        flightList.push([el, el2])
                                        //add to search results
                                        //don't search further due to loop
                                    }
                                    else
                                    {
                                        flightPoints.push(new FlightPoint(flightPoints[startIndex], el2));
                                    }
                                }
                            }
                        })

                        startIndex++;
                        var endIndex = flightPoints.length;
                        for(var i = startIndex; i < endIndex; i++)
                        {
                            props.flights.map((el2) => {

                                if(el2.departure.toLowerCase() == flightPoints[i].curr.destination.toLowerCase() &&
                                    el2.destination.toLowerCase() == props.searchQuery.destinationLocation.toLowerCase())
                                {
                                    //check if flight occurs after last flight
                                    validTime = false;
                                    var dayAfter = new Date();
                                    dayAfter.setDate(flightPoints[i].curr.departureDate.getDate() + 1);

                                    if(flightPoints[i].curr.departureDate.getFullYear() == el2.departureDate.getFullYear()
                                        && flightPoints[i].curr.departureDate.getMonth() == el2.departureDate.getMonth()
                                        && flightPoints[i].curr.departureDate.getDate() == el2.departureDate.getDate()
                                        ||
                                        dayAfter.getFullYear() == el2.departureDate.getFullYear()
                                        && dayAfter.getMonth() == el2.departureDate.getMonth()
                                        && dayAfter.getDate() == el2.departureDate.getDate())
                                    {
                                        validTime = true;
                                    }

                                    if(validTime)
                                    {
                                        //add flight to list
                                        flightList.push([el, flightPoints[i].curr, el2]);
                                        flightPoints.push(new FlightPoint(flightPoints[i], el2));
                                    }
                                }
                            })
                        }
                    }
                }


        }


        })

        //return trip details
        if(!props.searchQuery.oneWayTrip) {
            startIndex = 0;

            props.flights.map((el) => {

                flightPoints.length = 0;
                //find next start point
                if (el.departure.toLowerCase() == props.searchQuery.destinationLocation.toLowerCase()) {
                    var validTime = false;
                    if (!props.searchQuery.flexibleReturn
                        && el.departureDate.getFullYear() == props.searchQuery.soonestReturnDate.getFullYear()
                        && el.departureDate.getMonth() == props.searchQuery.soonestReturnDate.getMonth()
                        && el.departureDate.getDate() == props.searchQuery.soonestReturnDate.getDate()
                        || props.searchQuery.flexibleReturn
                        && el.departureDate.getFullYear() >= props.searchQuery.soonestReturnDate.getFullYear()
                        && el.departureDate.getFullYear() <= props.searchQuery.latestReturnDate.getFullYear()
                        && el.departureDate.getMonth() >= props.searchQuery.soonestReturnDate.getMonth()
                        && el.departureDate.getMonth() <= props.searchQuery.latestReturnDate.getMonth()
                        && el.departureDate.getDate() >= props.searchQuery.soonestReturnDate.getDate()
                        && el.departureDate.getDate() <= props.searchQuery.latestReturnDate.getDate()) {
                        validTime = true;
                    }

                    if (validTime) {
                        if (el.destination.toLowerCase() == props.searchQuery.departureLocation.toLowerCase()) {
                            //add to flight list
                            returnFlightList.push([el])
                            //don't include other results as they are meaningless and create a loop
                        } else {
                            flightPoints.push(new FlightPoint(null, el));


                            //search for flights from this node
                            props.flights.map((el2) => {
                                if (el2.departure.toLowerCase() == flightPoints[startIndex].curr.destination.toLowerCase()) {
                                    //check flight occurs after last flight
                                    validTime = false;
                                    var dayAfter = new Date();
                                    dayAfter.setDate(el.departureDate.getDate() + 1);

                                    if (el.departureDate.getFullYear() == el2.departureDate.getFullYear()
                                        && el.departureDate.getMonth() == el2.departureDate.getMonth()
                                        && el.departureDate.getDate() == el2.departureDate.getDate()
                                        ||
                                        dayAfter.getFullYear() == el2.departureDate.getFullYear()
                                        && dayAfter.getMonth() == el2.departureDate.getMonth()
                                        && dayAfter.getDate() == el2.departureDate.getDate()) {
                                        validTime = true;
                                    }

                                    if (validTime) {
                                        if (el2.destination.toLowerCase() == props.searchQuery.departureLocation.toLowerCase()) {
                                            returnFlightList.push([el, el2])
                                            //add to search results
                                            //don't search further due to loop
                                        } else {
                                            flightPoints.push(new FlightPoint(flightPoints[startIndex], el2));
                                        }
                                    }
                                }
                            })

                            startIndex++;
                            var endIndex = flightPoints.length;
                            for (var i = startIndex; i < endIndex; i++) {
                                props.flights.map((el2) => {

                                    if (el2.departure.toLowerCase() == flightPoints[i].curr.destination.toLowerCase() &&
                                        el2.destination.toLowerCase() == props.searchQuery.departureLocation.toLowerCase()) {
                                        //check if flight occurs after last flight
                                        validTime = false;
                                        var dayAfter = new Date();
                                        dayAfter.setDate(flightPoints[i].curr.departureDate.getDate() + 1);

                                        if (flightPoints[i].curr.departureDate.getFullYear() == el2.departureDate.getFullYear()
                                            && flightPoints[i].curr.departureDate.getMonth() == el2.departureDate.getMonth()
                                            && flightPoints[i].curr.departureDate.getDate() == el2.departureDate.getDate()
                                            ||
                                            dayAfter.getFullYear() == el2.departureDate.getFullYear()
                                            && dayAfter.getMonth() == el2.departureDate.getMonth()
                                            && dayAfter.getDate() == el2.departureDate.getDate()) {
                                            validTime = true;
                                        }

                                        if (validTime) {
                                            //add flight to list
                                            returnFlightList.push([el, flightPoints[i].curr, el2]);
                                            flightPoints.push(new FlightPoint(flightPoints[i], el2));
                                        }
                                    }
                                })
                            }
                        }
                    }


                }


            })
        }
    }

    function searchFlightList()
    {

        flightList.length = 0;
        returnFlightList.length = 0;

        props.flights.map((el) =>
        {

            if(!props.searchQuery.flexibleDeparture)
            {
                if(el.destination.toLowerCase() == props.searchQuery.destinationLocation.toLowerCase()
                    && el.departure.toLowerCase() == props.searchQuery.departureLocation.toLowerCase()
                    && el.departureDate.getFullYear() == props.searchQuery.soonestDepartureDate.getFullYear()
                    && el.departureDate.getMonth() == props.searchQuery.soonestDepartureDate.getMonth()
                    && el.departureDate.getDate() == props.searchQuery.soonestDepartureDate.getDate())
                {
                    if(!morningFilter && !afternoonFilter && !eveningFilter)
                    {
                        flightList.push(el);
                    }

                    if(morningFilter)
                    {
                        console.log("morning filter active");

                        if(el.departureDate.getHours() >= 0 && el.departureDate.getHours() < 12)
                        {
                            flightList.push(el);
                        }

                    }
                    if(afternoonFilter)
                    {
                        if(el.departureDate.getHours() >= 12  && el.departureDate.getHours() < 18)
                        {
                            flightList.push(el);
                        }
                    }
                    if(eveningFilter)
                    {
                        if(el.departureDate.getHours() >= 18)
                        {
                            flightList.push(el);
                        }
                    }
                }
            }
            else
            {
                if(el.destination.toLowerCase() == props.searchQuery.destinationLocation.toLowerCase()
                    && el.departure.toLowerCase() == props.searchQuery.departureLocation.toLowerCase()
                    && el.departureDate.getFullYear() >= props.searchQuery.soonestDepartureDate.getFullYear()
                    && el.departureDate.getFullYear() <= props.searchQuery.latestDepartureDate.getFullYear()
                    && el.departureDate.getMonth() >= props.searchQuery.soonestDepartureDate.getMonth()
                    && el.departureDate.getMonth() <= props.searchQuery.latestDepartureDate.getMonth()
                    && el.departureDate.getDate() >= props.searchQuery.soonestDepartureDate.getDate()
                    && el.departureDate.getDate() <= props.searchQuery.latestDepartureDate.getDate())
                {

                    if(!morningFilter && !afternoonFilter && !eveningFilter)
                    {
                        flightList.push(el);
                    }

                    if(morningFilter)
                    {
                        if(el.departureDate.getHours() >= 0 && el.departureDate.getHours() < 12)
                        {
                            flightList.push(el);
                        }
                    }
                    if(afternoonFilter)
                    {
                        if(el.departureDate.getHours() >= 12  && el.departureDate.getHours() < 18)
                        {
                            flightList.push(el);
                        }
                    }
                    if(eveningFilter)
                    {
                        if(el.departureDate.getHours() >= 18)
                        {
                            flightList.push(el);
                        }
                    }
                }
            }

            if(!props.searchQuery.oneWayTrip) {
                if (!props.searchQuery.flexibleReturn) {
                    if (el.destination.toLowerCase() == props.searchQuery.departureLocation.toLowerCase()
                        && el.departure.toLowerCase() == props.searchQuery.destinationLocation.toLowerCase()
                        && el.departureDate.getFullYear() == props.searchQuery.soonestReturnDate.getFullYear()
                        && el.departureDate.getMonth() == props.searchQuery.soonestReturnDate.getMonth()
                        && el.departureDate.getDate() == props.searchQuery.soonestReturnDate.getDate()) {
                        if (!morningFilter && !afternoonFilter && !eveningFilter) {
                            returnFlightList.push(el);
                        }

                        if (morningFilter) {
                            if (el.departureDate.getHours() >= 0 && el.departureDate.getHours() < 12) {
                                returnFlightList.push(el);
                            }
                        }
                        if (afternoonFilter) {
                            if (el.departureDate.getHours() >= 12 && el.departureDate.getHours() < 18) {
                                returnFlightList.push(el);
                            }
                        }
                        if (eveningFilter) {
                            if (el.departureDate.getHours() >= 18) {
                                returnFlightList.push(el);
                            }
                        }
                    }
                } else {
                    if (el.destination.toLowerCase() == props.searchQuery.departureLocation.toLowerCase()
                        && el.departure.toLowerCase() == props.searchQuery.destinationLocation.toLowerCase()
                        && el.departureDate.getFullYear() >= props.searchQuery.soonestReturnDate.getFullYear()
                        && el.departureDate.getFullYear() <= props.searchQuery.latestReturnDate.getFullYear()
                        && el.departureDate.getMonth() >= props.searchQuery.soonestReturnDate.getMonth()
                        && el.departureDate.getMonth() <= props.searchQuery.latestReturnDate.getMonth()
                        && el.departureDate.getDate() >= props.searchQuery.soonestReturnDate.getDate()
                        && el.departureDate.getDate() <= props.searchQuery.latestReturnDate.getDate()) {

                        if (!morningFilter && !afternoonFilter && !eveningFilter) {
                            returnFlightList.push(el);
                        }

                        if (morningFilter) {
                            if (el.departureDate.getHours() >= 0 && el.departureDate.getHours() < 12) {
                                returnFlightList.push(el);
                            }
                        }
                        if (afternoonFilter) {
                            if (el.departureDate.getHours() >= 12 && el.departureDate.getHours() < 18) {
                                returnFlightList.push(el);
                            }
                        }
                        if (eveningFilter) {
                            if (el.departureDate.getHours() >= 18) {
                                returnFlightList.push(el);
                            }
                        }
                    }
                }
            }
        })


    }

    function sort(e)
    {
        console.log(e);
        if(e == "soonest")
        {
            for(let i = 0; i < flightList.length; i++)
            {
                for(let j = 0; j < flightList.length - i - 1; j++)
                {
                    if(flightList[j+1][0].departureDate < flightList[j][0].departureDate)
                    {
                        [flightList[j+1], flightList[j]] = [flightList[j], flightList[j+1]];
                    }
                }
            }

            for(let i = 0; i < returnFlightList.length; i++)
            {
                for(let j = 0; j < returnFlightList.length - i - 1; j++)
                {
                    if(returnFlightList[j+1][0].departureDate < returnFlightList[j][0].departureDate)
                    {
                        [returnFlightList[j+1], returnFlightList[j]] = [returnFlightList[j], returnFlightList[j+1]];
                    }
                }
            }
        }
        else if(e == "latest")
        {
            for(let i = 0; i < flightList.length; i++)
            {
                for(let j = 0; j < flightList.length - i - 1; j++)
                {
                    if(flightList[j+1][0].departureDate > flightList[j][0].departureDate)
                    {
                        [flightList[j+1], flightList[j]] = [flightList[j], flightList[j+1]];
                    }
                }
            }

            for(let i = 0; i < returnFlightList.length; i++)
            {
                for(let j = 0; j < returnFlightList.length - i - 1; j++)
                {
                    if(returnFlightList[j+1][0].departureDate > returnFlightList[j][0].departureDate)
                    {
                        [returnFlightList[j+1], returnFlightList[j]] = [returnFlightList[j], returnFlightList[j+1]];
                    }
                }
            }
        }
        else if(e == "lowest price")
        {
            for(let i = 0; i < flightList.length; i++)
            {
                for(let j = 0; j < flightList.length - i - 1; j++)
                {
                    if(flightList[j+1].price < flightList[j].price)
                    {
                        [flightList[j+1], flightList[j]] = [flightList[j], flightList[j+1]];
                    }
                }
            }

            for(let i = 0; i < returnFlightList.length; i++)
            {
                for(let j = 0; j < returnFlightList.length - i - 1; j++)
                {
                    if(returnFlightList[j+1].price < returnFlightList[j].price)
                    {
                        [returnFlightList[j+1], returnFlightList[j]] = [returnFlightList[j], returnFlightList[j+1]];
                    }
                }
            }
        }
        else if(e == "highest price")
        {
            for(let i = 0; i < flightList.length; i++)
            {
                for(let j = 0; j < flightList.length - i - 1; j++)
                {
                    if(flightList[j+1].price > flightList[j].price)
                    {
                        [flightList[j+1], flightList[j]] = [flightList[j], flightList[j+1]];
                    }
                }
            }

            for(let i = 0; i < returnFlightList.length; i++)
            {
                for(let j = 0; j < returnFlightList.length - i - 1; j++)
                {
                    if(returnFlightList[j+1].price > returnFlightList[j].price)
                    {
                        [returnFlightList[j+1], returnFlightList[j]] = [returnFlightList[j], returnFlightList[j+1]];
                    }
                }
            }
        }
    }



    function Return()
    {
        if(props.searchQuery.oneWayTrip)
        {
            return null;
        }

        return (
          <div>
              <h2>Return Trip</h2>

              <table className={classes.tableList}>
                  <tr>
                      <th>Flight</th>
                      <th>Departure</th>
                      <th>Destination</th>
                      <th>Date</th>
                      <th>Dep</th>
                      <th>Arr</th>
                      <th></th>
                      <th></th>
                  </tr>
                  <tbody>
                  {returnFlightList.map((flightPackage) => (
                      flightPackage.map((flight) => (
                          <FlightItem
                              key={flight.flightId}
                              flightId={flight.flightId}
                              departureDate={flight.departureDate.getDate() + "/" + (flight.departureDate.getMonth() + 1)+ "/" + flight.departureDate.getFullYear()}
                              departureTime={flight.departureTime}
                              arrivalTime={flight.arrivalTime}
                              destination={flight.destination}
                              departure={flight.departure}
                              price={flight.price}
                              return={true}
                              selectedId={selectedReturnFlight.length > 0 ? selectedReturnFlight[0].flightId : ""}
                              selectFlight={res => res == true ? setReturnFlightSelected(true) : setFlightSelected(true)}
                              selFlight={res => setSelectedReturnFlight(res)}
                          />
                      ))
                  ))}
                  </tbody>
              </table>
          </div>
        );
    }

    function bookingFlightHandler()
    {
        const flightArr = [];

        if(props.searchQuery.oneWayTrip)
        {

           if(flightSelected)
           {
               selectedFlight.map((flight) =>
               {
                   flightArr.push(flight);
               })

               //move onto next phase

               context.setBookingsSelected(true);
               console.log(context.bookingsSelected);
               props.exportFlights(flightArr);
               return;
           }
        }
        else
        {
            if(flightSelected && returnFlightSelected)
            {
                selectedFlight.map((flight) =>
                {
                    flightArr.push(flight);
                })
                selectedReturnFlight.map((flight) =>
                {
                    flightArr.push(flight);
                })

                context.setBookingsSelected(true);
                console.log(context.bookingsSelected);
                props.exportFlights(flightArr);
                return;
            }
        }

        //some error has occured
        console.log("you have not selected a return or departure flights");
        return;
    }

    function sponsoredSort(arr)
    {
        for(let i = 0; i < arr.length; i++)
        {
            for(let j = 0; j < arr.length - i - 1; j++)
            {
                var nextSponsored = false;
                var thisSponsored = false;
                for(let h = 0; h < arr[j + i].length; h++)
                {
                    if(arr[j + 1][h].sponsored == true)
                    {
                        nextSponsored = true;
                        break;
                    }
                }

                for(let h = 0; h < arr[j].length; h++)
                {
                    if(arr[j][h].sponsored == true)
                    {
                        thisSponsored = true;
                        break;
                    }
                }

                if(nextSponsored == true &&  thisSponsored == false)
                {
                    [arr[j+1], arr[j]] = [arr[j], arr[j+1]];
                }
            }
        }
    }

    multiSearch();
    //searchFlightList();
    //sort("latest");
    sponsoredSort(flightList);
    sponsoredSort(returnFlightList);

    //what do need
    //filters
    //sort by

    //


    return (

        <Card>
            <h2>Trip to Destination</h2>


            <div className={classes.list}>

                <label htmlFor='morningDeparture'> Morning Departure </label>
                <input type='checkbox' id='morningDeparture' onClick={toggleMorningFilter} />

                <label htmlFor='afternoonDeparture'> Afternoon Departure </label>
                <input type='checkbox' id='afternoonDeparture' onClick={toggleAfternoonFilter} />

                <label htmlFor='eveningDeparture'> Evening Departure </label>
                <input type='checkbox' id='eveningDeparture' onClick={toggleEveningFilter}/>
            </div>

            <table className={classes.tableList}>
                <tr>
                    <th>Flight</th>
                    <th>Departure</th>
                    <th>Destination</th>
                    <th>Date</th>
                    <th>Dep</th>
                    <th>Arr</th>
                    <th></th>
                    <th></th>
                </tr>
                <tbody>
                    {flightList.map((flightPackage) => (
                        flightPackage.map((flight) => (
                                <FlightItem
                                    key={flight.flightId}
                                    flightId={flight.flightId}
                                    departureDate={flight.departureDate.getDate() + "/" + (flight.departureDate.getMonth() + 1)+ "/" + flight.departureDate.getFullYear()}
                                    departureTime={flight.departureTime}
                                    arrivalTime={flight.arrivalTime}
                                    destination={flight.destination}
                                    departure={flight.departure}
                                    price={flight.price}
                                    selectedId={selectedFlight.length > 0 ? selectedFlight[0].flightId : ""}
                                    return={false}
                                    selectFlight={res => res == true ? setReturnFlightSelected(true) : setFlightSelected(true)}
                                    selFlight={res => setSelectedFlight(res)}
                                />
                        ))
                    ))}
                </tbody>
            </table>

            <Return />


            <button className={classes.submitButt} onClick={bookingFlightHandler}>
                Book Flights
            </button>

        </Card>

    );
}

export default FlightList;