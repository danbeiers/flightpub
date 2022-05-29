import {useContext} from 'react';
import {useState} from "react";
import FlightPubContext from "../../store/FlightPubContext";

import Card from "../ui/Card";

function ConfirmBooking(props) {

    const context = useContext(FlightPubContext);

    function bookingHandler(e)
    {
        return;
    }

    function Departure(e)
    {
        const depFlights = [];

        props.flights.map((flight) =>
        {
          if(!flight.isReturn)
          {
              console.log(flight);
              depFlights.push(flight);
          }
        })

        return (
            <div>

                <table>
                    <tr>
                        <th>Flight</th>
                        <th>Departure</th>
                        <th>Destination</th>
                        <th>Date</th>
                        <th>Dep</th>
                        <th>Arr</th>
                        <th>Price</th>
                    </tr>
                    <tbody>
                        {depFlights.map((flight) => (
                            <tr>
                                <td> {flight.flightId}</td>
                                <td> {flight.departure}</td>
                                <td> {flight.destination}</td>
                                <td> {flight.departureDate}</td>
                                <td> {flight.departureTime}</td>
                                <td> {flight.arrivalTime}</td>
                                <td> ${flight.price} AUD</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    function Return(e)
    {
        if(props.oneWay)
        {
            return null;
        }

        var retFlights = [];

        props.flights.map((flight) =>
        {
            if(flight.isReturn)
            {
                retFlights.push(flight);
            }
        })

        return (
            <div>

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

                            {retFlights.map((flight) => (
                                <tr>
                                    <td> {flight.flightId}</td>
                                    <td> {flight.departure}</td>
                                    <td> {flight.destination}</td>
                                    <td> {flight.departureDate}</td>
                                    <td> {flight.departureTime}</td>
                                    <td> {flight.arrivalTime}</td>
                                    <td> ${flight.price} AUD</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    return (
        <Card>
            <h1>Booking Preview</h1>

            <h2>Flight to Destination</h2>
            <Departure/>

            <Return/>
            <button onClick={bookingHandler}>Proceed to payment</button>
        </Card>
    );
}

export default ConfirmBooking;