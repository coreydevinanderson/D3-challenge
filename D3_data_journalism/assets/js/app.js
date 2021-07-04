// @TODO: YOUR CODE HERE!

// svg container
var svgHeight = 500;
var svgWidth = 1000;

// margins
var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
};

var chartHeight = svgHeight - margin.top - margin.bottom;
var chartWidth = svgWidth - margin.left - margin.right;


var svg = d3.select("#scatter")
            .append("svg")
            .attr("height", svgHeight)
            .attr("width", svgWidth);


d3.csv("./assets/data/data.csv").then(function(Data) {

    var income = Data.map(col => col.income);
    console.log(income);

    var poverty = Data.map(col => col.poverty);
    console.log(poverty);


    // shift everything over by the margins
    var chartGroup = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);

    // scale y to chart height
    var yScale = d3.scaleLinear()
                   .domain([0, d3.max(poverty)])
                   .range([chartHeight, 0]);

    // scale x to chart width
    var xScale = d3.scaleLinear()
                   .domain([0, d3.max(income)])
                   .range([0, chartWidth]);

    // create axes
    var yAxis = d3.axisLeft(yScale);
    var xAxis = d3.axisBottom(xScale);

    console.log(chartHeight);

    chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(xAxis);



    chartGroup.append("g")
              .call(yAxis);


});