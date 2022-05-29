import React, { memo, useState } from "react";
// import ReactDOM from "react-dom";
import CustomMarker from "./CustomMarker";
import {
    ZoomableGroup,
    ComposableMap,
    Geographies,
    Geography,
} from "react-simple-maps";

const markers = [
    {
        markerOffset: -20,
        name: "Sao Paulo",
        coordinates: [-58.3816, -34.6307],
        visit: "Louis Tomlinson Concert",
        happening:"Sao Paulo Pride 2022",

    },

    {

        markerOffset: -20,
        name: "Sydney",
        coordinates: [151.209900, -33.865143],
        visit: "Opera House",
        happening:"Vivid 2022",
    },
    {

        markerOffset: -20,
        name: "Melbourne",
        coordinates: [144.946457, -37.840935],
        visit: "National Gallery of Victoria",
        happening:"Winter Night Market",
    },
    {

        markerOffset: -20,
        name: "Adelaide",
        coordinates: [138.593903, -34.906101],
        visit: "Adelaide Oval",
        happening:"Adelaide Cabaret Festival 2022",
    },
    {

        markerOffset: -20,
        name: "Canberra",
        coordinates: [149.128998, -35.282001],
        visit: "Dinosaur Festival 2022",
        happening:"Parliament House",
    },
    {

        markerOffset: -20,
        name: "Wellington",
        coordinates: [174.777969,-41.276825],
        visit: "Wellington Cable Car",
        happening:"Lime Cordiale @The Hunter Lounge",
    },
    {

        markerOffset: -20,
        name: "Auckland",
        coordinates: [174.763336, -36.848461],
        visit: "SkyTower",
        happening:"Auckland Festival of Photography 2022",
    },
    {

        markerOffset: -20,
        name: "London",
        coordinates: [-0.118092, 51.509865],
        visit: "Natural History Museum",
        happening:"Hampton Court Palace",
    },
    {

        markerOffset: -20,
        name: "New York",
        coordinates: [-73.935242, 40.730610],
        visit: "The Metropolitan Museum of Art",
        happening:"Machine Gun Kelly - Madison Square Garden",
    },
    {

        markerOffset: -20,
        name: "Los Angeles",
        coordinates: [-118.243683, 34.052235],
        visit: "Disneyland",
        happening:"Viva! L.A. Music Festival",
    },
    {

        markerOffset: -20,
        name: "Moscow",
        coordinates: [37.618423, 55.751244],
        visit: "St. Basil Cathedral",
        happening:"Park Live Festival 2022",
    },
    {

        markerOffset: -20,
        name: "Johannesburg",
        coordinates: [28.034088, -26.195246],
        visit: "Apartheid Museum",
        happening:"Hlakanyana",
    },
    {

        markerOffset: -20,
        name: "Paris",
        coordinates: [2.349014, 48.864716],
        visit: "Eiffel Tower",
        happening:"Festival Solidays",
    },
    {

        markerOffset: -20,
        name: "Rome",
        coordinates: [12.496366, 41.902782],
        visit: "Colosseum",
        happening:"ALT-J",
    },
    {

        markerOffset: -20,
        name: "Amsterdam",
        coordinates: [4.897070, 52.377956],
        visit: "Van Gogh Museum",
        happening:"Armin Van Buuren",
    },
    {

        markerOffset: -20,
        name: "Seattle",
        coordinates: [-122.335167, 47.608013],
        visit: "The museum of Flight",
        happening:"Orville Peck",
    },
    {

        markerOffset: -20,
        name: "Mumbai",
        coordinates: [72.877426, 19.076090],
        visit: "Gateway of India",
        happening:"All Star Standup Comedy ",
    },
    {

        markerOffset: -20,
        name: "Dhaka",
        coordinates: [90.399452, 23.777176],
        visit: "Ahsan Manzil Museum",
        happening:"International Conference on Software Engineering",
    },
    {

        markerOffset: -20,
        name: "Beijing",
        coordinates: [116.383331, 39.916668],
        visit: "Great Wall of China",
        happening:"2022 Dragon Boat Festival",
    },
    {

        markerOffset: -20,
        name: "Tokyo",
        coordinates: [139.6503, 35.6762],
        visit: "Shinjuku Gyoen National Garden",
        happening:"Katsushika Iris Festival 2022",
    },



];


const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";
// const leafURL = "https://api.mapbox.com/styles/v1/nicknyr/cje7mtk2y6gf92snsydobiahf/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoibmlja255ciIsImEiOiJjajduNGptZWQxZml2MndvNjk4eGtwbDRkIn0.L0aWwfHlFJVGa-WOj7EHaA";
//setting the hovering stuff
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
                        markers.map(({name, coordinates, markerOffset, visit, happening}) => (

                            <CustomMarker
                                key ={name}
                                name ={name}
                                coordinates={coordinates}
                                markerOffset = {markerOffset}
                                visit = {visit}
                                happening = {happening}>
                            </CustomMarker>

                        ))}
                </ZoomableGroup>
            </ComposableMap>
        </>
    );
};
export default memo(MapChart);
