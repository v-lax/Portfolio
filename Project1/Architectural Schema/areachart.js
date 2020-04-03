class Areachart {
    constructor(){
    this.width = window.innerWidth * 0.6;
    this.height = window.innerHeight * 0.6;
    this.margins = { top: 20, bottom: 20, left: 20, right: 20 };

    this.svg1 = d3
      .select("#AreaChart1")
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height);

    this.svg2 = d3
      .select("#AreaChart2")
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height);

    }

    draw(){

    }
}

export { Areachart };