import React from 'react';
import dataConfig from "../../config/dataConfig";
import "./style.css"


const GeoSelector = props => {

    return (

            dataConfig ?
            dataConfig.map(
            geoObject => 
                <button
                onClick={event => props.handleGeoChange(geoObject.name)} 
                className="geo-selector"
                id="active-geo-button"
                style={{
                    float: 'left',
                    fontSize: '1.5em',
                    height: '120px',
                    width: '120px',
                    backgroundColor: 'black',
                    color: 'white',
                    margin: '-10px 10px 10px 10px',
                    borderRadius: "50%",
                    outline: 'none'
                }}
                >
                    {geoObject.name}
                </button>) : null

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
}

export default GeoSelector;