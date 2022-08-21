import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import Dropdown from "../components/maps/Dropdown";
import MapChart from "../components/maps/MapChart";
import useFetch from "../../hooks/useFetch";
import classes from "../components/maps/MapChart.module.css";
import  "../components/maps/Dropdown.module.css";
import { useNavigate } from "react-router-dom";


function MapPage() {

    const [content, setContent] = useState("");
    const navigate = useNavigate();
    const [selected, setSelected] = useState("Select a recommendation category");
    const{data, loading, error} = useFetch("/map", selected);
    // const {dataDropdown, loadings, errors}= useFetch("/map", selected)

    const handleSelection = (value) => {
        setSelected(value);}


    return (
        <div className={classes.map}>

            <Dropdown selected={selected} onSelected={handleSelection} />
        <br/>
            <button onClick={() => navigate("/")}>Add to search</button>
            <MapChart setTooltipContent={setContent} data = {data}/>
            <ReactTooltip>{content}</ReactTooltip>
        </div>

    );}
export default MapPage;

