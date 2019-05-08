import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { ExportToCsv } from 'export-to-csv';
import colormap from 'colormap';
import './style.css';

const Table = props => {

    // console.log(props.data.selectedVariable)

    const [buttonDialogue, setButtonDialogue] = useState('Export Data to CSV');

    const tableSelectorField = props.data.hoverField

    // console.log(tableSelectorField);

    // const changeButtonDialogue = text => {
    //     setButtonDialogue(text);
    // }
    // const emptyTable = [{
    //     properties : {
    //         nodata : "hover over map for data"}
    // }];

    const numberOfBins = props.layoutState.numberOfBins;
    const colorMap = props.layoutState.colorMap;
    const reverse = props.layoutState.colorMapReverse;
  
  //  props.data.geojson ? props.data.geojson.forEach(feature => feature.geometry.type === 'Point' ? L.pointToLayer(feature.geometry.type) : console.log('Is not point')) : null;

  
    const colors = reverse ? colormap({
      colormap: colorMap,
      nshades: numberOfBins,
      format: 'hex',
      alpha: 1
    }).reverse() : colormap({
      colormap: colorMap,
      nshades: numberOfBins,
      format: 'hex',
      alpha: 1
    });


    const tableData = props.data.geojson && props.hoverID && tableSelectorField ? props.data.geojson.filter(feature => 
        feature.properties[tableSelectorField] === props.hoverID) : null;
    
    // console.log(tableData ? JSON.stringify(tableData['0'].properties) : null)

    const indicatorArray = props.hoverID && tableData && tableSelectorField ? Object.keys(tableData[0].properties) : null
    const valueArray = props.hoverID && tableData && tableSelectorField ? Object.values(tableData[0].properties) : null

    // console.log(indicatorArray);
    // console.log(valueArray);
   const csvData = indicatorArray ? indicatorArray.map((indicator, index) => ({
       fieldName: indicator,
       value: valueArray[index]
   })) : null;

//    console.log(props.data.geography);

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

  const changeButtonDialogue = text => {
    setButtonDialogue(text);
    setTimeout(e => setButtonDialogue('Export Data to CSV'), 2000)
  }



    // const csvData = tableData.map()
    // console.log(tableSelectorField ? console.log(tableSelectorField) : null);

    return (
        <div className="table-and-button-container">

            <Button
            variant="secondary"
            onClick={e => !csvData ? changeButtonDialogue('Hover over map to select data...') : csvExporter.generateCsv(csvData, changeButtonDialogue('Data Downloaded')) }
            style={{
                width: '100%',
                marginBottom: '10px'
            }}
            >
            {buttonDialogue}
            </Button>
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
                                    style={indicatorLabel === props.data.selectedVariable ? 
                                        {
                                            backgroundColor: colors[Math.floor(numberOfBins * .6)],
                                            fontSize: '1.2em',
                                        
                                        } : null }
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

