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
		mes_lanzamiento.push(element.getMonth())
		/* valence_por_mes[element.getMonth()] += map_valence[i]; */
		valence_por_mes[element.getMonth()-1] = (valence_por_mes[element.getMonth()-1] + map_valence[i])/2;
	}

	init();
});

function createChart(key){
	console.log(key);

	if( true/* key == "valence_mes" */){
		let newchart = Plot.plot({
			width: window.innerWidth-100,
			height: window.innerHeight-100,
			grid: true,
			marginTop: 50,
			marginLeft: 100,
			marginRight: 100,
			x: {
				ticks: 10,
				label: mes_lanzamiento,
				axis: "bottom",
			},
			marks: [
				Plot.image(
					dataChart,
					Plot.dodgeY({
						x: mes_lanzamiento,
						padding: 5,
						r: 45,
						anchor: "middle",
						src: "imagen",
						width: 90,
					})
				),
				Plot.line(
					dataChart,
					{
						x: [1,2,3,4,5,6,7,8,9,10,11,12],
						y: valence_por_mes,
						curve: 'natural',
					}
				)
			],
		});
	}
	
	d3.select("#graph svg").remove();
	var elem = d3.select("#graph")
		.append(() => newchart)
		.attr("color", "#fff");

	console.log("changed -------------------------")
}