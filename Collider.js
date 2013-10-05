var gameParams = {
  width: 700,
  height: 400,
  radius: 10,
  enemies: 30,
  clicked: false,
  start: new Date(),
  end: null,
  maxScore: 0
};

var enemies = [];

for (var i = 0; i < gameParams.enemies; i++){
  var x = Math.random() * gameParams.width;
  var y = Math.random() * gameParams.height;
  enemies[i] = { "x_axis": x, "y_axis": y, "radius": gameParams.radius, "color": "black" };
}

var svgContainer = d3.select('body').append('svg:svg')
                                    .attr('width', gameParams.width)
                                    .attr('height', gameParams.height)
                                    .style('border', '1px solid black');

var friend = svgContainer.append('circle');

var circles = svgContainer.selectAll('circle').data(enemies).enter().append('circle');

var friendAttributes = friend
                          .attr('cx', 350)
                          .attr('cy', 200)
                          .attr('r', 10)
                          .attr('class', 'friend')
                          .style('fill', 'red');

var circleAttributes = circles
                          .attr('cx', function(d) { return d.x_axis; })
                          .attr('cy', function(d) { return d.y_axis; })
                          .attr('r', function(d) { return d.radius; })
                          .attr('class', 'enemies')
                          .style('fill', function(d) { return d.color; });

var tweener = function() { circleAttributes.transition()
                                              .attr('cx', function() { return Math.random() * 700; })
                                              .attr('cy', function() { return Math.random() * 400; }).duration(900);
};

setInterval(tweener, 1000);

friend
  .on('mousedown', function() { gameParams.clicked = true; })
  .on('mouseup', function() { gameParams.clicked = false; });


svgContainer.on('mousemove', function(){
  var mPos = d3.svg.mouse(this);
  var mX = mPos[0];
  var mY = mPos[1];
  if(gameParams.clicked){
    var friendAttributes = friend
                          .attr('cx', mX)
                          .attr('cy', mY);
  }
});

setInterval(function(){
  var fX = friend.attr('cx');
  var fY = friend.attr('cy');

  gameParams.end = new Date();
  var score = Math.floor((gameParams.end - gameParams.start) / 50);

  circles.each(function(){
    var eX = +d3.select(this).attr('cx');
    var eY = +d3.select(this).attr('cy');
    var p = gameParams.radius * 2;
    if ( ((fX < eX + p) && (fX > eX - p)) && ((fY < eY + p) && (fY > eY - p)) ){
      gameParams.start = new Date();
      console.log('Collision detected!');

    if (score > gameParams.maxScore){
      gameParams.maxScore = score;
      d3.select('.max').html(gameParams.maxScore);
    }
    }
  });

  d3.select('.time').html(score);
}, 50);

