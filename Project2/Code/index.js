//This was the first time creating a scroll driven graphic so I definitely could
//not have done this without the help of some great tutorials and code examples. 

//The first being this great tutorial by Russell Goldenberg on how to implement his scrollytelling library scrollama. 
//The link to his tutorial can be found below along with a link to the documentation.
//https://github.com/russellgoldenberg/scrollama
//https://pudding.cool/process/introducing-scrollama/

//The second tutorial and code example that i relied heavily on was a great tutorial created by Cuthbert Chow. 
// The tutorial does a great job of exaplaining how to animate elements on different graphs on different scroll events.
// Link - https://towardsdatascience.com/how-i-created-an-interactive-scrolling-visualisation-with-d3-js-and-how-you-can-too-e116372e2c73



import {LineGraph} from "./linegraph.js";
import { RaceDashboard } from "./racedashboard.js";
import {Circle} from "./circle.js"
import {Final} from "./final.js"

//var scroller = scrollama();
let line1, intro,svg,race_line_graph,circle,final,svg1,image

var last_statement = "First and foremost I'd like to say, 'Justice has never advanced by taking a life' by Coretta"
var last_statement2 = "Scott King. Lastly, to my wife and to my kids, I love y'all forever and always. That's it."
//racedashboard,sankeyDiagram;
const container = d3.select('#scrolly-side');
var figure = container.select('figure');
var article = container.select('article');
const stepSel = article.selectAll('.step');

const scroller = scrollama();


//Application State

let state ={
    data:[],
    words:[],
    status:[]
};

Promise.all([d3.csv('../Data/the-condemed-data.csv',d3.autoType),
             d3.csv('../Data/tx_deathrow_full.csv'),
             d3.json('../Data/status.json') 
]).then(([data,text,status])=>{
    state.data = data;
    state.words= text;
    state.status= status
    console.log(state)

    init();
}) 

function init(){
    Stickyfill.add(d3.select('.sticky').node());

    createVis();
    scroller.setup({
        step: '.step',
        offset: 0.6,
        debug: false 
    })
    .onStepEnter(handleStepEnter)
    .onStepExit(handleStepExit)
    
    //racedashboard = new RaceDashboard(state);
    //sankeyDiagram = new SankeyDiagram(state);
}

function handleResize() {
    // 1. update height of step elements
    var stepH = Math.floor(window.innerHeight * 0.75);
    stepSel.style('height', stepH + 'px');
    var figureHeight = window.innerHeight / 2
    var figureMarginTop = (window.innerHeight - figureHeight) / 2  
    figure
        .style('height', figureHeight + 'px')
        .style('top', figureMarginTop + 'px');
    // 3. tell scrollama to update new element dimensions
    scroller.resize();
}

let activationFunctions = [draw0,draw1,draw2,draw3,draw4]

function handleStepEnter(response) {
    activationFunctions[response.index]();
}

function handleStepExit(response){
    console.log(response)
}


function clean(charType){
    let svg = d3.select('#graphic').select('svg')

    if(charType!=='TotalLineGraph'){
        svg.selectAll('.total_line_graph').transition().attr('opacity', 0)
        svg.selectAll('#total_line_graph_axis').transition().attr('opacity',0)
        line1.restart_animation(state)
    }
    if(charType!=='Image'){
        svg.select('.image').transition().attr('opacity', 0)
    }
    //if(charType!=='Intro'){
        //d3.selectAll('.intro_text').transition().attr('opacity',0)
    //}
    if(charType!=='RaceLineGraph'){
        svg.selectAll('.race_line_graph').transition().attr('opacity',0)
        svg.selectAll('.race_legend').transition().attr('opacity',0)
        race_line_graph.restart_animation(state)
    }
    if(charType!=='SparkLine'){
        svg.select('.spark_line').transition().attr('opacity',0)
    }
    if(charType!=='Circle'){
        svg.selectAll('.status_circles_children').transition().attr('opacity',0)
        svg.selectAll('.status_circles_children_children').transition().attr('opacity',0).attr('fill','none').attr('stroke-width',0)
        svg.selectAll('.status_circles_text').transition().attr('opacity',0)
        svg.selectAll('.status_circles_numbers1').transition().attr('opacity',0)
        svg.selectAll('.status_circles_numbers2').transition().attr('opacity',0)
        svg.selectAll('.status_circles_numbers3').transition().attr('opacity',0)
    }
    if(charType!=='Words'){
        svg.selectAll('.last_words_rect').transition().attr('opacity',0)
        svg.select('.last_words_text').transition().attr('opacity',0)
    }
}

//function draw0(){
    //clean('Intro')
    //first.text(last_statement)
    //second.text(last_statement2)
    //type();
//};

function draw0(){
    clean('Image')
    d3.select('#graphic').select('svg').selectAll('.image').transition().duration(300).attr('opacity',1)
    //line1.start_animation(state)
}

function draw1(){
    clean('TotalLineGraph')
    d3.select('#graphic').select('svg').selectAll('.total_line_graph').transition().duration(300).attr('opacity',1)
    d3.select('#graphic').select('svg').selectAll('#total_line_graph_axis').transition().duration(300).attr('opacity',1)
    line1.start_animation(state)
}

function draw2(){
    clean('RaceLineGraph')
    d3.select('#graphic').select('svg').selectAll('.race_line_graph').transition().duration(300).attr('opacity',1)
    d3.select('#graphic').select('svg').selectAll('.race_legend').transition().duration(300).attr('opacity',.8)
    race_line_graph.start_animation(state)
}

function draw3(){
    clean('Circle')
    d3.select('#graphic').select('svg').selectAll('.status_circles_children').transition().duration(300).attr('opacity',1)
    d3.select('#graphic').select('svg').selectAll('.status_circles_children_children').transition().duration(300).attr('opacity',1).attr('fill','black').attr('stroke-width',1)
    d3.select('#graphic').select('svg').selectAll('.status_circles_text').transition().duration(300).attr('opacity',1)
    //d3.select('#graphic').select('svg').select('.status_circles_numbers1').transition().duration(300).attr('opacity',1)
    
    d3.select('#graphic').select('svg').selectAll('.status_circles_children_children').on('mouseover',function(d,i){
        d3.select(this)
            .transition('mouseover').duration(100)
            .attr('stroke-width', 3)

      d3.select('.tooltip')
      .transition()
      .duration(250)
      .style("opacity",1)
      d3.select('.tooltip').html(d.data.name + "<br>" + d.data.value)
      .style('left', (d3.event.pageX)+'px')
      .style('top',  (d3.event.pageY-28)+'px')
    }).on('mouseout',function(d,i){

            d3.select('.tooltip').transition()		
            .duration(250)		
            .style("opacity", 0);	
      
            d3.select(this)
                .transition('mouseout').duration(100)
                .attr('opacity', 0.8)
                .attr('stroke-width', 1)
    })
    circle.startnumbersanimation(state)
}

function draw4(){
    clean('Words')
    d3.select('#graphic').select('svg').selectAll('.last_words_rect').transition().duration(300).attr('opacity',1)
    d3.select('#graphic').select('svg').selectAll('.last_words_text').transition().duration(300).attr('opacity',1)
}

function createVis(){
    let svg1 = d3.select('#test-svg').attr('width',1000).attr('height',100)
    var first=d3.select('#test-svg').append('text')
    .attr('class','intro_text')
    .attr('x',30)
    .attr('y',50)

    var second=d3.select('#test-svg')
    .append('text')
    .attr('class','intro_text')
    .attr('x',30)
    .attr('y',65)

    type();
    let svg = d3.select('#graphic')
                .append('svg')
                .attr('class','scrolly-svg')
                .attr('width',900)
                .attr('height',200)
    image = svg.append('svg:image')
               .attr("xlink:href",'../death_penalty.jpg')
               .attr('class','image')
               .attr('width', 500)
               .attr('height',200)
               .attr('opacity',0)
               .attr('transform','translate(250,100)')
    line1 = new LineGraph(state);
    race_line_graph=new RaceDashboard(state);
    circle=new Circle(state);
    final=new Final(state);
};

function type(){

    d3.selectAll('.intro_text').transition()
      .duration(7000)
      .delay((d,i)=> i*6700)
      .ease(d3.easeLinear)
      .tween("text", function (d,i) {
        var newText = i===0? last_statement:last_statement2 
        //var newText = this.textContent;
        var textLength = newText.length;
        return function (t) {
            this.textContent = newText.slice(0, 
            Math.round( t *textLength));
           //console.log(this.textContent)
}   
    });
        }

function wrap(text, width) {
            text.each(function() {
                var text = d3.select(this),
                words = text.text().split(/\s+/).reverse(),
                word,
                line = [],
                lineNumber = 0,
                lineHeight = 1.1, // ems
                y = text.attr("y"),
                dy = parseFloat(2),
                tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr('class','spans').attr("dy", dy + 'em');
            while (word = words.pop()) {
              line.push(word);
              tspan.text(line.join(" "));
              if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").attr('class','spans').text(word);
              }
            }
              });
}
 