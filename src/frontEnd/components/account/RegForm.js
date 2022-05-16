import React, {useContext, useRef} from "react";
import FlightPubContext from "../../store/FlightPubContext";
import {useNavigate} from "react-router";
import classes from "./RegForm.module.css";

function RegForm() {
    const context = useContext(FlightPubContext);
    let navigate = useNavigate();
    const userNameRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const passWordRef = useRef();

    function submitHandler(event) {
        event.preventDefault();
        const userName = userNameRef.current.value;
        const firstName = firstNameRef.current.value;
        const lastName = lastNameRef.current.value;
        const passWord = passWordRef.current.value;

        context.setUser(userName);
        context.setAuthenticated(true);
        navigate('/');
        /*
        return fetch('http://localhost:8080/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
            .then(data => data.json())
         */
    }

    return (
        <div className={classes.main}>
            <h1>User Registration</h1>
                <form onSubmit={submitHandler} className={classes.form}>
                    <label>
                        <p>Username</p>
                        <input type="text" ref={userNameRef}/>
                    </label>
                    <label>
                        <p>First Name</p>
                        <input type="text" ref={firstNameRef}/>
                    </label>
                    <label>
                        <p>Last Name</p>
                        <input type="text" ref={lastNameRef}/>
                    </label>
                    <label>
                        <p>Password</p>
                        <input type="text" ref={passWordRef}/>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
        </div>
    )
}

export default RegForm;