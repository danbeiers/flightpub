import FlightItem from './FlightItem';
import classes from './FlightList.module.css';
import Card from "../ui/Card";

function FlightList(props) {
    return (
        <Card>
            <table className={classes.tableList}>
                <tr>
                    <th>Flight</th>
                    <th>Destination</th>
                    <th>Date</th>
                    <th>Dep</th>
                    <th>Arr</th>
                    <th></th>
                    <th></th>
                </tr>
                <tbody>
                    {props.flights.map((flight) => (
                        <FlightItem
                            key={flight.flightId}
                            flightId={flight.flightId}
                            departureDate={flight.departureDate}
                            departureTime={flight.departureTime}
                            arrivalTime={flight.arrivalTime}
                            destination={flight.destination}
                        />

                    ))}
                </tbody>
            </table>
        </Card>

    );
}

export default FlightList;