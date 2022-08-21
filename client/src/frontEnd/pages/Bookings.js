//frontend/pages/Bookings.js

import React, { useState } from 'react';
import {useContext, useRef} from 'react';
import Card from "../components/ui/Card";
import classes from "../components/bookings/Bookings.module.css"
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import FlightPubContext from "../store/FlightPubContext";
import {Link} from "react-router-dom";

function BookingsPage() {
    const context = useContext(FlightPubContext);

    const[selectedFutureFlight, setSelectedFutureFlight] = useState(-1);
    const[selectedPastFlight, setSelectedPastFlight] = useState(-1);
    const [content, setContent] = useState("");
    let userdata;

    if (context.userDetails == null) {
        userdata = null;
    }
    else{
        userdata = "/" + context.userDetails.email;
    }
    const{data, loading, error} = useFetch("/booking" + userdata);
    const date = new Date();

    const RECOMMENDEDFLIGHTS = [
        {
            departure: 'Sydney',
            destination: 'Adelaide'
        },
        {
            departure: 'Sydney',
            destination: 'Brisbane'
        },
        {
            departure: 'Newcastle',
            destination: 'Sydney'
        },
        {
            departure: 'Newcastle',
            destination: 'Brisbane'
        },
        {
            departure: 'Adelaide',
            destination: 'Brisbane'
        },
    ]

    const recommendFlight = date.getHours()%RECOMMENDEDFLIGHTS.length; // recommendation changes every hour
    const navigate = useNavigate();

    function CheckBookings()
    {
        if (data.length > 0 && userdata != null) {
            return GetBookings();
        }
        else
        {
            return NoBookings();
        }
    }

    function FormatDate(e) {
        return (e.target)
    }

    function UpperCase(e) {
        const str = e.target;
        return str.toUpperCase();
    }

    function NoBookings() {
        return (
            <Card>
                <td> you have no booking entries </td>
            </Card>
        );
    }

    function rebookFlight(booking) {
        context.setDestination(booking.destination);
        context.setDeparture(booking.departure);
    }

    function cancelFlight(booking)
    {

    }

    function selectFlight(booking){
        const _date = new Date(booking.returnDate);
        if (date > _date){
            setSelectedFutureFlight(booking.bookingID);
            setSelectedPastFlight(null);
        }
        else {
            setSelectedFutureFlight(null);
            setSelectedPastFlight(booking.bookingID);
        }
    }

    function searchRecommended(){
        context.setDestination(RECOMMENDEDFLIGHTS[recommendFlight].destination);
        context.setDeparture(RECOMMENDEDFLIGHTS[recommendFlight].departure);
    }

    function GetRecommendation()
    {
        return (
            <Card>
                <div className = {classes.recommended}>
                        <Link className={classes.oneClickSelected} to="/" onClick={() => { searchRecommended()}}> search flight </Link>
                    <tr>
                        <td className = {classes.recommendedText}> <strong> Recommended trip </strong></td>
                    </tr>
                    <tr>
                        <td className = {classes.recommendedText}><strong>From</strong> {RECOMMENDEDFLIGHTS[recommendFlight].departure} </td>
                        <td className = {classes.recommendedText}><strong>To</strong> {RECOMMENDEDFLIGHTS[recommendFlight].destination} </td>
                    </tr>
                </div>
            </Card>
        )
    }

    function GetBookings() {
        return (
            <Card>
                {data.map( (booking) => ( // change to data.map
                    // move all this logic to a components/bookings
                    // same order as the schema, copy mapchart
                    <div className = {booking.bookingID == selectedFutureFlight ? classes.SelectedFuture : (booking.bookingID == selectedPastFlight ? classes.SelectedPast : classes.Booking) } onClick={() => selectFlight(booking)} >
                        <Link className= {booking.bookingID == selectedFutureFlight ? classes.oneClickSelected : classes.oneClick} to="/" onClick={() => { rebookFlight(booking) }}> rebook trip </Link>
                        <button className= {booking.bookingID == selectedPastFlight ? classes.oneClickSelected : classes.oneClick} onClick={() => { cancelFlight(booking) }}> cancel trip </button>

                        <tr>
                            <td>  <strong>Booking</strong> {booking.bookingID} {<FormatDate target={booking.bookingDate} />}</td>
                        </tr>
                        <tr className={classes.row}>
                            <td><strong>Flight</strong> {booking.flight} </td>
                            <td><strong>Seat</strong> {booking.seat} </td>
                        </tr>
                        <tr className={classes.row}>
                            <td> <strong>From</strong> {<UpperCase target={booking.departure} />}</td>

                            <td> <strong>Departing </strong> {<FormatDate target={booking.departureDate} />} <strong> at </strong> {booking.departureTime}</td>
                        </tr>
                        <tr className={classes.row}>
                            <td> <strong>To</strong> {<UpperCase target={booking.destination} />} </td>
                            <td> <strong>Returning </strong> {<FormatDate target={booking.returnDate} />} <strong> at </strong> {booking.returnTime}</td>
                        </tr>
                    </div>
                ))}
            </Card>
        );
    }

    return (
        <section>
            <GetRecommendation/>
            <h1> My Bookings </h1>
            <CheckBookings/>
        </section>
    );

}
export default BookingsPage;