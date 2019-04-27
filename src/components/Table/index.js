import React from 'react';
import { JsonToTable } from 'react-json-to-table';
import './style.css';

const Table = props => {
    const tableData = props.data.geojson ? props.data.geojson.filter(feature => 
        feature.properties.GEOID10 === props.hoverID) : null;
    
    // console.log(tableData ? tableData['0'] : null)

    return (
        <div className='table-container'>
            { props.hoverID && tableData ?
            <JsonToTable json={tableData ? tableData[0].properties : null}/> : null
            }
        </div>
    )
};

export default Table;

