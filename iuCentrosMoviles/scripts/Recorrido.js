var Route = function(name, map, movil) {
    this.name = name;
    this.map = map;
    this.movil = movil;
    //Creamos el layer en el mapa para ese movil
    var movilLayer = L.layerGroup().addTo(this.map);
    // Agregamos el layer al control
    this.map.layersControl.addOverlay(movilLayer, movil.name);
    // Función callback para actualizar la posición del movil en el mapa
    var updater = function(newPosition) {
        // Limpio el rastro de layers que deja el movil al moverse
        movilLayer.clearLayers();
        // Log de consola
        console.log("Updating view for movil: " + movil.name + "!!");
        console.log(newPosition);

        // Se agrega el movil a la capa.
        movilLayer.addLayer(L.marker(newPosition).bindPopup(movil.name));
    }
    // Función para empezar a mover al movil
    this.start = function() {
        this.movil.run(updater);
    }
};