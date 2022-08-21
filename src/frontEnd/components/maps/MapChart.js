import React, { memo, useRef, useState} from "react";
import ReactDOM from "react-dom";

import CustomMarker from "./CustomMarker";
import {
    ZoomableGroup,
    ComposableMap,
    Geographies,
    Geography,
} from "react-simple-maps";

const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/v2/topojson-maps/world-110m.json";
// const leafURL = "https://api.mapbox.com/styles/v1/nicknyr/cje7mtk2y6gf92snsydobiahf/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoibmlja255ciIsImEiOiJjajduNGptZWQxZml2MndvNjk4eGtwbDRkIn0.L0aWwfHlFJVGa-WOj7EHaA";
//setting the hovering stuff
const MapChart = ({ setTooltipContent, data }) => {

   // const{data, loading, error} = useFetch("/map");
   // console.log(data);
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
                        data.map(({name, location, markerOffset, visit, happening}) => (
                            <CustomMarker
                                key ={name}
                                name ={name}
                                coordinates={location.coordinates}
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
