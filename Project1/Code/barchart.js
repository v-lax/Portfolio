class Barchart {
    constructor(state,setGlobalState,setLocalState){
        this.width= window.innerWidth*.5;
        this.height = window.innerHeight*.6;
        this.margin = {top:20,bottom:20,left:20,right:20};

        this.svg1 = d3
            .select('#BarChart1')
            .append('svg')
            .attr('width',this.width)
            .attr('height',this.height);
        
        this.svg2 = d3
            .select('#BarChart2')
            .append('svg')
            .attr('width',this.width)
            .attr('height',this.height);
        
        this.yScale1=d3.scaleLinear()            
        this.yScale2=d3.scaleLinear()
                    
        this.yaxis1 = d3.axisLeft(this.yScale1)
        this.yaxis2 = d3.axisLeft(this.yScale2)
                       
    }

    draw(state,setGlobalState,setLocalState){
        //use state.filteredData1 and 2 
        this.fd1 = state.filteredData1.filter(d=>{
            if((state.selectedGame1 !== 'All Games')&&(state.selectedShot1!=='All Shots')&&(state.selectedPlayer1!=='All Players')){
                return d.game_number===state.selectedGame1 && d.PLAYER_NAME === state.selectedPlayer1 && d.EVENT_TYPE===state.selectedShot1;
            }else if((state.selectedGame1 === 'All Games')&&(state.selectedShot1==='All Shots')&&(state.selectedPlayer1==='All Players')){
                return true; 
            }else if((state.selectedGame1 !== 'All Games')&&(state.selectedShot1==='All Shots')&&(state.selectedPlayer1==='All Players')){
                return d.game_number === state.selectedGame1;
            }else if((state.selectedGame1 === 'All Games')&&(state.selectedShot1!=='All Shots')&&(state.selectedPlayer1==='All Players')){
                return d.EVENT_TYPE === state.selectedShot1;
            }else if((state.selectedGame1 === 'All Games')&&(state.selectedShot1==='All Shots')&&(state.selectedPlayer1!=='All Players')){
                 return d.PLAYER_NAME === state.selectedPlayer1;
            }else if((state.selectedGame1 !== 'All Games')&&(state.selectedShot1!=='All Shots')&&(state.selectedPlayer1==='All Players')){
                return d.game_number === state.selectedGame1 && d.EVENT_TYPE === state.selectedShot1;
            }else if((state.selectedGame1 === 'All Games')&&(state.selectedShot1!=='All Shots')&&(state.selectedPlayer1!=='All Players')){
                return d.EVENT_TYPE === state.selectedShot1 && d.PLAYER_NAME === state.selectedPlayer1;
            }else if((state.selectedGame1 !== 'All Games')&&(state.selectedShot1==='All Shots')&&(state.selectedPlayer1!=='All Players')){
                return d.game_number === state.selectedGame1 && d.PLAYER_NAME === state.selectedPlayer1;
            }
        })

        this.fd2 = state.filteredData2.filter(d=>{
            if((state.selectedGame2 !== 'All Games')&&(state.selectedShot2!=='All Shots')&&(state.selectedPlayer2!=='All Players')){
                return d.game_number===state.selectedGame2 && d.PLAYER_NAME === state.selectedPlayer2 && d.EVENT_TYPE===state.selectedShot2;
            }else if((state.selectedGame2 === 'All Games')&&(state.selectedShot2==='All Shots')&&(state.selectedPlayer2==='All Players')){
                return true; 
            }else if((state.selectedGame2 !== 'All Games')&&(state.selectedShot2==='All Shots')&&(state.selectedPlayer2==='All Players')){
                return d.game_number === state.selectedGame2;
            }else if((state.selectedGame2 === 'All Games')&&(state.selectedShot2!=='All Shots')&&(state.selectedPlayer2==='All Players')){
                return d.EVENT_TYPE === state.selectedShot2;
            }else if((state.selectedGame2 === 'All Games')&&(state.selectedShot2==='All Shots')&&(state.selectedPlayer2!=='All Players')){
                return d.PLAYER_NAME === state.selectedPlayer2;
            }else if((state.selectedGame2 !== 'All Games')&&(state.selectedShot2!=='All Shots')&&(state.selectedPlayer2==='All Players')){
                return d.game_number === state.selectedGame2 && d.EVENT_TYPE === state.selectedShot2;
            }else if((state.selectedGame2 === 'All Games')&&(state.selectedShot2!=='All Shots')&&(state.selectedPlayer2!=='All Players')){
                return d.EVENT_TYPE === state.selectedShot2 && d.PLAYER_NAME === state.selectedPlayer2;
            }else if((state.selectedGame2 !== 'All Games')&&(state.selectedShot2==='All Shots')&&(state.selectedPlayer2!=='All Players')){
                return d.game_number === state.selectedGame2 && d.PLAYER_NAME === state.selectedPlayer2;
            }})
    
        this.shotTypes = ['Restricted Area','Above the Break 3','Mid-Range','In The Paint(Non-RA)','Right Corner 3','Left Corner 3','Backcourt'];
        this.keys=['valueMade','valueMisses'];
        
        this.shotdata1 = this.shotTypes.map(shotType=>{
            return {
                shotType:shotType,
                valueMade:d3.count(this.fd1.filter(d=>shotType===d.SHOT_ZONE_BASIC && d.SHOT_MADE_FLAG===1),d=>d.SHOT_MADE_FLAG),
                valueMisses:d3.count(this.fd1.filter(d=>shotType===d.SHOT_ZONE_BASIC && d.SHOT_MADE_FLAG===0),d=>d.SHOT_MADE_FLAG)
            };
        })

        this.shotdata2 = this.shotTypes.map(shotType=>{
            return {
                shotType:shotType,
                valueMade:d3.count(this.fd2.filter(d=>shotType===d.SHOT_ZONE_BASIC && d.SHOT_MADE_FLAG===1),d=>d.SHOT_MADE_FLAG),
                valueMisses:d3.count(this.fd2.filter(d=>shotType===d.SHOT_ZONE_BASIC && d.SHOT_MADE_FLAG===0),d=>d.SHOT_MADE_FLAG)
            }
        })

        this.xScale0 = d3.scaleBand()
                         .domain(this.shotTypes)
                         .rangeRound([this.margin.left+5,this.width-this.margin.right])
                         .paddingInner(.1);

        this.xScale1 = d3.scaleBand()
                         .domain(this.keys)
                         .rangeRound([0,this.xScale0.bandwidth()])
                         .paddingInner(.05);

        this.yScale1.domain([0,d3.max(this.shotdata1.map(d=>[d['valueMade'],d['valueMisses']]),d=>{return d3.max(d)})])
                    .range([this.height-this.margin.top,this.margin.bottom])
        this.yScale2.domain([0,d3.max(this.shotdata2.map(d=>[d['valueMade'],d['valueMisses']]),d=>{return d3.max(d)})])
                    .range([this.height-this.margin.top,this.margin.bottom])
                         
        
        this.xaxis = d3.axisBottom(this.xScale0)
        

        //adding in our x-axis
        this.svg1
        .append('g')
        .attr('class','axis')
        .attr('transform',`translate(0,${this.height-this.margin.bottom})`)
        .call(this.xaxis)
        .append('text')
        .attr("class","axis-label")
        .attr("x","50%")
        .attr("dy","3em")
        .attr("transform", "rotate(90)")
        .text('Shot Zone')
        
        this.svg2
        .append('g')
        .attr('class','axis')
        .attr('transform',`translate(0,${this.height-this.margin.bottom})`)
        .call(this.xaxis)
        .append('text')
        .attr("class","axis-label")
        .attr("x","50%")
        .attr("dy","3em")
        .attr("transform", "rotate(90)")
        .text('Shot Zone')

        //adding y-axis
        this.svg1   
        .append('g')
        .attr('class','y-axis1')
        .attr('transform',`translate(${this.margin.left+4},0)`)
        
        this.svg2
            .append('g')
            .attr('class','y-axis2')
            .attr('transform',`translate(${this.margin.left+4},0)`)

        d3.select('g.y-axis1')
          .transition()
          .duration(3000)
          .call(this.yaxis1)

        d3.select('g.y-axis2')
          .transition()
          .duration(3000)
          .call(this.yaxis2)


        this.bar_names1 = this.svg1
                          .selectAll(".barnames")
                          .data(this.shotdata1)
                          .join('g')
                          .attr('class','barnames')
                          .attr('transform',d=>`translate(${this.xScale0(d.shotType)},0)`)
                          .selectAll('rect')
                          .data(d => this.keys.map(key => ({key, value: d[key]})))
                          .join(
                              enter=>enter
                                     .append('rect')
                                     .style('fill',d=>{
                                        if(d.key==='valueMade'){
                                            return 'green';
                                        }else if(d.key==='valueMisses'){
                                            return 'red';
                                        }
                                    })
                                     .attr('opacity',.5)
                                     .attr('x',d=>this.xScale1(d.key))
                                     .attr('y',d=>this.yScale1(0))
                                     .attr('width',this.xScale1.bandwidth())
                                     .attr('height',this.height-this.margin.top-this.yScale1(0))
                                     .call(enter=>enter
                                        .transition()
                                        .duration(3000)
                                        .attr('y',d=>this.yScale1(d.value))
                                        .attr('height',d=>this.yScale1(0) - this.yScale1(d.value))),
                              update=>update.call(update=>update
                                  .transition()
                                  .duration(5000)
                                  .attr('y',d=>this.yScale1(d.value))
                                  .attr('height',d=>this.yScale1(0) - this.yScale1(d.value)))
                              //exit=>exit.remove()
                              )

        this.bar_names2 = this.svg2
                          .selectAll(".barnames")
                          .data(this.shotdata2)
                          .join('g')
                          .attr('class','barnames')
                          .attr('transform',d=>`translate(${this.xScale0(d.shotType)},0)`)
                          .selectAll('rect')
                          .data(d => this.keys.map(key => ({key, value: d[key]})))
                          .join(
                            enter=>enter
                                     .append('rect')
                                     .style('fill',d=>{
                                        if(d.key==='valueMade'){
                                            return 'green';
                                        }else if(d.key==='valueMisses'){
                                            return 'red';
                                        }
                                    })
                                     .attr('opacity',.5)
                                     .attr('x',d=>this.xScale1(d.key))
                                     .attr('y',d=>this.yScale2(0))
                                     .attr('width',this.xScale1.bandwidth())
                                     .attr('height',this.height-this.margin.top-this.yScale2(0))
                                     .call(enter=>enter
                                        .transition()
                                        .duration(3000)
                                        .attr('y',d=>this.yScale2(d.value))
                                        .attr('height',d=>this.yScale2(0) - this.yScale2(d.value))),
                              update=>update.call(update=>update
                                .transition()
                                .duration(5000)
                                .attr('y',d=>this.yScale2(d.value))
                                .attr('height',d=>this.yScale2(0) - this.yScale2(d.value)))
                              //exit=>exit.remove()
                          )

     this.text1=this.svg1
                       .selectAll('.text1')
                       .data(this.shotdata1)
                       .join('g')
                       .attr('class','text1')
                       .attr('transform',d=>`translate(${this.xScale0(d.shotType)},0)`)
                       .selectAll('text')
                       .data(d => this.keys.map(key => ({key, value: d[key]})))
                       .join(
                        enter=>enter
                                 .append('text')
                                 .style('fill','white')
                                 .attr('opacity',.5)
                                 .attr('x',d=>this.xScale1(d.key))
                                 .attr('y',d=>this.yScale1(0))
                                 .attr('width',this.xScale1.bandwidth())
                                 .attr('height',this.height-this.margin.top-this.yScale1(0))
                                 .attr('dx',".6em")
                                 .text(d=>{
                                     if(d.value===0){
                                           return null; 
                                     }else{
                                         return d.value;
                                     }
                                })
                                 .call(enter=>enter
                                    .transition()
                                    .duration(3000)
                                    .attr('y',d=>this.yScale1(d.value))
                                    .attr('height',d=>this.yScale1(0) - this.yScale1(d.value))),
                          update=>update.call(update=>update
                            .transition()
                            .duration(5000)
                            .text(d=>{
                                if(d.value===0){
                                      return null; 
                                }else{
                                    return d.value;
                                }
                           })
                            .attr('y',d=>this.yScale1(d.value))
                            .attr('height',d=>this.yScale1(0) - this.yScale1(d.value))),
                          exit=>exit.remove()
                      )

        this.text2=this.svg2
                      .selectAll('.text2')
                      .data(this.shotdata2)
                      .join('g')
                      .attr('class','text2')
                      .attr('transform',d=>`translate(${this.xScale0(d.shotType)},0)`)
                      .selectAll('text')
                      .data(d => this.keys.map(key => ({key, value: d[key]})))
                      .join(
                       enter=>enter
                                .append('text')
                                .style('fill','white')
                                .attr('opacity',.5)
                                .attr('x',d=>this.xScale1(d.key))
                                .attr('y',d=>this.yScale2(0))
                                .attr('width',this.xScale1.bandwidth())
                                .attr('height',this.height-this.margin.top-this.yScale2(0))
                                .attr('dx',".6em")
                                .text(d=>{
                                    if(d.value===0){
                                          return null; 
                                    }else{
                                        return d.value;
                                    }
                               })
                                .call(enter=>enter
                                   .transition()
                                   .duration(3000)
                                   .attr('y',d=>this.yScale2(d.value))
                                   .attr('height',d=>this.yScale2(0) - this.yScale2(d.value))),
                         update=>update.call(update=>update
                           .transition()
                           .duration(5000)
                           .text(d=>{
                            if(d.value===0){
                                  return null; 
                            }else{
                                return d.value;
                            }
                       })
                           .attr('y',d=>this.yScale2(d.value))
                           .attr('height',d=>this.yScale2(0) - this.yScale2(d.value))),
                         exit=>exit.remove()
                     )

        this.legend1=this.svg1.selectAll(".legend1")
        .data(['Made Shot','Missed Shot'])
        .enter()
        .append("g")

        this.legend2=this.svg2.selectAll(".legend2")
        .data(['Made Shot','Missed Shot'])
        .enter()
        .append("g")

        this.legend1.append("rect")
                .attr("fill", d=>{
                    if(d==='Made Shot'){
                        return "green"
                    }else{
                        return "red"
                    }
                })
                .attr('opacity',.5)
                .attr("width", 20)
                .attr("height", 20)
                .attr("y", function (d, i) {
                    return (i * 40) + 60;
                })
                .attr("x", this.width-70);

        this.legend1.append("text")
                    .attr("y",function(d,i){
                        return (i*40)+70
                    })
                    .attr('x',this.width-135)
                    .attr('fill','white')
                    .attr('font-size','11px')
                    .attr('font-family','Fjalla One,sans-serif')
                    .text(d=>{return d})

        this.legend2.append("rect")
                    .attr("fill", d=>{
                        if(d==='Made Shot'){
                            return "green"
                        }else{
                            return "red"
                        }
                    })
                    .attr('opacity',.5)
                    .attr("width", 20)
                    .attr("height", 20)
                    .attr("y", function (d, i) {
                        return (i * 40) + 60;
                    })
                    .attr("x", this.width-70);
    
            this.legend2.append("text")
                        .attr("y",function(d,i){
                            return (i*40)+70
                        })
                        .attr('x',this.width-135)
                        .attr('fill','white')
                        .attr('font-size','11px')
                        .attr('font-family','Fjalla One,sans-serif')
                        .text(d=>{return d})            
        
    }


}

export { Barchart };