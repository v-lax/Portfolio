class Shotchart {
    constructor(state,setGlobalState,setLocalState){
        this.width = 480;
        this.height = (480/50)*47;
        this.margins = { top: 20, bottom: 20, left: 20, right: 20 };

        this.innerwidth = this.width - this.margins.left - this.margins.right;
        this.innerheight = this.height - this.margins.top - this.margins.bottom;

        this.court_xscale=d3.scaleLinear().domain([-25,25]).range([this.margins.left,this.innerwidth])
        this.court_yscale=d3.scaleLinear().domain([-4,43]).range([this.margins.top,this.innerheight])
        
        //shot scales
        this.shot_xscale=d3.scaleLinear().domain([-250,250]).range([this.margins.left,this.innerwidth]).nice()
        this.shot_yscale=d3.scaleLinear().domain([-45,420]).range([this.margins.top,this.innerheight]).nice()

        this.angle = Math.atan((10-0.75)/(22))* 180 / Math.PI
        this.dis = this.court_yscale(18);
        
      this.gamedropdown1=d3.select('#ShotChart1')
                              .append('select')
                              .attr('id','gamedropdown')
                              .attr('name','gamedropdown')
      this.playerdropdown1=d3.select('#ShotChart1')
                              .append('select')
                              .attr('id','playerdropdown')
                              .attr('name','playerdropdown')
        
      this.shotdropdown1=d3.select('#ShotChart1')
                            .append('select')
                            .attr('id','shotdropdown')
                            .attr('name','shotdropdown')
      
      this.gamedropdown2=d3.select('#ShotChart2')
                            .append('select')
                            .attr('id','gamedropdown')
                            .attr('name','gamedropdown')

      this.playerdropdown2=d3.select('#ShotChart2')
                            .append('select')
                            .attr('id','playerdropdown')
                            .attr('name','playerdropdown')
      
      this.shotdropdown2=d3.select('#ShotChart2')
                          .append('select')
                          .attr('id','shotdropdown')
                          .attr('name','shotdropdown')

        this.svg1 = d3
              .select("#ShotChart1")
              .append("svg")
              .attr("width", this.width)
              .attr("height", this.height)

        this.basket1=this.svg1.append('circle')
              .attr('cx',this.court_xscale(0))
              .attr('cy',this.court_yscale(-.75))
              .attr('r',10)
              .style('fill','none')
              .style('stroke','white'); 
        
        this.backboard1=this.svg1.append('rect')
              .attr('x',this.court_xscale(-3))
              .attr('y',this.court_yscale(-1.5))
              .attr('width',this.court_xscale(3)-this.court_xscale(-3))
              .attr('height',1)
              .style('fill','none')
              .style('stroke','white');
        
        this.outerbox1 = this.svg1.append('rect')
              .attr('x',this.court_xscale(-8))
              .attr('y',this.court_yscale(-4))
              .attr('width',this.court_xscale(8)-this.court_xscale(-8))
              .attr('height',this.court_yscale(15)-this.court_yscale(-4))
              .style('fill','none')
              .style('stroke','white');
        
        this.innerbox1 = this.svg1.append('rect')
              .attr('x', this.court_xscale(-6))
              .attr('y', this.court_yscale(-4))
              .attr('width', this.court_xscale(6)-this.court_xscale(-6))
              .attr('height', this.court_yscale(15)-this.court_yscale(-4))
              .style('fill', 'none')
              .style('stroke', 'white');

        this.leftcornerthree1=this.svg1.append('rect')
              .attr('x', this.court_xscale(-22))
              .attr('y', this.court_yscale(-4))
              .attr('width', 1)
              .attr('height', this.court_yscale(10)-this.court_yscale(-4))
              .style('fill', 'none')
              .style('stroke', 'white');

        this.rightcornerthree1=this.svg1.append('rect')
              .attr('x', this.court_xscale(22))
              .attr('y', this.court_yscale(-4))
              .attr('width', 1)
              .attr('height', this.court_yscale(10)-this.court_yscale(-4))
              .style('fill', 'none')
              .style('stroke', 'white');

        this.outerline1=this.svg1.append('rect')
             .attr('x',this.court_xscale(-25))
             .attr('y',this.court_yscale(-4))
             .attr('width',this.court_xscale(25)-this.court_xscale(-25))
             .attr('height',this.court_yscale(43)-this.court_yscale(-4))
             .style('fill','none')
             .style('stroke','white')
        
        this.Topfreethrow1 = this.svg1.append('path');
        this.Bottomfreethrow1 = this.svg1.append('path');
        this.restricted_area1 = this.svg1.append('path');
        this.three_point_line1 = this.svg1.append('path');
        this.centerout1 = this.svg1.append('path');
        this.centerin1 = this.svg1.append('path');

appendArcPath(this.three_point_line1, this.dis, (this.angle+90)*(Math.PI/180), (270-this.angle)*(Math.PI/180))
        .attr('fill', 'none')
        .attr("stroke", "white")
        .attr('class', 'shot-chart-court-3pt-line')
        .attr("transform", "translate(" + this.court_xscale(0) + ", " +this.court_yscale(0) +")");

appendArcPath(this.centerout1, this.court_xscale(6)-this.court_xscale(0), (-90)*(Math.PI/180), (90)*(Math.PI/180))
        .attr('fill', 'none')
        .attr("stroke", "white")
        .attr("transform", "translate(" + this.court_xscale(0) + ", " +this.court_yscale(43) +")");

appendArcPath(this.centerin1, this.court_xscale(2)-this.court_xscale(0), (-90)*(Math.PI/180), (90)*(Math.PI/180))
        .attr('fill', 'none')
        .attr("stroke", "white")
        .attr("transform", "translate(" + this.court_xscale(0) + ", " +this.court_yscale(43) +")");

appendArcPath(this.restricted_area1, this.court_xscale(3)-this.court_xscale(0), (90)*(Math.PI/180), (270)*(Math.PI/180))
        .attr('fill', 'none')
        .attr("stroke", "white")
        .attr("transform", "translate(" + this.court_xscale(0) + ", " +this.court_yscale(-0.75) +")");
        
appendArcPath(this.Topfreethrow1, this.court_xscale(6)-this.court_xscale(0), (90)*(Math.PI/180), (270)*(Math.PI/180))
        .attr('fill', 'none')
        .attr("stroke", "white")
        .attr("transform", "translate(" + this.court_xscale(0) + ", " +this.court_yscale(15) +")");

appendArcPath(this.Bottomfreethrow1, this.court_xscale(6)-this.court_xscale(0), (-90)*(Math.PI/180), (90)*(Math.PI/180))
        .attr('fill', 'none')
        .attr("stroke", "white")
        .style("stroke-dasharray", ("3, 3"))
        .attr("transform", "translate(" + this.court_xscale(0) + ", " +this.court_yscale(15) +")");

//SVG2 
        this.svg2 = d3
              .select("#ShotChart2")
              .append("svg")
              .attr("width", this.width)
              .attr("height", this.height);
        this.basket2=this.svg2.append('circle')
              .attr('cx',this.court_xscale(0))
              .attr('cy',this.court_yscale(-.75))
              .attr('r',10)
              .style('fill','none')
              .style('stroke','white'); 
        
        this.backboard2=this.svg2.append('rect')
              .attr('x',this.court_xscale(-3))
              .attr('y',this.court_yscale(-1.5))
              .attr('width',this.court_xscale(3)-this.court_xscale(-3))
              .attr('height',1)
              .style('fill','none')
              .style('stroke','white');
        
        this.outerbox2 = this.svg2.append('rect')
              .attr('x',this.court_xscale(-8))
              .attr('y',this.court_yscale(-4))
              .attr('width',this.court_xscale(8)-this.court_xscale(-8))
              .attr('height',this.court_yscale(15)-this.court_yscale(-4))
              .style('fill','none')
              .style('stroke','white')
        this.innerbox2 = this.svg2.append('rect')
              .attr('x', this.court_xscale(-6))
              .attr('y', this.court_yscale(-4))
              .attr('width', this.court_xscale(6)-this.court_xscale(-6))
              .attr('height', this.court_yscale(15)-this.court_yscale(-4))
              .style('fill', 'none')
              .style('stroke', 'white');

        this.leftcornerthree2=this.svg2.append('rect')
              .attr('x', this.court_xscale(-22))
              .attr('y', this.court_yscale(-4))
              .attr('width', 1)
              .attr('height', this.court_yscale(10)-this.court_yscale(-4))
              .style('fill', 'none')
              .style('stroke', 'white');

        this.rightcornerthree2=this.svg2.append('rect')
              .attr('x', this.court_xscale(22))
              .attr('y', this.court_yscale(-4))
              .attr('width', 1)
              .attr('height', this.court_yscale(10)-this.court_yscale(-4))
              .style('fill', 'none')
              .style('stroke', 'white');

        this.outerline2=this.svg2.append('rect')
             .attr('x',this.court_xscale(-25))
             .attr('y',this.court_yscale(-4))
             .attr('width',this.court_xscale(25)-this.court_xscale(-25))
             .attr('height',this.court_yscale(43)-this.court_yscale(-4))
             .style('fill','none')
             .style('stroke','white')

        this.Topfreethrow2 = this.svg2.append('path');
        this.Bottomfreethrow2 = this.svg2.append('path');
        this.restricted_area2 = this.svg2.append('path');
        this.three_point_line2 = this.svg2.append('path');
        this.centerout2 = this.svg2.append('path');
        this.centerin2 = this.svg2.append('path');

appendArcPath(this.three_point_line2, this.dis, (this.angle+90)*(Math.PI/180), (270-this.angle)*(Math.PI/180))
        .attr('fill', 'none')
        .attr("stroke", "white")
        .attr('class', 'shot-chart-court-3pt-line')
        .attr("transform", "translate(" + this.court_xscale(0) + ", " +this.court_yscale(0) +")");

appendArcPath(this.centerout2, this.court_xscale(6)-this.court_xscale(0), (-90)*(Math.PI/180), (90)*(Math.PI/180))
        .attr('fill', 'none')
        .attr("stroke", "white")
        .attr("transform", "translate(" + this.court_xscale(0) + ", " +this.court_yscale(43) +")");

appendArcPath(this.centerin2, this.court_xscale(2)-this.court_xscale(0), (-90)*(Math.PI/180), (90)*(Math.PI/180))
        .attr('fill', 'none')
        .attr("stroke", "white")
        .attr("transform", "translate(" + this.court_xscale(0) + ", " +this.court_yscale(43) +")");

appendArcPath(this.restricted_area2, this.court_xscale(3)-this.court_xscale(0), (90)*(Math.PI/180), (270)*(Math.PI/180))
        .attr('fill', 'none')
        .attr("stroke", "white")
        .attr("transform", "translate(" + this.court_xscale(0) + ", " +this.court_yscale(-0.75) +")");
        
appendArcPath(this.Topfreethrow2, this.court_xscale(6)-this.court_xscale(0), (90)*(Math.PI/180), (270)*(Math.PI/180))
        .attr('fill', 'none')
        .attr("stroke", "white")
        .attr("transform", "translate(" + this.court_xscale(0) + ", " +this.court_yscale(15) +")");

appendArcPath(this.Bottomfreethrow2, this.court_xscale(6)-this.court_xscale(0), (-90)*(Math.PI/180), (90)*(Math.PI/180))
        .attr('fill', 'none')
        .attr("stroke", "white")
        .style("stroke-dasharray", ("3, 3"))
        .attr("transform", "translate(" + this.court_xscale(0) + ", " +this.court_yscale(15) +")");
    
        function appendArcPath(base, radius, startAngle, endAngle){
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
    }

updateOptions(state,setGlobalState,setLocalState){
    //this.filteredData1 = state.data1.filter(d=>d.TEAM_NAME.includes(state.selectedTeams[0]));
    //this.filteredData2 = state.data1.filter(d=>d.TEAM_NAME.includes(state.selectedTeams[1]));    
    
    //console.log(this.filteredData1[0].shot_id)
        this.selectGame1=this.gamedropdown1
                             .on('change',function(){
                                setLocalState({selectedGame1:parseInt(this.value,10)})
                             })
                              .selectAll('option')
                              .data(['All Games',...d3.map(state.data1, function(d){return d['game_number'];}).keys()])
                              .join('option')
                              .attr('value',d=>d)
                              .text(d=>d)
                              .property("selected", function(d){
                                return d === "All Games";
                            });
    
        this.selectGame2=this.gamedropdown2
                             .on('change',function(){
                                     setLocalState({selectedGame2:parseInt(this.value,10)})
                            })
                              .selectAll('option')
                              .data(['All Games',...d3.map(state.data1, function(d){return d['game_number'];}).keys()])
                              .join('option')
                              .attr('value',d=>d)
                              .text(d=>d)
                              .property("selected", function(d){
                                return d === "All Games";
                            });
        this.selectshot1=this.shotdropdown1
                             .on('change',function(){
                                 setLocalState({selectedShot1:this.value})
                             })
                             .selectAll('option')
                             .data(['All Shots','Made Shot','Missed Shot'])
                             .join('option')
                             .attr('value',d=>d)
                             .text(d=>d)
                             .property('selected',d=>{return d === 'All Shots';})
        this.selectshot2=this.shotdropdown2 
                             .on('change',function(){
                                 setLocalState({selectedShot2:this.value})
                             })
                             .selectAll('option')
                             .data(['All Shots','Made Shot','Missed Shot'])
                             .join('option')
                             .attr('value',d=>d)
                             .text(d=>d)
                             .property('selected',d=>{return d === 'All Shots';})

        this.selectplayer1=this.playerdropdown1
                               .on('change',function(){
                                   setLocalState({selectedPlayer1:this.value})
                               })
                               .selectAll('option')
                               .data(['All Players',...state.playerNames1])
                               .join('option')
                               .attr('value',d=>d)
                               .text(d=>d)
                               .property('selected',d=>{return d === 'All Players';})
        this.selectplayer2=this.playerdropdown2
                               .on('change',function(){
                                   setLocalState({selectedPlayer2:this.value})
                               })
                               .selectAll('option')
                               .data(['All Players',...state.playerNames2])
                               .join('option')
                               .attr('value',d=>d)
                               .text(d=>d)
                               .property('selected',d=>{return d === 'All Players';})

        this.dot1 = this.svg1.selectAll('.dot')
                             .data(state.filteredData1,d=>d.shot_id)
                             .join(enter => enter
                                .append('circle')
                                .attr('class','dot')
                                .attr('fill',d=>{
                                    if(d.SHOT_MADE_FLAG===1){
                                        return 'green';
                                   } else if(d.SHOT_MADE_FLAG===0){
                                        return 'red'; 
                                    }})
                                .attr('opacity',.5)
                                .attr('cx',d=>this.shot_xscale(d.LOC_X))
                                .attr('cy',d=>this.shot_yscale(d.LOC_Y))
                                .attr('r',5),
                                update=>update.attr('cx',d=>this.shot_xscale(d.LOC_X))
                                              .attr('cy',d=>this.shot_yscale(d.LOC_Y)),
                                exit=>exit.call(exit => exit
                                    .transition()
                                    .delay(500)
                                    .duration(1000)
                                    .attr('r',0)
                                    .remove())
                             )

        this.dot2 = this.svg2.selectAll('.dot')
                             .data(state.filteredData2,d=>d.shot_id)
                             .join( enter => enter
                                .append('circle')
                                .attr('class','dot')
                                .attr('fill',d=>{
                                    if(d.SHOT_MADE_FLAG===1){
                                        return 'green';
                                   } else if(d.SHOT_MADE_FLAG===0){
                                        return 'red'; 
                                    }})
                                .attr('opacity',.5)
                                .attr('cx',d=>this.shot_xscale(d.LOC_X))
                                .attr('cy',d=>this.shot_yscale(d.LOC_Y))
                                .attr('r',5),
                                update=>update.attr('cx',d=>this.shot_xscale(d.LOC_X))
                                              .attr('cy',d=>this.shot_yscale(d.LOC_Y)),
                                exit=>exit.call(exit => exit
                                    .transition()
                                    .delay(500)
                                    .duration(1000)
                                    .attr('r',0)
                                    .remove())
                             );
    }

draw(state,setGlobalState,setLocalState){
    this.fd1;

    if ((state.selectedGame1 !== 'All Games')&&(state.selectedShot1!=='All Shots')&&(state.selectedPlayer1!=='All Players')){
        this.fd1 = state.filteredData1.filter(d=>{
            return d.game_number===state.selectedGame1 && d.PlAYER_NAME === state.selectedPlayer1 && d.EVENT_TYPE === state.selectedShot1});
    }else if((state.selectedGame1 === 'All Games')&&(state.selectedShot1==='All Shots')&&(state.selectedPlayer1==='All Players')){
        return state.filteredData1;
    }else if((state.selectedGame1 !== 'All Games')&&(state.selectedShot1==='All Shots')&&(state.selectedPlayer1==='All Players')){
        this.fd1 = state.filteredData1.filter(d=>{
            return d.game_number===state.selectedGame1});
    }else if((state.selectedGame1 === 'All Games')&&(state.selectedShot1!=='All Shots')&&(state.selectedPlayer1==='All Players')){
        this.fd1 = state.filteredData1.filter(d=>{
            return d.EVENT_TYPE === state.selectedShot1});
    }else if((state.selectedGame1 === 'All Games')&&(state.selectedShot1==='All Shots')&&(state.selectedPlayer1!=='All Players')){
        this.fd1 = state.filteredData1.filter(d=>{
            return d.PLAYER_NAME === state.selectedPlayer1});
    }else if((state.selectedGame1 !== 'All Games')&&(state.selectedShot1!=='All Shots')&&(state.selectedPlayer1==='All Players')){
        this.fd1 = state.filteredData1.filter(d=>{
            return d.game_number === state.selectedGame1 && d.EVENT_TYPE === state.selectedShot1});
    }else if((state.selectedGame1 === 'All Games')&&(state.selectedShot1!=='All Shots')&&(state.selectedPlayer1!=='All Players')){
        this.fd1 = state.filteredData1.filter(d=>{
            return d.EVENT_TYPE === state.selectedShot1 && d.PLAYER_NAME === state.selectedPlayer1});
    }else if((state.selectedGame1 !== 'All Games')&&(state.selectedShot1==='All Shots')&&(state.selectedPlayer1!=='All Players')){
        this.fd1 = state.filteredData1.filter(d=>{
            return d.game_number === state.selectedGame1 && d.PLAYER_NAME === state.selectedPlayer1});
    }

    //if((state.selectedGame2 !== 'All Games')&&(state.selectedShot2!=='All Shots')&&(state.selectedPlayer2!=='All Players')){
        //this.filteredData2 = state.data1.filter(d=>d.game_number===state.selectedGame2 && d.PlAYER_NAME === state.selectedPlayer2 && d.EVENT_TYPE === state.selectedShot2);
    //}else if((state.selectedGame2 === 'All Games')&&(state.selectedShot2==='All Shots')&&(state.selectedPlayer2==='All Players')){
        //return this.filteredData2;
    //}else if((state.selectedGame2 !== 'All Games')&&(state.selectedShot2==='All Shots')&&(state.selectedPlayer2==='All Players')){
        //this.filteredData2 = state.data1.filter(d=>d.game_number===state.selectedGame2);
    //}else if((state.selectedGame2 === 'All Games')&&(state.selectedShot2!=='All Shots')&&(state.selectedPlayer2==='All Players')){
        //this.filteredData2 = state.data1.filter(d=>d.EVENT_TYPE === state.selectedShot2);
    //}else if((state.selectedGame2 === 'All Games')&&(state.selectedShot2==='All Shots')&&(state.selectedPlayer2!=='All Players')){
        //this.filteredData2 = state.data1.filter(d=>d.PLAYER_NAME === state.selectedPlayer2);
    //}else if((state.selectedGame2 !== 'All Games')&&(state.selectedShot2!=='All Shots')&&(state.selectedPlayer2==='All Players')){
        //this.filteredData2 = state.data1.filter(d=>d.game_number === state.selectedGame2 && d.EVENT_TYPE === state.selectedShot2);
    //}else if((state.selectedGame2 === 'All Games')&&(state.selectedShot2!=='All Shots')&&(state.selectedPlayer2!=='All Players')){
        //this.filteredData2 = state.data1.filter(d=>d.EVENT_TYPE === state.selectedShot2 && d.PLAYER_NAME === state.selectedPlayer2);
    //}else if((state.selectedGame2 !== 'All Games')&&(state.selectedShot2==='All Shots')&&(state.selectedPlayer2!=='All Players')){
        //this.filteredData2 = state.data1.filter(d=>d.game_number === state.selectedGame2 && d.PLAYER_NAME === state.selectedPlayer2);
    //}

//this.dot1 = this.svg1.selectAll('.dot')
    //.data(this.filteredData1,d=>d.shot_id)
    //.join(
       //update=>update.attr('cx',d=>this.shot_xscale(d.LOC_X))
                     //.attr('cy',d=>this.shot_yscale(d.LOC_Y)),
       //exit=>exit.call(exit => exit
           //.transition()
           //.delay(500)
           //.duration(1000)
           //.attr('r',0)
           //.remove())
   // )
    console.log('data1:',this.fd1)
    //console.log('data2:',this.filteredData2)
}

}

export { Shotchart };