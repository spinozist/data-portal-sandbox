import React from "react";
import { GeoJSON } from 'react-leaflet';
// import API from "../../utils/API";


const OverlayLayer = props => {

    // console.log(props.data)
    //   console.log(maxValue);
    //   console.log(minValue);



    return (
        <GeoJSON
        key={props.data.geography}
        data={props.data ? props.data : null}
        style={{
            color: 'black',
            weight: 2,
            fillColor: 'white',
            fillOpacity: 0,
        }}
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
      >Test</GeoJSON>
    );
};

export default OverlayLayer;