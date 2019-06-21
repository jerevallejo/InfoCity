var Drawer = function() {
    return {
        drawSupportTruckInMap: drawSupportTruckInMap,
        drawStatesInList: drawStatesInList
    }

    /******************************************************************************
     * Función para dibujar un movil en un mapa.
     */
    function drawSupportTruckInMap(supportTruck, map) {
        console.log("Dibujando el movil: " + supportTruck.id);

		var info = supportTruck.state.description;
		
		// Creamos un marker.		
		var p = L.marker(L.latLng(supportTruck.position.lat, supportTruck.position.lon))
			.bindPopup(info);

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
