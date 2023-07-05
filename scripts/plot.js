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
	var valores_por_mes = [];

	for (let i = 0; i < 13; i++) {
		//valence_por_mes.set(meses[i], 0);
		valores_por_mes.push(0);
		valence_por_mes.push(0);
	}

	for (i = 0; i < map_lanzamiento.length; i++) {
		const element = map_lanzamiento[i];
		var mes = element.getMonth();
		mes_lanzamiento.push(mes)
		valence_por_mes[mes] += map_valence[i];
		valores_por_mes[mes]++;
	}

	for(i=1; i<13;i++){
		//valence_por_mes.set(meses[i], (valence_por_mes.get(meses[i])/valores_por_mes[i]));
		valence_por_mes[i] = valence_por_mes[i]/valores_por_mes[i];
		console.log(valence_por_mes[i])
	}

	console.log(valence_por_mes[11], "-", valence_por_mes[6], "=", valence_por_mes[11]-valence_por_mes[6],". En cada punto baja ", (valence_por_mes[11]-valence_por_mes[6])/4)
	init();
});

function createChart(key){
	console.log(key);

	newchart = Plot.plot;

	//if( true === true ){
	/* if( key == "valence_mes" ){ */

	newchart = Plot.plot({
		width: window.innerWidth-100,
		height: window.innerHeight-100,
		grid: true,
		marginTop: 150,
		marginLeft: 50,
		marginRight: 50,
		x:{
			ticks: 14,
			tickFormat: (d) => meses[d],
			label: "mes de lanzamiento",
			axis: "bottom",
		},
		y: {
			domain: [0, 1],
			ticks: 10,
		},
		marks: [
			Plot.image(
				dataChart,
				Plot.dodgeY({
					x: mes_lanzamiento,
					padding: 5,
					r: 40,
					anchor: "middle",
					src: "imagen",
					width: 80,
					label: null,
				})
			),
			Plot.line(
				dataChart,
				{
					x: [0,1,2,3,4,5,6,7,8,9,10,11],
					y: valence_por_mes,
					curve: 'natural',
					label: null,

				}
			),
			Plot.dot(
				dataChart,
				{
					x: [0,1,2,3,4,5,6,7,8,9,10,11],
					y: valence_por_mes,
					//curve: 'natural',
					label: null,

				}
			),
			Plot.line(
				dataChart,
				{
					x: [1,2,3,4,5,6,7,8,9,10,11,12],
					y: [,,,,,0.62, 0.5, 0.5, 0.5, 0.5, 0.295, 0],
					curve: 'natural',
					label: null,

				}
			),
		],
	});
	/* axischart = Plot.plot({
		width: window.innerWidth-100,
		height: window.innerHeight-100,
		grid: true,
		marginTop: 50,
		marginLeft: 100,
		marginRight: 50,
		x: {
			ticks: 10,
			label: "mes del lanzamiento",
			axis: "bottom",
			domain: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
		},

	}); */
	//}
	
	d3.select("#graph svg").remove();

	var elem = d3.select("#graph")
		.append(() => newchart)
		//.append(() => axischart)
		.attr("color", "#fff");
}