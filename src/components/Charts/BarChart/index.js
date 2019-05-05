// import React from "react";
// import './style.css';

// const ScatterPlot = props => (
//   <div className="chart-container">
//     <h3>This is where a chart should go.</h3>
//   </div>
// );

// export default ScatterPlot;


import React from 'react';
import { ComposedChart, BarChart, Bar, Area, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import colormap from 'colormap';
import './style.css';



const SimpleBarChart = props => {
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
        name: feature.properties[props.data.hoverField],
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
     <ComposedChart data={dataArray}>
        <XAxis hide name={props.data.hoverField} dataKey="name" />
        <Bar name={props.data.selectedVariable} dataKey={'x'} fill={colors[0]} />
        {/* <Area type="monotone" dataKey={'x'} fill="#8884d8" stroke="#8884d8" /> */}
        <Tooltip cursor={{ strokeDasharray: '3 3' }} animationEasing={'ease-in-out'} />
      </ComposedChart>
    </ResponsiveContainer>

    </div>
  );
};

export default SimpleBarChart;


