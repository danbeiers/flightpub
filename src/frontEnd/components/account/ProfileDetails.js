import React, {useContext, useRef} from "react";
import FlightPubContext from "../../store/FlightPubContext";

function ProfileDetails() {
    const context = useContext(FlightPubContext);

    return (
        <div >
            <h2>This is your profile {context.user}</h2>
            <ul>
                <li>
                    First Name: {context.userDetails.fName}
                </li>
                <li>
                    Last Name: {context.userDetails.lName}
                </li>
                <li>
                    Date Of Birth: {context.userDetails.dob}
                </li>
                <li>
                    Email: {context.userDetails.emailAdd}
                </li>
                <li>
                    Password: {context.userDetails.pword}
                </li>
            </ul>
            <div>
                <button>Edit Details</button>
            </div>

        </div>
    )
}

export default ProfileDetails;