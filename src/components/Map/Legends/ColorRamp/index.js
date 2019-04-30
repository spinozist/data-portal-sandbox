import React, { useState, useEffect } from "react";
import { GeoJSON } from 'react-leaflet';
// import API from "../../utils/API";
import colormap from 'colormap';


const ColorRamp = props => {

    const colors = colormap({
        colormap: 'viridis',
        nshades: 10,
        format: 'hex',
        alpha: 1
      }).reverse();

    return (
        colors ? colors.map(color =>
        <div 
        style={{
            float: 'left',
            height: '40px',
            backgroundColor: color,
            width: '10%'        
        }}
        />) : null
    );
};

export default ColorRamp;