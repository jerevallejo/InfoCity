function movilesRun(){
    console.log("aca");
  


    var map = createMap('map')

    var trucksLayer = L.layerGroup().addTo(map);//crea capa
    map.layersControl.addOverlay(trucksLayer, 'trucks');


    var trucks = []
    const supportTrucksURL = 'https://assistanceservices.herokuapp.com/api/supporttrucks/'
    const positionsURL = /positions/
    
    function getAllTrucks(){
        return fetch(supportTrucksURL)
        .then(r => r.json())
        .then(async tmp => {
            for (const truck of tmp.supportTrucks){
                await getAllTruckPositions(truck)
            }
             //console.log(trucks[0])
            trucks.map(truck => {

                posiciones = truck.posiciones //[[lat,lon],[lat,lon]...]
                velocidades = posiciones.map(x => 1000) //[500,500...]
                var estado;
                var icono;
                var actual;

                //podemos poner un while o un case o un for con indice, para poder entrar en el array 
                //y recorrerlo con ese indiece 
                
                //while()
                console.log("NUEVO----")
                //console.log(truck.posiciones.length)
                for(var i=0; i<truck.posiciones.length; i++){
                    console.log("muestra de cada uno su estado")
                    //console.log(posiciones[i][2])
                    estado = posiciones[i][2]
                    icono = drawStateTruck(estado)
                    console.log(estado)
                    console.log(icono)
                   //var p = L.marker(L.latLng( posiciones[i], {icon:icono}));
                    var p = L.Marker.movingMarker(posiciones,velocidades,{autostart: true,loop:true, icon:icono})
                    p.bindPopup(getDetalle(truck, estado));
                    trucksLayer.addLayer(p)


                    
                    //icono = drawStateTruck(estado)

                }
                //posiciones.map(pos => {
                    //console.log(pos)
                    //console.log(pos[2])

                 //  estado =pos[2]
                
                  //  icono = drawStateTruck(estado)
                   // console.log(icono)
                   // var p = L.Marker.movingMarker(posiciones,velocidades,{autostart: true,loop:true, icon:icono})
                    //p.bindPopup(getDetalle(truck, estado));
                    //trucksLayer.addLayer(p)
                    //})
            })
                //obtengo los estados por posicion, tengo que recorrerlo para poder usar la funcion que cambia la imagen
                //yo creo que podmeos hacer un for que recorra los trucks que tenemos ene l map y por cada uno lo dibuje en el mapa , 
                //con su estado y su popup correspondiente,
                //console.log(truck.state)
               // console.log(getStateTruck(truck.state))
        })
    }

    function getAllTruckPositions(truck){
        return fetch(supportTrucksURL+`${truck.id}`+positionsURL)
            .then(r => r.json())
            .then(r => {
                var state = r.positions.map(p => {
                    var res = []
                    
                    res.push(p.state)
                    return res //va a retornar el estado por cada posicion
                })
                var positions = r.positions.map(p => {
                    var tmp = []
                    
                    tmp.push(p.position.lat)
                    tmp.push(p.position.lon)
                    tmp.push(p.state)
                    return tmp //[[lat,lon, estado],[lat,lon, estado],[lat,lon, estado]...]
                    
                })
                trucks.push(new SupportTruck(truck.id, positions, state))
            })
    }

    getAllTrucks()

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

    function getDetalle(truck, state){

         var infoTruck = "<p>Movil: " + truck.id + " " 
                            + "<br>Estado: " + getEstado(state)
                            + "</p>";
        return infoTruck;
    }

    function drawCardMovil(){
        //tenemos que hacer el emtodo que dibuja las tarjetas en la pantalla con la lsita d emoviles
        //y abajo la referencia de que significa cada estado o color
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

