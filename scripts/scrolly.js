// using d3 for convenience
let main = d3.select("main");
let scrolly = main.select("#scrolly");
let $figure = scrolly.select("#graph");
let dataChart = [];
let $step;

// initialize the scrollama
let scroller = scrollama();

function handleStepExit(response) {
	// if ($step) {
	console.count("classed");
	d3.select(response.element).classed("is-active", false);
	// }
}

// scrollama event handlers
function handleStepEnter(response) {
	$step = d3.select(response.element);

	// add color to current step only
	// if ($step) {
	$step.classed("is-active", true);
	console.count("classed");
	// }

	$step.style("background", "#ff00002e");

	// create new chart
	var aux = $step.attr("data-step");

	if(aux == "none"){
		aux = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	}

	const key = aux;

	console.log("key: ", key);

	// console.log("response.element", response.element);
	// console.log("$step", $step);
	// console.log("key:", key);

	createChart(key);
}

/* function handleStepProgress(response) {
  // console.log(response);
  // $figure.style("opacity", response.progress);
  // $step = d3.select(response.element);
  // console.log($step.attr("data-step"));
  $step.select(".progress").text(d3.format(".1%")(response.progress));
} */

function init() {
  // 1. setup the scroller passing options
  // 		this will also initialize trigger observations
  // 2. bind scrollama event handlers (this can be chained like below)
  scroller
    .setup({
      step: "#scrolly .triggers .step",
      debug: false,
      //progress: true,
    })
    .onStepEnter(handleStepEnter)
    .onStepExit(handleStepExit)
    //.onStepProgress(handleStepProgress);
}