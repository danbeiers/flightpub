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
    const dateOfBirthRef = useRef();
    const emailRef = useRef();
    const passWordRef = useRef();

    function submitHandler(event) {
        event.preventDefault();
        const userName = userNameRef.current.value;
        const firstName = firstNameRef.current.value;
        const lastName = lastNameRef.current.value;
        const dateOfBirth = dateOfBirthRef.current.value;
        const email = emailRef.current.value;
        const passWord = passWordRef.current.value;
        let details = {fName: firstName,
                       lName: lastName,
                        dob: dateOfBirth,
                        emailAdd: email,
                        pword: passWord,
                    }
        context.setUser(userName);
        context.setUserDetails(details);
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
                    <div>
                        <label>
                            <p>Username</p>
                            <input type="text" ref={userNameRef} placeholder="Username"/>
                        </label>
                        <label>
                            <p>First Name</p>
                            <input type="text" ref={firstNameRef} placeholder="First name"/>
                        </label>
                        <label>
                            <p>Last Name</p>
                            <input type="text" ref={lastNameRef} placeholder="Last name"/>
                        </label>
                        <label>
                            <p>Date of Birth</p>
                            <input type="Date" ref={dateOfBirthRef}/>
                        </label>
                        <label>
                            <p>Email Address</p>
                            <input type="text" ref={emailRef} placeholder="Email"/>
                        </label>
                        <label>
                            <p>Password</p>
                            <input type="text" ref={passWordRef} placeholder="Password"/>
                        </label>
                        <input target="submit" type="submit" value="Submit"/>
                    </div>
                </form>
        </div>
    )
}

export default RegForm;