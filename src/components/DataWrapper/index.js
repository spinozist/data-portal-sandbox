import React, { useState, useEffect } from "react";
import GeoSelector from "../GeoSelector";
import VarSelector from "../VarSelector";
import Map from "../Map/MapContainer";
import Table from '../Table';
import ExampleChart from '../Charts/Example'
import API from "../../utils/API";
import dataConfig from "../../config/dataConfig";
import ColorRamp from "../Map/Legends/ColorRamp";
import './style.css';




const DataExplorer = props => {

  const geoOptions = dataConfig.map(configObject => configObject.name);

  // console.log(geoOptions);

  const [geography, setGeography] = useState(geoOptions[0]);

  const selectedDefaults = dataConfig.filter(configObject => configObject.name === geography);

  const defaultDataConfig = selectedDefaults[0];

  const [layoutState, setLayout] = useState({
    mapview: true,
    chartview: false,
    tableview: true,
  });


  const [dataState, setDataState] = useState({
    geojson: null,
    selectedVariable: defaultDataConfig.defaultVariable,
    normalizedBy: defaultDataConfig.defaultNormalizer,
    geographyFilter: defaultDataConfig.defaultFilterType,
    geographyFilterValue: defaultDataConfig.defaultFilterValue,
  });

  const [hoverID, setHoverID] = useState(defaultDataConfig.defaultHoverID);


  const setData = dataConfigObject => {
    // console.log(url)
    setHoverID(null);

    API.getData(dataConfigObject.url)
      .then(res => {
      // console.log(res.data.features)
      setDataState( {
        // ...dataState,
        // pass other data config values here insteade of dataState
        geography: geography,
        geojson: res.data.features,
        selectedVariable: dataConfigObject.defaultVariable,
        normalizedBy: dataConfigObject.defaultNormalizer,
        geographyFilter: dataConfigObject.defaultFilterType,
        geographyFilterValue: dataConfigObject.defaultFilterValue,
        hoverField: defaultDataConfig.hoverField
     
      })
    })
      .catch(err => console.log(err))
  }

  const handleHover = featureID => {
    // console.log(featureID)
    setHoverID(featureID);
  }

  const handleGeoChange = geoName => {
    console.log(geoName);
    setGeography(geoName);
    console.log(geography);
  }

  const handleVarChange = selectedVar => {
    console.log(selectedVar);
    setDataState({
      ...dataState,
      selectedVariable: selectedVar
    })
    // setGeography(geoName);
    // console.log(geography);
  }

  // const 

  useEffect(() => {setData(defaultDataConfig)}, [geography]);


  return (
    <div className="data-wrapper" id="data-wrapper">
      <div className="data-selector">
        <div id="geo-selector">
        <GeoSelector
          currentGeo={geography}
          handleGeoChange={handleGeoChange} />
        </div>
        <VarSelector
          currentSelection={dataState.selectedVariable}
          selectedGeo={geography}
          handleVarChange={handleVarChange} />
      </div>
      <div id="banner">Data ARC</div>
      {  layoutState.mapview ?
        <Map
          handleHoverID={handleHover}
          data={dataState}
        />
        : null
      }
      {  layoutState.tableview ?
        <Table
          hoverID={hoverID} 
          data={dataState}
        />
        : null
      }
      {  layoutState.chartview ?
        <ExampleChart
          hoverID={hoverID} 
          data={dataState}
        />
        : null
      }
      <ColorRamp />


    </div>
  )
};

export default DataExplorer;
