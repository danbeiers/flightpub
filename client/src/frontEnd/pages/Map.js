import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import Dropdown from "../components/maps/Dropdown";
import MapChart from "../components/maps/MapChart";
import useFetch from "../../hooks/useFetch";
import classes from "../components/maps/MapChart.module.css";
import  "../components/maps/Dropdown.module.css";

function MapPage() {
    const [content, setContent] = useState("");
    const{data, loading, error} = useFetch("/map");
    const [selected, setSelected] = useState("Select a recommendation category");
     console.log(data);
    return (
        <div className={classes.map}>

            <Dropdown selected={selected} setSelected={setSelected} />
        <br/>
            <br/>
            <br/>
            <br/>

            <MapChart setTooltipContent={setContent} data = {data}/>
            <ReactTooltip>{content}</ReactTooltip>
        </div>

    );}
export default MapPage;

