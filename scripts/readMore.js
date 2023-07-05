function mostrarInfo(caso){
	textDatos = "Claramente no sería viable investigar todas las canciones de la plataforma, ya que contiene alrededor de 80 millones de pistas en total. Por esto, el análisis está hecho sobre las 20 canciones más populares a nivel global de la semana del 12 de junio de 2023. \n \n A lo largo del análisis surgieron algunas complicaciones más: \n Como no es posible saber dónde se creó la canción, consideré el país natal de cada artista. Quienes sean originarios del hemisferio norte serán considerados según las estaciones del hemisferio norte. \n En casos con más de un artista, es necesario analizar cada artista por separado. Si resulta que todos son originarios del mismo hemisferio, serán considerados de acuerdo a las estaciones de ese hemisferio. Si son de hemisferios distintos... Se elimina la canción de la lista."
	textAlegria = "¡Este dato nos lo provee Spotify! Lo llaman valencia. \n No está muy claro cómo lo calculan, no parece ser información públicamente disponible.";
	switch (caso) {
		case 1:
			alert(textDatos);
			break;

		case 2:
			alert(textAlegria);
			break;
	
		default:
			break;
	}
}