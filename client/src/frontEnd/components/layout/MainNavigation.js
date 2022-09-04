import {Link} from 'react-router-dom';

import classes from './MainNavigation.module.css';
import {useContext} from "react";
import FlightPubContext from "../../store/FlightPubContext";
import {useNavigate} from "react-router";
import { GiCommercialAirplane } from "react-icons/gi";
import ProfilePage from "../../pages/Profile";
import {UserContext} from '../../../App'

function MainNavigation() {
    const navigate = useNavigate()
    const  context = useContext(FlightPubContext);
    const otherContext = useContext(UserContext);
    let loginContent;
    let welcomeContent;
    let wishlistContent;
    let bookingContent;
    let profileContent;
    let registerContent;

    const Logout = async (req,res) => {
        try {
            const res = await fetch('/user/logoutUser', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                 },
                // body: JSON.stringify({
                //     email: otherContext.email,
                //     password: otherContext.password
                // }),
            })
            /*.then(res=>res.json())
            .then(data=>alert(data.msg))*/

            if (!res.ok) {
                const error = await res.json()
                return
            }
            const data = await res.json()
            //console.log(data)
            context.setUser(null)
            navigate('/')
            //otherContext.userSession.setUser(false)

            // this is just a visual feedback for user for this demo
            // this will not be an error, rather we will show a different UI or redirect user to dashboard
            // ideally we also want a way to confirm their email or identity

        } catch (error) {
            console.log(error)
        }
    }
    //console.log(otherContext.user)
    if(otherContext){
        loginContent = <li><Link to='/' onClick={Logout}>Logout</Link></li>;
        welcomeContent = <li>Welcome <Link to='/profile' >{otherContext.userName}</Link>!</li>;
        //welcomeContent = <li>Welcome <Link to='/profile' >{otherContext.userName}</Link>!<br/>{context.weatherData.name}</li>;
        wishlistContent = <li> <Link to='/wishlist'>Wishlist</Link></li>;
        bookingContent = <li><Link to='/bookings'>My Bookings</Link></li>;
        profileContent = <li><Link to='profile'>Profile</Link></li>;
        registerContent = null;
    }else{
        loginContent = <li><Link to='/login'>Login</Link></li>;
        welcomeContent = <li>Welcome Guest!</li>
        registerContent = <li><Link to='/register'>Register</Link></li>;
        profileContent = null;
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
                        <Link to='/map'>Map</Link>
                    </li>
                        {wishlistContent}
                        {bookingContent}
                        {profileContent}
                        {loginContent}
                        {registerContent}

                </ul>
            </nav>
        </header>
    );
}

export default MainNavigation;