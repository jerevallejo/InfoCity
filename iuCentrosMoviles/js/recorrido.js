var Recorrido = function(name, map) {
    this.name = name;
    this.map = map;
    this.trucksData = [];

    this.tamano = function(){//
       return this.trucksData.length;
    }

    this.addTruck = function(movil) {
        movil.ubicacionMapa;
        movil.trucksLayer;
        // agrego un atributo UbicacionMapa que es el marcador
        //que se dibujara en el mapa
        
        movil.trucksLayer = L.layerGroup().addTo(this.map);//Creamos el layer en el mapa para ese runner
        this.map.layersControl.addOverlay(movil.trucksLayer, "Movil: nº"+movil.id);// Agregamos el layer al control

        var updater = function(newPosition,newState,id) { //callback de moverGrua     
           // grua.gruaLayer = L.layerGroup().addTo(this.map);//Creamos el layer en el mapa para ese runner
            removerMarker(map); // intenta eliminar el marcador de la grua
   
            //newState trae un array de estados, por eos busco el valor en la primera posicion
            var detalle = getDetalle(id, newState[0])
            var marker = drawStateTruck(newState[0])

            // CREO EL MARCADOR Y LO AGREGO AL MAPA
            movil.ubicacionMapa = L.marker(newPosition, {icon:marker})
            movil.trucksLayer.addLayer(movil.ubicacionMapa.bindPopup(detalle));
        }
        
        var removerMarker=function(map){ // borra el marcador ubicacionMapa.!!
            if(movil.ubicacionMapa!== undefined){
                movil.trucksLayer.removeLayer(movil.ubicacionMapa);
                map.removeLayer(movil.ubicacionMapa);
        }
         
    }
       
        this.trucksData.push({
            movil: movil,
            updater: updater
        })
	 
    }

    this.start = function() {
        // recorre todas las gruas guardadas en el recorrido
        this.trucksData.forEach(function(data)
			{    var movil = data.movil;
				movil.mover(data.updater);
			}
		);
    }

    function drawStateTruck(state_id){
        //0 es estado disponible 
        if( state_id == 0 ) {
            return L.icon({iconUrl: '.././img/icon.png', iconSize: [25, 25], iconAnchor: [15,15]});
        }
        //1 es estado  en servicio
        else if( state_id == 1 ) {
            return L.icon({iconUrl: '.././img/icon1.png', iconSize: [25, 25], iconAnchor: [15,15]});
        }
        //2 es estado no disponible  
        else if( state_id == 2 ) {
            return L.icon({iconUrl: '.././img/icon2.png', iconSize: [25, 25], iconAnchor: [15,15]});
        }
    }

    function getDetalle(id, state){

         var infoTruck = "<p>Movil: " + id + " " 
                            + "<br>Estado: " + getEstado(state)
                            + "</p>";
        return infoTruck;
    }

    function getEstado(state){
        var estado;
        //0 es estado disponible 
        if( state == 0 ) {
            estado = "Disponible"
            return estado
        }
        //1 es estado  en servicio
        else if( state == 1 ) {
            estado = "En servicio"
            return estado
        }
        //2 es estado no disponible  
        else if( state == 2 ) {
            estado = "Fuera de servicio"
            return estado
        }
    }

};