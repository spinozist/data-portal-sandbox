const dataConfig = [
    {
        name: "Race by GA Tracts 2010",
        url: "https://opendata.arcgis.com/datasets/2e73cc4a02a441ba968e6a63a8b526f5_56.geojson",
        defaultVariable: 'nhw_or10',
        defaultSecondVar: 'bl_or10',
        defaultNormalizer: null,
        defaultFilterType: null,
        defaultFilterValue: 'ARC 10',
        defaultHoverID: "13221960100",
        variableOptions: [
            'nhw_or10',
            "aian_or10",
            "asia_or10",
            "bl_or10",
            "hisp_lat10"],
        normalizerOptions: [],
        filterType: [],
        filterValue: [],
        hoverField: 'GEOID10',
        point: false
    },
    {
        name: "Income by ARC Tracts 2016",
        url: "https://opendata.arcgis.com/datasets/b15bc070086f48a5ac8abc4b33b0b464_238.geojson",
        defaultVariable: "Median_HH_income",
        defaultSecondVar: 'Median_HH_Income_2000',
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
        filterValue: [],
        hoverField: 'GEOID10',
        point: false
    },
    {
        name: "Poverty by ARC Zips 2015",
        url: "https://opendata.arcgis.com/datasets/b50e7ea5994e4a57813cadce1ac2618c_318.geojson",
        defaultVariable: 'Percent_Population_in_poverty',
        defaultSecondVar: 'Pct_Pop_under18_in_Poverty',
        defaultNormalizer: null,
        defaultFilterType: null,
        defaultFilterValue: 'ARC 10',
        defaultHoverID: "30306",
        variableOptions: [
            'Percent_Population_in_poverty',
            'Pct_Pop_65older_in_Poverty',
            'Pct_Pop_18_64_Years_in_Poverty',
            'Pct_Pop_under18_in_Poverty'
        ],
        normalizerOptions: [],
        filterType: [],
        filterValue: [],
        hoverField: 'ZIP',
        point: false
    },
    {
        name: "Housing by ARC Tracts 2016",
        url: "https://opendata.arcgis.com/datasets/f0ac98abe8534badb937a249847c29ce_241.geojson",
        defaultVariable: 'Pct_Renter_Occ_Units',
        defaultSecondVar: 'Pct_Owner_Occ_Housing_Units',
        defaultNormalizer: null,
        defaultFilterType: null,
        defaultFilterValue: 'ARC 10',
        defaultHoverID: "13013180401",
        variableOptions: [
            'Pct_Renter_Occ_Units',
            'Pct_Owner_Occ_Housing_Units'

        ],
        normalizerOptions: [],
        filterType: [],
        filterValue: [],
        hoverField: 'GEOID10',
        point: false
    },
    {
        name: "USGS Earthqaukes Daily Feed",
        url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson",
        defaultVariable: 'mag',
        defaultSecondVar: 'dmin',
        defaultNormalizer: null,
        defaultFilterType: 'type',
        defaultFilterValue: 'earthquake',
        defaultHoverID: null,
        variableOptions: [
            'mag',
            'dmin'
        ],
        normalizerOptions: [],
        filterType: [],
        filterValue: [],
        hoverField: "ids",
        point: true
    },    
    {
        name: "Schools CCRPI 2012 to 2017",
        url: "https://opendata.arcgis.com/datasets/c10b2288d959447c94575434fba585b1_252.geojson",
        defaultVariable: 'CCRPI_2017',
        defaultSecondVar: 'CCRPI_2013',
        defaultNormalizer: null,
        defaultFilterType: null,
        defaultFilterValue: 'GRADE_RANGE',
        defaultHoverID: null,
        variableOptions: [
            'CCRPI_2017',
            'CCRPI_2016',
            'CCRPI_2015',
            'CCRPI_2014',
            'CCRPI_2013'
        ],
        normalizerOptions: [],
        filterType: [],
        filterValue: [],
        hoverField: "OBJECTID",
        point: true
    }, 


    // {
    //     name: "School Suspensions 2015 to 2017",
    //     url: "https://opendata.arcgis.com/datasets/58a2c741395743b89528acd952d1964c_254.geojson",
    //     defaultVariable: 'Pct_3plus_Days_OSS_2017',
    //     defaultNormalizer: null,
    //     defaultFilterType: null,
    //     defaultFilterValue: 'ARC 10',
    //     defaultHoverID: "13013180401",
    //     variableOptions: [],
    //     normalizerOptions: [],
    //     filterType: [],
    //     filterValue: []
    // },
    // {
    //     name: "H+T Affordability Type 3",
    //     url: "https://opendata.arcgis.com/datasets/ff2db8857ed040e287f14cba5791a363_184.geojson",
    //     defaultVariable: 'Tp3_HousTranspCosts_Pct_Income',
    //     defaultNormalizer: null,
    //     defaultFilterType: null,
    //     defaultFilterValue: 'ARC 10',
    //     defaultHoverID: "13013180401",
    //     variableOptions: [
    //         'Tp3_HousTranspCosts_Pct_Income',
    //         'Tp3_AnnualVehMilesTraveled'
    //     ],
    //     normalizerOptions: [],
    //     filterType: [],
    //     filterValue: []
    // },



];

export default dataConfig;


// const geojsonURLs = {
//     '2000 Tracts': "https://opendata.arcgis.com/datasets/03137f764f2b4b89b221ce7caf236456_50.geojson",
//     '2010 Tracts' : "https://opendata.arcgis.com/datasets/2e73cc4a02a441ba968e6a63a8b526f5_56.geojson",
//     'Places' : "https://opendata.arcgis.com/datasets/34520575dfc34b8cac783caff702b8cc_58.geojson",
//     'Counties' : "https://opendata.arcgis.com/datasets/dc20713282734a73abe990995de40497_68.geojson",
//   };