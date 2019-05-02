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

  // const [min, setMin] = useState();

  // const [max, setMax] = useState();

  const selectedDefaults = dataConfig.filter(configObject => configObject.name === geography);

  const defaultDataConfig = selectedDefaults[0];

  const [layoutState, setLayout] = useState({
    mapview: true,
    chartview: false,
    tableview: true,
    colorMap: 'viridis',
    numberOfBins: 72,
    colorMapReverse: true
  });


  const [dataState, setDataState] = useState({
    geojson: null,
    selectedVariable: defaultDataConfig.defaultVariable,
    normalizedBy: defaultDataConfig.defaultNormalizer,
    geographyFilter: defaultDataConfig.defaultFilterType,
    geographyFilterValue: defaultDataConfig.defaultFilterValue,
  });

  const [hoverID, setHoverID] = useState(defaultDataConfig.defaultHoverID);

  const flipColorMap = colorMapReverse => {
    setLayout({
      ...layoutState,
      colorMapReverse: colorMapReverse ? false : true
    })
  }


  const setData = dataConfigObject => {
    // console.log(url)
    setHoverID(null);

    API.getData(dataConfigObject.url)
      .then(res => {
      console.log(res.data.features);

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

  // const setMaxMin = data => {

  //   const valueArray = data.geojson ? data.geojson
  //   .filter(feature => feature.properties[data.selectedVariable])
  //   .map(feature => {
    
  //   const variable = feature.properties[data.selectedVariable];
  //   const normalizer=data.normalizedBy ? feature.properties[data.normalizedBy] : 1

  //     return variable/normalizer}) : null;
  //   const maxValue = valueArray !== null ? Math.max(...valueArray) : 'Value array not load yet';
  //   const minValue = valueArray !== null ? Math.min(...valueArray) : 'Value array not load yet';

  //   console.log(maxValue);
  //   console.log(minValue);

  // }

  // const 

  useEffect(() => {setData(defaultDataConfig)}, [geography]);
  // useEffect(() => {setData()})

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
          layoutState={layoutState}
        />
        : null
      }
      {  layoutState.tableview ?
        <Table
          className="table-container"
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
      <ColorRamp
        layoutState={layoutState}
      />
      <button
      style={{
        float: 'left',
        textAlign: 'center',
        fontSize: '1.3em',
        height: '40px',
        width: '10%',
        marginTop: '5px',
        marginLeft: '20px',
        borderRadius: '5px',
        verticalAlign: 'middle',
        backgroundColor: 'lightgrey',
        padding: '2px',
        outline: 'none'
      }}
      onClick={e => flipColorMap(layoutState.colorMapReverse)}
      >
        Flip Colors
      </button>


    </div>
  )
};

export default DataExplorer;
