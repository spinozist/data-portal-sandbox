import React from 'react';
// import { JsonToTable } from 'react-json-to-table';
import './style.css';

const Table = props => {

    // console.log(props)

    const tableSelectorField = props.data.hoverField

    // console.log(tableSelectorField);

    // const emptyTable = [{
    //     properties : {
    //         data: "no data"}
    // }];

    const tableData = props.data.geojson && props.hoverID && tableSelectorField ? props.data.geojson.filter(feature => 
        feature.properties[tableSelectorField] === props.hoverID) : null;
    
    // console.log(tableData ? tableData['0'] : null)

    const indicatorArray = tableData ? Object.keys(tableData[0].properties) : null
    const valueArray = tableData ? Object.values(tableData[0].properties) : null

    // console.log(indicatorArray);
    console.log(valueArray);


    // console.log(tableSelectorField ? console.log(tableSelectorField) : null);

    return (

        <div className="table-container">

            {
            props.hoverID ?

                <table 
                    className="data-table"
                    id={"table-" +  tableSelectorField + "-" + props.hoverID}
                    key={tableSelectorField + "-" + props.hoverID}>
                    <tr className="header-row">
                        <th>
                            Indicator
                        </th>
                        <th>
                            Value
                        </th>
                    </tr>
                    {
                        indicatorArray ? indicatorArray.map((indicator, index) => {
                            const indicatorLabel = indicator;
                            console.log(index)

                            // const value = valueArray[index];
                            return (
                                <tr 
                                className={ index % 2 === 0 ? "odd-row" : "even-row"}
                                key={index}
                                id={"row-" + index}
                                >
                                    <td className="col-1">
                                        {indicatorLabel}
                                    </td>
                                    <td className="col-2">
                                        {valueArray[index]}
                                    </td>
                                </tr>
                            )
                        }) : null
                    }
                </table>

            : null
            }
        </div>

    )
};

export default Table;

