class Bracket {
    constructor(state,setGlobalState,setLocalState){
    this.width = window.outerWidth;
    this.height = window.innerHeight*.6;
    this.margins = { top: 20, bottom: 20, left: 20, right: 20 };
    
    this.container = d3.select("#Bracket")
                       .append('svg')
                       .attr('width',this.width)
                       .attr('height',this.height);
    
    this.root = d3.hierarchy(state.json)

    this.tree = d3.tree()
                  .size([this.width,this.height-50]);
    
    this.tree(this.root)
    this.nodes =this.container
                .selectAll("g")
                .data(this.root.descendants())
                .join("g")
                .attr("transform",d=>`translate(${d.x},${d.y})`);
    
    this.rectangles=this.nodes.append("rect")
                .data(this.root.descendants())
                .attr('width', "100")
                .attr('height', "30")
                .attr('fill','blue')
                .attr('opacity',.7);
    
    this.line1 = this.container.selectAll('path.link')
        .data(this.root.links().slice(0,2))
        .join('line')
        .classed('link', true)
        .attr('x1', function(d) {return d.source.x+50;})
        .attr('y1', function(d) {return d.source.y+30;})
        .attr('x2', function(d) {return d.target.x+50;})
        .attr('y2', function(d) {return d.target.y;});
    this.line2 = this.container.selectAll('path.link')
        .data(this.root.links().slice(2,6))
        .join('line')
        .classed('link', true)
        .attr('x1', function(d) {return d.source.x+50;})
        .attr('y1', function(d) {return d.source.y+30;})
        .attr('x2', function(d) {return d.target.x+50;})
        .attr('y2', function(d) {return d.target.y;});
    this.line3 = this.container.selectAll('path.link')
        .data(this.root.links().slice(6,14))
        .join('line')
        .classed('link', true)
        .attr('x1', function(d) {return d.source.x+50;})
        .attr('y1', function(d) {return d.source.y+30;})
        .attr('x2', function(d) {return d.target.x+50;})
        .attr('y2', function(d) {return d.target.y;});
    this.series=this.nodes.append('text')
                          .attr('transform',`translate(5,15)`)
                          .attr('dy','.40em')
                          .text(d=>d.data.name)
                          .style('fill','red')
                          .style('font-size','10px')
                          .style('text-align','center')
    
    this.nodes.on("click", d => {
        setGlobalState({ selectedSeries: d.data.name,
                         selectedTeams: [d.data.name.split(" ")[0],d.data.name.split(" ")[2]],
                         selectedGame1: 'All Games',
                         selectedGame2: 'All Games',
                         selectedPlayer1:'All Players',
                         selectedPlayer2:'All Players',
                         selectedShot1:'All Shots',
                         selectedShot2:'All Shots'
                       });
    });
    }

    filter(state,setGlobalState,setLocalState){
        state.data1=state.data.filter(d=>d.Series === state.selectedSeries)
        state.playerNames1 = d3.map(state.data1, function(d){
           if(d.TEAM_NAME.includes(state.selectedTeams[0])){
            return d.PLAYER_NAME;
           }
        }).keys()
        state.playerNames2 = d3.map(state.data1,function(d){
        if(d.TEAM_NAME.includes(state.selectedTeams[1])){
            return d.PLAYER_NAME;
        }
        }).keys()
        state.filteredData1=state.data1.filter(d=>d.TEAM_NAME.includes(state.selectedTeams[0]))
        state.filteredData2=state.data1.filter(d=>d.TEAM_NAME.includes(state.selectedTeams[1]))
        console.log(state.data1)
    }
}

export {Bracket};