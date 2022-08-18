import React from 'react';
import useFetch from './../../hooks/useFetch';
import { useCart } from 'react-use-cart';

import FlightPubContext from '../store/FlightPubContext';
import BookingsPage from './../pages/Bookings';
import FlightItem from '../components/flights/FlightItem';
import Card from "../components/ui/Card";
import classes from '../components/wishlist/Wishlist.module.css';

const WISHLIST = [{
    AirlineCode: 'QANTAS',
    Departure:'Darwin',
    Destination:'Melbourne',
},]
function WishListPage() {
    const{data, loading, error} = useFetch("/wishlist");
    return(
        <div>
            <h1 className="text text-center">Wishlist</h1>
            <section className="py-4 container"></section>
            <div className="col-12">
                <h5>Total Items: </h5>
                <Card>
                    {data.map( (wishlist) => (

                        <div
                            // className = {booking.bookingID == selectedFlight ? classes.Selected : classes.Booking }
                            // onClick={() => rebookFlight(booking.bookingID)}
                        >
                            <tr className={classes.row}>
                                <td> <strong>Airline</strong> {wishlist.AirlineCode} </td>
                            </tr>
                            <tr className={classes.row}>
                                <td><strong>Departure</strong> {wishlist.Departure} </td>
                                <td><strong>Destination</strong> {wishlist.Destination} </td>
                            </tr>
                        </div>
                    ))}
                </Card>
            </div>
        </div>
    )
}

export default WishListPage