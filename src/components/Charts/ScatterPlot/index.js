// import React from "react";
// import './style.css';

// const ScatterPlot = props => (
//   <div className="chart-container">
//     <h3>This is where a chart should go.</h3>
//   </div>
// );

// export default ScatterPlot;


import React, { useState, useEffect } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import colormap from 'colormap';
import './style.css';



const ScatterPlot = props => {
  // static jsfiddleUrl = 'https://jsfiddle.net/alidingling/uLysj0u2/';
  // console.log(props.data.geojson);

  const numberOfBins = props.layoutState.numberOfBins;
  const colorMap = props.layoutState.colorMap;
  const reverse = props.layoutState.colorMapReverse;

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

  const dataArray = props.data.geojson ? props.data.geojson.map(feature => 
    ({
      x: feature.properties[props.data.selectedVariable],
      y: feature.properties[props.data.selectedSecondVar],
      z: feature.properties.nhw_or10
    })
    ) : null;

    // const valueArray = props.data.geojson ? props.data.geojson
    // .filter(feature => feature.properties[props.data.selectedVariable])
    // .map(feature => {
    
    // const variable = feature.properties[props.data.selectedVariable];
    // const normalizer=props.data.normalizedBy ? feature.properties[props.data.normalizedBy] : 1

    //   return variable/normalizer}) : null;
    // const maxValue = valueArray !== null ? Math.max(...valueArray) : 'Value array not load yet';
    // const minValue = valueArray !== null ? Math.min(...valueArray) : 'Value array not load yet';



  return (
    <div
      className="chart-container"
    >
    <ResponsiveContainer height="100%" width="100%">
      <ScatterChart
          margin={{
            top: 10, right: 10, bottom: 20, left: 15,
          }}
        >
          <CartesianGrid />
          <XAxis type="number" 
                 dataKey="x" 
                 name={props.data ? props.data.selectedVariable : null } 
                 label={{
                    value: props.data ? props.data.selectedVariable : 'x',
                    position: 'bottom'
                  }}
                 unit={null} />
          <YAxis type="number" 
                 dataKey="y" 
                 name={props.data ? props.data.selectedSecondVar : null } 
                 label={{
                   value: props.data ? props.data.selectedSecondVar : 'y',
                   position: 'left',
                   angle: -90
                  }} 
                 unit={null} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} animationEasing={'ease-in-out'} />
          <Scatter name="scatter-chart" data={dataArray} fill={colors[0]} />
        </ScatterChart>
    </ResponsiveContainer>

    </div>
  );
};

export default ScatterPlot;


