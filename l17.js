////////////////////////////////////////////////////////////////
//
// Example of d3 brushes and d3 line
//
// Author: Joshua Levine
// Date: Mar. 17, 2021
//
////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////
// Test d3 brush

function brushExample() {
  // Add the svg element
  let svg = d3.select("#div1").append("svg")

  // Initialize width/height
  svg.attr("width", 500)
    .attr("height", 500)

  svg.append("rect")
    .attr("x",0)
    .attr("y",0)
    .attr("width",500)
    .attr("height",250)
    .attr("fill", "red")

  //setup a 2d brush in the top half of the svg
  let brush1 = d3.brush()
    .extent([[0,0],[500,250]]);
  
  //add brush to svg object
  svg.append("g")
    .attr("class", "brush")
    .call(brush1);

  //hook up brush to callbacks
  brush1.on("brush", updateBrush1)
    .on("end", updateBrush1);


  //setup a 1d brush in the bottom half of the svg
  let brush2 = d3.brushX()
    .extent([[0,250],[500,500]]);

  //add brush to svg object
  svg.append("g")
    .attr("class", "brush")
    .call(brush2);

  //hook up brush to callbacks
  brush2.on("brush", updateBrush2)
    .on("end", updateBrush2);



  //get some random circles
  let data = d3.range(10).map(
    d => [Math.random()*500,Math.random()*500] 
  );

  //draw random circles
  svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => d[0])
    .attr("cy", d => d[1])
    .attr("r", 10)
    .attr("fill", "black")

}



////////////////////////////////////////////////////////////////
// Brush callbacks

function updateBrush1(event) {
  extent1 = event.selection;

  //2d brushes return the min/max coordinates of the brush as four values
  console.log(extent1);

  //reset circles
  d3.selectAll("circle")
    .attr("fill", "black")

  if (extent1 != null) {
    //find the circles in the brush
    d3.selectAll("circle")
      .filter(d =>
        (extent1[0][0] <= d[0] && d[0] <= extent1[1][0] &&
         extent1[0][1] <= d[1] && d[1] <= extent1[1][1])
      )
      .attr("fill", "yellow")
  }
}

function updateBrush2(event) {
  extent2 = event.selection;
  
  //1d brushes return the min/max coordinates of the brush as two values
  console.log(extent2);

  //reset circles
  d3.selectAll("circle")
    .attr("fill", "black")

  if (extent2 != null) {
    //find the circles in the brush
    d3.selectAll("circle")
      .filter(d =>
        (extent2[0] <= d[0] && d[0] <= extent2[1] &&
         d[1] > 250)
      )
      .attr("fill", "blue")
  }
}



////////////////////////////////////////////////////////////////
// Testing d3 line

function lineExample() {
  // Add the svg element
  let svg = d3.select("#div2").append("svg")

  // Initialize width/height
  svg.attr("width", 500)
    .attr("height", 500)

  // manually drawing a line through 3 points by setting d
  svg.append("path")
    .attr("d", d3.line()( [[100,300], [200, 200], [300,400], [400,100]] ) )
    .attr("fill", "none")
    .attr("stroke", "purple")
    .attr("stroke-width", 2)
}



////////////////////////////////////////////////////////////////
// Call the functions to set up the two plots

brushExample()
lineExample()
