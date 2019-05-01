import React from 'react';
import { JsonToTable } from 'react-json-to-table';
import './style.css';

const Table = props => {

    // console.log(props)

    const tableSelectorField = props.data.hoverField

    // console.log(tableSelectorField);

    const emptyTable = [{
        properties : {
            data: "no data"}
    }];

    const tableData = props.data.geojson && props.hoverID && tableSelectorField ? props.data.geojson.filter(feature => 
        feature.properties[tableSelectorField] === props.hoverID) : emptyTable;
    
    // console.log(tableData ? tableData['0'] : null)

    // console.log(JSON.stringify(tableData));

    // console.log(tableSelectorField ? console.log(tableSelectorField) : null);

    return (

        <div className='table-container'>
            { props.hoverID && tableData && tableSelectorField ?
            <JsonToTable json={tableData[0].properties ? tableData[0].properties : null}/> : null
            }
        </div>
    )
};

export default Table;

