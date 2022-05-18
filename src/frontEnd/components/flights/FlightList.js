import FlightItem from './FlightItem';
import classes from './FlightList.module.css';
import Card from "../ui/Card";
import {useState} from "react";

import DropdownList from "react-widgets/DropdownList";


function FlightList(props) {

    const [flightList, setFlightList] = useState([]);
    const [returnFlightList, setReturnFlightList] = useState([]);

    const [morningFilter, setMorningFilter] = useState(false);
    const [afternoonFilter, setAfternoonFilter] = useState(false);
    const [eveningFilter, setEveningFilter] = useState(false);

    let toggleMorningFilter = () =>
    {
        if(morningFilter)
        {
            setMorningFilter(false);
            return;
        }

        setMorningFilter(true);
        return;

    }

    let toggleAfternoonFilter = () =>
    {
        if(afternoonFilter)
        {
            setAfternoonFilter(false);
            return;
        }

        setAfternoonFilter(true);
        return;
    }

    let toggleEveningFilter = () =>
    {
        if(eveningFilter)
        {
            setEveningFilter(false);
            return;
        }

        setEveningFilter(true);
        return;
    }

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
                    if(!morningFilter && !afternoonFilter && !eveningFilter)
                    {
                        flightList.push(el);
                    }

                    if(morningFilter)
                    {
                        console.log("morning filter active");

                        if(el.departureDate.getHours() >= 0 && el.departureDate.getHours() < 12)
                        {
                            flightList.push(el);
                        }

                    }
                    if(afternoonFilter)
                    {
                        if(el.departureDate.getHours() >= 12  && el.departureDate.getHours() < 18)
                        {
                            flightList.push(el);
                        }
                    }
                    if(eveningFilter)
                    {
                        if(el.departureDate.getHours() >= 18)
                        {
                            flightList.push(el);
                        }
                    }
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

                    if(!morningFilter && !afternoonFilter && !eveningFilter)
                    {
                        flightList.push(el);
                    }

                    if(morningFilter)
                    {
                        if(el.departureDate.getHours() >= 0 && el.departureDate.getHours() < 12)
                        {
                            flightList.push(el);
                        }
                    }
                    if(afternoonFilter)
                    {
                        if(el.departureDate.getHours() >= 12  && el.departureDate.getHours() < 18)
                        {
                            flightList.push(el);
                        }
                    }
                    if(eveningFilter)
                    {
                        if(el.departureDate.getHours() >= 18)
                        {
                            flightList.push(el);
                        }
                    }
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
                    if(!morningFilter && !afternoonFilter && !eveningFilter)
                    {
                        returnFlightList.push(el);
                    }

                    if(morningFilter)
                    {
                        if(el.departureDate.getHours() >= 0 && el.departureDate.getHours() < 12)
                        {
                            returnFlightList.push(el);
                        }
                    }
                    if(afternoonFilter)
                    {
                        if(el.departureDate.getHours() >= 12  && el.departureDate.getHours() < 18)
                        {
                            returnFlightList.push(el);
                        }
                    }
                    if(eveningFilter)
                    {
                        if(el.departureDate.getHours() >= 18)
                        {
                            returnFlightList.push(el);
                        }
                    }
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

                    if(!morningFilter && !afternoonFilter && !eveningFilter)
                    {
                        returnFlightList.push(el);
                    }

                    if(morningFilter)
                    {
                        if(el.departureDate.getHours() >= 0 && el.departureDate.getHours() < 12)
                        {
                            returnFlightList.push(el);
                        }
                    }
                    if(afternoonFilter)
                    {
                        if(el.departureDate.getHours() >= 12  && el.departureDate.getHours() < 18)
                        {
                            returnFlightList.push(el);
                        }
                    }
                    if(eveningFilter)
                    {
                        if(el.departureDate.getHours() >= 18)
                        {
                            returnFlightList.push(el);
                        }
                    }
                }
            }

        })


    }

    function sort(e)
    {
        if(e == "soonest")
        {
            for(let i = 0; i < flightList.length; i++)
            {
                for(let j = 0; j < flightList.length - i - 1; j++)
                {
                    if(flightList[j+1].departureDate < flightList[j].departureDate)
                    {
                        [flightList[j+1], flightList[j]] = [flightList[j], flightList[j+1]];
                    }
                }
            }

            for(let i = 0; i < returnFlightList.length; i++)
            {
                for(let j = 0; j < returnFlightList.length - i - 1; j++)
                {
                    if(returnFlightList[j+1].departureDate < returnFlightList[j].departureDate)
                    {
                        [returnFlightList[j+1], returnFlightList[j]] = [returnFlightList[j], returnFlightList[j+1]];
                    }
                }
            }
        }
        else if(e == "latest")
        {
            for(let i = 0; i < flightList.length; i++)
            {
                for(let j = 0; j < flightList.length - i - 1; j++)
                {
                    if(flightList[j+1].departureDate > flightList[j].departureDate)
                    {
                        [flightList[j+1], flightList[j]] = [flightList[j], flightList[j+1]];
                    }
                }
            }

            for(let i = 0; i < returnFlightList.length; i++)
            {
                for(let j = 0; j < returnFlightList.length - i - 1; j++)
                {
                    if(returnFlightList[j+1].departureDate > returnFlightList[j].departureDate)
                    {
                        [returnFlightList[j+1], returnFlightList[j]] = [returnFlightList[j], returnFlightList[j+1]];
                    }
                }
            }
        }
        else if(e == "lowest price")
        {
            for(let i = 0; i < flightList.length; i++)
            {
                for(let j = 0; j < flightList.length - i - 1; j++)
                {
                    if(flightList[j+1].price < flightList[j].price)
                    {
                        [flightList[j+1], flightList[j]] = [flightList[j], flightList[j+1]];
                    }
                }
            }

            for(let i = 0; i < returnFlightList.length; i++)
            {
                for(let j = 0; j < returnFlightList.length - i - 1; j++)
                {
                    if(returnFlightList[j+1].price < returnFlightList[j].price)
                    {
                        [returnFlightList[j+1], returnFlightList[j]] = [returnFlightList[j], returnFlightList[j+1]];
                    }
                }
            }
        }
        else if(e == "highest price")
        {
            for(let i = 0; i < flightList.length; i++)
            {
                for(let j = 0; j < flightList.length - i - 1; j++)
                {
                    if(flightList[j+1].price > flightList[j].price)
                    {
                        [flightList[j+1], flightList[j]] = [flightList[j], flightList[j+1]];
                    }
                }
            }

            for(let i = 0; i < returnFlightList.length; i++)
            {
                for(let j = 0; j < returnFlightList.length - i - 1; j++)
                {
                    if(returnFlightList[j+1].price > returnFlightList[j].price)
                    {
                        [returnFlightList[j+1], returnFlightList[j]] = [returnFlightList[j], returnFlightList[j+1]];
                    }
                }
            }
        }
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
    sort("latest");

    //what do need
    //filters
    //sort by

    //


    return (

        <Card>
            <h2>Trip to Destination</h2>


            <div className={classes.list}>

                <label htmlFor='morningDeparture'> Morning Departure </label>
                <input type='checkbox' id='morningDeparture' onClick={toggleMorningFilter} />

                <label htmlFor='afternoonDeparture'> Afternoon Departure </label>
                <input type='checkbox' id='afternoonDeparture' onClick={toggleAfternoonFilter} />

                <label htmlFor='eveningDeparture'> Evening Departure </label>
                <input type='checkbox' id='eveningDeparture' onClick={toggleEveningFilter}/>
            </div>

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