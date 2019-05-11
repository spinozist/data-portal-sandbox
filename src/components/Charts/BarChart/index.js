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

  const valueArray = props.data.geojson ? props.data.geojson
    .filter(feature => feature.properties[props.data.selectedVariable])
    .map(feature => {
  
      const variable = feature.properties[props.data.selectedVariable];
      const normalizer=props.data.normalizedBy ? feature.properties[props.data.normalizedBy] : 1

        return variable/normalizer}) : null;

  const maxValue = valueArray !== null ? Math.max(...valueArray) : 'Value array not load yet';
  const minValue = valueArray !== null ? Math.min(...valueArray) : 'Value array not load yet';


  const dataArray = props.data.geojson ? props.data.geojson.map(feature => 
        ({
        x: feature.properties[props.data.selectedVariable],
        name: feature.properties[props.data.hoverField],
        })
        ).sort((a,b) => a.x > b.x ? 1 : -1) : null;

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
        <Bar name={props.data.selectedVariable} dataKey={'x'} fill={colors[0]}>
          {
            dataArray ? dataArray.map((feature, index) => {
              
              const value=feature.x;
              const name=feature.name;

              // console.log(feature);
      
              // console.log(props.data.selectedVariable);
              const distFromMin = value - minValue;
              const range = maxValue - minValue;
              const binningRatio = distFromMin/range;
              const indexRange = numberOfBins - 1;
              // const opacity = value;
              const color = colors[Math.floor(value === 0 ? 0 : binningRatio * indexRange)];
              

              return <Cell 
                key={`cell-${index}`} 
                fill={color} 
                stroke={props.hoverID && name === props.hoverID ? 'black' : null}
                strokeWidth={props.hoverID && name === props.hoverID ? 2 : null}/>
            }) : null
          }
        </Bar>
        {/* <Area type="monotone" dataKey={'x'} fill="#8884d8" stroke="#8884d8" /> */}
        {/* <Brush dataKey="name" height={30} stroke="#8884d8" /> */}
        <Tooltip cursor={{ strokeDasharray: '3 3' }} animationEasing={'ease-in-out'} />
      </ComposedChart>
    </ResponsiveContainer>

    </div>
  );
};

export default SimpleBarChart;


