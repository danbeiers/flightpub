import FlightItem from './FlightItem';
import classes from './FlightList.module.css';
import Card from "../ui/Card";
import {useState} from "react";


function FlightList(props) {

    const [flightList, setFlightList] = useState([]);
    const [returnFlightList, setReturnFlightList] = useState([]);

    props.flights.map((el) =>
    {
        flightList.push(el);
        returnFlightList.push(el);
    });

    function searchFlightList()
    {
        flightList.length = 0;
        returnFlightList.length = 0;

        props.flights.map((el) =>
        {

            if(!props.searchQuery.flexibleDeparture)
            {
                if(el.destination.toLowerCase() == props.searchQuery.destinationLocation.toLowerCase()
                    && el.departure.toLowerCase() == props.searchQuery.departureLocation.toLowerCase()
                    && el.departureDate.getFullYear() == props.searchQuery.soonestDepartureDate.getFullYear()
                    && el.departureDate.getMonth() == props.searchQuery.soonestDepartureDate.getMonth()
                    && el.departureDate.getDate() == props.searchQuery.soonestDepartureDate.getDate())
                {

                    flightList.push(el);
                }
            }
            else
            {
                if(el.destination.toLowerCase() == props.searchQuery.destinationLocation.toLowerCase()
                    && el.departure.toLowerCase() == props.searchQuery.departureLocation.toLowerCase()
                    && el.departureDate.getFullYear() >= props.searchQuery.soonestDepartureDate.getFullYear()
                    && el.departureDate.getFullYear() <= props.searchQuery.latestDepartureDate.getFullYear()
                    && el.departureDate.getMonth() >= props.searchQuery.soonestDepartureDate.getMonth()
                    && el.departureDate.getMonth() <= props.searchQuery.latestDepartureDate.getMonth()
                    && el.departureDate.getDate() >= props.searchQuery.soonestDepartureDate.getDate()
                    && el.departureDate.getDate() <= props.searchQuery.latestDepartureDate.getDate())
                {

                    flightList.push(el);
                }
            }

            if(!props.searchQuery.flexibleReturn)
            {
                if(el.destination.toLowerCase() == props.searchQuery.departureLocation.toLowerCase()
                    && el.departure.toLowerCase() == props.searchQuery.destinationLocation.toLowerCase()
                    && el.departureDate.getFullYear() == props.searchQuery.soonestReturnDate.getFullYear()
                    && el.departureDate.getMonth() == props.searchQuery.soonestReturnDate.getMonth()
                    && el.departureDate.getDate() == props.searchQuery.soonestReturnDate.getDate())
                {

                    returnFlightList.push(el);
                }
            }
            else
            {
                if(el.destination.toLowerCase() == props.searchQuery.departureLocation.toLowerCase()
                    && el.departure.toLowerCase() == props.searchQuery.destinationLocation.toLowerCase()
                    && el.departureDate.getFullYear() >= props.searchQuery.soonestReturnDate.getFullYear()
                    && el.departureDate.getFullYear() <= props.searchQuery.latestReturnDate.getFullYear()
                    && el.departureDate.getMonth() >= props.searchQuery.soonestReturnDate.getMonth()
                    && el.departureDate.getMonth() <= props.searchQuery.latestReturnDate.getMonth()
                    && el.departureDate.getDate() >= props.searchQuery.soonestReturnDate.getDate()
                    && el.departureDate.getDate() <= props.searchQuery.latestReturnDate.getDate())
                {

                    returnFlightList.push(el);
                }
            }

        })


    }

    function Return()
    {
        if(props.searchQuery.oneWayTrip)
        {
            return null;
        }

        return (
          <div>
              <h2>Return Trip</h2>

              <table className={classes.tableList}>
                  <tr>
                      <th>Flight</th>
                      <th>Departure</th>
                      <th>Destination</th>
                      <th>Date</th>
                      <th>Dep</th>
                      <th>Arr</th>
                      <th></th>
                      <th></th>
                  </tr>
                  <tbody>
                  {returnFlightList.map((flight) => (
                      <FlightItem
                          key={flight.flightId}
                          flightId={flight.flightId}
                          departureDate={flight.departureDate.getDate() + "/" + (flight.departureDate.getMonth() + 1)+ "/" + flight.departureDate.getFullYear()}
                          departureTime={flight.departureTime}
                          arrivalTime={flight.arrivalTime}
                          destination={flight.destination}
                          departure={flight.departure}
                      />

                  ))}
                  </tbody>
              </table>
          </div>
        );
    }

    searchFlightList();

    return (
        <Card>
            <h2>Trip to Destination</h2>
            <table className={classes.tableList}>
                <tr>
                    <th>Flight</th>
                    <th>Departure</th>
                    <th>Destination</th>
                    <th>Date</th>
                    <th>Dep</th>
                    <th>Arr</th>
                    <th></th>
                    <th></th>
                </tr>
                <tbody>
                    {flightList.map((flight) => (
                        <FlightItem
                            key={flight.flightId}
                            flightId={flight.flightId}
                            departureDate={flight.departureDate.getDate() + "/" + (flight.departureDate.getMonth() + 1)+ "/" + flight.departureDate.getFullYear()}
                            departureTime={flight.departureTime}
                            arrivalTime={flight.arrivalTime}
                            destination={flight.destination}
                            departure={flight.departure}
                        />

                    ))}
                </tbody>
            </table>

            <Return />

        </Card>

    );
}

export default FlightList;