 class LineGraph {
     constructor(state){
         //var scroller = scrollama();

         //this.width = window.innerWidth*.5;
         //this.height = window.innerHeight*.5;
         this.width=900;
         this.height=400;
         this.margins = { top: 20, bottom: 70, left: 70, right: 20 };

         this.uniqueCount = state.data.map(d =>d.sentencing_year)
        
         var count = {};
         this.uniqueCount.forEach(function(i) { 
             count[i] = (count[i]||0) + 1;
         });
         this.count_object = [];
        
         Object.entries(count).forEach(
                     ([key, value]) => {
                      this.count_object.push({'year' : key,'value':value});
                     });
         this.yline1Scale=d3.scaleLinear()
                       .domain([0,d3.max(Object.values(count))])
                       .range([this.height-this.margins.bottom,this.margins.top])
         this.xline1Scale=d3.scaleBand()
                     .domain(Object.keys(count))
                     .range([this.margins.left,this.width-this.margins.right])
                     .paddingInner(.1);
                     
         this.xline1axis= d3.axisBottom(this.xline1Scale).tickValues(['1976','1980','1984','1988','1992','1996','2000','2004','2008','2012','2016','2019'])
         this.yline1axis= d3.axisLeft(this.yline1Scale)
        
         //this.line1=d3.line()
                     //.curve(d3.curveCatmullRom)
                     //.x(d=>this.xline1Scale(d.year))
                     //.y(d=>this.yline1Scale(d.value))

          //this.l1 = length(this.line1(this.count_object));

         this.container1 = d3.select('#graphic')
                            .select('svg')
                            //.attr('class','total_line_graph')
                            .attr('width',this.width)
                            .attr('height',this.height)
        
       this.container1.append('g')
                       //.attr('id','x-axis')
                       .attr('opacity',0)
                       .attr('class','total_line_graph')
                       .attr('transform',`translate(0,${this.height-this.margins.bottom})`)
                       .call(this.xline1axis)
                       .append('text')
                       .attr('id','total_line_graph_axis')
                       .attr('x','50%')
                       .attr('dy','5em')
                       .text('Year')

         this.container1.append('g')
                       //.attr('id','y-axis')
                       .attr('opacity',0)
                       .attr('class','total_line_graph')
                       .attr('transform',`translate(${this.margins.left},0)`)
                       .call(this.yline1axis)
                       .append('text')
                       .attr('id','total_line_graph_axis')
                       .attr('y','50%')
                       .attr('dx','-5em')
                       .attr('writing-mode','vertical-rl')
                       .text('# of Death Sentences')
        
         //this.path1=this.container1.append("path")
                        //.datum(this.count_object)
                        //.attr('class','total_line_graph')
                        //.attr("fill", "none")
                        //.attr("stroke", "black")
                        //.attr("stroke-width", 2.5)
                        //.attr("stroke-linejoin", "round")
                        //.attr("stroke-linecap", "round")
                        //.attr("stroke-dasharray", `0,${this.l1}`)
                        //.attr("d", this.line1)
                        //.transition()
                        //.duration(5000)
                        //.ease(d3.easeLinear)
                        //.attr("stroke-dasharray", `${l},${l}`);
        };
//         function pause_animation(){
//             path.transition()
//                      .duration(0)
//             console.log('Stop Animation')
//         };
start_animation(){

function length(path) {
        return d3.create("svg:path").attr("d", path).node().getTotalLength();
    };
console.log('start the animation!')
var line1=d3.line()
             .curve(d3.curveCatmullRom)
             .x(d=>this.xline1Scale(d.year))
             .y(d=>this.yline1Scale(d.value))

var l1 = length(line1(this.count_object));

this.path1=this.container1.append("path")
                        .datum(this.count_object)
                        .attr('class','total_line_graph')
                        .attr('id','total-path')
                        .attr("fill", "none")
                        .attr("stroke", "white")
                        .attr("stroke-width", 2.5)
                        .attr("stroke-linejoin", "round")
                        .attr("stroke-linecap", "round")
                        .attr("stroke-dasharray", `0,${l1}`)
                        .attr("d", line1)
                        .transition()
                        .duration(5000)
                        .ease(d3.easeLinear)
                        .attr("stroke-dasharray", `${l1},${l1}`);
}

restart_animation(){
    d3.select("#total-path").remove();
}

}

 export {LineGraph};