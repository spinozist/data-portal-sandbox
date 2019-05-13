import React, { useState } from 'react';
import { ComposedChart, Bar, Cell, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Dropdown } from 'react-bootstrap';
import colormap from 'colormap';
import numeral from 'numeral';
import './style.css';



const SimpleBarChart = props => {

  const [ sortOrder, setSortOrder] = useState('lohi');


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
        ).sort(sortOrder === 'lohi' ? (a,b) => a.x > b.x ? 1 : -1 : (a,b) => a.x < b.x ? 1 : -1 ) : null;

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
        <Bar 
          name={props.data.selectedVariable} 
          dataKey={'x'} 
          fill={colors[0]}
          onMouseEnter={point => props.handleHoverID(point.name)} 
          >
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
                stroke={props.hoverID && name === props.hoverID ? 'black' : color}
                strokeWidth={props.hoverID && name === props.hoverID ? 2 : null}
                />
            }) : null
          }
        </Bar>
        {/* <Area type="monotone" dataKey={'x'} fill="#8884d8" stroke="#8884d8" /> */}
        {/* <Brush dataKey="name" height={30} stroke="#8884d8" /> */}
        <Tooltip
          itemStyle={{ color: 'black' }}
          style={{ borderRadius: '5px'}}
          cursor={{ strokeDasharray: '3 3' }} 
          animationEasing={'ease-in-out'}
          formatter={ value => 
            typeof value === 'number' ? 
            value % 1 !== 0 ? 
            numeral(value).format('0,0.00') 
            : numeral(value).format('0,0')
            : value
            } />
      </ComposedChart>
    </ResponsiveContainer>
    <Dropdown 
        style={{ 
          float: 'center',
          margin: '5px 0 0 10px'}}>
        <Dropdown.Toggle variant="secondary" className="category-dropdown" id="dropdown-basic">
          Sort Order
        </Dropdown.Toggle>

        <Dropdown.Menu
          style={{
            overflow: 'scroll',
            maxHeight: '30vh',
          }}>
            <Dropdown.Item
              style={{
                backgroundColor: sortOrder === 'lohi' ? 'black' : null,
                color: sortOrder === 'lohi' ? 'white' : null,
                marginLeft: '2%'
              }} 
              value='lohi' 
              onClick={e => setSortOrder('lohi')}
            >
              Low-to-High
            </Dropdown.Item>
            <Dropdown.Item
              style={{
                backgroundColor: sortOrder === 'hilo' ? 'black' : null,
                color: sortOrder === 'hilo' ? 'white' : null,
                marginLeft: '2%'
              }} 
              value='hilo' 
              onClick={e => setSortOrder('hilo')}
            >
              High-to-Low
            </Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>

    </div>
  );
};

export default SimpleBarChart;


