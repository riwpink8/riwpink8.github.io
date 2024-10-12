// Chart 1: Diverging Bar Chart (Adoption vs Purchasing)
const spec1 = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "background": null,
    "data": { "url": "graph_data/Dog_Ownership_Costs.csv", "format": { "type": "csv" } },
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
    "data": { "url": "graph_data/Euthanasia_Rates.csv", "format": { "type": "csv" } },
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
    "data": { "url": "graph_data/Rescues_Per_Municipality.csv", "format": { "type": "csv" } },
    "projection": { "type": "mercator" },
    "layer": [
      {
        "data": {
          "url": "graph_data/vic_localities.json",
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

// Chart 4: Adoption Success Rates
const spec4 = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "background": null,
  "data": { "url": "graph_data/(Sample)Adoption_Success_Rates.csv", "format": { "type": "csv" } },
  "mark": "line",
  "encoding": {
    "x": { "field": "Year", "type": "ordinal" },
    "y": { "field": "Success Rate", "type": "quantitative", "title": "Success Rate (%)" },
    "color": { "value": "#4CAF50" }
  },
  "autosize": { "type": "fit", "contains": "padding" },
  "width": 480,
  "height": 350
};
vegaEmbed('#chart4', spec4, { actions: false });

// Chart 5: Animal Types in Shelters (Pie Chart)
const spec5 = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "background": null,
  "data": { "url": "graph_data/(Sample)Animal_Types_in_Shelters.csv", "format": { "type": "csv" } },
  "mark": "arc",
  "encoding": {
    "theta": { "field": "Count", "type": "quantitative" },
    "color": { "field": "Animal Type", "type": "nominal" },
    "tooltip": [{ "field": "Animal Type" }, { "field": "Count" }]
  },
  "autosize": { "type": "fit", "contains": "padding" },
  "width": 480,
  "height": 350
};
vegaEmbed('#chart5', spec5, { actions: false });

// Chart 6: Rescue Trends
const spec6 = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "background": null,
  "data": { "url": "graph_data/(Sample)Rescue_Trends.csv", "format": { "type": "csv" } },
  "mark": "bar",
  "encoding": {
    "x": { "field": "Year", "type": "ordinal" },
    "y": { "field": "Animals Rescued", "type": "quantitative" }
  },
  "autosize": { "type": "fit", "contains": "padding" },
  "width": 480,
  "height": 350
};
vegaEmbed('#chart6', spec6, { actions: false });

// Chart 7: Animals Rehabilitated
const spec7 = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "background": null,
  "data": { "url": "graph_data/(Sample)Animals_Rehabilitated.csv", "format": { "type": "csv" } },
  "mark": "line",
  "encoding": {
    "x": { "field": "Year", "type": "ordinal" },
    "y": { "field": "Rehabilitation Rate", "type": "quantitative", "title": "Rehabilitation Rate (%)" },
    "color": { "value": "#FF9800" }
  },
  "autosize": { "type": "fit", "contains": "padding" },
  "width": 480,
  "height": 350
};
vegaEmbed('#chart7', spec7, { actions: false });

// Chart 8: Adoption Wait Time
const spec8 = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "background": null,
  "data": { "url": "graph_data/(Sample)Adoption_Wait_Time.csv", "format": { "type": "csv" } },
  "mark": "bar",
  "encoding": {
    "x": { "field": "Animal Type", "type": "nominal" },
    "y": { "field": "Wait Time (Weeks)", "type": "quantitative" }
  },
  "autosize": { "type": "fit", "contains": "padding" },
  "width": 480,
  "height": 350
};
vegaEmbed('#chart8', spec8, { actions: false });

// Chart 9: Adoption Cost Breakdown (Stacked Bar)
const spec9 = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "background": null,
  "data": {
    "url": "graph_data/(Sample)Adoption_Cost_Breakdown.csv", // Ensure the correct file path
    "format": { "type": "csv" }
  },
  "mark": "bar",
  "encoding": {
    "x": {
      "field": "Animal Type", // X-axis represents the animal type
      "type": "nominal",
      "axis": { "title": "Animal Type" }
    },
    "y": {
      "field": "Cost", // Y-axis represents the total cost
      "type": "quantitative",
      "axis": { "title": "Cost ($)" }
    },
    "color": {
      "field": "Cost Type", // Color encodes the cost type (Medical, Shelter Fee, Supplies)
      "type": "nominal",
      "scale": { "scheme": "category10" },
      "legend": { "title": "Cost Type" }
    }
  },
  "autosize": { "type": "fit", "contains": "padding" },
  "width": 480,
  "height": 350
};
vegaEmbed('#chart9', spec9, { actions: false });

// Chart 10: Animal Population Growth
const spec10 = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "background": null,
  "data": { "url": "graph_data/(Sample)Animal_Population_Growth.csv", "format": { "type": "csv" } },
  "mark": "line",
  "encoding": {
    "x": { "field": "Year", "type": "ordinal" },
    "y": { "field": "Population", "type": "quantitative", "title": "Animal Population" }
  },
  "autosize": { "type": "fit", "contains": "padding" },
  "width": 480,
  "height": 350
};
vegaEmbed('#chart10', spec10, { actions: false });