import React from 'react';
import dataConfig from "../../config/dataConfig";
import colormap from 'colormap';
import './style.css';

const VarSelector = props => {


    const currentSelection = props.currentSelection;

    const geoObject = dataConfig.filter(geoObject => geoObject.name === props.selectedGeo);
    const varArray = geoObject[0].variableOptions;

    const colors = colormap({
        colormap: 'bone',
        nshades: 9,
        format: 'hex',
        alpha: 1
      });

    // console.log(geoObject);
    // console.log(varArray);

    return (

            varArray ?
            varArray.map(
            variable => 
                <button
                onClick={event => props.handleVarChange(variable)} 
                className="var-selector" 
                id={variable === currentSelection ? 'active-var-button' : null }
                style={{
                    fontSize: '.8em',
                    height: '40px',
                    width: '180px',
                    backgroundColor: colors[varArray.indexOf(variable)],
                    color: 'white',
                    margin: '0px 5px 5px 0px',
                    borderRadius: "10px",
                    outline: 'none',
                    lineHeigt: '40px',
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