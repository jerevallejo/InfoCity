var Drawer = function() {
    return {
        drawSupportTruckInMap: drawSupportTruckInMap,
        drawStatesInList: drawStatesInList,
        drawRequestOnMap: drawRequestOnMap
    }

    /******************************************************************************
     * Función para dibujar un movil en un mapa.
     */
    function drawSupportTruckInMap(supportTruck, map) {
        console.log("Dibujando el movil: " + supportTruck.id);

		//var info = supportTruck.state.description;
		
		// Creamos un marker.		
		var p = L.marker(L.latLng(supportTruck.position.lat, supportTruck.position.lon))
			//.bindPopup(info);

		p.addTo(map);		
	}

    /******************************************************************************
     * Función para listar los estados en la página.
     */
    function drawStatesInList(states, nodeId) {        
		states.forEach(function(state) {
            var li = $('<li>');
            li.append(state.description);
            $("#"+nodeId).append(li);
        });
    }
}

function obtenerEstado(supportTruck){

}




 function drawRequestOnMap(resObj, callbackRecorrido) {
      // Arreglo de markers que se va a agregar al mapa
      var markers = [];

      // Marcadores de los drivers cercanos
      var availableDrivers = resObj.availableDrivers;
      // Recorro availableDrivers y dibujo los markers
      availableDrivers.forEach(function(driver) {
          var infoDriver = "<p>Repartidor: " + driver.name + " " + driver.surname
                            + "<br>Score: " + driver.score
                            + "<br>Auto: " + driver.car.description + " " + driver.car.color
                            + "<br>Patente: " + driver.car.plateNumber
                            + "</p>";
          /* El parametro e es un evento, tiene información del evento
          que ocurrió. e.target es el objeto que se clickeó en el evento */
     //     function onClick(e) {
       //     callbackRecorrido(e.target.driverId);
         // };

          var driverMarker = L.marker(L.latLng(driver.position.lat,driver.position.lon));

          driverMarker.driverId = driver.id;
          driverMarker.name = driver.name + " " + driver.surname;
          driverMarker.score = driver.score;
          driverMarker.bindPopup(infoDriver);
          driverMarker.on("click", onClick);
          driverMarker.on("mouseover", onMouseOver);
          driverMarker.on("mouseout", onMouseOut);
          markers.push(driverMarker);
      });

      var grupo = L.layerGroup(markers);
      pedidos["Pedido " + resObj.id] = {
        senderMarker: sender,
        receiverMarker: receiver,
        markers: grupo
      };
      map.layersControl.addOverlay(grupo, "Pedido " + resObj.id);

    }