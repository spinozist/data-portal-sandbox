import React, { useState, useEffect } from 'react';
import { Map as LeafletMap, TileLayer, LayersControl, ZoomControl } from 'react-leaflet';
import GeoJSONLayer from '../Layers/GeoJSONLayer';
import OverlayLayer from '../Layers/OverlayLayer';
import API from "../../../utils/API";
// import GACounties from "../../../config/overlayLayers.json"

const Map = props => {

  // console.log(GACounties);

  const [overlayData, setOverlayData] = useState({
    overlay_one: null,
    overlay_two: null,
    overlay_three: null,
  });
  

  const apiOverlayData = (url1, url2, url3) => {

    API.getData(url1)
      .then(res => {
        const data = res.data.features;
        // console.log(data);
        
        // data.forEach(feature => 
        //   console.log(feature.geometry.type));

      setOverlayData({
        ...overlayData,
        overlay_one: data})
    })
      .catch(err => console.log(err));

    API.getData(url2)
      .then(res => {
        const data = res.data.features;
        // console.log(data);
        
        // data.forEach(feature => 
        //   console.log(feature.geometry.type));


      setOverlayData({
        ...overlayData,
        overlay_two: data})
    })
      .catch(err => console.log(err));
    
    API.getData(url3)
      .then(res => {
        const data = res.data.features;
        // console.log(data);
        
        // data.forEach(feature => 
        //   console.log(feature.geometry.type));


      setOverlayData({
        ...overlayData,
        overlay_three: data})
    })
      .catch(err => console.log(err));
  }

  useEffect(props => apiOverlayData(
    'https://opendata.arcgis.com/datasets/63996663b8a040438defe56ef7ce31e3_0.geojson',
    'https://opendata.arcgis.com/datasets/0248805ea42145d3b7d7194beafcc3d7_55.geojson',
    'https://opendata.arcgis.com/datasets/91911cd123624a6b9b88cbf4266a2309_4.geojson'
    ), [])

  return (
    <LeafletMap
      center={[33.8, -84.3]}
      zoom={9}
      maxZoom={18}
      attributionControl={true}
      zoomControl={false}
      doubleClickZoom={true}
      scrollWheelZoom={true}
      dragging={true}
      animate={false}
      easeLinearity={0.7}
    >
        <ZoomControl position="topright" />

      { props.data.geojson ?
       <GeoJSONLayer {...props}/> : null }

    <LayersControl position="bottomleft">
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
      <LayersControl.Overlay 
        name="County Boundaries"
        checked='false'>
        { overlayData.overlay_one ?
          <OverlayLayer 
          borderWeight={2}
          borderColor={"black"}
          data={overlayData.overlay_one}/> : null } 
      </LayersControl.Overlay>
      <LayersControl.Overlay 
        name="City Boundaries"
        checked='false'>
        { overlayData.overlay_two ?
          <OverlayLayer 
          borderWeight={1.5}
          borderColor={"white"}
          data={overlayData.overlay_two}/> : null } 
      </LayersControl.Overlay>
      <LayersControl.Overlay 
        name="NPU Boundaries"
        checked='false'>
        { overlayData.overlay_three ?
          <OverlayLayer 
          borderWeight={1.5}
          borderColor={"black"}
          data={overlayData.overlay_three}/> : null } 
      </LayersControl.Overlay>
    </LayersControl>

       
      <TileLayer
      // url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'
      url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
      />
     

    </LeafletMap>

  );
};

export default Map;