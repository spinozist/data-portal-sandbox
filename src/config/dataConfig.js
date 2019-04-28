const dataConfig = [
    // {
    //     name: "Tracts 2000",
    //     url: "https://opendata.arcgis.com/datasets/03137f764f2b4b89b221ce7caf236456_50.geojson",
    //     defaultVariable: 'SQ_MILES',
    //     defaultNormalizer: 'SQ_MILES',
    //     defaultFilterType: null,
    //     defaultFilterValue: 'ARC 10',
    //     variableOptions: [],
    //     normalizerOptions: [],
    //     filterType: [],
    //     filterValue: [] 
    // },
    // {
    //     name: "Tracts 2010",
    //     url: "https://opendata.arcgis.com/datasets/2e73cc4a02a441ba968e6a63a8b526f5_56.geojson",
    //     defaultVariable: 'nhw_or10',
    //     defaultNormalizer: 'totpop10',
    //     defaultFilterType: null,
    //     defaultFilterValue: 'ARC 10',
    //     defaultHoverID: "13221960100",
    //     variableOptions: [
    //         'nhw_or10',
    //         "aian_or10",
    //         "asia_or10",
    //         "bl_or10",
    //         "hisp_lat10"],
    //     normalizerOptions: [],
    //     filterType: [],
    //     filterValue: []
    // },
    {
        name: "Income 2016",
        url: "https://opendata.arcgis.com/datasets/b15bc070086f48a5ac8abc4b33b0b464_238.geojson",
        defaultVariable: "Median_HH_income",
        defaultNormalizer: null,
        defaultFilterType: null,
        defaultFilterValue: 'ARC 10',
        defaultHoverID: "13013180401",
        variableOptions: [
            "Median_HH_income",
            "Median_HH_Income_2000",
            "Pct_HH_income_less_35k",
            "Pct_HH_income_35k_75k",
            "Pct_HH_income_75k_200k",
            "Pct_HH_income_200k_more"  
        ],
        normalizerOptions: [],
        filterType: [],
        filterValue: []
    },



];

export default dataConfig;


// const geojsonURLs = {
//     '2000 Tracts': "https://opendata.arcgis.com/datasets/03137f764f2b4b89b221ce7caf236456_50.geojson",
//     '2010 Tracts' : "https://opendata.arcgis.com/datasets/2e73cc4a02a441ba968e6a63a8b526f5_56.geojson",
//     'Places' : "https://opendata.arcgis.com/datasets/34520575dfc34b8cac783caff702b8cc_58.geojson",
//     'Counties' : "https://opendata.arcgis.com/datasets/dc20713282734a73abe990995de40497_68.geojson",
//   };