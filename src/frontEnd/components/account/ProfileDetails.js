import React, {useContext, useRef} from "react";
import FlightPubContext from "../../store/FlightPubContext";

function ProfileDetails() {
    const context = useContext(FlightPubContext);

    return (
        <div >
            <h2>This is your profile {context.userDetails.userName}</h2>
            <ul>
                <li>
                    First Name: {context.userDetails.firstName}
                </li>
                <li>
                    Last Name: {context.userDetails.lastName}
                </li>
                <li>
                    Date Of Birth: {context.userDetails.dob.split('T')[0]}
                </li>
                <li>
                    Email: {context.userDetails.email}
                </li>
            </ul>
            <div>
                <button>Edit Details</button>
            </div>

        </div>
    )
}

export default ProfileDetails;