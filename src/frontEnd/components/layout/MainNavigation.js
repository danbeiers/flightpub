import {Link} from 'react-router-dom';

import classes from './MainNavigation.module.css';
import {useContext} from "react";
import FlightPubContext from "../../store/FlightPubContext";
import {useNavigate} from "react-router";

function MainNavigation() {
    const  context = useContext(FlightPubContext);
    let loginContent;

    function Logout() {
        let navigate = useNavigate();
        context.setAuthenticated(false);
        navigate('/');

    }

    if(context.authenticated){
        loginContent = <Link to='/' onClick={Logout}>Logout</Link>;
    }else{
        loginContent = <Link to='/login'>Login</Link>;
    }

    return (
        <header className={classes.header}>
            <div className={classes.logo}>FlightPub</div>
            <nav>
                <ul>
                    <li>
                        Welcome {context.authenticated ? context.user: "Guest" }!
                    </li>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/bookings'>My Bookings</Link>
                    </li>
                    <li>
                        <Link to='/map'>Map</Link>
                    </li>
                    <li>
                        {loginContent}
                    </li>
                    <li>
                        <Link to='/register'>Register</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default MainNavigation;