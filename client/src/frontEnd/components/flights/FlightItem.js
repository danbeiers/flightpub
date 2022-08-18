import classes from './FlightItem.module.css';
import { useNavigate } from "react-router-dom";

function FlightItem(props) {

    const navigate = useNavigate();
   /* const jsonData = {
        departure: props.departure,
        destination:props.destination
    }*/

    const toggleFavouriteStatusHandler = async()=>{
    {
         console.log(props.departure);
        console.log(props.destination);
        const res = await fetch('http://localhost:8800/wishlist',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // mode: 'cors',
                body: JSON.stringify({
                    departure: props.departure,
                    destination:props.destination
                }),
            })
        }
        navigate("/wishlist");
    }

    function bookFlightHandler() {

    }

    function selectFlight()
    {
        props.selectFlight(props.return);

        const flightData = [];

        flightData.push(
            {
                flightId: props.flightId,
                departure: props.departure,
                destination: props.destination,
                departureDate: props.departureDate,
                departureTime: props.departureTime,
                arrivalTime: props.arrivalTime,
                price: props.price,
                isReturn: props.return,

            }
        );

        props.selFlight(flightData);
    }

    return (
                <tr onClick={selectFlight}  className={props.selectedId == props.flightId ? classes.selectedFlight : classes.row}>
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