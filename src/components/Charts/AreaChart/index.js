import React from 'react';
import { ComposedChart, Brush, Area, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import colormap from 'colormap';
import './style.css';



const AreaChart = props => {

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
     <ComposedChart 
        data={dataArray}
        margin={{
            top: 30, right: 10, bottom: 5, left: 15,
          }}>
        <XAxis hide name={props.data.hoverField} dataKey="name" />
        {/* <Bar name={props.data.selectedVariable} dataKey={'x'} fill={colors[0]} /> */}
        <Area type="monotone" name={props.data.selectedVariable} dataKey={'x'} fill={colors[0]} stroke="#8884d8" />
        {/* <Brush dataKey="name" height={30} stroke="#8884d8" /> */}
        <Tooltip cursor={{ strokeDasharray: '3 3' }} animationEasing={'ease-in-out'} />
      </ComposedChart>
    </ResponsiveContainer>

    </div>
  );
};

export default AreaChart;


