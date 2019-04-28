import React from 'react'
import { Map as LeafletMap, TileLayer, GeoJSON, LayersControl } from 'react-leaflet';
// import API from "../../utils/API";
import colormap from 'colormap';
// import { stat } from 'fs';


const Map = props => {

  const colors = colormap({
    colormap: 'viridis',
    nshades: 10,
    format: 'hex',
    alpha: 1
  }).reverse();

  // console.log(props.data.geojson)

  
  const valueArray = props.data.geojson ? props.data.geojson
    .filter(feature => feature.properties[props.data.selectedVariable])
    .map(feature => {
      const variable = feature.properties[props.data.selectedVariable];
      const normalizer=props.data.normalizedBy ? feature.properties[props.data.normalizedBy] : 1

      return variable/normalizer}) : null;
  const maxValue = valueArray !== null ? Math.max(...valueArray) : 'Value array not load yet';
  const minValue = valueArray !== null ? Math.min(...valueArray) : 'Value array not load yet';

  // console.log(valueArray);
  console.log(maxValue);
  console.log(minValue);
  // console.log(maxValue - minValue);
  // console.log(props.data.geographyFilter);
  // console.log(props.data.geographyFilterValue);
  // console.log(colors);


  return (
    <LeafletMap
      center={[33.8, -84.3]}
      zoom={9}
      maxZoom={18}
      attributionControl={true}
      zoomControl={true}
      doubleClickZoom={true}
      scrollWheelZoom={true}
      dragging={true}
      animate={true}
      easeLinearity={0.35}
    >

    <LayersControl position="topright">
      <LayersControl.BaseLayer name="OpenStreetMap Mono">
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name="OpenStreetMap Color">
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </LayersControl.BaseLayer>
    </LayersControl>
        
      { props.data.geojson ?
      <GeoJSON
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
          const color = colors[Math.floor(binningRatio*10)]

          return ({
            color: '#1a1d62',
            weight: 0.4,
            fillColor: color,
            fillOpacity: .7,
          })
        }}
        onEachFeature={(feature, layer) => {
          const variable=feature.properties[props.data.selectedVariable];
          const normalizer=props.data.normalizedBy ? feature.properties[props.data.normalizedBy] : 1

          const value = variable/normalizer;
          const featureID = feature.properties['GEOID10'];
          // console.log(String(value))
          layer.bindTooltip(String(value))
            .on('mouseover', e => {
              // console.log(featureID);
              props.handleHoverID(featureID)
            });
        }}
      /> : null }
        
      <TileLayer
      // url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'
      url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
      >

      </TileLayer>

    </LeafletMap>

  );
};

export default Map;