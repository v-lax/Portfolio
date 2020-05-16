class RaceDashboard {
    constructor(state){
        var scroller = scrollama();

        this.width=900;
         this.height=400;
         this.margins = { top: 20, bottom: 70, left: 70, right: 20 };

        this.black=state.data.filter(d=>d.race==='Black')
        this.white=state.data.filter(d=>d.race==='White')
        this.hispanic=state.data.filter(d=>d.race==='Hispanic or Latino')

        this.ucBlack = this.black.map(d =>d.sentencing_year)
        this.ucWhite = this.white.map(d =>d.sentencing_year)
        this.ucHispanic = this.hispanic.map(d =>d.sentencing_year)

        var blackcount = {};
        var whitecount ={};
        var hispaniccount={};
        this.ucBlack.forEach(function(i) { 
             blackcount[i] = (blackcount[i]||0) + 1;
         });
        this.ucWhite.forEach(function(i) { 
            whitecount[i] = (whitecount[i]||0) + 1;
        });
        this.ucHispanic.forEach(function(i) { 
            hispaniccount[i] = (hispaniccount[i]||0) + 1;
        });
        
        this.black_count_object = [];
        this.white_count_object = [];
        this.hispanic_count_object = [];
        
        Object.entries(blackcount).forEach(
                     ([key, value]) => {
                      this.black_count_object.push({'year' : key,'value':value});
                     });

        Object.entries(whitecount).forEach(
                    ([key, value]) => {
                        this.white_count_object.push({'year' : key,'value':value});
                    });

        Object.entries(hispaniccount).forEach(
                    ([key, value]) => {
                        this.hispanic_count_object.push({'year' : key,'value':value});
                    });
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

        this.container1 = d3.select('#graphic')
                            .select('svg')
                            //.attr('class','total_line_graph')
                            .attr('width',this.width)
                            .attr('height',this.height)
        
         this.container1.append('g')
                       //.attr('id','x-axis')
                       .attr('opacity',0)
                       .attr('class','race_line_graph')
                       .attr('transform',`translate(0,${this.height-this.margins.bottom})`)
                       .call(this.xline1axis)
                       .append('text')
                       .attr('id','race_line_graph_axis')
                       .attr('x','50%')
                       .attr('dy','5em')
                       .text('Year')

        this.container1.append('g')
                       //.attr('id','y-axis')
                       .attr('opacity',0)
                       .attr('class','race_line_graph')
                       .attr('transform',`translate(${this.margins.left},0)`)
                       .call(this.yline1axis)
                       .append('text')
                       .attr('id','race_line_graph_axis')
                       .attr('y','50%')
                       .attr('dx','-5em')
                       .attr('writing-mode','vertical-rl')
                       .text('# of Death Sentences')

        this.legend=this.container1.selectAll('.race_legend')
                        .data(['White','Black','Hispanic/Latinx'])
                        .enter()
                        .append('g')
        
        this.legend.append('rect')
                    .attr('fill',function(d){
                        if(d==='White'){
                            return 'green';
                        }else if(d==='Black'){
                            return 'blue';
                        }else if(d==='Hispanic/Latinx'){
                            return 'red';
                        }
                    })
                    .attr('class','race_legend')
                    .attr('opacity',0)
                    .attr('width',20)
                    .attr('height',20)
                    .attr('y',function(d,i){
                        return (i*35)+30
                    })
                    .attr('x',650)

        this.legend.append('text')
                   .attr('class','race_legend')
                   .attr('y',function(d,i){
                       return (i*35)+40
                   })
                   .attr('x',680)
                   .attr('fill','white')
                   .attr('font-size','11px')
                   .attr('font-family','monospace')
                   .text(d=>d)
        //this.container = d3.select('#race-dashboard')
                           //.append('svg')
                           //.attr('width',this.width)
                           //.attr('height',this.height)
        
    }

    start_animation(){

        function length(path) {
                return d3.create("svg:path").attr("d", path).node().getTotalLength();
            };

        var line_black=d3.line()
                     .curve(d3.curveCatmullRom)
                     .x(d=>this.xline1Scale(d.year))
                     .y(d=>this.yline1Scale(d.value))
        var line_white=d3.line()
                     .curve(d3.curveCatmullRom)
                     .x(d=>this.xline1Scale(d.year))
                     .y(d=>this.yline1Scale(d.value))
        var line_hispanic=d3.line()
                     .curve(d3.curveCatmullRom)
                     .x(d=>this.xline1Scale(d.year))
                     .y(d=>this.yline1Scale(d.value))
        
        var l_black = length(line_black(this.count_object));
        var l_white = length(line_white(this.count_object));
        var l_hispanic = length(line_hispanic(this.count_object));
        
        this.pathblack=this.container1.append("path")
                                .datum(this.black_count_object)
                                .attr('class','race_line_graph')
                                .attr('id','race-path')
                                .attr("fill", "none")
                                .attr("stroke", "blue")
                                .attr("stroke-width", 2.5)
                                .attr('stroke-opacity',.8)
                                .attr("stroke-linejoin", "round")
                                .attr("stroke-linecap", "round")
                                .attr("stroke-dasharray", `0,${l_black}`)
                                .attr("d", line_black)
                                .transition()
                                .duration(5000)
                                .ease(d3.easeLinear)
                                .attr("stroke-dasharray", `${l_black},${l_black}`);

        this.pathwhite=this.container1.append("path")
                                .datum(this.white_count_object)
                                .attr('class','race_line_graph')
                                .attr('id','race-path')
                                .attr("fill", "none")
                                .attr("stroke", "green")
                                .attr("stroke-width", 2.5)
                                .attr('stroke-opacity',.8)
                                .attr("stroke-linejoin", "round")
                                .attr("stroke-linecap", "round")
                                .attr("stroke-dasharray", `0,${l_white}`)
                                .attr("d", line_white)
                                .transition()
                                .duration(5000)
                                .ease(d3.easeLinear)
                                .attr("stroke-dasharray", `${l_white},${l_white}`);

        this.pathhispanic=this.container1.append("path")
                                .datum(this.hispanic_count_object)
                                .attr('class','race_line_graph')
                                .attr('id','race-path')
                                .attr("fill", "none")
                                .attr("stroke", "red")
                                .attr("stroke-width", 2.5)
                                .attr('stroke-opacity',.8)
                                .attr("stroke-linejoin", "round")
                                .attr("stroke-linecap", "round")
                                .attr("stroke-dasharray", `0,${l_hispanic}`)
                                .attr("d", line_hispanic)
                                .transition()
                                .duration(5000)
                                .ease(d3.easeLinear)
                                .attr("stroke-dasharray", `${l_hispanic},${l_hispanic}`);
        }

    restart_animation(){
            d3.selectAll("#race-path").remove();
        }
}

export {RaceDashboard};