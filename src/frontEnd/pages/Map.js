import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import L from 'leaflet';
import MapChart from "../components/maps/MapChart";
import classes from "../components/maps/MapChart.module.css"

function MapPage() {
    const [content, setContent] = useState("");
    return (
        <div className={classes.map}>
            <MapChart setTooltipContent={setContent} />
            <ReactTooltip>{content}</ReactTooltip>
        </div>

    )}

    /* const popup = L.popup()
        .setLatLng([-58.3816, -34.6307])
        .setContent('<p>Hello world!<br />This is a nice popup.</p>')
        .openOn(classes.map);
}*/

export default MapPage;