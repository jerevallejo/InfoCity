var Drawer = function() {
    var markerMovil;
    return {
        drawStatesInList: drawStatesInList,
        removerMarker : removerMarker
    }


    function removerMarker(map){
        if(markerMovil!== undefined){
            map.removeLayer(markerMovil);
        }
    }

    /******************************************************************************
     * Función para listar los estados en la página.
     */
    function drawStatesInList(estados, nodeId) {
      
		estados.forEach(function(estado){
            var li = $('<li>');
            var color;
            if(estado.id==0){color = " (Verde)";}
            if(estado.id==1){color = " (Rojo)";}
            if(estado.id==2){color = " (Negro)";}
            li.append(estado.description+color);
            $("#"+nodeId).append(li);
        });
    }

}
