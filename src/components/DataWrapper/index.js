import React, { useState, useEffect } from "react";
import GeoSelector from "../GeoSelector";
import VarSelector from "../VarSelector";
import Map from "../Map";
import Table from '../Table';
import ExampleChart from '../Charts/Example'
import API from "../../utils/API";
import dataConfig from "../../config/dataConfig";
import './style.css';



const DataExplorer = props => {

  const geoOptions = dataConfig.map(configObject => configObject.name);

  console.log(geoOptions);

  const [geography, setGeography] = useState(geoOptions[0]);

  const selectedDefaults = dataConfig.filter(configObject => configObject.name === geography);

  const defaultState = selectedDefaults[0];

  const [layoutState, setLayout] = useState({
    mapview: true,
    chartview: false,
    tableview: true,
  });


  const [dataState, setDataState] = useState({
    geojson: null,
    selectedVariable: defaultState.defaultVariable,
    normalizedBy: defaultState.defaultNormalizer,
    geographyFilter: defaultState.defaultFilterType,
    geographyFilterValue: defaultState.defaultFilterType,
  });

  const [hoverID, setHoverID] = useState(selectedDefaults[0].defaultHoverID);


  const setData = url => {
    // console.log(url)

    API.getData(url)
      .then(res => {
      console.log(res.data.features)
      setDataState( {
        ...dataState,
        geojson: res.data.features 
      })
    })
      .catch(err => console.log(err))
  }

  const handleHover = featureID => {
    console.log(featureID)
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

  useEffect(() => {setData(selectedDefaults[0].url)}, [geography]); 


  return (
    <div className="data-wrapper" id="data-wrapper">
      <div className="data-selector">
        <GeoSelector
          handleGeoChange={handleGeoChange} />
        <VarSelector
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

    </div>
  )
};

export default DataExplorer;
