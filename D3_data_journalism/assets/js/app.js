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

    var obesity = Data.map(col => col.obesity);
    console.log(obesity);


    // shift everything over by the margins
    var chartGroup = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);

    var xMin = d3.min(income) - 1000;
    var yMin = d3.min(obesity) - 2;
    var yMax = d3.max(obesity) + 2;

    // scale y to chart height
    var yScale = d3.scaleLinear()
                   .domain([yMin, yMax])
                   .range([chartHeight, 0]);

    // scale x to chart width
    var xScale = d3.scaleLinear()
                   .domain([xMin, d3.max(income)])
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

   // Add circles
   chartGroup.append("g")
            .selectAll("dot")
            .data(Data)
            .enter()
            .append("circle")
            .attr("cx", d => xScale(d.income))
            .attr("cy", d => yScale(d.obesity))
            .attr("r", 10)
            .style("fill", "#69b3a2")
            .attr("text", d => d.abbr)

    var labels = chartGroup.selectAll(null)
                            .data(Data)
                            .enter()
                            .append("text");

    labels.attr("x", d => xScale(d.income - 250))
        .attr("y", d => yScale(d.obesity - 0.1))
        .text(d => d.abbr)
        .attr("font-family", "sans-serif")
        .attr("font-size", "10px")
        .attr("fill", "white");

    chartGroup.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 0 - margin.left + 5)
                .attr("x", 0 - (chartHeight / 2))
                .attr("dy", "1em")
                .style("text-anchor", "middle")
                .text("Obesity")
                .attr("font-weight", 500);

    chartGroup.append("text")
              .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + margin.top})`)
              .attr("class", "axisText")
              .style("text-anchor", "middle")
              .text("Income in US dollars")
              .attr("font-weight", 500);

});