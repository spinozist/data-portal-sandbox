import React from "react";
// import API from "../../utils/API";
import colormap from 'colormap';

const legendWidth = 41;

const ColorRamp = props => {

    const numberOfBins = props.layoutState.numberOfBins;
    const colorMap = props.layoutState.colorMap;
    const reverse = props.layoutState.colorMapReverse;

    const colors = reverse ? colormap({
        colormap: colorMap,
        nshades: numberOfBins,
        format: 'hex',
        alpha: 1
      }).reverse() : colormap({
        colormap: colorMap,
        nshades: numberOfBins,
        format: 'hex',
        alpha: 1
      });

    const binWidthRatio = legendWidth/numberOfBins;
    const binWidth = String(binWidthRatio) + "%";
    // console.log(binWidth);

    return (
        colors ? colors.map(color =>
        <div 
        style={{
            float: 'left',
            height: '5%',
            backgroundColor: color,
            width: binWidth,
            marginTop: '5px',
        }}
        />) : null
    );
};

export default ColorRamp;