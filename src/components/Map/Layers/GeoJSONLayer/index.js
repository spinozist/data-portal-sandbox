import React from "react";
import { GeoJSON } from 'react-leaflet';
import colormap from 'colormap';


const GeoJSONLayer = props => {

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

  const valueArray = props.data.geojson ? props.data.geojson
  .filter(feature => feature.properties[props.data.selectedVariable])
  .map(feature => {
  
  const variable = feature.properties[props.data.selectedVariable];
  const normalizer=props.data.normalizedBy ? feature.properties[props.data.normalizedBy] : 1

    return variable/normalizer}) : null;
  const maxValue = valueArray !== null ? Math.max(...valueArray) : 'Value array not load yet';
  const minValue = valueArray !== null ? Math.min(...valueArray) : 'Value array not load yet';

  // console.log(valueArray);
  
  // console.log(props.data)
  //   console.log(maxValue);
  //   console.log(minValue);



  return (

      <GeoJSON
      key={props.data.geography}
      data={props.data.geographyFilter ? 
        props.data.geojson.filter(feature => 
          feature.properties[props.data.selectedVariable] > 0 && feature.properties[props.data.geographyFilter] === props.data.geographyFilterValue ) :
          props.data.geojson.filter(feature => feature.properties[props.data.selectedVariable] > 0)}
      style={feature => {
        const variable=feature.properties[props.data.selectedVariable];
        const normalizer=props.data.normalizedBy ? feature.properties[props.data.normalizedBy] : 1

        // console.log(props.data.selectedVariable);
        const value = variable/normalizer;
        const distFromMin = value - minValue;
        const range = maxValue - minValue;
        const binningRatio = distFromMin/range;
        const indexRange = numberOfBins - 1;
        // const opacity = value;
        const color = colors[Math.floor(value === 0 ? 0 : binningRatio * indexRange)];

        const featureID = feature.properties[props.data.hoverField];


        // console.log(featureID);

        return ({
          color: props.hoverID === featureID ? 'black' : '#1a1d62',
          weight: props.hoverID === featureID ? 1.5 : 0.4,
          fillColor: color,
          fillOpacity: props.hoverID === featureID ? 1 : props.layoutState.colorOpacity,
        })
      }}

      onMouse

      onEachFeature={(feature, layer) => {
          
        // const variable=feature.properties[props.data.selectedVariable];
        // const normalizer=props.data.normalizedBy ? feature.properties[props.data.normalizedBy] : 1

        // const value = variable/normalizer;

        // console.log(feature.geometry.type);
        
        const featureID = feature.properties[props.data.hoverField];
        // console.log(String(value))

        layer.bindTooltip(String(featureID))
          .on('mouseover', e => {
              // console.log(featureID);
              props.handleHoverID(featureID)
            });
      }}
    />
  );
};

export default GeoJSONLayer;