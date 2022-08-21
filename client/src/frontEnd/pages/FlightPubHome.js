import {useContext} from 'react';
import {useState} from "react";

import FlightList from '../components/flights/FlightList';
import FlightSearch from "../components/flights/FlightSearch";
import ConfirmBooking from "../components/bookingConfirmation/ConfirmBooking"
import FlightPubContext from "../store/FlightPubContext";
import useFetch from "../../hooks/useFetch";

  function FlightPubHomePage() {
    const context = useContext(FlightPubContext);
    //This is the axios call to bring all the flight data into this page
    const {data, loading, error} = useFetch("/flight/");

    console.log(data);

    const [query, setQuery] = useState({});
    const [selectedFlights, setSelectedFlights] = useState([{}]);

      String.prototype.replaceAt = function(index, replacement) {
          return this.substring(0, index) + replacement + this.substring(index + replacement.length);
      }

      const locationLookupTable = new Map();
      locationLookupTable.set('ADL', 'Adelaide');
      locationLookupTable.set('AMS', 'Amsterdam');
      locationLookupTable.set('ATL', 'Atlanta');
      locationLookupTable.set('BKK', 'Bankok');
      locationLookupTable.set('BNE', 'Brisbane');
      locationLookupTable.set('CBR', 'Canberra');
      locationLookupTable.set('CDG', 'Paris - Charles De Gaulle');
      locationLookupTable.set('CNS', 'Cairns');
      locationLookupTable.set('DOH', 'Doha');
      locationLookupTable.set('DRW', 'Darwin');
      locationLookupTable.set('DXB', 'Dubai');
      locationLookupTable.set('FCO', 'Rome-Fiumicino');
      locationLookupTable.set('GIG', 'Rio De Janeiro');
      locationLookupTable.set('HBA', 'Hobart');
      locationLookupTable.set('HEL', 'Helsinki');
      locationLookupTable.set('HKG', 'Hong Kong');
      locationLookupTable.set('HNL', 'Honolulu');
      locationLookupTable.set('JFK', 'New York - JFK');
      locationLookupTable.set('JNB', 'Johannesburg');
      locationLookupTable.set('KUL', 'Kuala Lumpur');
      locationLookupTable.set('LAX', 'Los Angeles');
      locationLookupTable.set('LGA', 'New York - Laguardia');
      locationLookupTable.set('LGW', 'London-Gatwick');
      locationLookupTable.set('LHR', 'London-Heathrow');
      locationLookupTable.set('MAD', 'Madrid');
      locationLookupTable.set('MEL', 'Melbourne');
      locationLookupTable.set('MIA', 'Miami');
      locationLookupTable.set('MUC', 'Munich');
      locationLookupTable.set('NRT', 'Tokyo - Narita');
      locationLookupTable.set('OOL', 'Gold Coast');
      locationLookupTable.set('ORD', 'Chicago - OHare Intl.');
      locationLookupTable.set('ORY', 'Paris - Orly');
      locationLookupTable.set('PER', 'Perth');
      locationLookupTable.set('SFO', 'San Francisco');
      locationLookupTable.set('SIN', 'Singapore');
      locationLookupTable.set('SYD', 'Sydney');
      locationLookupTable.set('VIE', 'Vienna');
      locationLookupTable.set('YYZ', 'Toronto');

    for(let i = 0; i < data.length; i++)
    {
        data[i].departure = locationLookupTable.get(data[i].DepartureCode);
        data[i].destination = locationLookupTable.get(data[i].DestinationCode);
        data[i].departureDate = new Date(data[i].DepartureTime.replaceAt(10, 'T'));

        //temp code for sponsored
        var temp = Math.floor(Math.random() * 20);

        if(temp <= 5)
        {
            data[i].sponsored = true;
        }
        else {data[i].sponsored = false;}
    }

      //
   // async
        function clearForm() {
        context.setSearched(false);
        context.setBookingsSelected(false);
    }

    if (!context.searched) {
        return (
            <section>
                <h2>Flight Search</h2>
                <FlightSearch
                    exportQuery={query => setQuery(query)}/>
            </section>
        );
    } else if(!context.bookingsSelected){

        return (
            <div>
                <div>

                    <h2>Search Results</h2>

                    <FlightList flights={data} searchQuery={query}
                        exportFlights={flights => setSelectedFlights(flights)}/>
                    <button onClick={clearForm}>Clear</button>
                </div>

            </div>
        );
    }
    else
    {
        return (
            <div>
                <ConfirmBooking flights={selectedFlights} oneWay={query.oneWayTrip}/>
                <button onClick={clearForm}>Clear</button>
            </div>
        );
    }
}

export default FlightPubHomePage;
