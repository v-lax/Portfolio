const width = 480,
  height = (480/50)*47,
  margin = { top: 20, bottom: 20, left: 20, right: 20 };

const innerwidth = width - margin.left - margin.right;
const innerheight = height - margin.top - margin.bottom;

let svg;
let court;
let court_xscale;
let court_yscale;
let shot_xscale;
let shot_yscale;

let state = {
    data:[],
    selected_game:'All',
    selected_player:'All',
    selected_team:'All'
}

//loading in our data
d3.csv('../data_analysis/celtics_vs_bucks.csv',d3.autoType).then(raw_data=>{
    console.log("raw_data",raw_data);
    state.data=raw_data;
    init();
})

function init(){

//court element scales 
court_xscale=d3.scaleLinear().domain([-25,25]).range([margin.left,innerwidth])
court_yscale=d3.scaleLinear().domain([-4,43]).range([margin.top,innerheight])

//shot scales
shot_xscale=d3.scaleLinear().domain([-244,248]).range([margin.left,innerwidth]).nice()
shot_yscale=d3.scaleLinear().domain([-32,720]).range([margin.top,innerheight]).nice()

var angle = Math.atan((10-0.75)/(22))* 180 / Math.PI
var dis = court_yscale(18);

const selectGame = d3.select("#gamedropdown").on('change',function(){
    state.selected_game=this.value;
}).selectAll('option')
  .data(d3.map(state.data, function(d){return d['Game #'];}).keys())
  .join('option')
  .attr('value',d=>d)
  .text(d=>d);

const selectPlayer = d3.select("#playerdropdown").on('change',function(){
    state.selected_player=this.value;
}).selectAll('option')
  .data(d3.map(state.data, function(d){return d['PLAYER_NAME'];}).keys())
  .join('option')
  .attr('value',d=>d)
  .text(d=>d);

const selectedTeam = d3.select("#teamdropdown").on('change',function(){
    state.selected_team=this.value;
}).selectAll('option')
  .data(d3.map(state.data, function(d){return d['TEAM_NAME'];}).keys())
  .join('option')
  .attr('value',d=>d)
  .text(d=>d);

container = d3.select("#d3-container");
court = container.append("svg")
               .attr('width',width)
               .attr('height',height);
               //.attr("transform",`translate(${width/2},${height})`)

basket=court.append('circle')
            .attr('cx',court_xscale(0))
            .attr('cy',court_yscale(-.75))
            .attr('r',10)
            .style('fill','none')
            .style('stroke','black'); 
            
backboard=court.append('rect')
               .attr('x',court_xscale(-3))
               .attr('y',court_yscale(-1.5))
               .attr('width',court_xscale(3)-court_xscale(-3))
               .attr('height',1)
               .style('fill','none')
               .style('stroke','black');

outerbox = court.append('rect')
                .attr('x',court_xscale(-8))
                .attr('y',court_yscale(-4))
                .attr('width',court_xscale(8)-court_xscale(-8))
                .attr('height',court_yscale(15)-court_yscale(-4))
                .style('fill','none')
                .style('stroke','black');

innerbox = court.append('rect')
                .attr('x', court_xscale(-6))
                .attr('y', court_yscale(-4))
                .attr('width', court_xscale(6)-court_xscale(-6))
                .attr('height', court_yscale(15)-court_yscale(-4))
                .style('fill', 'none')
                .style('stroke', 'black');

leftcornerthree=court.append('rect')
                .attr('x', court_xscale(-22))
                .attr('y', court_yscale(-4))
                .attr('width', 1)
                .attr('height', court_yscale(10)-court_yscale(-4))
                .style('fill', 'none')
                .style('stroke', 'black');

rightcornerthree=court.append('rect')
                .attr('x', court_xscale(22))
                .attr('y', court_yscale(-4))
                .attr('width', 1)
                .attr('height', court_yscale(10)-court_yscale(-4))
                .style('fill', 'none')
                .style('stroke', 'black');

outerline=court.append('rect')
               .attr('x',court_xscale(-25))
               .attr('y',court_yscale(-4))
               .attr('width',court_xscale(25)-court_xscale(-25))
               .attr('height',court_yscale(43)-court_yscale(-4))
               .style('fill','none')
               .style('stroke','black')

Topfreethrow = court.append('path');
Bottomfreethrow = court.append('path');
restricted_area = court.append('path');
three_point_line = court.append('path');
centerout = court.append('path');
centerin = court.append('path');

appendArcPath(three_point_line, dis, (angle+90)*(Math.PI/180), (270-angle)*(Math.PI/180))
        .attr('fill', 'none')
        .attr("stroke", "black")
        .attr('class', 'shot-chart-court-3pt-line')
        .attr("transform", "translate(" + court_xscale(0) + ", " +court_yscale(0) +")");

appendArcPath(centerout, court_xscale(6)-court_xscale(0), (-90)*(Math.PI/180), (90)*(Math.PI/180))
        .attr('fill', 'none')
        .attr("stroke", "black")
        .attr("transform", "translate(" + court_xscale(0) + ", " +court_yscale(43) +")");

appendArcPath(centerin, court_xscale(2)-court_xscale(0), (-90)*(Math.PI/180), (90)*(Math.PI/180))
        .attr('fill', 'none')
        .attr("stroke", "black")
        .attr("transform", "translate(" + court_xscale(0) + ", " +court_yscale(43) +")");

appendArcPath(restricted_area, court_xscale(3)-court_xscale(0), (90)*(Math.PI/180), (270)*(Math.PI/180))
        .attr('fill', 'none')
        .attr("stroke", "black")
        .attr("transform", "translate(" + court_xscale(0) + ", " +court_yscale(-0.75) +")");
        
appendArcPath(Topfreethrow, court_xscale(6)-court_xscale(0), (90)*(Math.PI/180), (270)*(Math.PI/180))
        .attr('fill', 'none')
        .attr("stroke", "black")
        .attr("transform", "translate(" + court_xscale(0) + ", " +court_yscale(15) +")");

appendArcPath(Bottomfreethrow, court_xscale(6)-court_xscale(0), (-90)*(Math.PI/180), (90)*(Math.PI/180))
        .attr('fill', 'none')
        .attr("stroke", "black")
        .style("stroke-dasharray", ("3, 3"))
        .attr("transform", "translate(" + court_xscale(0) + ", " +court_yscale(15) +")");


draw();
}

function draw(){

let filteredData = state.data

 if(state.selected_game!=='All'){
    filteredData = state.data.filter(d=>d['Game #']===state.selected_game);
 }else if(state.selected_player!=='All'){
    filteredData = state.data.filter(d=>d.PLAYER_NAME===state.selected_player);
 }else if(state.selected_team!=='All'){
    filterData=state.data.filter(d=>d.TEAM_NAME===state.selected_team);
 }

 dot = court
    .selectAll('.dot')
    .data(filteredData,d=>d[""])
    .join(
        enter => enter.append('circle')
                      .attr('class','dot')
                      .attr('opacity',.5)
                      .attr('fill',d=>{
                          if(d.SHOT_MADE_FLAG===1) return 'green';
                          else if (d.SHOT_MADE_FLAG===0) return 'red';
                      })
                      .attr('cx',d=>shot_xscale(d.LOC_X))
                      .attr('cy',d=>shot_yscale(d.LOC_Y))
                      .attr('r',5),
        update=>update,
        exit => exit.call(exit => 
            exit.transition()
                .delay(50)
                .duration(500)
                .attr('cy',innerheight)
                .remove()
            
            ) 

    );

}


function appendArcPath(base, radius, startAngle, endAngle) {
    var points = 30;

    var angle = d3.scaleLinear()
        .domain([0, points - 1])
        .range([startAngle, endAngle]);

    var line = d3.lineRadial()
        .radius(radius)
        .angle(function(d, i) { return angle(i); });

    return base.datum(d3.range(points))
        .attr("d", line);
}