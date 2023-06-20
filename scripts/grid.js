/* DataViz */
function createChart(key) {
  let chart = Plot.plot({
    width: wChart,
    height: hChart,
    grid: true,
    marginTop: 50,
    marginBottom: 100,
    marginLeft: 50,
    marginRight: 50,
    x: {
      ticks: 10,
      label: key,
      axis: "top",
    },
    marks: [
      Plot.dot(
        dataChart,
        Plot.dodgeY({
          x: key,
          padding: 10,
          r: 15,
          anchor: "middle",
          fill: "puesto",
        })
      ),
      Plot.image(
        dataChart,
        Plot.dodgeY({
          x: key,
          padding: 10,
          r: 15,
          anchor: "middle",
          src: "carita",
          width: 30,
          title: (d) => `${d.nombre}\n${d.edad} años`,
        })
      ),
      Plot.text(
        dataChart,
        Plot.dodgeY({
          x: key,
          padding: 10,
          r: 15,
          dy: 20,
          anchor: "middle",
          text: "apellido",
          width: 30,
        })
      ),
    ],
  });


  d3.select("#scrolly figure svg").remove();
  d3.select("#scrolly figure").append(() => chart);
}