import {Link} from 'react-router-dom';

import classes from './MainNavigation.module.css';
import {useContext} from "react";
import FlightPubContext from "../../store/FlightPubContext";
import {useNavigate} from "react-router";
import { GiCommercialAirplane } from "react-icons/gi";
import ProfilePage from "../../pages/Profile";

function MainNavigation() {
    const  context = useContext(FlightPubContext);
    let loginContent;
    let welcomeContent;
    let registerContent;

    function Logout() {
        let navigate = useNavigate();
        context.setAuthenticated(false);
        navigate('/');

    }

    if(context.authenticated){
        loginContent = <Link to='/' onClick={Logout}>Logout</Link>;
        welcomeContent = <li>Welcome <Link to='/profile' >{context.user}</Link>!<br/>{context.weatherData.name}  {context.weatherData.main.temp}&deg;C</li>;
        registerContent = null;
    }else{
        loginContent = <Link to='/login'>Login</Link>;
        welcomeContent = <li>Welcome Guest!</li>
        registerContent = <li><Link to='/register'>Register</Link></li>;
    }

    return (
        <header className={classes.header}>
            <div className={classes.logo}><GiCommercialAirplane/> FlightPub</div>
            <nav>
                <ul>
                    {welcomeContent}
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
                    {registerContent}
                </ul>
            </nav>
        </header>
    );
}

export default MainNavigation;