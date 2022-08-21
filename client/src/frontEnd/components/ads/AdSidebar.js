import {useEffect, useState} from "react";
import rand from "simple-random-number-generator"
import Card from "../ui/Card";

function AdSidebar(props){
    const [holidayPackage,setHolidayPackage] = useState({
        destination: '',
        imgSource:'',
        description:''
    })
    const [loading,setLoading] = useState(true)

    let params = {
        min: 1,
        max: 20,
        integer: true
    }
    const number = rand(params);
    const imgString = "/holidayPackage/"+number;

    useEffect(() => {
        const fetchHolidayPackage = async () => {
            try {
                setLoading(true);
                console.log(number)
                const res = await fetch(imgString, {mode: 'cors'})
                if (!res.ok) {
                    console.log('package not ok')
                    setHolidayPackage(null)
                    return setLoading(false);
                }
                const data = await res.json();
                setHolidayPackage(data);
                console.log(holidayPackage.packageID)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.log('Couldnt find package');
                return
            }
        }
        fetchHolidayPackage()
    },[setHolidayPackage])

    let image
    if(holidayPackage!==null) {
        image = holidayPackage.imgSource
    }
    else{
        image = props.url
    }

    const handleAd = async () => {
        console.log('ad clicked')
    }
    return (
     <div onClick={handleAd}>
            <h2>{holidayPackage.destination}</h2>
         <div>
            <img  src={image} alt="placeholder"></img>
         </div>
            <p>{holidayPackage.description}</p>
     </div>

    )
}

export default AdSidebar;