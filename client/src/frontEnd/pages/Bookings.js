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

    const[selectedFlight, setSelectedFlight] = useState(-1);
    const [content, setContent] = useState("");
    const{data, loading, error} = useFetch("/booking");
    const context = useContext(FlightPubContext);
    const date = new Date();
    console.log(date);

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
        if (data.length > 0 ) {
            return GetBookings();
        }
        else
        {
            console.log("yes");
            return NoBookings();
        }
    }

    function FormatDate(e) {
        const _date = new Date(e.target);
        return (
            _date.getDate() + "/" + (_date.getMonth() + 1)+ "/" + _date.getFullYear()
        );
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

    function selectFlight(bookingID){
        setSelectedFlight(bookingID);
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
                        <td className = {classes.recommendedText}> <strong> Recommended flight </strong></td>
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
                    <div className = {booking.bookingID == selectedFlight ? classes.Selected : classes.Booking } onClick={() => selectFlight(booking.bookingID)} >
                        <Link className= {booking.bookingID == selectedFlight ? classes.oneClickSelected : classes.oneClick} to="/" onClick={() => { rebookFlight(booking) }}> rebook </Link>
                        <tr>
                            <td>  <strong>Booking</strong> {booking.bookingID} {<FormatDate target={booking.bookingDate} />}</td>
                        </tr>
                        <tr className={classes.row}>
                            <td><strong>Flight</strong> {booking.flight} </td>
                            <td><strong>Seat</strong> {booking.seat} </td>
                            <td> <strong>Cost</strong> {booking.cost} </td>
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