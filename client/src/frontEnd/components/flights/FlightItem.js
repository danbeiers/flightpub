import classes from './FlightItem.module.css';
import { useNavigate } from "react-router-dom";
import {selectFlight} from './MultiFlightItem';

function FlightItem(props) {

    const navigate = useNavigate();

    const sponsored = [];

    const toggleFavouriteStatusHandler = async()=>{
    {
        const res = await fetch('/wishlist',
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

    if(props.sponsored)
    {
        sponsored.push(<td>Sponsored</td>);
    }

    return (

                <tr className={props.selected ? classes.selectedFlight : classes.row} >
                    <td> {props.flightId}</td>
                    <td> {props.departure}</td>
                    <td> {props.destination}</td>
                    <td> {props.departureDate}</td>
                    <td> {props.departureTime}</td>
                    <td> {props.arrivalTime}</td>
                    <td> {props.code}</td>
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
