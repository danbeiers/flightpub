import React from 'react';
import useFetch from './../../hooks/useFetch';
//import { useCart } from 'react-use-cart';

import FlightPubContext from '../store/FlightPubContext';
import BookingsPage from './../pages/Bookings';
import FlightItem from '../components/flights/FlightItem';
import Card from "../components/ui/Card";
import classes from '../components/wishlist/Wishlist.module.css';

function WishListPage() {
    const{data, loading, error} = useFetch("/wishlist");

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

    return(
        <div>
            <h1 className="text text-center">Wishlist</h1>
            <section className="py-4 container"></section>
            <div className="col-12">
                <h5>Total Items: </h5>
                <Card>
                    {wishlistEntries}
                </Card>
            </div>
        </div>
    )
}

export default WishListPage