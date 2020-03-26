
//Constants and Global Variables
const width = window.innerWidth,
  height = window.innerHeight,
  margin = { top: 20, bottom: 50, left: 60, right: 40 };

let svg;
let tooltip;

//Application State
let state = {
    data: null,
    hover: null,
    mousePosition: null,
  };

//Loading in data 
d3.json("../data_analysis/Bracket.json").then(data=>{
    state.data = data;
    console.log(state.data);
    
    init();
});

//initializing function
function init(){
    const container = d3.select("#d3-container");

    svg = container.append("svg")
                   .attr("width",width)
                   .attr("height",height);
    
    const root = d3.hierarchy(state.data)

    const tree = d3.tree()
                   .size([width,height-100]);
    
    tree(root)
    const nodes = svg
                .selectAll("g")
                .data(root.descendants())
                .join("g")
                .attr("transform",d=>`translate(${d.x},${d.y})`);
    
    const data = [
        {"image":"../Assets/logos/Slide01.jpg"},
        {"image":"../Assets/logos/Slide02.jpg"},
        {"image":"../Assets/logos/Slide03.jpg"},
        {"image":"../Assets/logos/Slide04.jpg"},
        {"image":"../Assets/logos/Slide05.jpg"},
        {"image":"../Assets/logos/Slide06.jpg"},
        {"image":"../Assets/logos/Slide07.jpg"},
        {"image":"../Assets/logos/Slide08.jpg"},
        {"image":"../Assets/logos/Slide09.jpg"},
        {"image":"../Assets/logos/Slide10.jpg"},
        {"image":"../Assets/logos/Slide11.jpg"},
        {"image":"../Assets/logos/Slide12.jpg"},
        {"image":"../Assets/logos/Slide13.jpg"},
        {"image":"../Assets/logos/Slide14.jpg"},
        {"image":"../Assets/logos/Slide15.jpg"}
    ]

    const links = [
        {'link':'nbafinals/index.html'},
        {'link':'warriors_vs_rockets/index.html'},
        {'link':'celtics_vs_cavs/index.html'},
        {'link':'rockets_vs_jazz/index.html'},
        {'link':'pelicans_vs_warriors/index.html'},
        {'link':'raptors_vs_cavs/index.html'},
        {'link':'celtcs_vs_76ers/index.html'},
        {'link':'rockets_vs_timberwolves/index.html'},
        {'link':'thunder_vs_jazz/index.html'},
        {'link':'Trailblazers_vs_pelicans/index.html'},
        {'link':'warriors_vs_spurs/index.html'},
        {'link':'raptors_vs_wizards/index.html'},
        {'link':'Cavs_vs_Pacers/index.html'},
        {'link':'76ers_vs_Heat/index.html'},
        {'link':'celtics_vs_bucks/index.html'}
    ]
    
    
    image=nodes.append("svg:a")
               .data(links)
               .attr("xlink:href",d=>d.link)
               .append('svg:image')
               .data(data)
               .attr('xlink:href',d=>d.image)
               .attr('width', "80")
               .attr('height', "60");
    
    console.log(nodes)
}