import React from 'react';
import dataConfig from "../../config/dataConfig";
import colormap from 'colormap';

const VarSelector = props => {



    const geoObject = dataConfig.filter(geoObject => geoObject.name === props.selectedGeo);
    const varArray = geoObject[0].variableOptions;

    const colors = colormap({
        colormap: 'viridis',
        nshades: 9,
        format: 'hex',
        alpha: 1
      });

    console.log(geoObject);
    console.log(varArray);

    return (

            varArray ?
            varArray.map(
            variable => 
                <button
                onClick={event => props.handleVarChange(variable)} 
                className="var-selector"
                style={{
                    fontSize: '.8em',
                    height: '50px',
                    width: '80px',
                    backgroundColor: colors[varArray.indexOf(variable)],
                    color: 'white',
                    margin: '5px',
                    borderRadius: "10%",
                    outline: 'none'
                }}
                >
                    {variable}
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

export default VarSelector;