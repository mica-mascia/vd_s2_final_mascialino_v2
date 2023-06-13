/* const locale = {
	decimal: ',',
	thousands: '.',
	grouping: [3],
} */

Promise.all([mapaFetch, dataFetch]).then(([barrios, data]) => {

	var fecha_ingreso_agr = d3.group(data.filter(d=> d.domicilio_barrio == "AGRONOMIA"), d => d.fecha_ingreso_agr)
	var fecha_cierre_contacto_agr = d3.group(data.filter(d=> d.domicilio_barrio == "AGRONOMIA"), d => d.fecha_cierre_contacto_agr)
	const estado_del_contacto_agr = d3.group(data.filter(d=> d.domicilio_barrio == "AGRONOMIA"), d => d.estado_del_contacto_agr)

	let max_tiempo = Array(12);
	max_tiempo.fill(0);
	let min_tiempo = Array(12);
	min_tiempo.fill(300);
	let promedio;
	let mes, fi, fcc;
	let contar=0;

	for(let i=0; i<estado_del_contacto_agr.length;i++){
		if(estado_del_contacto_agr[i] === "Cerrado"){
			if(fecha_ingreso_agr[i][2] == '-'){
				mes = (d3.timeFormat('%m')(d3.timeParse('%d-%m-%Y')(fecha_ingreso_agr[i])))-1;
				fi = d3.timeFormat('%j')(d3.timeParse('%d-%m-%Y')(fecha_ingreso_agr[i]));
			}else{
				mes = (d3.timeFormat('%m')(d3.timeParse('%d/%m/%Y')(fecha_ingreso_agr[i])))-1;
				fi = d3.timeFormat('%j')(d3.timeParse('%d/%m/%Y')(fecha_ingreso_agr[i]));
			}
			
			if(fecha_cierre_contacto_agr[i][2] == '-'){
				fcc = d3.timeFormat('%j')(d3.timeParse('%d-%m-%Y')(fecha_cierre_contacto_agr[i]))
			}else{
				fcc = d3.timeFormat('%j')(d3.timeParse('%d/%m/%Y')(fecha_cierre_contacto_agr[i]))
			}
			duracion = fcc-fi;
			

			

			if(duracion > max_tiempo[mes]){
				max_tiempo[mes] = duracion
			}else if(duracion < min_tiempo[mes]){
				min_tiempo[mes] = duracion
			}

			if(typeof promedio === 'undefined'){
				promedio = duracion
				
			}else{
				promedio = (promedio + duracion)/2
				if(mes == 0){
					console.log("duración: ",duracion, "entre",fecha_ingreso_agr[i],"y",fecha_cierre_contacto_agr[i], "(caso",i,")")
				}
			}

			
		}
	}

	console.log(max_tiempo)
	console.log(min_tiempo)
	console.log(contar);



  let dataviz_testtt = Plot.plot({
	marks: [
		Plot.axisX({labelAnchor: "center", anchor: "bottom", label: "Mes" }),
		Plot.axisY({label: "Espera para la resolución", marginTop: 20 }),
		Plot.areaY(data, {
			x: [1,2,3,4,5,6,7,8,9,10,11,12],//['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
			y1: max_tiempo,
			y2: min_tiempo,
			dy: -16,
			//opacity: 0.5,
			curve: 'natural',
			fill: 'gray',
		}),
		Plot.line(data, {
			x: [1,2,3,4,5,6,7,8,9,10,11,12],//['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
			y: 12,
			stroke: '#BACF97',
			curve: 'natural',
			dy: -16,
		}),
		Plot.text(12, {
			x: [12],//['Diciembre'],
			y: 12,
			text: ["Promedio"],
			fill: "#EE6C2F",
			fontWeight: "bold",
			dx: 40,
			dy: -15,
			fontSize: "13px",
		}),
	],
	x: {
		tickFormat: 'd',
		grid: true,
	},
	y: {
		tickFormat: d3.format(',.0f'),
		grid: true,
	},
	color:{
		legend: true,
	},
	marginLeft: 70,
	marginRight: 70,
	insetTop: 15,
	line: true,
})
d3.select('#dataviz_testtt').append(() => dataviz_testtt)
})
