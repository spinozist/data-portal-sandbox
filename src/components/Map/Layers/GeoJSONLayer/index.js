import React from "react";
import L from 'leaflet';
import { GeoJSON } from 'react-leaflet';
import colormap from 'colormap';


const GeoJSONLayer = props => {

  // const pointData = props.data.geojson.map(feature => feature.geometry.type === 'Point' ? L. : null);

  // console.log(markerToPoint);

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


  const dataArray = props.data.geographyFilter ? 
  //If there's a filter type
  props.data.geojson.filter(feature => 
    feature.properties[props.data.selectedVariable] > 0 && feature.properties[props.data.geographyFilter] === props.data.geographyFilterValue )
  //If there isn't a filter type
    : props.data.geojson;

  // const pointData = dataArray.map(feature => feature.geometry.type === 'Point' ? console.log(feature.geometry.type) : null);
  // var geojsonMarkerOptions = {
  //   radius: 20,
  //   fillColor: "#ff7800",
  //   color: "#000",
  //   weight: 1,
  //   opacity: 1,
  //   fillOpacity: 0.8
  // };

  // const pointData = dataArray && props.data.point ? dataArray.map(feature => L.circleMarker(feature.geometry.coordinates, geojsonMarkerOptions)) : null;
  //   // L.geoJSON(dataArray, {
  //   // pointToLayer: (feature, latlng) => {
  //   //   console.log("This is a point")
  //   //   return L.circleMarker(latlng, geojsonMarkerOptions )
  //   // }
  //   // }) 



  return (

      <GeoJSON
      key={props.data.geography}
      data={ dataArray }
      pointToLayer={props.data.point ? (feature, latlng) => {
        
        const variable=feature.properties[props.data.selectedVariable];
        const normalizer=props.data.normalizedBy ? feature.properties[props.data.normalizedBy] : 1

        // console.log(props.data.selectedVariable);
        const value = variable/normalizer;
        const distFromMin = value - minValue;
        const range = maxValue - minValue;
        const binningRatio = distFromMin/range;
        const indexRange = numberOfBins - 1;
        // const opacity = value;
        const color = colors[Math.floor(binningRatio * indexRange)];

        // const featureID = feature.properties[props.data.hoverField];

        var geojsonMarkerOptions = {
          // radius: 10,
          fillColor: color,
          color: "#000",
          weight: 1,
        };  
        
        console.log("This is a point")
          return L.circleMarker(latlng, geojsonMarkerOptions )
                  .setRadius(5)
        } : null 
      }


      style={ feature => {
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
            weight: props.hoverID === featureID ? 3 : 0.4,
            fillColor: color,
            fillOpacity: !value ? 0 : props.hoverID === featureID ? 1 : props.layoutState.colorOpacity,
            zIndex: props.hoverID === featureID ? 999 : 998
          })
        }
      }

      // onMouse

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