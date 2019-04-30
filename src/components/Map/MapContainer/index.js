import React, { useState, useEffect } from 'react';
import { Map as LeafletMap, TileLayer, LayersControl } from 'react-leaflet';
import GeoJSONLayer from '../Layers/GeoJSONLayer';
import OverlayLayer from '../Layers/OverlayLayer';
import API from "../../../utils/API";

const Map = props => {

  const [overlayData, setOverlayData] = useState();
  

  const apiOverlayData = url => {

    API.getData(url)
      .then(res => {
      // console.log(res.data.features)
      setOverlayData(res.data.features)
    })
      .catch(err => console.log(err))
  }

  useEffect(props => apiOverlayData('https://opendata.arcgis.com/datasets/63996663b8a040438defe56ef7ce31e3_0.geojson'), [])
  // useEffect(props => apiOverlayData('https://opendata.arcgis.com/datasets/1da4c7825971437999bf6446c7b94568_36.geojson'), [])

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
        checked='true'>
        { overlayData ?
          <OverlayLayer data={overlayData}/> : null } 
      </LayersControl.Overlay>
    </LayersControl>



        



      { props.data.geojson ?
       <GeoJSONLayer {...props}/> : null }


       
      <TileLayer
      // url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'
      url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
      >

      </TileLayer>
     

    </LeafletMap>

  );
};

export default Map;