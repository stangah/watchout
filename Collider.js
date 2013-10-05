var gameParams = {
  width: 700,
  height: 400,
  enemies: 30,
};

var enemies = [];

for (var i = 0; i < gameParams.enemies; i++){
  var x = Math.random() * gameParams.width;
  var y = Math.random() * gameParams.height;
  enemies[i] = { "x_axis": x, "y_axis": y, "radius": 10, "color": "black" };
}

var svgContainer = d3.select('body').append('svg')
                                    .attr('width', gameParams.width)
                                    .attr('height', gameParams.height)
                                    .style('border', '1px solid black');

var circles = svgContainer.selectAll('circle').data(enemies).enter().append('circle');

var circleAttributes = circles
                          .attr('cx', function(d) { return d.x_axis; })
                          .attr('cy', function(d) { return d.y_axis; })
                          .attr('r', function(d) { return d.radius; })
                          .style('fill', function(d) { return d.color; });

var tweener = function() { circleAttributes.transition()
                                              .attr('cx', function() { return Math.random() * 700; })
                                              .attr('cy', function() { return Math.random() * 400; }).duration(900);
};

setInterval(tweener, 1000);

