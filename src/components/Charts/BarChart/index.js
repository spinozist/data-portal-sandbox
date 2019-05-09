// import React from "react";
// import './style.css';

// const ScatterPlot = props => (
//   <div className="chart-container">
//     <h3>This is where a chart should go.</h3>
//   </div>
// );

// export default ScatterPlot;


import React from 'react';
import { ComposedChart, Brush, Bar, Area, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import colormap from 'colormap';
import './style.css';



const SimpleBarChart = props => {

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

  return (
    <div
      className="chart-container" >
    <ResponsiveContainer height="100%" width="100%">
     <ComposedChart 
        data={dataArray}
        margin={{
          top: 30, right: 10, bottom: 5, left: 15,
        }}>
        <XAxis hide name={props.data.hoverField} dataKey="name" />
        <Bar name={props.data.selectedVariable} dataKey={'x'} fill={colors[0]} />
        {/* <Area type="monotone" dataKey={'x'} fill="#8884d8" stroke="#8884d8" /> */}
        {/* <Brush dataKey="name" height={30} stroke="#8884d8" /> */}
        <Tooltip cursor={{ strokeDasharray: '3 3' }} animationEasing={'ease-in-out'} />
      </ComposedChart>
    </ResponsiveContainer>

    </div>
  );
};

export default SimpleBarChart;


