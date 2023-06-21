const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
var map_lanzamiento = [];
var map_valence = [];
var mes_lanzamiento = [];
var valence_por_mes = [];

d3.csv("https://mica-mascia.github.io/vd_s2_final_mascialino/data/results_global.csv", d3.autoType).then(function (data) {
	dataChart = data;

	// kick things off

	map_lanzamiento = data.map(function(d) {return d.lanzamiento});
	map_valence = data.map(function(d) {return d.valence});

	for (let i = 0; i < 12; i++) {
		valence_por_mes.push(0);
	}

	for (i = 0; i < map_lanzamiento.length; i++) {
		const element = map_lanzamiento[i];
		mes_lanzamiento.push(meses[map_lanzamiento[i].getMonth()])
		valence_por_mes[element.getMonth()] += map_valence[i];
	}

	init();
});

function createChart(key){
	console.log(key);

	let newchart = Plot.plot({
		width: window.innerWidth-50,
		height: window.innerHeight-50,
		grid: true,
		marginTop: 50,
		marginLeft: 50,
		marginRight: 50,
		x: {
			ticks: 10,
			label: key,
			axis: "bottom",
		},
		marks: [
			Plot.image(
				dataChart,
				Plot.dodgeY({
					x: key,
					padding: 5,
					r: 45,
					anchor: "middle",
					src: "imagen",
					width: 90,
				})
			),
		],
	});

	var elem = d3.select("#graph")
		.append(() => newchart)
		.attr("color", "#fff");

	console.log("changed???? -------------------------")
}