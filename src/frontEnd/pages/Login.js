import {useContext} from "react";
import FlightPubContext from "../store/FlightPubContext";
import {useNavigate} from "react-router";

function LoginPage() {
    let context = useContext(FlightPubContext);
    let navigate = useNavigate();

    if(!context.authenticated){
        context.setAuthenticated(true);
        context.setUser("Daniel");
        navigate('./');
    }
    return (
        <section>
            <h1>Login</h1>
        </section>
    );
}

export default LoginPage;