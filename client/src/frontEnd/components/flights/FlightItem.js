import classes from './FlightItem.module.css';
function FlightItem(props) {

    const sponsored = [];

    function toggleFavouriteStatusHandler() {

    }

    function bookFlightHandler() {

    }

    if(props.sponsored)
    {
        sponsored.push(<td>Sponsored</td>);
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
                    {sponsored}
                </tr>
    );
}

export default FlightItem;