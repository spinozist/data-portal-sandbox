import React from 'react';
import { Button } from 'react-bootstrap';
import dataConfig from "../../config/dataConfig";
import "./style.css"


const GeoSelector = props => {

 return (
        dataConfig ?
        dataConfig.map(
        geoObject => 
            <Button
            onClick={event => props.handleGeoChange(geoObject.name)} 
            id={props.currentGeo === geoObject.name ? "active-geo-button" : "inactive-geo-button"}
            style={{
                backgroundColor: 'black',
                color: 'white',
                margin: '-10px 10px 10px 10px',
                borderRadius: "50%",
                outline: 'none',
            }}
            >
                {geoObject.name}
            </Button>) : null
        

        // <select>
        //     {dataConfig ?
        //         dataConfig.map(option =>
        //             <option value={option.name}>
        //                 {option.name}
        //             </option>
        //         ) : null
        //     }
        // </select>
    )
};

export default GeoSelector;