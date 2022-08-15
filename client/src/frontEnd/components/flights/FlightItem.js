import classes from './FlightItem.module.css';
function FlightItem(props) {

    function toggleFavouriteStatusHandler() {

    }

    function bookFlightHandler() {

    }

    return (

                <tr className={props.selectedId == props.flightId ? classes.selectedFlight : classes.row}>
                    <td> {props.flightId}</td>
                    <td> {props.departure}</td>
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
                            Select Flight
                        </button>
                    </td>
                </tr>
    );
}

export default FlightItem;