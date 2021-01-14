var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 30,
  right: 40,
  bottom: 50,
  left: 40
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

//SVG  appending to 
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Import CSV and choosing variables from data set
d3.csv("../StarterCode/assets/data/data.csv").then(function(NationalHealthCare) {
  
    console.log(NationalHealthCare);
  
    NationalHealthCare.forEach(function(data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
    console.log(data.poverty);
    console.log(data.healthcare); });

  //Plot Scales 
  const xScale = d3.scaleLinear()
    .domain(d3.extent(NationalHealthCare, d => d.poverty))
    .range([0, width])
    .nice(); //Used to round anomaly values in the domain

  const yScale = d3.scaleLinear()
    .domain([6,d3.max(NationalHealthCare, d => d.healthcare)])
    .range([height, 0])
    .nice();

  //Plot Axes
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  //Appending chart group to html
  chartGroup.append("g").attr("transform", `translate(0, ${height})`).call(xAxis);
  chartGroup.append("g").call(yAxis);

  //Scatter Plot
  chartGroup.selectAll("circle")
    .data(NationalHealthCare)
    .enter()
    .append("circle")
    .attr("cx", d=>xScale(d.poverty))
    .attr("cy", d=>yScale(d.healthcare))
    .attr("r", "10")
    .attr("stroke-width", "1")
    .classed("stateCircle", true)
    .attr("opacity", 0.75);

  //Text to the datapoint
  chartGroup.append("g")
    .selectAll('text')
    .data(NationalHealthCare)
    .enter()
    .append("text")
    .text(d=>d.abbr)
    .attr("x",d=>xScale(d.poverty))
    .attr("y",d=>yScale(d.healthcare))
    .classed(".stateText", true)
    .attr("font-family", "comic sans")
    .attr("text-anchor", "middle")
    .attr("fill", "white")
    .attr("font-size", "10px")
    .style("font-weight", "bold")
    .attr("alignment-baseline", "central");

  //Axes Titles
  chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 13})`)
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")
    .attr("fill", "black")
    .style("font-weight", "bold")
    .text("Rate of Poverty (%)");

  chartGroup.append("text")
    .attr("y", 0 - ((margin.left / 2) + 2))
    .attr("x", 0 - (height / 2))
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")
    .attr("fill", "black")
    .style("font-weight", "bold")
    .attr("transform", "rotate(-90)")
    .text("Lack of Healthcare (%)");
}).catch(function(error) {
  console.log(error);
});