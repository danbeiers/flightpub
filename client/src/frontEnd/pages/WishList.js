import React, {useContext} from 'react';
import useFetch from './../../hooks/useFetch';
//import { useCart } from 'react-use-cart';

import FlightPubContext from '../store/FlightPubContext';
import BookingsPage from './../pages/Bookings';
import FlightItem from '../components/flights/FlightItem';
import Card from "../components/ui/Card";
import classes from '../components/wishlist/Wishlist.module.css';
import {Link} from "react-router-dom";




function WishListPage() {

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
    const date = new Date();
    const recommendFlight = date.getHours()%RECOMMENDEDFLIGHTS.length; // recommendation changes every hour
    const context = useContext(FlightPubContext);
    let userdata;

    if (context.userDetails == null) {
        userdata = null;
    }
    else{
        userdata = "/" + context.userDetails.email;
    }
    const{data, loading, error} = useFetch("/wishlist" + userdata);

    const wishlistEntries = [];
    data.map((wishlist) => {
        //insert user id check here
        if(true)
        {
            wishlistEntries.push(<div
                // className = {booking.bookingID == selectedFlight ? classes.Selected : classes.Booking }
                // onClick={() => rebookFlight(booking.bookingID)}
            >

                <tr className={classes.row}>
                    <td><strong>Departure</strong> {wishlist.departure} </td>
                    <td><strong>Destination</strong> {wishlist.destination} </td>
                </tr>
            </div>);
        }
    })

    function GetWishlist() {
        return (
            <div>
                <h1 className="text text-center">Wishlist</h1>
                <section className="py-4 container"></section>
                <div className="col-12">
                    <Card>
                        {wishlistEntries}
                    </Card>
                </div>
            </div>
        );
    }

    return(
        <section>
            <GetRecommendation/>
            <GetWishlist/>
        </section>
    )

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

}

export default WishListPage