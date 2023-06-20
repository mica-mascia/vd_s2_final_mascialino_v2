var scrolly = document.querySelector("#scrolly");
var article = scrolly.querySelector("article");
var step = article.querySelectorAll(".step");

//init the scrollama
var scroller = scrollama();

//scrollama event handlers
function handleStepEnter(response){
	//response = {element, direction, index}
	// console.log(response);
	//add color to current step
	response.element.classList.add("is-active");
}

function handleStepExit(response){
	//response = {element, direction, index}
	// console.log(response);
	//remove color from current steo
	response.element.classList.remove("is-active");
}

function init(){
	//1. setup the scroller with bare-bones options
	//		This will initialize trigger observations
	//2. Bind scrollama event handlers
	scroller
		.setup({
			step: "#scrolly article .step",
			debug: true,
			offset: 0.1,
		})
		.onStepEnter(handleStepEnter)
		.onStepExit(handleStepExit);

	

}

//kick things off
init();