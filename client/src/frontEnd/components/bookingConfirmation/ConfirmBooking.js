import {useContext} from 'react';
import classes from '../flights/FlightItem.module.css';
import listClasses from "../flights/FlightList.module.css"
import {useState} from "react";
import FlightPubContext from "../../store/FlightPubContext";

import Card from "../ui/Card";
import PaymentInputs from "./PaymentInputs";
import TextField from "@mui/material/TextField";

function ConfirmBooking(props) {

    const context = useContext(FlightPubContext);
    const depFlights = [];
    const retFlights = [];
    const returnFlightForm = [];
    const userDetailsForm = [];
    const paymentForm = [];
    const [confirmBooking, setConfirmBooking] = useState(false);

    if(confirmBooking)
    {
        paymentForm.push(<PaymentInputs
                        userName={"placeholder"}
                        flights={props.flights}/>);
    }

    if(!context.userDetails == null)
    {
        userDetailsForm.push(
            <div>
                <br/>
                <h2>User Details</h2>
                <form className={listClasses.form}>
                    <TextField
                        variant="outlined"
                        label="FirstName"/>
                    <TextField
                        variant="outlined"
                        label="LastName"/>
                    <TextField
                        variant="outlined"
                        label="Email"/>
                </form>
            </div>
        );
    }

    function bookingHandler(e)
    {
        setConfirmBooking(true);
        return;
    }

    function Flight(e)
    {
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

    if(retFlights.length > 0)
    {
        returnFlightForm.push(<div>
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
        </div>);
    }

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

            {returnFlightForm}


            {userDetailsForm}

            <button onClick={bookingHandler}>Proceed to payment</button>

            {paymentForm}

        </Card>
    );
}

export default ConfirmBooking;