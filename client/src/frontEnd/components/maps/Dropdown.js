import { useState } from "react";
import MapChart from "./MapChart";
// import useFetch from "../../hooks/useFetch";
//dropdown list for selecting category
function Dropdown({ selected, setSelected }) {
    ///const [content, setContent] = useState("");
    const [isActive, setIsActive] = useState(false);
    const options = ["Summer", "Winter", "Music and Arts", "Sports"];
    //const{data, loading, error} = useFetch("/map?tag");
    return (
        <div className="dropdown">
            <div className="dropdown-btn" onClick={(e) => setIsActive(!isActive)}>
                {selected}
                <span className="fas fa-caret-down"></span>
            </div>
            {isActive && (
                <div className="dropdown-content">
                    {options.map((option) => (
                        <div
                            onClick={(e) => {
                                setSelected(option);
                                setIsActive(false);
                                //MapChart.map?data={option};

                                // <MapChart setTooltipContent={setContent}
                                //   data = {option}/>
                            }}
                            className="dropdown-item"
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
export default Dropdown;
