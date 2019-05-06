import React from "react";
import { GeoJSON } from 'react-leaflet';
// import API from "../../utils/API";
import * as turf from '@turf/turf';



const OverlayLayer = props => {

    const linestringData = props.data ? props.data.map(feature => turf.polygonToLine(feature)) : null;
    // console.log(linestringData)
    //   console.log(maxValue);
    //   console.log(minValue);

    const borderWeight = props.borderWeight;
    const borderColor = props.borderColor;

    // const polygonToMultiLine = data => {
    //     data.forEach(feature => console.log(feature.geometry.type))        
    // }

    // polygonToMultiLine(props.data ? props.data : null)

    return (
        <GeoJSON
        key={props.data.geography}
        data={props.data ? linestringData : null}
        style={{
            color: borderColor,
            weight: borderWeight,
            // fillColor: null,
            // fillOpacity: 0,
        }}
        // onEachFeature={feature => {
        //     console.log(feature.geometry.type);
        //     feature.geometry.type = "MultiPoint";
        //     console.log(feature.geometry.type);
        
        // }}
        // style={feature => {
        //   const variable=feature.properties[props.data.selectedVariable];
        //   const normalizer=props.data.normalizedBy ? feature.properties[props.data.normalizedBy] : 1

        //   // console.log(props.data.selectedVariable);
        //   const value = variable/normalizer;
        //   const range = maxValue - minValue;
        //   const binningRatio = value/range;
        //   // const opacity = value;
        //   const color = colors[Math.floor(binningRatio*10)]

        //   return ({
        //     color: '#1a1d62',
        //     weight: 0.4,
        //     fillColor: color,
        //     fillOpacity: .7,
        //   })
        // }}
        // onEachFeature={(feature, layer) => {
            
        //   const variable=feature.properties[props.data.selectedVariable];
        //   const normalizer=props.data.normalizedBy ? feature.properties[props.data.normalizedBy] : 1

        //   const value = variable/normalizer;
        //   const featureID = feature.properties['GEOID10'];
        //   // console.log(String(value))
        //   layer.bindTooltip(String(value))
        //     .on('mouseover', e => {
        //       // console.log(featureID);
        //       props.handleHoverID(featureID)
        //     });
        // }}
      />
    );
};

export default OverlayLayer;