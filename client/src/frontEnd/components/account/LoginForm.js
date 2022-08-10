import React, {useContext, useState} from "react";
import {useNavigate} from "react-router";
import classes from "./LoginForm.module.css";
import passwordRegexp from "password-regexp"
import isEmail from "validator/es/lib/isEmail";
import {UserContext} from '../../../App';
import FlightPubContext from "../../store/FlightPubContext";




function LoginForm() {
    const otherContext = useContext(UserContext);
    const context = useContext(FlightPubContext);
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({
        email: false,
        password: false,
        fetchError: false,
        fetchErrorMsg: ''
    })

    const handleChange = (fieldName) => (event) => {
        const currValue = event.target.value
        let isCorrectValue =
            fieldName === 'email'
                ? isEmail(currValue)
                : passwordRegexp().test(currValue)
            isCorrectValue
                ? setErrors({...errors, email:false})
                : setErrors({...errors,email:true})

        setValues({ ...values, [fieldName]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const res = await fetch('/user/loginUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: values.email,
                    password: values.password
                }),
            })

            if (!res.ok) {
                const error = await res.json()
                return setErrors({
                    ...errors,
                    fetchError: true,
                    fetchErrorMsg: error.msg,
                })
            }
            const data = await res.json()
            // this is just a visual feedback for user for this demo
            // this will not be an error, rather we will show a different UI or redirect user to dashboard
            // ideally we also want a way to confirm their email or identity
            setErrors({
                ...errors,
                fetchError: true,
                fetchErrorMsg: data.msg,
            })
            setValues({
                email: '',
                password: ''
            })
            context.setUser(data.userSession.userName)
            //console.log(data.userSession.userName)

            navigate('/')
        }catch (error) {
            setErrors({
                ...errors,
                fetchError: true,
                fetchErrorMsg: "Error on server, try again later"
            })
        }
    }

    return (
        <div className={classes.main}>
            <h1>Log In</h1>
            {errors.fetchError && (<h2>{errors.fetchErrorMsg}</h2>)}
            <form onSubmit={handleSubmit} className={classes.form}>
                <div>
                    <label>
                        <p>Email</p>
                        <input
                            type="text"
                            value={values.email}
                            placeholder="Email"
                            aria-autocomplete="list"
                            onChange={handleChange('email')}
                        />
                    </label>
                    <label>
                        <p>Password</p>
                        <input
                            type='password'
                            id='password-field'
                            placeholder="Password"
                            value={values.password}

                            onChange={handleChange('password')}
                        />
                    </label>
                    <input className={classes.button} type="submit" value="Submit"/>
                </div>
            </form>
        </div>
    )
}

export default LoginForm;