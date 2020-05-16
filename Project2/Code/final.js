//Code for this typewriter effect was based off this great stackoverflow response.
//link - https://stackoverflow.com/questions/21567336/d3-text-transitioning-in-typewriter-style

class Final{
    constructor(state){
        this.width=900;
        this.height=400;
        this.margins = { top: 20, bottom: 20, left: 20, right: 20 };

        var i = 0;
        var txt = state.words.map(d=>d['Last Statement'])
        
        
                            //.attr('class','total_line_graph')
                            //.attr('width',this.width)
                            //.attr('height',this.height)

       var rect = d3.select('#graphic')
       .select('svg').append('rect')
        .attr('class','last_words_rect')
        .attr('x',410)
        .attr('y',20)
        .attr('width',80)
        .attr('height',30)
        .attr('opacity',0)
        .attr('fill','none')
        .attr('stroke','white')
        .attr('stroke-width',2)
        .attr('rx','15px')
        .attr('ry','15px')

        var click_text = d3.select('#graphic').select('svg')
                           .append('text')
                           .attr('class','last_words_rect')
                           .attr('x',430)
                           .attr('y',40)
                           .attr('opacity',0)
                           .attr('fill','white')
                           .attr('font-family','monospace')
                           .text('Read')

        var text = d3.select('#graphic').select('svg')
            .append('text')
            .attr('class','last_words_text')
            .attr('x',30)
            .attr('y',50)
            .attr('opacity',0)
            //.attr('dy',10)

        //var cursor = text.append('span')
        //.attr('class','cursor-text')
        //.attr('opacity',0)
        //.text('\u00A0')

    
        //var paragraph=d3.select('#graphic')
        //.select('svg')
        //.append('p')
        //.attr('class','last_words_text')
        //.attr('opacity',0)

        click_text.on('click',function(){

            //type();
            //var txt = state.words[Math.floor(Math.random() * state.words.length)]['Last Statement'
            text
            .text(txt[Math.floor(Math.random() * state.words.length)])
            .call(wrap, 800);
            //var text_spans = d3.selectAll('.spans')
            type();          
            //var typedTextSpan = document.querySelectorAll('.spans')
        })

        //var textarray = txt.split(" ")
        //let charindex = 0;
        //let textarrayindex = 0;
        //var typeingDelay = 200;
        //var nextTextDelay = 2000;
        //function type(charindex,textarrayindex,textarray,typeingDelay,nextTextDelay){
            //console.log(textarray[textarrayindex].length)
            //if(charindex<textarray[textarrayindex].length){
                //text.text(textarray[textarrayindex].charAt(charindex));
                //charindex++;
                //setTimeout(type,typeingDelay)
            //}else if(textarrayindex<textarray.length){
                //textarrayindex++;
                //let charindex=0
                //setTimeout(type,nextTextDelay)
            //}
        //};



    function type(){

        d3.selectAll('.spans').transition()
          .duration(5000)
          .ease(d3.easeLinear)
          .tween("text", function (d,i) {
            //console.log(this.textContent[i])
            var newText = this.textContent;
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
        
    }
}
export{Final};