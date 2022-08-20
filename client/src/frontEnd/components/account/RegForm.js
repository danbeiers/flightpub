import React, {useState} from "react";
import classes from "./RegForm.module.css";
import passwordRegexp from "password-regexp"
import isEmail from "validator/es/lib/isEmail";

function RegForm() {
    const [values, setValues] = useState({
        email: '',
        password: '',
        repeatPassword: '',
        firstName: '',
        lastName:'',
        userName: '',
        dob:'',
    })
    const [errors, setErrors] = useState({
        email: false,
        password: false,
        repeatPassword: false,
        fetchError: false,
        fetchErrorMsg: '',
    })

    const handleChange = (fieldName) => (event) => {
        const currValue = event.target.value;

        // switch(fieldName) {
        //     case 'email':
        //         isEmail(currValue)
        //             ? setErrors({...errors, email:false})
        //             : setErrors({...errors,email:true})
        //         break;
        //     case 'password':
        //         passwordRegexp(currValue)
        //             ? setErrors({...errors, password:false})
        //             : setErrors({...errors,password:true})
        //         break;
        //     case 'repeatPassword':
        //         currValue === values.password
        //             ? setErrors({...errors, repeatPassword:false})
        //             : setErrors({...errors, repeatPassword:true})
        //         break;
        //     default:
        //         break;
        // }
        setValues({ ...values, [fieldName]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {

            const res = await fetch('/user/registerUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: values.email,
                    password: values.password,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    userName: values.userName,
                    dob: values.dob,
                }),
            })
                /*.then(res=>res.json())
                .then(data=>alert(data.msg))*/

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
                password: '',
                repeatPassword: '',
                firstName: '',
                lastName:'',
                userName: '',
                dob:''
            })
        } catch (error) {
            console.log("catch statement")
            setErrors({
                ...errors,
                fetchError: true,
                fetchErrorMsg: "Error on server, try again later",
            })
        }
    }

    return (
        <div className={classes.main}>
            <h1 className={classes.h1}>User Registration</h1>
            {errors.fetchError && (<h2>{errors.fetchErrorMsg}</h2>)}
                <form onSubmit={handleSubmit} className={classes.form}>
                    <div className={classes.labels}>
                        <label >
                            <p>Username</p>
                            <input
                                type="text"
                                value={values.userName}
                                placeholder="Username"
                                onChange={handleChange('userName')}
                                required={true}
                            />
                        </label>
                        <label>
                            <p>First Name</p>
                            <input
                                type="text"
                                value={values.firstName}
                                placeholder="First name"
                                onChange={handleChange('firstName')}
                                required={true}
                            />
                        </label>
                        <label>
                            <p>Last Name</p>
                            <input
                                type="text"
                                value={values.lastName}
                                placeholder="Last name"
                                onChange={handleChange('lastName')}
                                required={true}
                            />
                        </label>
                        <label>
                            <p>Date of Birth</p>
                            <input
                                type="Date"
                                value={values.dob}

                                min = "1900-01-01"
                                max = "2022-01-01"
                                onChange={handleChange('dob')}
                            />
                        </label>
                        <label>
                            <p>Email Address</p>
                            <input
                                type='email'
                                value={values.email}
                                placeholder='Email'
                                onChange={handleChange('email')}
                                required={true}
                            />
                        </label>
                        <label>
                            <p>Password</p>
                            <input
                                type='password'
                                id='password-field'
                                placeholder='Password'
                                value={values.password}
                                onChange={handleChange('password')}
                                required={true}
                            />
                        </label>
                        <label>
                            <p>Repeat Password</p>
                            <input
                                type='password'
                                id='repeat-password-field'
                                placeholder='Re-Type Password'
                                value={values.repeatPassword}
                                onChange={handleChange('repeatPassword')}
                                required={true}
                            />
                        </label>
                        <input className={classes.button} type="submit" value="Submit"/>
                        <input className={classes.button} type="reset" value="Reset" />
                    </div>
                </form>
        </div>
    )
}

export default RegForm;


