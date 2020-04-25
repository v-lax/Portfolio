class Bracket {
    constructor(state,setGlobalState,setLocalState){
    this.width = window.innerWidth;
    this.height = window.innerHeight*.7;
    this.margins = { top: 20, bottom: 20, left: 20, right: 70 };
    
    this.container = d3.select("#Bracket")
                       .append('svg')
                       .attr('width',this.width)
                       .attr('height',this.height);
    
    this.root = d3.hierarchy(state.json)
    
    //1095,381
    this.tree = d3.tree()
                  .separation(function(a,b) { return ((a.depth==b.depth)) ? 2: 1;})
                  .size([this.width-this.margins.right,381]);
    
    console.log(this.root)
    this.tree(this.root)
    this.nodes =this.container
                .selectAll("g")
                .data(this.root.descendants())
                .join("g")
                .attr("transform",d=>`translate(${d.x},${d.y})`);
    
    this.rectangles=this.nodes.append("rect")
                .attr('class','bracket-rect')
                .data(this.root.descendants())
                .attr('width', "130")
                .attr('height', "40")
                .attr('fill','transparent')
                .attr('stroke','white')
                .attr('stroke-width',2)
                .attr('rx','15px')
                .attr('ry','15px');
    
    this.line1 = this.container.selectAll('path.link')
        .data(this.root.links().slice(0,2))
        .join('line')
        .classed('link', true)
        .attr('x1', function(d) {return d.source.x+67.5;})
        .attr('y1', function(d) {return d.source.y+40;})
        .attr('x2', function(d) {return d.target.x+50;})
        .attr('y2', function(d) {return d.target.y;});
    this.line2 = this.container.selectAll('path.link')
        .data(this.root.links().slice(2,6))
        .join('line')
        .classed('link', true)
        .attr('x1', function(d) {return d.source.x+67.5;})
        .attr('y1', function(d) {return d.source.y+40;})
        .attr('x2', function(d) {return d.target.x+50;})
        .attr('y2', function(d) {return d.target.y;});
    this.line3 = this.container.selectAll('path.link')
        .data(this.root.links().slice(6,14))
        .join('line')
        .classed('link', true)
        .attr('x1', function(d) {return d.source.x+60;})
        .attr('y1', function(d) {return d.source.y+40;})
        .attr('x2', function(d) {return d.target.x+50;})
        .attr('y2', function(d) {return d.target.y;});
    this.series=this.nodes.append('text')
                          .attr('class','bracket-text')
                          .attr('text-anchor','middle')
                          .attr('transform',`translate(65,20)`)
                          .attr('dy','.40em')
                          .text(d=>d.data.name)
                          .style('fill','white')
                          .style('font-size','12px')
                          .style('font-family','Fjalla One,sans-serif')
                          //.style('text-align','center')
    
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
        state.filteredData1=state.data1.filter(d=>d.TEAM_NAME.includes(state.selectedTeams[0]))
        state.filteredData2=state.data1.filter(d=>d.TEAM_NAME.includes(state.selectedTeams[1]))
        
        state.playerNames1 = d3.map(state.filteredData1, function(d){
           if(d.TEAM_NAME.includes(state.selectedTeams[0])){
            return d.PLAYER_NAME;
           }
        }).keys()
        state.playerNames2 = d3.map(state.filteredData2,function(d){
        if(d.TEAM_NAME.includes(state.selectedTeams[1])){
            return d.PLAYER_NAME;
        }
        }).keys()

        //state.shotdomain1 = [0,d3.max(state.filteredData1.map(
            //d=> d['SHOT_ZONE_BASIC']
        //))]! 
        //state.shotdomain2 = [0,d3.max(state.filteredData2.map(
            //d=> d['SHOT_ZONE_BASIC']
        //))]

        //state.quarterdomain1 = [0,d3.max(state.filteredData1.map(
            //d=> d['PERIOD'])
            //).flat()]
        //state.quarterdomain2 = [0,d3.max(state.filteredData2.map(
            //d=> d['PERIOD'])
            //).flat()]

        console.log(state.data1)
    }
}

export {Bracket};