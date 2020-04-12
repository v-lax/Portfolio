
//importing in our components
import {Bracket} from "./bracket.js"
import {Shotchart} from "./shotchart.js"
import {Barchart} from "./barchart.js"
import {Areachart} from "./areachart.js"

let bracket, barchart,areachart;
let shotchart

//Application State
let state = {
    data: [],
    data1:[],
    json: null,
    selectedSeries: null,
    playerNames1:null,
    playerNames2:null,
    selectedTeams:null,
    selectedGame1:null,
    selectedShot1:null,
    selectedPlayer1:null,
    selectedGame2:null,
    selectedShot2:null,
    selectedPlayer2:null,
    filteredData1:[],
    filteredData2:[],
    shotdomain1:[],
    quarterdomain1:[],
    shotdomain2:[],
    quarterdomain2:[]

  };

//Loading in data 
Promise.all([
    d3.csv("../data_analysis/play_off.csv",d3.autoType),
    d3.json("../data_analysis/Bracket.json")
]).then(([data,json])=>{
    state.data = data;
    state.json = json;
    console.log(state);
    init();
});

//initializing function
function init(){
    bracket = new Bracket(state,setGlobalState,setLocalState);
    shotchart = new Shotchart(state,setGlobalState,setLocalState);
    barchart = new Barchart(state,setGlobalState,setLocalState);
    //areachart = new Areachart(state,setGlobalState);
}

function filter(){
    bracket.filter(state,setGlobalState,setLocalState);
    shotchart.updateOptions(state,setGlobalState,setLocalState);
    barchart.draw(state,setGlobalState,setLocalState);
}

function draw(){
    shotchart.draw(state,setGlobalState,setLocalState);
    barchart.draw(state,setGlobalState,setLocalState);
    
}

function setGlobalState(nextState){
    state = {...state,...nextState}
    console.log('new state:',state)
    filter()
}

function setLocalState(localState){
    state = {...state,...localState}
    console.log('new state',state)
    draw()
};