import React from 'react';
import dataConfig from "../../config/dataConfig";


const GeoSelector = props => {

    return (

            dataConfig ?
            dataConfig.map(
            geoObject => 
                <button
                onClick={event => props.handleGeoChange(geoObject.name)} 
                className="geo-selector"
                style={{
                    fontSize: '1.5em',
                    height: '100px',
                    width: '100px',
                    backgroundColor: 'black',
                    color: 'white',
                    margin: '5px',
                    borderRadius: "50%"
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