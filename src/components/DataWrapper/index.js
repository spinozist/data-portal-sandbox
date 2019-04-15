import React, { useState, useEffect } from "react";
import Map from "../Map";
import Table from '../Table';
import API from "../../utils/API";
// import Table from '../components/tables';
// import ExampleChart from "../components/charts/ExampleChart"



const DataExplorer = () => {

  const [geography, setGeography] = useState('2010 Tracts');

  const [layoutState, setLayout] = useState({
    mapview: true,
    chartview: false,
    tableview: true,
  })

  const [dataState, setDataState] = useState({
    geojson: null,
    selectedVariable: 'nhw_or10',
    normalizedBy: 'totpop10',
    geographyFilter: 'PLNG_REGIO',
    geographyFilterValue: 'ARC 10',
  });

  const [hoverID, setHoverID] = useState('13083040101');

  const geojsonURLs = {
    '2000 Tracts': "https://opendata.arcgis.com/datasets/03137f764f2b4b89b221ce7caf236456_50.geojson",
    '2010 Tracts' : "https://opendata.arcgis.com/datasets/2e73cc4a02a441ba968e6a63a8b526f5_56.geojson",
    'Places' : "https://opendata.arcgis.com/datasets/34520575dfc34b8cac783caff702b8cc_58.geojson",
    'Counties' : "https://opendata.arcgis.com/datasets/dc20713282734a73abe990995de40497_68.geojson",
  };

  const setData = url => {
    // console.log(url)

    API.getData(url)
      .then(res => {
      // console.log(res.data.features)
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

  // const 

  useEffect(() => {setData(geojsonURLs[geography])}, [geography]); 


  return (
    <div className="jumbotron" id="data-wrapper">
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

    </div>
  )
};

export default DataExplorer;
