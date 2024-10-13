// Chart 1: Diverging Bar Chart (Adoption vs Purchasing)
const spec1 = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "background": null, // Transparent background
  "data": { "url": "assets/graph_data/Dog_Ownership_Costs.csv", "format": { "type": "csv" } },
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
  "background": null, // Transparent background
  "data": { "url": "assets/graph_data/Euthanasia_Rates.csv", "format": { "type": "csv" } },
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
  "background": null, // Transparent background
  "data": { "url": "assets/graph_data/Rescues_Per_Municipality.csv", "format": { "type": "csv" } },
  "projection": { "type": "mercator" },
  "layer": [
    {
      "data": {
        "url": "assets/graph_data/vic_localities.json",
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

// Pie Chart 1: Adopted vs Purchased
const pieChart1Spec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "background": null, // Transparent background
  "data": {
    "url": "assets/graph_data/Adopt_Vs_Purchase.csv", // Correct CSV path
    "format": {"type": "csv"}
  },
  "mark": "arc",
  "encoding": {
    "theta": {"field": "Percentage", "type": "quantitative"},
    "color": {"field": "Category", "type": "nominal", "legend": {"title": "Adopt vs Purchase"}}
  }
};
vegaEmbed('#pie-chart1', pieChart1Spec, { actions: false });

// Pie Chart 2: Percentage of Puppies from Puppy Farms
const pieChart2Spec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "background": null, // Transparent background
  "data": {
    "url": "assets/graph_data/Puppy_Farm_Stats.csv", // Correct CSV path
    "format": {"type": "csv"}
  },
  "mark": "arc",
  "encoding": {
    "theta": {"field": "Percentage", "type": "quantitative"},
    "color": {"field": "Category", "type": "nominal", "legend": {"title": "Puppy Farms"}}
  }
};
vegaEmbed('#pie-chart2', pieChart2Spec, { actions: false });

// Word Cloud Chart (Testimonials From Adopters)
const wordCloudSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "data": {
    "url": "assets/graph_data/Word_Cloud.csv",
    "format": { "type": "csv" }
  },
  "mark": {
    "type": "text",
    "tooltip": true
  },
  "encoding": {
    "text": { "field": "Words", "type": "nominal" },
    "size": { "field": "Count", "type": "quantitative", "scale": { "range": [10, 100] } },
    "color": { "value": "#5f9932" },  // Set a fixed color for all words (or use a scheme for varied colors)
    "x": {
      "field": "Words",
      "type": "nominal",
      "axis": null,
      "sort": "random"
    },
    "y": {
      "field": "Words",
      "type": "nominal",
      "axis": null,
      "sort": "random"
    }
  },
  "config": {
    "view": { "stroke": "transparent" } // Remove any border around the word cloud
  },
  "autosize": { "type": "fit", "contains": "padding" },
  "width": 850, // Ensure full width of the container
  "height": 400 // Ensure height matches the container
};
vegaEmbed('#word-cloud', wordCloudSpec, { actions: false });
