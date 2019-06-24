var map;
var drawer;




var bootstrap = function() {

	map = createMap("divMapa",  Config.ungsLocation);


   	drawer = new Drawer(map);
    
    
   	//drawer.drawSupportTruckInMap(moviles, map);
  	
   
    //var movimiento = getPositionById();
    //console.log(moviles);
    //movil = getMovilById(501);
    //console.log(movil);

    //position = getPositionById(501);
}



/*
var iniciarRecorrido = function() {
	console.log("Iniciar recorrido");
	var url = "https://assistanceservices.herokuapp.com/api";
	var urlMoviles = "/supporttrucks/";
	var urlPositions = "/positions/";
	var urlEstadoMovil= "/truckstates/";
  	var name;
  	var color;
  	var positions;

  var requestMoviles = function() {
    return $.ajax(url + urlMoviles);
  }

  var requestPositions = function(movil_id) {
    return $.ajax(url + urlMoviles + movil_id + urlPositions);
  }

  var responseExtract = function(atrib, response) {
    return response[atrib];
  }

  var extractMovil = function(response) {
      return responseExtract("movil", response);
  }

  var extractProperties = function(movil) {
    name = movil.id;
    estado = movil.state_id;
    return driver.id;
  }

  var extractPositions = function(movil_id) {
    return requestPositions(movil_id)
            .then(function(response) {
              positions = responseExtract("positions", response);
              return response;
            });
  }

  requestMoviles()
    .then(extractMovil)
    .then(extractProperties)
    .then(extractPositions)
    .done(function() {
      var driver = new Driver(name, color, positions, id_driver);
      var recorrido = new Route("Recorrido", map, driver);
      // Borro los markers de los demás repartidores para que solo se pueda elegir uno por cada pedido
      //drawer.deleteDriverMarkers(drawer.getNumeroPedido(id_driver));
      recorrido.start();
    });
}
*/

 $(bootstrap);