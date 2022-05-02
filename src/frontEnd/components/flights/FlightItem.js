import classes from './FlightItem.module.css';
function FlightItem(props) {

    function toggleFavouriteStatusHandler() {

    }

    function bookFlightHandler() {

    }

    return (
            <tr className={classes.row}>
                <td> {props.flightId}</td>
                <td> {props.destination}</td>
                <td> {props.departureDate}</td>
                <td> {props.departureTime}</td>
                <td> {props.arrivalTime}</td>
                <td>
                    <button className= {classes.actions} onClick={toggleFavouriteStatusHandler}>
                        To Favorites
                    </button>
                </td>
                <td>
                    <button className= {classes.actions} onClick={bookFlightHandler}>
                        Book Flight
                    </button>
                </td>
            </tr>
    );
}

export default FlightItem;