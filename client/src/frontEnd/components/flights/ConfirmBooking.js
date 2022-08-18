import {useContext} from 'react';
import classes from './FlightItem.module.css';
import {useState} from "react";
import FlightPubContext from "../../store/FlightPubContext";

import Card from "../ui/Card";

function ConfirmBooking(props) {

    const context = useContext(FlightPubContext);
    const depFlights = [];
    const retFlights = [];

    function bookingHandler(e)
    {
        console.log(e)
        //context.setUserDetails(...context.userDetails.bookedFlights,{e})
        return;
    }

    function Flight(e)
    {
        console.log(e.e);
        return(
            <tr className = {classes.row}>
                <td> {e.e.flightId}</td>
                <td> {e.e.departure}</td>
                <td> {e.e.destination}</td>
                <td> {e.e.departureDate.getDate() + "/" + (e.e.departureDate.getMonth() + 1)+ "/" + e.e.departureDate.getFullYear()}</td>
                <td> {e.e.departureTime}</td>
                <td> {e.e.arrivalTime}</td>
                <td> ${e.e.price} AUD</td>

            </tr>);
    }

    props.flights.map((flight) =>
        {
          if(!flight.isReturn)
          {
              depFlights.push(<Flight e={flight}/>)}
          else
          {
              retFlights.push(<Flight e={flight}/>)
          }})

    return (
        <Card>
            <h1>Booking Preview</h1>

            <h2>Flight to Destination</h2>
            <div>
                    <table>
                        <tr>
                            <th>Flight</th>
                            <th>Departure</th>
                            <th>Destination</th>
                            <th>Date</th>
                            <th>Departure</th>
                            <th>Arrival</th>
                            <th>Price</th>
                        </tr>
                        <tbody>

                             {depFlights}

                        </tbody>
                    </table>
            </div>

            <h2>Return Flight</h2>

            <div>

                <table>
                    <tr>
                        <th>Flight</th>
                        <th>Departure</th>
                        <th>Destination</th>
                        <th>Date</th>
                        <th>Departure</th>
                        <th>Arrival</th>
                        <th>Price</th>
                    </tr>
                    <tbody>
                        {retFlights}
                    </tbody>
                </table>
            </div>

            <button onClick={bookingHandler}>Proceed to payment</button>
        </Card>
    );
}

export default ConfirmBooking;