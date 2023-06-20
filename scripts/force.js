d3.csv("../data/results_global.csv", d3.autoType).then((data) => {
	var lanzamiento = data.map(function(d) {return d.lanzamiento});
	var mes_lanzamiento = [];
	
	lanzamiento.forEach(element => {
		mes_lanzamiento.push(element.getMonth())
	});
	
	let chart = Plot.plot({
		marks: [
			Plot.dot(data, {
				x: "temporada",
				y: "valence" ,
				fill: 'lightgreen',
			}),
		],
		x: {
			zero: true,
			grid: false,
			line: true,
			nice: true,
			
		},
		y: {
			zero: true,
			nice: true,
			line: true,
			grid: false,
		},
	});
	var elem = d3.select("#graph")
				.append(() => chart)
				.attr("color", "#fff");
});

d3.csv("./data/results_global.csv", d3.autoType).then(function (data) {
	dataChart = data;
	key= 'valence';
	fillvar = "temporada"

	let newchart = Plot.plot({
		width: window.innerWidth-50,
		height: window.innerHeight,
		fill: 'red',
		grid: true,
		marginTop: 50,
		marginBottom: 100,
		marginLeft: 50,
		marginRight: 50,
		x: {
			ticks: 10,
			label: key,
			axis: "top",
			fill: 'red',
		},
		marks: [
			Plot.dot(
				dataChart,
				Plot.dodgeY({
					x: key,
					padding: 10,
					r: 35,
					anchor: "middle",
					fill: fillvar,
				}),
			),
			Plot.image(
				dataChart,
				Plot.dodgeY({
					x: key,
					//padding: 10,
					r: 50,
					anchor: "middle",
					src: "imagen",
					width: 30,
					// title: (d) => `${d.nombre}\n${d.edad} años`,
				})
			),
			/* Plot.text(
				dataChart,
				Plot.dodgeY({
					x: key,
					padding: 10,
					r: 35,
					dy: 20,
					anchor: "middle",
					text: "apellido",
					width: 30,
				})
			), */
		],
	});

	var elem = d3.select("#graph2")
		.append(() => newchart)
		.attr("color", "#fff");
	// kick things off
	//init();
});

/* function createChart(key) {
	
} */