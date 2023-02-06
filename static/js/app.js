
// This was the correct pull for the data 
function buildMetadata(sample) {
  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
    
    let metadata = data.metadata;
    let resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    let result = resultArray[0];
    let panelBox = d3.select("#sample-metadata").html("");

    for (key in result){
      panelBox.append("h6").text(`${key.toUpperCase()}: ${result[key]}`);
    };
  });
};

function buildCharts(sample) {
  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
    let samples = data.samples;
    let resultsArray = samples.filter(sampleObj => sampleObj.id == sample);
    let result = resultsArray[0];

    let otu_ids = result.otu_ids;
    let otu_labels = result.otu_labels;
    let sample_values = result.sample_values;

    // Horiz. Bar Chart 
    let yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    let barData = [{
      y: yticks,
      x: sample_values.slice(0, 10).reverse(),
      text: otu_labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: 'h',
    }];

    let barLayout = {
      margin: { t: 50, l: 100 },
      title: "Sample's Top 10 Bacteria Colonies"
    };

    Plotly.newPlot("bar", barData, barLayout);

    // Bubble Chart
    let bubbleData = [{
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: "markers",
      marker: {
        size: sample_values,
        color: otu_ids
      }
    }];

    let bubbleLayout = {
      title: "Sample's Bacteria Colonies",
      hovermode: "closest",
      xaxis: {title: "OTU IDs" },
      yaxis: {title: "Sample Values"}
    };

    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
  });
};


function init() {
  let selector = d3.select("#selDataset");

  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
    let sampleIDs = data.names;
    
    for (let i = 0; i < sampleIDs.length; i++) {
      selector
        .append("option")
        .text(sampleIDs[i])
        .property("value", sampleIDs[i]);
    };

    // Initial sample visuals
    let newSample = sampleIDs[0];
    buildCharts(newSample);
    buildMetadata(newSample);
  });
};

function optionChanged(newSample) {
  buildCharts(newSample);
  buildMetadata(newSample);
};

init();

