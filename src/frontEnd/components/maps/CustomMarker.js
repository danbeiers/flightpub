import React, { useState } from "react";
import { Marker } from "react-simple-maps";
import { Popover } from "react-tiny-popover";

const CustomMarker = ({ name, coordinates, markerOffset, music, place }) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    return (
        <Marker
            key={name}
            coordinates={coordinates}
            music = {music}
            place = {place}
            onClick={() => {
                setIsPopoverOpen(true);
            }}
        >
            <Popover
                isOpen={isPopoverOpen}
                onClickOutside={() => {
                    setIsPopoverOpen(false);
                }}
                positions={["top"]}
                content={<div className="custom-popover">{name} {place}{music}</div>}
            >
                <circle r={5} fill="#F00" stroke="#fff" strokeWidth={1} />
            </Popover>
            {/* <text
        textAnchor="middle"
        y={markerOffset}
        style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
      >
        {name}
      </text> */}
        </Marker>
    );
};

export default CustomMarker;
