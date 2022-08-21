import FlightItem from "./FlightItem";

function MultiFlightItem(props) {

    const flights = [];

    function selectFlight()
    {
        props.selectFlight(props.return);

        const flightData = [];

        props.flightPackage.map((flight) => (
            flightData.push(
                {
                    flightId: flight.flightId,
                    departure: flight.departure,
                    destination: flight.destination,
                    departureDate: flight.departureDate,
                    departureTime: flight.departureTime,
                    arrivalTime: flight.arrivalTime,
                    price: flight.price,
                    isReturn: props.return,
                }
            )
        ))

        props.selFlight(flightData);
        props.selFlightPack(props.count);
    }

    var isSelected = false;

    if(props.count == props.selectedCount)
    {
        isSelected = true;
    }

    for (let i = 0; i < props.flightPackage.length; i++)
    {
        //console.log(i);
        flights.push(<FlightItem
            key={props.flightPackage[i].flightId}
            flightId={props.flightPackage[i].flightId}
            departureDate={props.flightPackage[i].departureDate.getDate() + "/" + (props.flightPackage[i].departureDate.getMonth() + 1)+ "/" + props.flightPackage[i].departureDate.getFullYear()}
            departureTime={props.flightPackage[i].DepartureTime}
            arrivalTime={props.flightPackage[i].ArrivalTime}
            destination={props.flightPackage[i].destination}
            departure={props.flightPackage[i].departure}
            price={props.flightPackage[i].price}
            return={props.return}
            code={props.flightPackage[i].PlaneCode}
            sponsored={props.flightPackage[i].sponsored}
            selected={isSelected}
            />);
    }


    return (
        <div onClick={selectFlight}>
            {flights}
        </div>
    );
}

export default MultiFlightItem;
