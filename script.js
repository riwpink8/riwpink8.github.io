// Chart 1: Diverging Bar Chart (Adoption vs Purchasing)
const spec1 = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "background": null, 
  "data": { "url": "assets/graph_data/Dog_Ownership_Costs.csv", "format": { "type": "csv" } },
  "transform": [
    { "calculate": "datum['Cost Item'] === 'Name Tag' ? 'Name tag' : datum['Cost Item']", "as": "Cost Item" },
    { "calculate": "-datum.Adoption", "as": "NegativeAdoption" }
  ],
  "layer": [
    {
      "mark": "bar",
      "encoding": {
        "y": { "field": "Cost Item", "type": "nominal", "sort": ["Initial purchase", "Desexing", "Puppy vaccinations", "Microchipping", "Total", "Name tag"], "axis": { "labelAngle": -45, "title": null } },
        "x": { "field": "NegativeAdoption", "type": "quantitative", "title": "Cost ($)" },
        "color": { "value": "#c63362" }
      }
    },
    {
      "mark": "bar",
      "encoding": {
        "y": { "field": "Cost Item", "type": "nominal" },
        "x": { "field": "Purchasing", "type": "quantitative" },
        "color": { "value": "#599335" }
      }
    }
  ],
  "encoding": {
    "tooltip": [
      { "field": "Cost Item", "title": "Cost Item" },
      { "field": "Adoption", "title": "Adoption Cost", "format": "$,.2f" },
      { "field": "Purchasing", "title": "Purchasing Cost", "format": "$,.2f" }
    ]
  },
  "autosize": { "type": "fit", "contains": "padding" },
  "width": "container",
  "height": 400
};
vegaEmbed('#chart1', spec1, { actions: false });

// Chart 2: Euthanasia Rates Over Time with Tooltip and Annotation
const spec2 = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "background": null,
  "data": { "url": "assets/graph_data/Euthanasia_Rates.csv", "format": { "type": "csv" } },
  "encoding": { "x": { "field": "Year", "type": "ordinal", "axis": { "labelAngle": -45 } } },
  "layer": [
    { 
      "mark": "line",
      "encoding": { 
        "y": { "field": "Euthanasia", "type": "quantitative", "title": "Number of Dogs Euthanised", "axis": { "titleColor": "#ff0000" } }, 
        "color": { "value": "#ff0000" },
        "tooltip": [
          { "field": "Year", "type": "ordinal", "title": "Year" },
          { "field": "Euthanasia", "type": "quantitative", "title": "Number of Dogs Euthanised" },
          { "field": "Percentage", "type": "quantitative", "title": "Percentage of Total Dogs", "format": ".1f" }
        ]
      } 
    },
    { 
      "mark": "line",
      "encoding": { 
        "y": { "field": "Percentage", "type": "quantitative", "title": "Euthanasia Percentage (%)", "axis": { "orient": "right", "titleColor": "#ffbaba" } }, 
        "color": { "value": "#ffbaba" },
        "tooltip": [
          { "field": "Year", "type": "ordinal", "title": "Year" },
          { "field": "Percentage", "type": "quantitative", "title": "Euthanasia Percentage (%)" }
        ]
      } 
    },
    {
      "mark": { "type": "rule", "color": "black", "strokeDash": [6, 4], "tooltip": true },
      "encoding": {
        "x": { "datum": "2013", "type": "ordinal" },
        "tooltip": {
          "value": "Sharp reduction due to regulations like the Dog Regulations 2013 and national initiatives."
        }
      }
    },
    {
      "mark": { "type": "text", "align": "left", "dx": 5, "dy": -50, "fontSize": 10, "color": "black" },
      "encoding": {
        "x": { "datum": "2013", "type": "ordinal" },
        "text": { "value": "2013: Start of Decline" }
      }
    }
  ],
  "resolve": { "scale": { "y": "independent" } },
  "autosize": { "type": "fit", "contains": "padding" },
  "width": "container",
  "height": 400
};
vegaEmbed('#chart2', spec2, { actions: false });

// Pie Chart 1: Adopted vs Purchased with increased padding for legend
const pieChart1Spec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "background": null, 
  "data": {
    "url": "assets/graph_data/Adopt_Vs_Purchase.csv", 
    "format": {"type": "csv"}
  },
  "encoding": {
    "theta": {"field": "Percentage", "type": "quantitative", "stack": true},
    "color": {
      "field": "Category",
      "type": "nominal",
      "scale": {
        "domain": ["Adopted", "Purchased"],
        "range": ["#c63362", "#599335"] 
      },
      "legend": {
        "orient": "bottom", 
        "padding": 50,  // Increased padding between chart and legend
        "title": null 
      }
    }
  },
  "layer": [
    {
      "mark": {
        "type": "arc",
        "outerRadius": 150,
        "padAngle": 0.1,
        "cornerRadius": 10
      }
    },
    {
      "mark": {
        "type": "text",
        "radius": 110, 
        "fontSize": 14,
        "fontWeight": "bold"
      },
      "encoding": {
        "text": {"field": "Percentage", "type": "quantitative", "format": ".1f"}, 
        "color": {"value": "#ffffff"}, 
        "theta": {"field": "Percentage", "type": "quantitative", "stack": true}
      }
    }
  ],
  "view": {"stroke": null} 
};
vegaEmbed('#pie-chart1', pieChart1Spec, { actions: false });

// Pie Chart 2: Percentage of Puppies from Puppy Farms with increased padding for legend
const pieChart2Spec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "background": null, 
  "data": {
    "url": "assets/graph_data/Puppy_Farm_Stats.csv", 
    "format": {"type": "csv"}
  },
  "encoding": {
    "theta": {"field": "Percentage", "type": "quantitative", "stack": true},
    "color": {
      "field": "Category",
      "type": "nominal",
      "scale": {
        "domain": ["Puppy Farm", "Registered Breeder"],
        "range": ["#c23e37", "#d6692b"] 
      },
      "legend": {
        "orient": "bottom", 
        "padding": 50,  // Increased padding between chart and legend
        "title": null 
      }
    }
  },
  "layer": [
    {
      "mark": {
        "type": "arc",
        "outerRadius": 150,
        "padAngle": 0.1,
        "cornerRadius": 10
      }
    },
    {
      "mark": {
        "type": "text",
        "radius": 110, 
        "fontSize": 14,
        "fontWeight": "bold"
      },
      "encoding": {
        "text": {"field": "Percentage", "type": "quantitative", "format": ".1f"}, 
        "color": {"value": "#ffffff"}, 
        "theta": {"field": "Percentage", "type": "quantitative", "stack": true}
      }
    }
  ],
  "view": {"stroke": null} 
};
vegaEmbed('#pie-chart2', pieChart2Spec, { actions: false });

// Proportional Symbol Map for Victorian Shelters with hover-only tooltips and fix for data format
const spec3 = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "background": null,
  "data": {
    "url": "assets/graph_data/Rescues_Per_Municipality.csv",
    "format": { "type": "csv" }
  },
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
        "size": { "field": "Dogs", "type": "quantitative", "title": "Dogs Admitted" },
        "color": {
          "field": "Dogs",
          "type": "quantitative",
          "scale": { "scheme": "purples" }
        },
        "tooltip": [
          { "field": "Trading name", "title": "Shelter Name", "type": "nominal" },
          { "field": "Dogs", "title": "Dogs Admitted", "type": "quantitative" }
        ]
      }
    }
  ],
  "selection": {
    "grid": {
      "type": "interval",
      "bind": "scales"
    }
  },
  "autosize": { "type": "fit", "contains": "padding" },
  "width": 870,
  "height": 700
};
vegaEmbed('#chart3', spec3, { actions: false });

// Word Cloud for Testimonials
const wordCloudSpec = {
  "$schema": "https://vega.github.io/schema/vega/v5.json",
  "description": "Word cloud of testimonials from adopters.",
  "width": 850,
  "height": 400,
  "padding": 0,
  "data": {
    "url": "assets/graph_data/Word_Cloud.csv",
    "format": { "type": "csv" }  
  },
  "marks": [
    {
      "type": "text",
      "encode": {
        "enter": {
          "text": { "field": "Words" },  
          "align": { "value": "center" },
          "baseline": { "value": "alphabetic" },
          "fill": { "value": "#5f9932" }  
        },
        "update": {
          "fillOpacity": { "value": 1 }
        },
        "hover": {
          "fillOpacity": { "value": 0.7 }
        }
      },
      "transform": [
        {
          "type": "wordcloud",
          "size": [850, 400],  
          "text": { "field": "Words" },  
          "font": "Helvetica Neue, Arial",
          "fontSize": { "field": "Count" },  
          "fontSizeRange": [12, 56],  
          "padding": 2  
        }
      ]
    }
  ]
};
vegaEmbed('#word-cloud', wordCloudSpec, { actions: false });
