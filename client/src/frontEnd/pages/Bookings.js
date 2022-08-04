import React, { useState } from 'react';
import Card from "../components/ui/Card";
import classes from "../components/bookings/Bookings.module.css"

function BookingsPage() {

    const RECOMMENDATIONS = [
        {
            recommended: 'Discounted offer',
            bookingID: 158589,
            flight: 'SN493',
            seat: '4C',
            from: 'SYDNEY',
            to: 'NEWCASTLE',
            bookingDate: new Date('May 05, 2021'),
            departureDate: new Date('May 18, 2021'),
            departureTime: '11:45 AM',
            returnDate: new Date('May 25, 2021'),
            returnTime: '3:00 PM',
            cost: '$49',
            discount: '30%',
        },
        {
            recommended: 'Frequent flight',
            bookingID: 159564,
            flight: 'SA266',
            seat: '7A',
            from: 'SYDNEY',
            to: 'ADELAIDE',
            bookingDate: new Date('October 01, 2021'),
            departureDate: new Date('October 04, 2021'),
            departureTime: '5:30 AM',
            returnDate: new Date('October 07, 2021'),
            returnTime: '7:00 PM',
            cost: '$127',
            discount: '15%',
        },
        {
            recommended: 'Hot destination',
            bookingID: 158322,
            flight: 'NB107',
            seat: '4C',
            from: 'NEWCASTLE',
            to: 'BRISBANE',
            bookingDate: new Date('April 14, 2021'),
            departureDate: new Date('April 17, 2021'),
            departureTime: '11:00 AM',
            returnDate: new Date('April 24, 2021'),
            returnTime: '4:00 PM',
            cost: '$225',
            discount: '10%',
        },
    ]

    const BOOKINGS = [
        {
            bookingID: 159871,
            flight: 'SA266',
            seat: '2D',
            from: 'SYDNEY',
            to: 'ADELAIDE',
            bookingDate: new Date('October 09, 2021'),
            departureDate: new Date('October 11, 2021'),
            departureTime: '5:30 AM',
            returnDate: new Date('October 15, 2021'),
            returnTime: '7:00 PM',
            cost: '$127',
            discount: '15%',
        },
        {
            bookingID: 159564,
            flight: 'SA266',
            seat: '7A',
            from: 'SYDNEY',
            to: 'ADELAIDE',
            bookingDate: new Date('October 01, 2021'),
            departureDate: new Date('October 04, 2021'),
            departureTime: '5:30 AM',
            returnDate: new Date('October 08, 2021'),
            returnTime: '7:00 PM',
            cost: '$127',
            discount: '15%',
        },
        {
            bookingID: 158589,
            flight: 'SN493',
            seat: '4C',
            from: 'SYDNEY',
            to: 'NEWCASTLE',
            bookingDate: new Date('May 05, 2021'),
            departureDate: new Date('May 18, 2021'),
            departureTime: '11:45 AM',
            returnDate: new Date('May 25, 2021'),
            returnTime: '3:00 PM',
            cost: '$59',
            discount: '30%',
        },
        {
            bookingID: 158322,
            flight: 'NB107',
            seat: '4C',
            from: 'NEWCASTLE',
            to: 'BRISBANE',
            bookingDate: new Date('April 14, 2021'),
            departureDate: new Date('April 17, 2021'),
            departureTime: '11:00 AM',
            returnDate: new Date('April 24, 2021'),
            returnTime: '4:00 PM',
            cost: '$225',
            discount: '10%',
        },
    ]

    const[selectedFlight, setSelectedFlight] = useState(-1);

    function CheckRecommendations() {
        if (RECOMMENDATIONS.length > 0) {
             return GetRecommendations();
        }
    }

    function CheckBookings() {
        if (BOOKINGS.length > 0) {
            return GetBookings();
        }
    }

    function rebookFlight(bookingID) {
        setSelectedFlight(bookingID);
        console.log(selectedFlight);
    }

    function GetRecommendations() {
        return (
            <section>
                <h1> Recommendations </h1>
                <Card>
                    {RECOMMENDATIONS.map( (booking) => (

                        <div className = {booking.bookingID == selectedFlight ? classes.Selected : classes.Booking } onClick={() => rebookFlight(booking.bookingID)} >
                            <tr className={classes.row}>
                                <td> <strong>Booking</strong> {booking.bookingID} </td>
                                <td> <strong>{booking.recommended} </strong> </td>
                            </tr>
                            <tr className={classes.row}>
                               <td><strong>Flight</strong> {booking.flight} </td>
                               <td><strong>Seat</strong> {booking.seat} </td>
                               <td> <strong>Booked on </strong> {booking.bookingDate.getDate() + "/" + (booking.bookingDate.getMonth() + 1)+ "/" + booking.bookingDate.getFullYear()} </td>
                            </tr>
                            <tr className={classes.row}>
                                <td> <strong>From</strong> {booking.from} </td>
                                <td> <strong>Departure</strong> {booking.departureDate.getDate() + "/" + (booking.departureDate.getMonth() + 1)+ "/" + booking.departureDate.getFullYear()} </td>
                                <td> <strong>Departure time</strong> {booking.departureTime} </td>
                            </tr>
                            <tr className={classes.row}>
                                <td> <strong>To</strong> {booking.to} </td>
                                <td> <strong>Return</strong> {booking.returnDate.getDate() + "/" + (booking.departureDate.getMonth() + 1)+ "/" + booking.departureDate.getFullYear()} </td>
                                <td> <strong>Return time</strong> {booking.returnTime} </td>
                            </tr>
                            <tr className={classes.row}>
                                <td> <strong>Cost</strong> {booking.cost} </td>
                                <CheckDiscount target={booking.discount}/>
                            </tr>
                        </div>
                    ))}
                    <form onSubmit={rebookFlight}>
                        <input target="submit" type="submit" value="Rebook"/>
                    </form>
                </Card>
            </section>
        );
    }

    function CheckDiscount(e) {
        if (e.target != null)
        {
            return (
                <td> <strong>Discount applied</strong> {e.target} </td>
            );
        }
        return null;
    }

 function GetBookings() {
        return (
            <section>
                <h1> My Bookings </h1>
                <Card>
                    {BOOKINGS.map( (booking) => (

                        <div className = {booking.bookingID == selectedFlight ? classes.Selected : classes.Booking } onClick={() => rebookFlight(booking.bookingID)} >
                            <tr className={classes.row}>
                                <td> <strong>Booking</strong> {booking.bookingID} </td>
                            </tr>
                            <tr className={classes.row}>
                               <td><strong>Flight</strong> {booking.flight} </td>
                               <td><strong>Seat</strong> {booking.seat} </td>
                               <td> <strong>Booked on </strong> {booking.bookingDate.getDate() + "/" + (booking.bookingDate.getMonth() + 1)+ "/" + booking.bookingDate.getFullYear()} </td>
                            </tr>
                            <tr className={classes.row}>
                                <td> <strong>From</strong> {booking.from} </td>
                                <td> <strong>Departure</strong> {booking.departureDate.getDate() + "/" + (booking.departureDate.getMonth() + 1)+ "/" + booking.departureDate.getFullYear()} </td>
                                <td> <strong>Departure time</strong> {booking.departureTime} </td>
                            </tr>
                            <tr className={classes.row}>
                                <td> <strong>To</strong> {booking.to} </td>
                                <td> <strong>Return</strong> {booking.returnDate.getDate() + "/" + (booking.departureDate.getMonth() + 1)+ "/" + booking.departureDate.getFullYear()} </td>
                                <td> <strong>Return time</strong> {booking.returnTime} </td>
                            </tr>
                            <tr className={classes.row}>
                                <td> <strong>Cost</strong> {booking.cost} </td>
                                <CheckDiscount target={booking.discount}/>
                            </tr>
                        </div>
                    ))}
                    <form onSubmit={rebookFlight}>
                        <input target="submit" type="submit" value="Rebook"/>
                    </form>
                </Card>
            </section>
        );
    }

    return (
        <section>
            <CheckRecommendations/>
            <CheckBookings/>
        </section>
    );

}
export default BookingsPage;