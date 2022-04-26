import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import {useContext} from "react";
import FlightPubContext from "../../store/FlightPubContext";

function MainNavigation() {
    const  context = useContext(FlightPubContext);
    let content;
    function logout() {
        context.setAuthenticated(false);
    }
    if(context.authenticated){
        content = <Link to='/' onClick='logout'>Logout</Link>;
    }else{
        content = <Link to='/login'>Login</Link>;
    }

    return (
        <header className={classes.header}>
            <div className={classes.logo}>FlightPub</div>
            <nav>
                <ul>
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
                        {content}
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