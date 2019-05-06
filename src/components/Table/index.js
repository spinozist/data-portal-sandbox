import React from 'react';
import { ExportToCsv } from 'export-to-csv';
// import { JsonToTable } from 'react-json-to-table';
import './style.css';

const Table = props => {

    // console.log(props.data.selectedVariable)

    const tableSelectorField = props.data.hoverField

    // console.log(tableSelectorField);

    // const emptyTable = [{
    //     properties : {
    //         data: "no data"}
    // }];

    const tableData = props.data.geojson && props.hoverID && tableSelectorField ? props.data.geojson.filter(feature => 
        feature.properties[tableSelectorField] === props.hoverID) : null;
    
    // console.log(tableData ? JSON.stringify(tableData['0'].properties) : null)

    const indicatorArray = tableData ? Object.keys(tableData[0].properties) : null
    const valueArray = tableData ? Object.values(tableData[0].properties) : null

    // console.log(indicatorArray);
    // console.log(valueArray);
   const csvData = indicatorArray ? indicatorArray.map((indicator, index) => ({
       fieldName: indicator,
       value: valueArray[index]
   })) : null;

   console.log(props.data.geography);

    const dataTitle = props.data.geography ? props.data.geography : null;

    const csvFilename = dataTitle ? dataTitle.replace(/ /g,"") + "-" + props.hoverID : null;
    const csvTitle = dataTitle && props.hoverID ? dataTitle + ": " + props.hoverID : null;

//    const csvFilename = dataTitle

   const csvOptions = { 
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    filename: csvFilename, 
    showTitle: false,
    title: csvTitle,
    useTextFile: false,
    useKeysAsHeaders: true,
    // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
  };

  const csvExporter = new ExportToCsv(csvOptions);



    // const csvData = tableData.map()
    // console.log(tableSelectorField ? console.log(tableSelectorField) : null);

    return (
        <div className="table-and-button-container">
            <button
            onClick={e => csvExporter.generateCsv(csvData)}
            style={{
                width: '100%',
            }}
            >Export To CSV</button>
            <div className="table-container">
                {
                props.hoverID ?

                    <table 
                        className="data-table"
                        id={"table-" +  tableSelectorField + "-" + props.hoverID}
                        key={tableSelectorField + "-" + props.hoverID}>
                        {/* <tr className="header-row">
                            <th className="header-col-1">
                                Field
                            </th>
                            <th className="header-col-2">
                                Value
                            </th>
                        </tr> */}
                        {
                            indicatorArray ? indicatorArray.map((indicator, index) => {
                                const indicatorLabel = indicator;
                                // console.log(indicatorLabel + "[" + index + "]");

                                // const value = valueArray[index];
                                return (
                                    <tr 
                                    className={ index % 2 === 0 ? "odd-row" : "even-row" }
                                    key={"row-key-" + index}
                                    id={ indicatorLabel === props.data.selectedVariable ? "sel-var-row" : "row-" + index }
                                    >
                                        <td className="column-1">
                                            {indicatorLabel}
                                        </td>
                                        <td className="column-2">
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
        </div>

    )
};

export default Table;

