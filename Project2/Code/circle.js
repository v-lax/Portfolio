 class Circle{
     constructor(state){


         this.width = 900;
         this.height = 450;
         this.margins = { top: 20, bottom: 20, left: 20, right: 20 };

     var pack = d3.pack()
     .size([this.width, this.height])
     .padding(3);

     var root = d3.hierarchy(state.status)
     .sum(d=>d.value)
     .sort((a,b)=>b.value-a.value);
     
     pack(root)
     console.log(root.children)
     this.container = d3.select('#graphic')
                  .select("svg")
                  .attr("width", this.width)
                  .attr("height", this.height)
                  //.append("g")
                  //.attr("transform", `translate(${this.margins.left},${this.margins.top})`);
     
    //this.leaf = this.container
                  //.selectAll("g")
                  //.data(root.leaves())
                  //.join("g")
                  //.attr("transform",d=>`translate(${d.x},${d.y})`);
    
    this.container.selectAll('.status_circles_children')
        .data(root.children)
        .join('circle')
        .attr('class','status_circles_children')
        .attr('fill','black')
        .attr('stroke','white')
        .attr('opacity',0)
        .attr('r',d=>d.r)
        .attr('cx',d=>d.x)
        .attr('cy',d=>d.y)

   this.container.selectAll('.status_circles_children_children')
        .data(root.leaves())
        .join('circle')
        .attr('class','status_circles_children_children')
        .attr('fill','none')
        .attr('stroke','red')
        .attr('stroke-width',0)
        .attr('opacity',0)
        .attr('r',d=>d.r)
        .attr('cx',d=>d.x)
        .attr('cy',d=>d.y)
        //.on('mouseover',onMouseOver)
        //.on('mouseout',mouseOut)
    
    this.container.append('text')
                  .attr('class','status_circles_text')
                  .attr('x',300)
                  .attr('y',75)
                  .attr('opacity',0)
                  .attr('fill','white')
                  .text('Not on Death Row')
    this.container.append('text')
                  .attr('class','status_circles_text')
                  .attr('x',510)
                  .attr('y',75)
                  .attr('opacity',0)
                  .attr('fill','white')
                  .text('On Death Row')
    this.container.append('text')
                  .attr('class','status_circles_text')
                  .attr('x',320)
                  .attr('y',390)
                  .attr('opacity',0)
                  .attr('fill','white')
                  .text('Executed')
    d3.select('body').append('div')
                  .attr('class','tooltip')
                  .style('opacity',0)

                  this.container.append('text')
                  .attr('class','status_circles_numbers1')
                  .attr('x',335)
                  .attr('y',120)
                  //.attr('opacity',0)
                  .attr('fill','white')

                  this.container.append('text')
                  .attr('class','status_circles_numbers2')
                  .attr('x',560)
                  .attr('y',125)
                  //.attr('opacity',0)
                  .attr('fill','white')

                  this.container.append('text')
                  .attr('class','status_circles_numbers3')
                  .attr('x',440)
                  .attr('y',305)
                  //.attr('opacity',0)
                  .attr('fill','white')


    
    function onMouseOver(d,i){
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
      //.style('display', 'inline-block')
    }

    function mouseOut(d, i){
      d3.select('.tooltip').transition()		
      .duration(250)		
      .style("opacity", 0);	

      d3.select(this)
          .transition('mouseout').duration(100)
          .attr('opacity', 0.8)
          .attr('stroke-width', 1)
  }
     }
     startnumbersanimation(){

      d3.select('.status_circles_numbers1')
      .text(0)
      .attr('opacity',1)
      .transition()
      .ease(d3.easeLinear)
      .duration(5000)
      .tween('text',function() {
                    var i = d3.interpolate(this.textContent, 3129);
                    return function(t) {
                            this.textContent = Math.round(i(t));
                    };
                    });

      d3.select('.status_circles_numbers2')
        .text(0)
        .attr('opacity',1)
        .transition()
        .ease(d3.easeLinear)
        .duration(5000)
        .tween('text',function() {
            var i = d3.interpolate(this.textContent, 2752);
                return function(t) {
                  this.textContent = Math.round(i(t));
        };
        });
    
        d3.select('.status_circles_numbers3')
        .text(0)
        .attr('opacity',1)
        .transition()
        .ease(d3.easeLinear)
        .duration(5000)
        .tween('text',function() {
            var i = d3.interpolate(this.textContent, 1447);
                return function(t) {
                  this.textContent = Math.round(i(t));
        };
        });
     }

} 

 export {Circle};