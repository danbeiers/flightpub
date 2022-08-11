import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import Dropdown from "../components/maps/Dropdown";
import MapChart from "../components/maps/MapChart";
import useFetch from "../../hooks/useFetch";
import classes from "../components/maps/MapChart.module.css"

const items =[
    {
        id:1,
        value: 'Summer',
    },
    {
        id:2,
        value:'Winter',
    },
    {
        id:3,
        value:'Arts and Music',
    },
    {
        id:4,
        value:'Sports',
    },
];


function MapPage() {
    const [content, setContent] = useState("");
    const{data, loading, error} = useFetch("/map");
     console.log(data);
    return (
        <div className={classes.map}>
            <h1 style={{ textAlign: 'center' }}>
                Maps {' '}</h1>
            <Dropdown title ="Select Destination Category" items={items}/>
            <MapChart setTooltipContent={setContent}
            data = {data}/>

            <ReactTooltip>{content}</ReactTooltip>
        </div>

    )}


export default MapPage;

