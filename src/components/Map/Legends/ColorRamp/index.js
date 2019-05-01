import React, { useState, useEffect } from "react";
import { GeoJSON } from 'react-leaflet';
// import API from "../../utils/API";
import colormap from 'colormap';


const ColorRamp = props => {

    const numberOfBins = 10;

    const colors = colormap({
        colormap: 'viridis',
        nshades: numberOfBins,
        format: 'hex',
        alpha: 1
      }).reverse();

    const binWidthRatio = 60/numberOfBins;
    const binWidth = String(binWidthRatio) + "%";
    // console.log(binWidth);

    return (
        colors ? colors.map(color =>
        <div 
        style={{
            float: 'left',
            height: '40px',
            backgroundColor: color,
            width: binWidth,
            marginTop: '5px',
        }}
        />) : null
    );
};

export default ColorRamp;