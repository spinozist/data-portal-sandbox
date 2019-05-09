import React, { useState, useEffect } from "react";
import { Navbar, Button, Container, Row, Col, Dropdown } from 'react-bootstrap';
import { TiChartArea, TiChartBar } from 'react-icons/ti';
import { MdGrain, MdCompareArrows } from 'react-icons/md';
// import GeoSelector from "../GeoSelector";
import VarSelector from "../VarSelector";
import Map from "../Map/MapContainer";
import Table from '../Table';
import ScatterPlot from '../Charts/ScatterPlot';
import SimpleBarChart from '../Charts/BarChart';
import AreaChart from '../Charts/AreaChart';
import API from "../../utils/API";
import ColorMapObject from "../../utils/ColorMapObject";
import dataConfig from "../../config/dataConfig";
import ColorRamp from "../Map/Legends/ColorRamp";
import './style.css';




const DataExplorer = props => {

  const geoOptions = dataConfig.map(configObject => configObject.name);

  // console.log(geoOptions);

  const colorList = Object.keys(ColorMapObject);

  const [geography, setGeography] = useState(geoOptions[1]);

  // const [min, setMin] = useState();

  // const [max, setMax] = useState();

  const selectedDefaults = dataConfig.filter(configObject => configObject.name === geography);

  const defaultDataConfig = selectedDefaults[0];

  const [layoutState, setLayout] = useState({
    mapview: true,
    chartview: true,
    tableview: true,
    colorMap: 'viridis',
    numberOfBins: 72,
    colorMapReverse: false,
    chartType: 'simple-bar-chart',
    colorOpacity: .7
  });


  const [dataState, setDataState] = useState({
    geojson: null,
  });

  const [hoverID, setHoverID] = useState(defaultDataConfig.defaultHoverID);

  const flipColorMap = colorMapReverse => {
    setLayout({
      ...layoutState,
      colorMapReverse: colorMapReverse ? false : true
    })
  }

  const changeChartType = chartType => {
    setLayout({
      ...layoutState,
      chartType: chartType
    })
  }


  const setData = dataConfigObject => {
    // console.log(url)


    API.getData(dataConfigObject.url)
      .then(res => {
      console.log(res.data.features);

      setHoverID(null);

      setDataState( {
        // ...dataState,
        // pass other data config values here insteade of dataState
        geography: geography,
        geojson: res.data.features,
        selectedVariable: dataConfigObject.defaultVariable,
        selectedSecondVar: dataConfigObject.defaultSecondVar,
        normalizedBy: dataConfigObject.defaultNormalizer,
        geographyFilter: dataConfigObject.defaultFilterType,
        geographyFilterValue: dataConfigObject.defaultFilterValue,
        hoverField: dataConfigObject.hoverField,
        point: dataConfigObject.point
      });
    })
      .catch(err => console.log(err));
  }

  const handleHover = featureID => {
    // console.log(featureID)
    setHoverID(featureID);
  }

  const handleGeoChange = geoName => {
    // setGeography(null);
    // console.log(geoName);
    setGeography(geoName);
    // console.log(geography);
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

  const changeColorRamp = colorRampName => {
    setLayout({
    ...layoutState,
    colorMap: colorRampName
    })
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
  // const [loading, setLoadState ] = useState(true);

  useEffect(() => {setData(defaultDataConfig)}, [geography]);

  return (
    <Container fluid className="data-wrapper" id="data-wrapper">
      <div className="data-selector">
        <div style={{
          position: 'relative',
          bottom: '-10px',
          marginLeft: '3%',
          marginRight: '4%',
          width: '40%',
          height: '100%', 
          float: 'left',
          textAlign: 'center',
          backgroundColor: 'black',
          color: 'white',
          padding: '20px',
          borderRadius: '10px 10px 0 0',
          
        }}>
          {geography ? <h4>{geography}</h4> : null}
          <Dropdown style={{ float: 'center', marginTop: '15px'}}>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          Change Category
        </Dropdown.Toggle>

        <Dropdown.Menu
          style={{
            overflow: 'scroll',
            maxHeight: '30vh'
          }}>
          {  dataConfig.map(dataObject => 
            <Dropdown.Item
              style={{
                backgroundColor: dataObject.name === geography ? 'black' : null,
                color: dataObject.name === geography ? 'white' : null,
                marginLeft: '2%'
              }} 
              value={dataObject.name} 
              onClick={e => handleGeoChange(dataObject.name)}
            >
              {dataObject.name}
            </Dropdown.Item>
          )
          }
          {/* <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
          </Dropdown.Menu>
        </Dropdown>

        </div>
        <VarSelector
          currentSelection={dataState.selectedVariable}
          selectedGeo={geography}
          handleVarChange={handleVarChange}
          layoutState={layoutState} />
      </div>
      <div id="banner">Data ARC</div>
      {  layoutState.mapview ?
        <Map
          handleHoverID={handleHover}
          data={dataState}
          layoutState={layoutState}
          hoverID={hoverID}
          // loading={loading}
        />
        : null
      }
      {  layoutState.tableview ?
        <Table
          className="table-container"
          hoverID={hoverID} 
          data={dataState}
          layoutState={layoutState}
        />
        : null
      }
      {  layoutState.chartview && layoutState.chartType === 'scatterplot' ?
        <ScatterPlot
          hoverID={hoverID} 
          data={dataState}
          layoutState={layoutState}
          handleHoverID={handleHover}
        />
        : null
      }
      {  layoutState.chartview && layoutState.chartType === 'simple-bar-chart' ?
        <SimpleBarChart
          hoverID={hoverID} 
          data={dataState}
          layoutState={layoutState}
          handleHoverID={handleHover}

        />
        : null
      }
      {  layoutState.chartview && layoutState.chartType === 'area-chart' ?
        <AreaChart
          hoverID={hoverID} 
          data={dataState}
          layoutState={layoutState}
          handleHoverID={handleHover}

        />
        : null
      }

      {/* Color Ramp and Controls */}

      <MdCompareArrows
      style={{
        float: 'left',
        textAlign: 'center',
        fontSize: '1.3em',
        height: '5%',
        width: '5%',
        marginTop: '5px',
        marginRight: '10px',
        borderRadius: '5px',
        verticalAlign: 'middle',
        backgroundColor: 'lightgrey',
        padding: '2px',
        outline: 'none'
      }}
      onClick={e => flipColorMap(layoutState.colorMapReverse)}
      />
      <ColorRamp
        layoutState={layoutState}
      />
      <Dropdown style={{ float: 'left', padding: '10px' }}>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic" >
          Change Color Ramp
        </Dropdown.Toggle>
        <Dropdown.Menu
          style={{
            overflow: 'scroll',
            maxHeight: '30vh',
          }}>
          {  colorList.map(colorName => 
            <Dropdown.Item
              style={{
                backgroundColor: colorName === layoutState.colorMap ? 'black' : null,
                color: colorName === layoutState.colorMap ? 'white' : null,
              }} 
              value={colorName} 
              onClick={e => changeColorRamp(colorName)}
            >
              {colorName}
            </Dropdown.Item>
          )
          }
          {/* <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
        </Dropdown.Menu>
      </Dropdown>

      {/* Icons */}

      <MdGrain
      id={layoutState.chartType === 'scatterplot' ? 'active-chart-button' : null }
      style={{
        color: layoutState.chartType === 'scatterplot' ? 'white' : null,
        // borderColor: layoutState.chartType === 'scatterplot' ? 'rgb(0, 255, 213)' : null,
        // borderWidth: layoutState.chartType === 'scatterplot' ? '6px' : null,
        float: 'left',
        textAlign: 'center',
        fontSize: '1.3em',
        height: '5%',
        width: '5%',
        marginTop: '5px',
        marginLeft: '13%',
        borderRadius: '5px',
        verticalAlign: 'middle',
        backgroundColor: layoutState.chartType === 'scatterplot' ? 'black' : 'lightgrey' ,
        padding: '2px',
        outline: 'none'
      }}
      onClick={e => changeChartType('scatterplot')}
      />
      <TiChartBar
      style={{
        color: layoutState.chartType === 'simple-bar-chart' ? 'white' : null,
        float: 'left',
        // borderColor: layoutState.chartType === 'simple-bar-chart' ? 'rgb(0, 255, 213)' : null,
        // borderWidth: layoutState.chartType === 'simple-bar-chart' ? '6px' : null,
        textAlign: 'center',
        fontSize: '1.3em',
        height: '5%',
        width: '5%',
        marginTop: '5px',
        marginLeft: '1%',
        borderRadius: '5px',
        verticalAlign: 'middle',
        backgroundColor: layoutState.chartType === 'simple-bar-chart' ? 'black' : 'lightgrey' ,
        padding: '2px',
        outline: 'none'
      }}
      onClick={e => changeChartType('simple-bar-chart')}
      />
      <TiChartArea
      style={{
        color: layoutState.chartType === 'area-chart' ? 'white' : null,
        float: 'left',
        // borderColor: layoutState.chartType === 'area-chart' ? 'rgb(0, 255, 213)' : null,
        // borderWidth: layoutState.chartType === 'area-chart' ? '6px' : null,
        textAlign: 'center',
        fontSize: '1.3em',
        height: '5%',
        width: '5%',
        marginTop: '5px',
        marginLeft: '1%',
        borderRadius: '5px',
        verticalAlign: 'middle',
        backgroundColor: layoutState.chartType === 'area-chart' ? 'black' : 'lightgrey' ,
        padding: '2px',
        outline: 'none'
      }}
      onClick={e => changeChartType('area-chart')}
      />



    </Container>
  )
};

export default DataExplorer;
