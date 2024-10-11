// Chart 1: Diverging Bar Chart (Adoption vs Purchasing)
const spec1 = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "background": null,
    "data": { "url": "Dog_Ownership_Costs.csv", "format": { "type": "csv" } },
    "transform": [{ "calculate": "-datum.Adoption", "as": "NegativeAdoption" }],
    "layer": [
      { 
        "mark": "bar",
        "encoding": { 
          "y": { "field": "Cost Item", "type": "nominal", "axis": { "labelAngle": -45, "title": null } }, 
          "x": { "field": "NegativeAdoption", "type": "quantitative" }, 
          "color": { "value": "#4CAF50" } 
        } 
      },
      { 
        "mark": "bar",
        "encoding": { 
          "y": { "field": "Cost Item", "type": "nominal" }, 
          "x": { "field": "Purchasing", "type": "quantitative" }, 
          "color": { "value": "#FF9800" } 
        } 
      }
    ],
    "autosize": { "type": "fit", "contains": "padding" },
    "width": 500,  // Set fixed width
    "height": 400  // Set fixed height
  };
  vegaEmbed('#chart1', spec1, { actions: false });
  
  // Chart 2: Euthanasia Rates Over Time
  const spec2 = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "background": null,
    "data": { "url": "Euthanasia_Rates.csv", "format": { "type": "csv" } },
    "encoding": { "x": { "field": "Year", "type": "ordinal" } },
    "layer": [
      { 
        "mark": "line",
        "encoding": { 
          "y": { "field": "Euthanasia", "type": "quantitative", "title": "Euthanasia Count", "axis": { "titleColor": "red" } }, 
          "color": { "value": "red" } 
        } 
      },
      { 
        "mark": "line",
        "encoding": { 
          "y": { "field": "Percentage", "type": "quantitative", "title": "Euthanasia Percentage (%)", "axis": { "orient": "right", "titleColor": "blue" } }, 
          "color": { "value": "blue" } 
        } 
      }
    ],
    "resolve": { "scale": { "y": "independent" } },
    "autosize": { "type": "fit", "contains": "padding" },
    "width": 500,  // Set fixed width
    "height": 400  // Set fixed height
  };
  vegaEmbed('#chart2', spec2, { actions: false });
  
  // Chart 3: Proportional Symbol Map (Total Animals Rescued) with Zoom and Pan
  const spec3 = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "background": null,
    "data": { "url": "Graph_Data.csv", "format": { "type": "csv" } },
    "projection": { "type": "mercator" },
    "layer": [
      {
        "data": {
          "url": "vic_localities.json",
          "format": { "type": "topojson", "feature": "vic_localities" }
        },
        "mark": { "type": "geoshape", "fill": "#e0e0e0", "stroke": "white" }
      },
      {
        "mark": {
          "type": "circle",
          "opacity": 0.8,
          "stroke": "black",
          "strokeWidth": 1.5
        },
        "encoding": {
          "longitude": { "field": "Longitude", "type": "quantitative" },
          "latitude": { "field": "Latitude", "type": "quantitative" },
          "size": { "field": "Total Animals", "type": "quantitative" },
          "color": {
            "field": "Total Animals",
            "type": "quantitative",
            "scale": { "scheme": "blues" }
          },
          "tooltip": [
            { "field": "Local Government Municipality", "type": "nominal" },
            { "field": "Total Animals", "type": "quantitative" }
          ]
        }
      }
    ],
    "selection": {
      "grid": {
        "type": "interval", // Enables zooming and panning
        "bind": "scales"    // Links the zooming and panning to the scales
      }
    },
    "autosize": { "type": "fit", "contains": "padding" },
    "width": 870,  // Larger fixed width for the map
    "height": 700  // Larger fixed height for the map
  };
  vegaEmbed('#chart3', spec3, { actions: false });

    