// Chart 1: Diverging Bar Chart (Adoption vs Purchasing) with Centered Legend
const spec1 = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "background": null, 
  "data": { "url": "assets/graph_data/Dog_Ownership_Costs.csv", "format": { "type": "csv" } },
  "transform": [
    { "calculate": "datum['Cost Item'] === 'Name Tag' ? 'Name tag' : datum['Cost Item']", "as": "Cost Item" },
    { "calculate": "-datum.Adoption", "as": "Adoption" }, // Rename NegativeAdoption to Adoption
    { "fold": ["Adoption", "Purchasing"], "as": ["Cost Type", "Cost"] } // Fold to create a common field for the color legend
  ],
  "layer": [
    {
      "mark": "bar",
      "encoding": {
        "y": { 
          "field": "Cost Item", 
          "type": "nominal", 
          "sort": [
            "Puppy vaccinations", 
            "Puppy training", 
            "Desexing", 
            "Bed or kennel", 
            "Harnesses", 
            "Preventative treatments", 
            "Food and bowls", 
            "Microchipping", 
            "Name tag", 
            "Toys and treats", 
            "Initial purchase", 
            "Total"
          ], 
          "axis": { "labelAngle": -45, "title": null } 
        },
        "x": { 
          "field": "Cost", 
          "type": "quantitative", 
          "title": "Cost ($)",
          "axis": { 
            "format": "~s"  // Removes the minus sign from axis labels
          }
        },
        "color": {
          "field": "Cost Type", 
          "type": "nominal",
          "scale": {
            "domain": ["Adoption", "Purchasing"],
            "range": ["#c63362", "#599335"] // Colors for Adoption and Purchasing
          },
          "legend": {
            "title": "Cost Type", // Optional: Give a title to the legend
            "orient": "bottom", // Position the legend at the bottom
            "padding": 10, // Add padding between the chart and the legend
            "direction": "horizontal", // Horizontal layout for the legend
            "legendX": 0.5, // Center the legend
            "anchor": "middle" // Align legend to the center
          }
        }
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
  "data": { 
    "url": "assets/graph_data/Euthanasia_Rates.csv", 
    "format": { "type": "csv" } 
  },
  "encoding": { 
    "x": { 
      "field": "Year", 
      "type": "ordinal", 
      "axis": { 
        "labelAngle": -45  // Rotate labels for clarity
      } 
    }
  },
  "layer": [
    { 
      "mark": "line",  // Line for number of euthanised dogs
      "encoding": { 
        "y": { 
          "field": "Euthanasia", 
          "type": "quantitative", 
          "title": "Number of Dogs Euthanised", 
          "axis": { "titleColor": "#ff0000" } 
        }, 
        "color": { "value": "#ff0000" },  // Red line
        "tooltip": [
          { "field": "Year", "type": "ordinal", "title": "Year" },
          { "field": "Euthanasia", "type": "quantitative", "title": "Number of Dogs Euthanised" }
        ]
      } 
    },
    { 
      "mark": "line",  // Line for euthanasia percentage
      "encoding": { 
        "y": { 
          "field": "Percentage", 
          "type": "quantitative", 
          "title": "Euthanasia Percentage (%)", 
          "axis": { "orient": "right", "titleColor": "#ffbaba" } 
        }, 
        "color": { "value": "#ffbaba" },  // Light red line
        "tooltip": [
          { "field": "Year", "type": "ordinal", "title": "Year" },
          { "field": "Percentage", "type": "quantitative", "title": "Euthanasia Percentage (%)" }
        ]
      } 
    },
    // Annotation Line (2013) with Tooltip
    {
      "mark": { 
        "type": "rule", 
        "color": "black", 
        "strokeDash": [6, 4], 
        "tooltip": true  // Tooltip on the rule
      },
      "encoding": {
        "x": { "datum": "2013", "type": "ordinal" },
        "tooltip": {
          "content": "data",
          "value": "Sharp reduction due to regulations like the Dog Regulations 2013 and national initiatives."
        }
      }
    },
    // Annotation Text (2013)
    {
      "mark": { 
        "type": "text", 
        "align": "left", 
        "dx": 5, 
        "dy": -50, 
        "fontSize": 10, 
        "color": "black" 
      },
      "encoding": {
        "x": { "datum": "2013", "type": "ordinal" },
        "text": { "value": "2013: Start of Decline" }
      }
    }
  ],
  "resolve": { 
    "scale": { 
      "y": "independent"  // Separate y-axis for both lines
    } 
  },
  "autosize": { 
    "type": "fit", 
    "contains": "padding" 
  },
  "width": "container",
  "height": 400
};

vegaEmbed('#chart2', spec2, { actions: false });

// Pie Chart 1: Adopted vs Purchased with tooltips
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
    },
    "tooltip": [
      {"field": "Category", "type": "nominal", "title": "Category"},
      {"field": "Percentage", "type": "quantitative", "format": ".1f", "title": "Percentage"}
    ]
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
        "fontSize": 20,
        "fontWeight": "bold"
      },
      "encoding": {
        "radius": {
          "condition": {
            "test": "datum.Percentage == 3.6",  // Move only 3.6% label outside
            "value": 200  // Increased radius for 3.6%
          },
          "value": 100  // Default radius for other labels
        },
        "text": {"field": "Percentage", "type": "quantitative", "format": ".1f"}, 
        "color": {"value": "#000000"}, // Black text for percentage
        "theta": {"field": "Percentage", "type": "quantitative", "stack": true}
      }
    }
  ],
  "view": {"stroke": null} 
};

vegaEmbed('#pie-chart1', pieChart1Spec, { actions: false });

// Pie Chart 2: Percentage of Puppies from Puppy Farms with tooltips
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
        "range": ["#c23e37", "#d6692b"] // Red for Puppy Farm, Orange for Registered Breeder
      },
      "legend": {
        "orient": "bottom",
        "padding": 50,  // Increased padding between chart and legend
        "title": null
      }
    },
    "tooltip": [
      {"field": "Category", "type": "nominal", "title": "Category"},
      {"field": "Percentage", "type": "quantitative", "format": ".1f", "title": "Percentage"}
    ]
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
        "radius": 100,  // Adjust the radius for positioning of the labels
        "fontSize": 20,
        "fontWeight": "bold",
        "fill": "black"  // Set the text color to black
      },
      "encoding": {
        "text": {"field": "Percentage", "type": "quantitative", "format": ".1f"}
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

// Word Cloud for Testimonials with Tooltip
const wordCloudSpec = {
  "$schema": "https://vega.github.io/schema/vega/v5.json",
  "description": "Word cloud based on provided words and their counts with tooltips.",
  "width": 800,
  "height": 400,
  "padding": 0,

  "data": [
    {
      "name": "table",
      "values": [
        "Perfect", "Perfect", "Perfect", "Perfect", "Perfect", "Perfect", "Perfect", "Perfect", "Perfect", "Perfect", "Perfect", "Perfect",
        "Great", "Great", "Great", "Great", "Great", "Great",
        "Best", "Best", "Best", "Best", "Best", "Best",
        "Joy",
        "Healthy", "Healthy",
        "Amazing", "Amazing", "Amazing", "Amazing",
        "Glad", "Glad", "Glad", "Glad",
        "Lovely", "Lovely", "Lovely", "Lovely", "Lovely", "Lovely", "Lovely", "Lovely",
        "Pleasure",
        "Love", "Love", "Love", "Love", "Love", "Love", "Love", "Love", "Love", "Love", "Love", "Love", "Love", "Love", "Love", "Love",
        "Adore", "Adore", "Adore",
        "Happy", "Happy", "Happy", "Happy", "Happy", "Happy",
        "Sweet", "Sweet", "Sweet",
        "Grateful", "Grateful", "Grateful", "Grateful", "Grateful", "Grateful",
        "Delighted", "Delighted", "Delighted",
        "Thrilled",
        "Beautiful", "Beautiful", "Beautiful", "Beautiful", "Beautiful", "Beautiful", "Beautiful", "Beautiful", "Beautiful", "Beautiful", "Beautiful",
        "Fabulous",
        "Gorgeous",
        "Wonderful", "Wonderful",
        "Thankful",
        "Companionship",
        "Family", "Family", "Family", "Family", "Family", "Family", "Family", "Family", "Family", "Family",
        "Loyal",
        "Affectionate", "Affectionate", "Affectionate",
        "Awesome", "Awesome"
      ],
      "transform": [
        {
          "type": "countpattern",
          "field": "data",
          "case": "upper",
          "pattern": "[\\w']{3,}",
          "stopwords": "(i|me|my|myself|we|us|our|ours|ourselves|you|your|yours|yourself|yourselves|he|him|his|himself|she|her|hers|herself|it|its|itself|they|them|their|theirs|themselves|what|which|who|whom|whose|this|that|these|those|am|is|are|was|were|be|been|being|have|has|had|having|do|does|did|doing|will|would|should|can|could|ought|i'm|you're|he's|she's|it's|we're|they're|i've|you've|we've|they've|i'd|you'd|he'd|she'd|we'd|they'd|i'll|you'll|he'll|she'll|we'll|they'll|isn't|aren't|wasn't|weren't|hasn't|haven't|hadn't|doesn't|don't|didn't|won't|wouldn't|shan't|shouldn't|can't|cannot|couldn't|mustn't|let's|that's|who's|what's|here's|there's|when's|where's|why's|how's|a|an|the|and|but|if|or|because|as|until|while|of|at|by|for|with|about|against|between|into|through|during|before|after|above|below|to|from|up|upon|down|in|out|on|off|over|under|again|further|then|once|here|there|when|where|why|how|all|any|both|each|few|more|most|other|some|such|no|nor|not|only|own|same|so|than|too|very|say|says|said|shall)"
        },
        {
          "type": "formula", "as": "angle",
          "expr": "[-45, 0, 45][~~(random() * 3)]"
        },
        {
          "type": "formula", "as": "weight",
          "expr": "if(datum.text=='LOVE', 600, 300)"
        }
      ]
    }
  ],

  "scales": [
    {
      "name": "color",
      "type": "ordinal",
      "domain": {"data": "table", "field": "text"},
      "range": ["#c23e37", "#d6692b", "#599335"]
    }
  ],

  "marks": [
    {
      "type": "text",
      "from": {"data": "table"},
      "encode": {
        "enter": {
          "text": {"field": "text"},
          "align": {"value": "center"},
          "baseline": {"value": "alphabetic"},
          "fill": {"scale": "color", "field": "text"}
        },
        "update": {
          "fillOpacity": {"value": 1},
          "tooltip": {
            "signal": "{'Word': datum.text, 'Occurrences': datum.count}"
          }
        },
        "hover": {
          "fillOpacity": {"value": 0.5}
        }
      },
      "transform": [
        {
          "type": "wordcloud",
          "size": [800, 400],
          "text": {"field": "text"},
          "rotate": {"field": "datum.angle"},
          "font": "Helvetica Neue, Arial",
          "fontSize": {"field": "datum.count"},
          "fontWeight": {"field": "datum.weight"},
          "fontSizeRange": [12, 56],
          "padding": 2
        }
      ]
    }
  ]
};

vegaEmbed('#word-cloud', wordCloudSpec, { actions: false });
