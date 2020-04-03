
//importing in our components
import {Bracket} from "./bracket.js"
import {Shotchart} from "./shotchart.js"
import {Barchart} from "./barchart.js"
import {Areachart} from "./areachart.js"

let bracket, barchart1, barchart2,areachart1,areachart2;
let shotchart1,shotchart2

//Application State
let state = {
    data: [],
    json: null,
    selectedSeries: null,
  };

//Loading in data 
Promise.all([
    d3.csv("../data_analysis/playoff_shots.csv",d3.autoType),
    d3.json("../data_analysis/Bracket.json")
]).then(([data,json])=>{
    state.data = data;
    state.json = json;
    console.log(state);
    init();
});

//initializing function
function init(){
    bracket = new Bracket(state);
    shotchart1 = new Shotchart(state);
    shotchart2 = new Shotchart(state);
    barchart1 = new Barchart(state);
    barchart2 = new Barchart(state);
    areachart1 = new Areachart(state);
    areachart2 = new Areachart(state);
    
    draw()
}

function draw(){

}

function setGlobalState(nextState){

}