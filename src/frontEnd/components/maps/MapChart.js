import React, { memo, useState } from "react";
// import ReactDOM from "react-dom";
import CustomMarker from "./CustomMarker";
import {
    ZoomableGroup,
    ComposableMap,
    Geographies,
    Geography,
} from "react-simple-maps";
// import {Marker} from "react-leaflet";
//import {Circle} from "react-leaflet";
// import {Popup} from 'leaflet';
// import Marker from "react-leaflet-enhanced-marker";
const markers = [
    {
        markerOffset: -20,
        name: "Sao Paulo",
        coordinates: [-58.3816, -34.6307],
        music: "Louis Tomlinson Concert",
        place:"Sao Paulo Pride 2022",

    },

    {

        markerOffset: -20,
        name: "Sydney",
        coordinates: [151.209900, -33.865143],
        music: "Louis Tomlinson Concert",
        place:"Sao Paulo Pride 2022",
    },
    {

        markerOffset: -20,
        name: "Melbourne",
        coordinates: [144.946457, -37.840935],
        music: "Louis Tomlinson Concert",
        place:"Sao Paulo Pride 2022",
    },
    {

        markerOffset: -20,
        name: "Adelaide",
        coordinates: [138.593903, -34.906101],
        music: "Louis Tomlinson Concert",
        place:"Sao Paulo Pride 2022",
    },
    {

        markerOffset: -20,
        name: "Canberra",
        coordinates: [149.128998, -35.282001],
        music: "Louis Tomlinson Concert",
        place:"Sao Paulo Pride 2022",
    },
    {

        markerOffset: -20,
        name: "Wellington",
        coordinates: [174.777969,-41.276825],
        music: "Louis Tomlinson Concert",
        place:"Sao Paulo Pride 2022",
    },
    {

        markerOffset: -20,
        name: "Auckland",
        coordinates: [174.763336, -36.848461],
        music: "Louis Tomlinson Concert",
        place:"Sao Paulo Pride 2022",
    },
    {

        markerOffset: -20,
        name: "London",
        coordinates: [-0.118092, 51.509865],
        music: "Louis Tomlinson Concert",
        place:"Sao Paulo Pride 2022",
    },
    {

        markerOffset: -20,
        name: "New York",
        coordinates: [-73.935242, 40.730610],
        music: "Louis Tomlinson Concert",
        place:"Sao Paulo Pride 2022",
    },
    {

        markerOffset: -20,
        name: "Los Angeles",
        coordinates: [-118.243683, 34.052235],
        music: "Louis Tomlinson Concert",
        place:"Sao Paulo Pride 2022",
    },
    {

        markerOffset: -20,
        name: "Moscow",
        coordinates: [37.618423, 55.751244],
        music: "Louis Tomlinson Concert",
        place:"Sao Paulo Pride 2022",
    },
    {

        markerOffset: -20,
        name: "Johannesburg",
        coordinates: [28.034088, -26.195246],
        music: "Louis Tomlinson Concert",
        place:"Sao Paulo Pride 2022",
    },
    {

        markerOffset: -20,
        name: "Paris",
        coordinates: [2.349014, 48.864716],
        music: "Louis Tomlinson Concert",
        place:"Sao Paulo Pride 2022",
    },
    {

        markerOffset: -20,
        name: "Rome",
        coordinates: [12.496366, 41.902782],
        music: "Louis Tomlinson Concert",
        place:"Sao Paulo Pride 2022",
    },
    {

        markerOffset: -20,
        name: "Amsterdam",
        coordinates: [4.897070, 52.377956],
        music: "Louis Tomlinson Concert",
        place:"Sao Paulo Pride 2022",
    },
    {

        markerOffset: -20,
        name: "Seattle",
        coordinates: [-122.335167, 47.608013],
        music: "Louis Tomlinson Concert",
        place:"Sao Paulo Pride 2022",
    },
    {

        markerOffset: -20,
        name: "Mumbai",
        coordinates: [72.877426, 19.076090],
        music: "Louis Tomlinson Concert",
        place:"Sao Paulo Pride 2022",
    },
    {

        markerOffset: -20,
        name: "Dhaka",
        coordinates: [90.399452, 23.777176],
        music: "Louis Tomlinson Concert",
        place:"Sao Paulo Pride 2022",
    },
    {

        markerOffset: -20,
        name: "Beijing",
        coordinates: [116.383331, 39.916668],
        music: "Louis Tomlinson Concert",
        place:"Sao Paulo Pride 2022",
    },


];


const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";
// const leafURL = "https://api.mapbox.com/styles/v1/nicknyr/cje7mtk2y6gf92snsydobiahf/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoibmlja255ciIsImEiOiJjajduNGptZWQxZml2MndvNjk4eGtwbDRkIn0.L0aWwfHlFJVGa-WOj7EHaA";

const MapChart = ({ setTooltipContent }) => {
    return (
        <>
            <ComposableMap data-tip="" projectionConfig={{scale: 200}}>
                <ZoomableGroup>
                    <Geographies geography={geoUrl}>
                        {({geographies}) =>
                            geographies.map(geo => (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    onMouseEnter={() => {
                                        const {NAME} = geo.properties;
                                        setTooltipContent(`${NAME}`);
                                    }}
                                    onMouseLeave={() => {
                                        setTooltipContent("");
                                    }}
                                    //This is where the output to console occurs.
                                    onClick={() => {
                                        const {NAME} = geo.properties;
                                        console.log(NAME);
                                    }}
                                    style={{
                                        default: {
                                            fill: "#D6D6DA",
                                            outline: "none"
                                        },
                                        hover: {
                                            fill: "#F53",
                                            outline: "none"
                                        },
                                        pressed: {
                                            fill: "#E42",
                                            outline: "none"
                                        }
                                    }}
                                />
                            ))
                        }
                    </Geographies>

                    {
                        markers.map(({name, coordinates, markerOffset, music, place}) => (

                            <CustomMarker
                                key ={name}
                                name ={name}
                                coordinates={coordinates}
                                markerOffset = {markerOffset}
                                music = {music}
                                place = {place}>
                            </CustomMarker>

                        ))}
                </ZoomableGroup>
            </ComposableMap>
        </>
    );
};
export default memo(MapChart);

/*<circle r={5} fill= "#F00" stroke= "#fff" strokeWidth={1}  />
markers.bindPopup("<strong>Hello world!</strong><br />I am a popup.");
<text textAnchor="middle"
      y = {markerOffset}
      style={{fontFamily: "system-ui",fill: "#5D5A6D"}}>
    {name}
</text>
</CustomMarker>*/