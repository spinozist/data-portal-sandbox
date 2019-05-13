import React, { useState, useEffect } from "react";
import { Container, Dropdown } from 'react-bootstrap';
import { TiChartBar } from 'react-icons/ti';
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
import numeral from 'numeral';
import './style.css';




const DataExplorer = props => {

  const geoOptions = dataConfig.map(configObject => configObject.name);

  const colorList = Object.keys(ColorMapObject);

  const [geography, setGeography] = useState(geoOptions[1]);

  const selectedDefaults = dataConfig.filter(configObject => configObject.name === geography);

  const defaultDataConfig = selectedDefaults[0];

  const [layoutState, setLayout] = useState({
    mapview: true,
    chartview: true,
    tableview: true,
    colorMap: 'viridis',
    numberOfBins: 72,
    colorMapReverse: false,
    chartType: 'scatterplot',
    colorOpacity: .7
  });

  const [legendLabel, setLegendLabel] = useState({
    minValue: null,
    maxValue: null,
  });


  const [dataState, setDataState] = useState({
    geojson: null,
  });

  const [hoverID, setHoverID] = useState(null);

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

  const changeLegendLabel = data => {

    const valueArray = data.geojson ? data.geojson
    .filter(feature => feature.properties[data.selectedVariable])
    .map(feature => {
    
    const variable = feature.properties[data.selectedVariable];
    const normalizer=data.normalizedBy ? feature.properties[data.normalizedBy] : 1

      return variable/normalizer}) : null;
    const maxValue = valueArray !== null ? Math.max(...valueArray) : null;
    const minValue = valueArray !== null ? Math.min(...valueArray) : null;

    setLegendLabel({
      minValue: minValue,
      maxValue: maxValue,
    })
  }

  const setData = dataConfigObject => {

    API.getData(dataConfigObject.url)
      .then(res => {

      setHoverID(null);

      setDataState( {
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
    }).catch(err => console.log(err));
  }

  const handleHover = featureID => {
    setHoverID(featureID);
  }

  const handleGeoChange = geoName => {
    setGeography(geoName);
  }

  const handleVarChange = selectedVar => {
    setDataState({
      ...dataState,
      selectedVariable: selectedVar
    })
  }

  const handleSecVarChange = selectedVar => {
    // console.log(selectedVar);
    setDataState({
      ...dataState,
      selectedSecondVar: selectedVar
    })
  }

  //  Rewrite for scatter plot only

  // const animateData = (duration, incrementArray) => {
    
  //   let incrementIndex = 0;

  //   setInterval(() => {

  //     incrementIndex < incrementArray.length ?

  //       setDataState({
  //         ...dataState,
  //         selectedVariable: incrementArray[incrementIndex]
  //       }) 
        
  //       : incrementIndex = -1;

  //     incrementIndex++
  //   }, duration) 
  // }  

  // For Fun :)

  // const flicker = () => {
  //   setInterval(() => {
  //     setLayout({
  //     ...layoutState,
  //     colorOpacity: Math.random()
  //   })}, 50);
  //   setTimeout(() => clearInterval(), 1000);
  // }

  const changeColorRamp = colorRampName => {
    setLayout({
    ...layoutState,
    colorMap: colorRampName
    })
  }

  useEffect(() => setData(defaultDataConfig), [geography]);
  useEffect(() => changeLegendLabel(dataState), [dataState.selectedVariable]);

  return (
    <Container
      key={'main-container' + Date} 
      fluid 
      className="data-wrapper" 
      id="data-wrapper">
      <div 
        key="data-selector"
        className="data-selector">
        <div 
          style={{
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

        <Dropdown 
          key={'bs-category-dropdown'}
          style={{ 
            float: 'center', 
            marginTop: '15px'
            }}
        >
          
          <Dropdown.Toggle 
            key={'bs-cat-dropdown-toggle'}
            variant="secondary" 
            className="category-dropdown" 
            id="dropdown-basic">
            Change Data Category
          </Dropdown.Toggle>

          <Dropdown.Menu
            key={'bs-cat-dropdown-menu'}
            style={{
              overflow: 'scroll',
              maxHeight: '30vh'
            }}>

            {  dataConfig.map(dataObject => 
            <Dropdown.Item
              key={'bs-cat-dropdown-item' + dataObject.name}
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
            )}

          </Dropdown.Menu>

        </Dropdown>

      </div>
        <VarSelector
          key={'var-selector'}
          currentSelection={dataState.selectedVariable}
          selectedGeo={geography}
          handleVarChange={handleVarChange}
          layoutState={layoutState} />
      </div>

      <div id="banner">Data ARC</div>

      {  layoutState.mapview ?
        <Map
          key={"map-comp"}
          handleHoverID={handleHover}
          data={dataState}
          layoutState={layoutState}
          hoverID={hoverID}
          changeLegendLabel={changeLegendLabel}
        />
        : null
      }

      {  layoutState.tableview ?
        <Table
          key={"table-comp"}
          className="table-container"
          hoverID={hoverID} 
          data={dataState}
          layoutState={layoutState}
        />
        : null
      }

      {  layoutState.chartview && layoutState.chartType === 'scatterplot' ?
        <ScatterPlot
          key={'scatterplot'}
          hoverID={hoverID} 
          data={dataState}
          layoutState={layoutState}
          handleHoverID={handleHover}
          handleSecVarChange={handleSecVarChange}
        />
        : null
      }

      {  layoutState.chartview && layoutState.chartType === 'simple-bar-chart' ?
        <SimpleBarChart
          key={'simple-bar-chart'}
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
        </Dropdown.Menu>
      </Dropdown>

      <div 
        className="legend-value-label" 
        id="min-value-label"
        style={{
          float: 'left',
          height: '45px',
          width: "5%",
          textAlign: 'center',
          fontSize: '1.2em',
          paddingTop: '8px',
          // paddingRight: '5px',
          backgroundColor: 'black',
          marginTop: '5px',
          borderRadius: '5px 0 0 5px'
      }}>
      { 
        typeof legendLabel.minValue === 'number' ? 
          legendLabel.minValue % 1 !== 0 ? 
          numeral(legendLabel.minValue).format('0,0.00') 
          : numeral(legendLabel.minValue).format('0,0')
          : legendLabel.minValue
      }
      </div>

      <ColorRamp
        layoutState={layoutState}
        legendLabel={legendLabel}
      />

      <div 
        className="legend-value-label" 
        id="max-value-label"
        style={{
          float: 'left',
          height: '45px',
          width: "5%",
          textAlign: 'center',
          fontSize: '1.2em',
          paddingTop: '8px',
          // paddingLeft: '10px',
          backgroundColor: 'black',
          marginTop: '5px',
          borderRadius: '0 5px 5px 0'

      }}>
      { 
        typeof legendLabel.maxValue === 'number' ? 
          legendLabel.maxValue % 1 !== 0 ? 
          numeral(legendLabel.maxValue).format('0,0.00') 
          : numeral(legendLabel.maxValue).format('0,0')
          : legendLabel.maxValue
      }
      </div>

      <MdCompareArrows
      style={{
        float: 'left',
        textAlign: 'center',
        fontSize: '1.3em',
        height: '40px',
        width: '4%',
        marginTop: '10px',
        marginLeft: '10px',
        borderRadius: '5px',
        verticalAlign: 'middle',
        backgroundColor: 'lightgrey',
        padding: '2px',
        outline: 'none'
      }}
      onClick={e => flipColorMap(layoutState.colorMapReverse)}
      />

      {/* Chart Icons */}

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
        marginLeft: '30%',
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
      {/* <TiChartArea
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
      onClick={e => animateData(1000, defaultDataConfig.variableOptions)}
      onClick={e => changeChartType('area-chart')}
      /> */}

    </Container>
  )
};

export default DataExplorer;
