var url = "https://assistanceservices.herokuapp.com/api";
var urlMoviles = "https://assistanceservices.herokuapp.com/api/supporttrucks/";
var urlPositions = "/positions/";
var urlEstadoMovil= "/truckstates/";




//retorna un array de moviles
async function getMoviles(map){

	const response = await fetch(urlMoviles)
	const data = await response.json();
	const moviles = data.supportTrucks;
}
//segun un id, devuelve el movil correspondiente con su informacion
async function getMovilById(movil_id){
	const response = await fetch(urlMoviles+movil_id);
	const data = await response.json();
	const movil = data.supportTruck;
		console.log( movil.state_id);
		console.log( movil.id);
		console.log( movil.position.lat);
		console.log( movil.position.lon);
		
}
//devuelve el array de posiciones correspondiente a un movil poras
async function getPositionById(movil_id ){
	const response = await fetch(urlMoviles+movil_id+urlPositions);
	const data = await response.json();
	const positions = data.positions;
	
	console.log(positions);
	//tengo que hacer el metodo que dibuje el recorrido, primero voy a recorrer la lista
	//de moviles despues voy a buscar con sus ids sus posiciones y las voy a dibujar 
	//console.log(position.lon)
	//console.log(position.state);



}

function getEstadoById(movil_id){
	fetch(urlMoviles+urlEstadoMovil+movil_id)
	.then(res=> res.json())
	.then(res => {res.description
	//	console.log(res)
	});
}

function getEstados(){

}

function drawMovil(moviles, map){
	for(movil in moviles){
		drawer.drawSupportTruckInMap(moviles, map);
	}
}

function drawRecorrido(movile, posiciones, map){

}


//getMoviles();
//getMovilById(501);
//getPositionById(501);

