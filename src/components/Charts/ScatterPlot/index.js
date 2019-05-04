// import React from "react";
// import './style.css';

// const ScatterPlot = props => (
//   <div className="chart-container">
//     <h3>This is where a chart should go.</h3>
//   </div>
// );

// export default ScatterPlot;


import React, { useState, useEffect } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
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

  // const data = [
  //   { x: 100, y: 200, z: 200 },
  //   { x: 120, y: 100, z: 260 },
  //   { x: 170, y: 300, z: 400 },
  //   { x: 140, y: 250, z: 280 },
  //   { x: 150, y: 400, z: 500 },
  //   { x: 110, y: 280, z: 200 },
  // ];

  // console.log(dataArray);

  return (
    <div
      className="chart-container"
    >
      <ScatterChart
        width={500}
        height={350}
        margin={{
          top: 0, right: 0, bottom: 0, left: 0,
        }}
      >
        <CartesianGrid />
        <XAxis type="number" dataKey="x" name={props.data ? props.data.selectedVariable : null } unit={null} />
        <YAxis type="number" dataKey="y" name={props.data ? props.data.selectedSecondVar : null } unit={null} />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="A school" data={dataArray} fill={colors[0]} />
      </ScatterChart>
    </div>
  );
};

export default ScatterPlot;


