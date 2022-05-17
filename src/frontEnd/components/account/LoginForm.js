import React, {useContext, useRef} from "react";
import FlightPubContext from "../../store/FlightPubContext";
import {useNavigate} from "react-router";
import classes from "./LoginForm.module.css";

function LoginForm() {
    const context = useContext(FlightPubContext);
    let navigate = useNavigate();
    const userNameRef = useRef();
    const passWordRef = useRef();

    function submitHandler(event) {
        event.preventDefault();
        const userName = userNameRef.current.value;
        const passWord = passWordRef.current.value;

        context.setUser(userName);
        context.setAuthenticated(true);
        navigate('/');
        /*
        return fetch('http://localhost:8080/login', {
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
            <h1>Please Log In</h1>
            <form onSubmit={submitHandler} className={classes.form}>
                <label>
                    <p>Username</p>
                    <input type="text" ref={userNameRef}/>
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" ref={passWordRef}/>
                </label>
                <div>
                    <button>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm;