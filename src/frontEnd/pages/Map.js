import React, { useState } from "react";
import ReactTooltip from "react-tooltip";

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


export default MapPage;