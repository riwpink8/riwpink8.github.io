// Chart 1: Diverging Bar Chart (Adoption vs Purchasing)
const spec1 = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "background": null, // Transparent background
  "data": { "url": "assets/graph_data/Dog_Ownership_Costs.csv", "format": { "type": "csv" } },
  "transform": [
    // Rename "Name Tag" to "Name tag"
    { "calculate": "datum['Cost Item'] === 'Name Tag' ? 'Name tag' : datum['Cost Item']", "as": "Cost Item" },
    // Prepare data for divergent bar chart by calculating negative values for Adoption
    { "calculate": "-datum.Adoption", "as": "NegativeAdoption" }
  ],
  "layer": [
    {
      // Layer for Adoption costs (negative side of the chart)
      "mark": "bar",
      "encoding": {
        "y": { 
          "field": "Cost Item", 
          "type": "nominal", 
          "sort": [
            "Initial purchase", 
            "Desexing", 
            "Puppy vaccinations", 
            "Microchipping", 
            "Total", 
            "Name tag"
          ], 
          "axis": { "labelAngle": -45, "title": null } 
        },
        "x": { "field": "NegativeAdoption", "type": "quantitative", "title": "Cost ($)" },
        "color": { "value": "#c63362" } // Purple for Adoption
      }
    },
    {
      // Layer for Purchasing costs (positive side of the chart)
      "mark": "bar",
      "encoding": {
        "y": { 
          "field": "Cost Item", 
          "type": "nominal" 
        },
        "x": { "field": "Purchasing", "type": "quantitative" },
        "color": { "value": "#599335" } // Green for Purchasing
      }
    }
  ],
  "encoding": {
    // Tooltip for both layers
    "tooltip": [
      { "field": "Cost Item", "title": "Cost Item" },
      { "field": "Adoption", "title": "Adoption Cost", "format": "$,.2f" },
      { "field": "Purchasing", "title": "Purchasing Cost", "format": "$,.2f" }
    ]
  },
  "autosize": { "type": "fit", "contains": "padding" },
  "width": 500,
  "height": 400
};

vegaEmbed('#chart1', spec1, { actions: false });

// Chart 2: Euthanasia Rates Over Time with Tooltip and Annotation
const spec2 = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "background": null,
  "data": { 
    "url": "assets/graph_data/Euthanasia_Rates.csv", 
    "format": { "type": "csv" } 
  },
  "encoding": { 
    "x": { 
      "field": "Year", 
      "type": "ordinal", 
      "axis": { 
        "labelAngle": -45 // Rotate the labels diagonally
      } 
    }
  },
  "layer": [
    { 
      "mark": "line",
      "encoding": { 
        "y": { 
          "field": "Euthanasia", 
          "type": "quantitative", 
          "title": "Number of Dogs Euthanised", 
          "axis": { "titleColor": "#ff0000" } 
        }, 
        "color": { "value": "#ff0000" },
        // Tooltip for Euthanasia Numbers
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
        "y": { 
          "field": "Percentage", 
          "type": "quantitative", 
          "title": "Euthanasia Percentage (%)", 
          "axis": { "orient": "right", "titleColor": "#ffbaba" } 
        }, 
        "color": { "value": "#ffbaba" },
        // Tooltip for Euthanasia Percentage
        "tooltip": [
          { "field": "Year", "type": "ordinal", "title": "Year" },
          { "field": "Euthanasia", "type": "quantitative", "title": "Number of Dogs Euthanised" },
          { "field": "Percentage", "type": "quantitative", "title": "Percentage of Total Dogs", "format": ".1f" }
        ]
      } 
    },
    // Annotation Line (2013)
    {
      "mark": {
        "type": "rule", 
        "color": "black",
        "strokeDash": [6, 4], // Dashed line for annotation
        "tooltip": true // Tooltip to explain the annotation
      },
      "encoding": {
        "x": { "datum": "2013", "type": "ordinal" },
        "tooltip": {
          "value": "The sharp reduction in numbers, particularly after 2013, is linked to stricter regulations like the Dog Regulations 2013 in Western Australia, which improved dog welfare standards. National initiatives such as the Australian Animal Welfare Strategy and changes to animal cruelty laws in NSW also contributed to better care, reducing the need for euthanasia due to behavioural and medical issues."
        }
      }
    },
    // Annotation Text (Static)
    {
      "mark": {
        "type": "text",
        "align": "left",
        "dx": 5, // Positioning the text away from the line
        "dy": -50, // Moving the text upwards
        "fontSize": 10, // Set font size for the annotation
        "color": "black"
      },
      "encoding": {
        "x": { "datum": "2013", "type": "ordinal" }, // Annotation for 2013
        "text": { "value": "2013: Start of Decline" }
      }
    }
  ],
  "resolve": { 
    "scale": { "y": "independent" } 
  },
  "autosize": { 
    "type": "fit", 
    "contains": "padding" 
  },
  "width": 500,
  "height": 400
};

vegaEmbed('#chart2', spec2, { actions: false });

// Proportional Symbol Map for Victorian Shelters with Hover-Only Tooltips
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

// Pie Chart 1: Adopted vs Purchased
const pieChart1Spec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "background": null, // Transparent background
  "data": {
    "url": "assets/graph_data/Adopt_Vs_Purchase.csv", // Correct CSV path
    "format": {"type": "csv"}
  },
  "encoding": {
    "theta": {"field": "Percentage", "type": "quantitative", "stack": true},
    "color": {
      "field": "Category",
      "type": "nominal",
      "scale": {
        "domain": ["Adopted", "Purchased"],
        "range": ["#c63362", "#599335"] // Purple for Adopted, Green for Purchased
      },
      "legend": {
        "orient": "right", // Place the legend to the right
        "padding": 30, // Add padding between the chart and the legend
        "title": null // Remove the title from the legend
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
        "radius": 110, // Adjust radius to center the text within the slice
        "fontSize": 14,
        "fontWeight": "bold"
      },
      "encoding": {
        "text": {"field": "Percentage", "type": "quantitative", "format": ".1f"}, // Show percentage labels
        "color": {"value": "#ffffff"}, // Set text color to white for readability
        "theta": {"field": "Percentage", "type": "quantitative", "stack": true}
      }
    }
  ],
  "view": {"stroke": null} // Remove default border around chart
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
  "encoding": {
    "theta": {"field": "Percentage", "type": "quantitative", "stack": true},
    "color": {
      "field": "Category",
      "type": "nominal",
      "scale": {
        "domain": ["Puppy Farm", "Registered Breeder"],
        "range": ["#c23e37", "#d6692b"] // Red for Puppy Farms, Orange for Registered Breeders
      },
      "legend": {
        "orient": "right", // Place the legend to the right
        "padding": 30, // Add padding between the chart and the legend
        "title": null // Remove the title from the legend
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
        "radius": 110, // Adjust radius to center the text within the slice
        "fontSize": 14,
        "fontWeight": "bold"
      },
      "encoding": {
        "text": {"field": "Percentage", "type": "quantitative", "format": ".1f"}, // Show percentage labels
        "color": {"value": "#ffffff"}, // Set text color to white for readability
        "theta": {"field": "Percentage", "type": "quantitative", "stack": true}
      }
    }
  ],
  "view": {"stroke": null} // Remove default border around chart
};
vegaEmbed('#pie-chart2', pieChart2Spec, { actions: false });

// Word Cloud for Testimonials
const wordCloudSpec = {
  "$schema": "https://vega.github.io/schema/vega/v5.json",
  "description": "Word cloud of testimonials from adopters.",
  "width": 850,
  "height": 400,
  "padding": 0,

  "data": {
    "url": "assets/graph_data/Word_Cloud.csv",
    "format": { "type": "csv" }  // Loading the CSV data
  },

  "marks": [
    {
      "type": "text",
      "from": { "data": "table" },
      "encode": {
        "enter": {
          "text": { "field": "Words" },  // Word text
          "align": { "value": "center" },
          "baseline": { "value": "alphabetic" },
          "fill": { "value": "#5f9932" }  // Fixed color
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
          "size": [850, 400],  // Canvas size for the word cloud
          "text": { "field": "Words" },  // Field for the words
          "font": "Helvetica Neue, Arial",
          "fontSize": { "field": "Count" },  // Size based on word count
          "fontSizeRange": [12, 56],  // Size scaling range
          "padding": 2  // Space between words
        }
      ]
    }
  ]
};

vegaEmbed('#word-cloud', wordCloudSpec, { actions: false });
