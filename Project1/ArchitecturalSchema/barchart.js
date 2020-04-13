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

        //this.svgquart1 = d3!
            //.select('#Chart1')
            //.append('svg')
            //.attr('width',this.width)
            //.attr('height',this.height)

        //this.svgquart2 = d3
            //.select('#Chart2')
            //.append('svg')
            //.attr('width',this.width)
            //.attr('height',this.height)
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
        //this.quarter=[1,2,3,4]
        
        //this.allshotdata1=this.shotTypes.map(shotType => {
            //return{
                //shotType:shotType,
                //valueMade:d3.count(state.filteredData1.filter(d=>shotType===d.SHOT_ZONE_BASIC && d.SHOT_MADE_FLAG===1),d=>d.SHOT_MADE_FLAG),
                //valueMisses:d3.count(state.filteredData1.filter(d=>shotType===d.SHOT_ZONE_BASIC && d.SHOT_MADE_FLAG===0),d=>d.SHOT_MADE_FLAG),
            //}
        //})

        //this.allshotdata2=this.shotTypes.map(shotType=>{
            //return{
                //shotType:shotType,
                //valueMade:d3.count(state.filteredData2.filter(d=>shotType===d.SHOT_ZONE_BASIC && d.SHOT_MADE_FLAG===1),d=>d.SHOT_MADE_FLAG),
                //valueMisses:d3.count(state.filteredData2.filter(d=>shotType===d.SHOT_ZONE_BASIC && d.SHOT_MADE_FLAG===0),d=>d.SHOT_MADE_FLAG),
            //}
        //})

        //this.allquarterdata1=this.quarter.map(quarter=>{
            //return {
                //quarter:quarter,
                //valueMade:d3.count(state.filteredData1.filter(d=>quarter===d.PERIOD && d.SHOT_MADE_FLAG===1),d=>d.SHOT_MADE_FLAG),
                //valueMisses:d3.count(state.filteredData1.filter(d=>quarter===d.PERIOD && d.SHOT_MADE_FLAG===0),d=>d.SHOT_MADE_FLAG)
            //}
        //})
        //this.allquarterdata2=this.quarter.map(quarter=>{
            //return{
                //quarter:quarter,
                //valueMade:d3.count(state.filteredData2.filter(d=>quarter===d.PERIOD && d.SHOT_MADE_FLAG===1),d=>d.SHOT_MADE_FLAG),
                //valueMisses:d3.count(state.filteredData2.filter(d=>quarter===d.PERIOD && d.SHOT_MADE_FLAG===0),d=>d.SHOT_MADE_FLAG)
            //}
        //})

        //this.quarterdata1=this.quarter.map(quarter=>{
            //return {
                //quarter:quarter,
                //valueMade:d3.count(this.fd1.filter(d=>quarter===d.PERIOD && d.SHOT_MADE_FLAG===1),d=>d.SHOT_MADE_FLAG),
                //valueMisses:d3.count(this.fd1.filter(d=>quarter===d.PERIOD && d.SHOT_MADE_FLAG===0),d=>d.SHOT_MADE_FLAG)
            //}
        //})

        //this.quarterdata2=this.quarter.map(quarter=>{
            //return{
                //quarter:quarter,
                //valueMade:d3.count(this.fd2.filter(d=>quarter===d.PERIOD && d.SHOT_MADE_FLAG===1),d=>d.SHOT_MADE_FLAG),
                //valueMisses:d3.count(this.fd2.filter(d=>quarter===d.PERIOD && d.SHOT_MADE_FLAG===0),d=>d.SHOT_MADE_FLAG)
            //}
        //})
        
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

        //console.log(this.keys.map(key => ({key, value: d[key]})))

        this.xScale0 = d3.scaleBand()
                         .domain(this.shotTypes)
                         .rangeRound([this.margin.left,this.width-this.margin.right])
                         .paddingInner(.1);

        this.xScale1 = d3.scaleBand()
                         .domain(this.keys)
                         .rangeRound([0,this.xScale0.bandwidth()])
                         .paddingInner(.05);
        
        //this.xqScale0 = d3.scaleBand()
                          //.domain(this.quarter)
                          //.rangeRound([this.margin.left,this.width-this.margin.right])
                          //.paddingInner(.1);

        //this.xqScale1= d3.scaleBand()
                         //.domain(this.keys)
                         //.rangeRound([0,this.xqScale0.bandwidth()])
                         //.paddingInner(.05);

        this.yScale1 = d3.scaleLinear()
                         .domain([0,d3.max(this.shotdata1.map(d=>[d['valueMade'],d['valueMisses']]),d=>{return d3.max(d)})])
                         .range([this.height-this.margin.top,this.margin.bottom])

        this.yScale2 = d3.scaleLinear()
                         .domain([0,d3.max(this.shotdata2.map(d=>[d['valueMade'],d['valueMisses']]),d=>{return d3.max(d)})])
                         .range([this.height-this.margin.top,this.margin.bottom])

        //this.yqScale1 = d3.scaleLinear()
                          //.domain([0,d3.max(this.quarterdata1.map(d=>[d['valueMade'],d['valueMisses']]),d=>{return d3.max(d)})])
                          //.range([this.height-this.margin.top,this.margin.bottom]) 
        
        //this.yqScale2 = d3.scaleLinear()
                          //.domain([0,d3.max(this.quarterdata2.map(d=>[d['valueMade'],d['valueMisses']]),d=>{return d3.max(d)})])
                          //.range([this.height-this.margin.top,this.margin.bottom])
        
        this.xaxis = d3.axisBottom(this.xScale0)
        this.yaxis1 = d3.axisLeft(this.yScale1)
        this.yaxis2 = d3.axisLeft(this.yScale2)

        //this.xqaxis = d3.axisBottom(this.xqScale0)
        //this.yqaxis1 = d3.axisLeft(this.yqScale1)
        //this.yqaxis2 = d3.axisLeft(this.yqScale2)
        

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

        //this.svgquart1
            //.append('g')
            //.attr('class','axis')
            //.attr('transform',`translate(0,${this.height-this.margin.bottom})`)
            //.call(this.xqaxis)
            //.append('text')
            //.attr('class','axis-label')
            //.attr('x','50%')
            //.attr("dy","3em")
            //.text('Quarter')

       // this.svgquart2 
            //.append('g')
            //.attr('class','axis')
            //.attr('transform',`translate(0,${this.height-this.margin.bottom})`)
            //.call(this.xqaxis)
            //.append('text')
            // .attr('class','axis-label')
            // .attr('x','50%')
            // .attr("dy","3em")
            // .text('Quarter')

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

        // this.quartbars1=this.svgquart1
        //                     .selectAll('.quartbars')
        //                     .data(this.quarterdata1)
        //                     .join('g')
        //                     .attr('class','quartbars')
        //                     .attr('transform',d=>`translate(${this.xqScale0(d.quarter)},0)`)
        //                     .selectAll('rect')
        //                     .data(d => this.keys.map(key => ({key, value: d[key]})))
        //                     .join(enter=>enter
        //                         .append('rect')
        //                         .style('fill',d=>{
        //                            if(d.key==='valueMade'){
        //                                return 'green';
        //                            }else if(d.key==='valueMisses'){
        //                                return 'red';
        //                            }
        //                        })
        //                         .attr('opacity',.5)
        //                         .attr('x',d=>this.xqScale1(d.key))
        //                         .attr('y',d=>this.yqScale1(0))
        //                         .attr('width',this.xqScale1.bandwidth())
        //                         .attr('height',this.height-this.margin.top-this.yqScale1(0))
        //                         .call(enter=>enter
        //                            .transition()
        //                            .duration(3000)
        //                            .attr('y',d=>this.yqScale1(d.value))
        //                            .attr('height',d=>this.yqScale1(0) - this.yqScale1(d.value))),
        //                  update=>update.call(update=>update
        //                    .transition()
        //                    .duration(5000)
        //                    .attr('y',d=>this.yqScale1(d.value))
        //                    .attr('height',d=>this.yqScale1(0) - this.yqScale1(d.value)))
        //                 )

        // this.quartbars2=this.svgquart2
        //                     .selectAll('.quartbars')
        //                     .data(this.quarterdata2)
        //                     .join('g')
        //                     .attr('class','quartbars')
        //                     .attr('transform',d=>`translate(${this.xqScale0(d.quarter)},0)`)
        //                     .selectAll('rect')
        //                     .data(d => this.keys.map(key => ({key, value: d[key]})))
        //                     .join(enter=>enter
        //                                 .append('rect')
        //                                 .style('fill',d=>{
        //                                         if(d.key==='valueMade'){
        //                                                 return 'green';
        //                                         }else if(d.key==='valueMisses'){
        //                                                 return 'red';
        //                                             }
        //                                     })
        //                                 .attr('opacity',.5)
        //                                 .attr('x',d=>this.xqScale1(d.key))
        //                                 .attr('y',d=>this.yqScale2(0))
        //                                 .attr('width',this.xqScale1.bandwidth())
        //                                 .attr('height',this.height-this.margin.top-this.yqScale2(0))
        //                                 .call(enter=>enter
        //                                             .transition()
        //                                             .duration(3000)
        //                                             .attr('y',d=>this.yqScale2(d.value))
        //                                             .attr('height',d=>this.yqScale2(0) - this.yqScale2(d.value))),
        //                                         update=>update.call(update=>update
        //                                                         .transition()
        //                                                         .duration(5000)
        //                                                         .attr('y',d=>this.yqScale2(d.value))
        //                                                         .attr('height',d=>this.yqScale2(0) - this.yqScale2(d.value)))
        //                           )


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

// this.quartertext1=this.svgquart1
//         .selectAll('.quartertext1')
//         .data(this.quarterdata1)
//         .join('g')
//         .attr('class','quartertext1')
//         .attr('transform',d=>`translate(${this.xqScale0(d.quarter)},0)`)
//         .selectAll('text')
//         .data(d => this.keys.map(key => ({key, value: d[key]})))
//         .join(
//          enter=>enter
//                   .append('text')
//                   .style('fill','white')
//                   .attr('opacity',.5)
//                   .attr('x',d=>this.xqScale1(d.key))
//                   .attr('y',d=>this.yqScale1(0))
//                   .attr('width',this.xqScale1.bandwidth())
//                   .attr('height',this.height-this.margin.top-this.yqScale1(0))
//                   .attr('dx',".6em")
//                   .text(d=>{
//                       if(d.value===0){
//                             return null; 
//                       }else{
//                           return d.value;
//                       }
//                  })
//                   .call(enter=>enter
//                      .transition()
//                      .duration(3000)
//                      .attr('y',d=>this.yqScale1(d.value))
//                      .attr('height',d=>this.yqScale1(0) - this.yqScale1(d.value))),
//            update=>update.call(update=>update
//              .transition()
//              .duration(5000)
//              .text(d=>{
//                  if(d.value===0){
//                        return null; 
//                  }else{
//                      return d.value;
//                  }
//             })
//              .attr('y',d=>this.yqScale1(d.value))
//              .attr('height',d=>this.yqScale1(0) - this.yqScale1(d.value))),
//            exit=>exit.remove()
//        )

//         this.quartertext2=this.svgquart2
//         .selectAll('.quartertext2')
//         .data(this.quarterdata2)
//         .join('g')
//         .attr('class','quartertext2')
//         .attr('transform',d=>`translate(${this.xqScale0(d.quarter)},0)`)
//         .selectAll('text')
//         .data(d => this.keys.map(key => ({key, value: d[key]})))
//         .join(
//          enter=>enter
//                   .append('text')
//                   .style('fill','white')
//                   .attr('opacity',.5)
//                   .attr('x',d=>this.xqScale1(d.key))
//                   .attr('y',d=>this.yqScale2(0))
//                   .attr('width',this.xqScale1.bandwidth())
//                   .attr('height',this.height-this.margin.top-this.yqScale2(0))
//                   .attr('dx',".6em")
//                   .text(d=>{
//                       if(d.value===0){
//                             return null; 
//                       }else{
//                           return d.value;
//                       }
//                  })
//                   .call(enter=>enter
//                      .transition()
//                      .duration(3000)
//                      .attr('y',d=>this.yqScale2(d.value))
//                      .attr('height',d=>this.yqScale2(0) - this.yqScale2(d.value))),
//            update=>update.call(update=>update
//              .transition()
//              .duration(5000)
//              .text(d=>{
//                  if(d.value===0){
//                        return null; 
//                  }else{
//                      return d.value;
//                  }
//             })
//              .attr('y',d=>this.yqScale2(d.value))
//              .attr('height',d=>this.yqScale2(0) - this.yqScale2(d.value))),
//            exit=>exit.remove()
//        )
        
    }


}

export { Barchart };