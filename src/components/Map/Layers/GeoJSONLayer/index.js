import React from "react";
import { GeoJSON } from 'react-leaflet';
import colormap from 'colormap';


const GeoJSONLayer = props => {

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
          const range = maxValue - minValue;
          const binningRatio = value/range;
          // const opacity = value;
          const color = colors[Math.floor(binningRatio*numberOfBins)]

          return ({
            color: '#1a1d62',
            weight: 0.4,
            fillColor: color,
            fillOpacity: .7,
          })
        }}
        onEachFeature={(feature, layer) => {
            
          // const variable=feature.properties[props.data.selectedVariable];
          // const normalizer=props.data.normalizedBy ? feature.properties[props.data.normalizedBy] : 1

          // const value = variable/normalizer;


          
          const featureID = feature.properties[props.data.hoverField];
          // console.log(String(value))

          layer.bindTooltip(String(featureID)).on('mouseover', e => {
                // console.log(featureID);
                props.handleHoverID(featureID)
              });
        }}
      />
    );
};

export default GeoJSONLayer;