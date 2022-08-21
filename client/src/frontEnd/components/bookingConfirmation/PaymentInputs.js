import React, {useState} from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import classes from './PaymentInputs.module.css';
import validator from 'validator';
import {useContext} from 'react';
import FlightPubContext from "../../store/FlightPubContext";

function PaymentInputs(props) {

    const [number, setNumber] = useState('')
    const [name, setName] = useState('')
    const [expiry, setExpiry] = useState('')
    const [cvc, setCvc] = useState('')
    const [focus, setFocus] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const context = useContext(FlightPubContext);

    const complete = async()=> {

        //validate and push to database here
        var thisDate = new Date();

        for(let i = 0; i < props.flights.length; i++)
        {
            const res = await fetch('http://localhost:8800/booking',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    // mode: 'cors',
                    body: JSON.stringify({
                        userID: (context.userDetails != null ? context.userDetails.email : props.userName),
                        bookingID: Math.floor(Math.random() * 9999999).toString(),
                        flight: props.flights[i].FlightNumber,
                        seat: Math.floor(Math.random() * 75).toString(),
                        departure: props.flights[i].departure,
                        bookingDate: thisDate.getDate() + "/" + thisDate.getMonth() + "/" + thisDate.getFullYear(),
                        departureDate: props.flights[i].departureDate.getDate() + "/" + (props.flights[i].departureDate.getMonth() + 1)+ "/" + props.flights[i].departureDate.getFullYear(),
                        departureTime: props.flights[i].DepartureTime,
                        destination: props.flights[i].destination,
                        cost: "$200",


                    }),
                })
        }

        return(
        alert("Payment Complete!"));
    }

    const validateNumber = (value) => {

        if (validator.isCreditCard(value)) {
            setErrorMessage('Valid CreditCard Number')
        } else {
            setErrorMessage('Enter valid CreditCard Number!')
        }
    }

        return(

            <div className = "PaymentInputs" >
                <Cards
                number ={number}
                name ={name}
                expiry ={expiry}
                cvc={cvc}
                focused = {focus}
                />
                <br/>
            <form>
                <input type ='tel'
                       name = 'number'
                       placeholder= 'Card Number'
                       onChange={e => setNumber(e.target.value)}
                       onChange={e => validateNumber(e.target.value)}
                       onFocus={e=> setFocus(e.target.name)}
                />
                <input type ='text'
                       name = 'name'
                       placeholder= 'Name'
                       onChange={e => setName(e.target.value)}
                       onFocus={e=> setFocus(e.target.name)}
                       />
                <input type ='text'
                       name = 'expiry'
                       placeholder= 'MM/YY Expiry'
                       onChange={e => setExpiry(e.target.value)}
                       onFocus={e=> setFocus(e.target.name)}

                />
                <input type ='tel'
                       name = 'cvc'
                       placeholder= 'CVC'
                       onChange={e => setCvc(e.target.value)}
                       onFocus={e=> setFocus(e.target.name)}

                />


            </form>
                <br/>
                <button onClick={complete}>Make Payment</button>
            </div>
        );

}
export default PaymentInputs;
