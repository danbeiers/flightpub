import React, { useState } from "react";
import { Marker } from "react-simple-maps";
import { Popover } from "react-tiny-popover";
import useFetch from "../../../hooks/useFetch";

const CustomMarker = ({ name, coordinates, markerOffset, visit, happening }) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    return (
        <Marker
            key={name} //stores the name of the city
            coordinates={coordinates} //stores the coordinates of the city
            visit = {visit} //stores the place to visit
            happening = {happening} //stores what is happening in the city and would be further expanded once we have backend
            onClick={() => {
                setIsPopoverOpen(true);
            }}>
            <Popover
                isOpen={isPopoverOpen}
                onClickOutside={() => {
                    setIsPopoverOpen(false);
                }}
                positions={["top"]}
                content={<div className="custom-popover">{name} <br/>
                    {happening}<br/>
                    {visit}<br/>
            </div>}>
                <circle r={5} fill="#F00" stroke="#fff" strokeWidth={1} />
            </Popover>
        </Marker>
    );
};

export default CustomMarker;
