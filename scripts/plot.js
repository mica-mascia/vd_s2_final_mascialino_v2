const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
var map_lanzamiento = [];
var map_valence = [];
var mes_lanzamiento = [];
var valence_por_mes = new Map();

d3.csv("https://mica-mascia.github.io/vd_s2_final_mascialino/data/results_global.csv", d3.autoType).then(function (data) {
	dataChart = data;

	// kick things off

	map_lanzamiento = data.map(function(d) {return d.lanzamiento});
	map_valence = data.map(function(d) {return d.valence});
	var valores_por_mes = [];

	for (let i = 0; i < 12; i++) {
		valence_por_mes.set(meses[i], 0);
		valores_por_mes.push(0);
	}

	for (i = 0; i < map_lanzamiento.length; i++) {
		const element = map_lanzamiento[i];
		var mes = element.getMonth();
		//mes_lanzamiento.push(meses[element.getMonth()])
		mes_lanzamiento.push(mes)
		/* valence_por_mes[mes] += map_valence[i]; */
		//valence_por_mes[mes] = (valence_por_mes[mes] + map_valence[i]);
		var aux = valence_por_mes.get(meses[mes]);
		valence_por_mes.set(meses[mes], aux+map_valence[i])
		valores_por_mes[mes] ++;
	}

	for(i=0; i<12;i++){
		valence_por_mes.set(meses[i], (valence_por_mes.get(meses[i])/valores_por_mes[i]));
	}

	init();
});

function createChart(key){
	console.log(key);

	newchart = Plot.plot;

	if( true === true ){
	/* if( key == "valence_mes" ){ */
		console.log("in")
		newchart = Plot.plot({
			width: window.innerWidth-100,
			height: window.innerHeight-100,
			grid: true,
			marginTop: 50,
			marginLeft: 100,
			marginRight: 50,
			x:{
				ticks: 13,
				tickFormat: (d) => extraerMes(d),
				label: "mes de lanzamiento",
				axis: "bottom",
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
	}
	
	d3.select("#graph svg").remove();
	var elem = d3.select("#graph")
		.append(() => newchart)
		//.append(() => axischart)
		.attr("color", "#fff");

	console.log("changed -------------------------")
}

function extraerMes(dato) {
	return meses[dato];
}