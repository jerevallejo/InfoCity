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
                //console.log(truck.id);
                posiciones = truck.posiciones //[[lat,lon],[lat,lon]...]
                velocidades = posiciones.map(x => 1000) //[500,500...]
                //console.log(truck.posiciones[][2])
                estados= truck.state//obtengo los estados por posicion, tengo que recorrerlo para poder usar la funcion que cambia la imagen
                //yo creo que podmeos hacer un for que recorra los trucks que tenemos ene l map y por cada uno lo dibuje en el mapa , 
                //con su estado y su popup correspondiente,
                console.log(truck.state)
               // console.log(getStateTruck(truck.state))
                var p = L.Marker.movingMarker(posiciones,velocidades,{autostart: true,loop:true})
                p.bindPopup(getDetalle(truck));
                trucksLayer.addLayer(p)

            })
        })
    }

    function getAllTruckPositions(truck){
        return fetch(supportTrucksURL+`${truck.id}`+positionsURL)
            .then(r => r.json())
            .then(r => {
                //console.log(r.positions);
                //console.log(r.positions);
                var state = r.positions.map(p => {
                    var res = []
                    //console.log(p.state);
                    
                    res.push(p.state)
                    //console.log(res)
                    return res //va a retornar el estado por cada posicion
                })
                //console.log(state)
                var positions = r.positions.map(p => {
                    var tmp = []
                    
                    tmp.push(p.position.lat)
                    tmp.push(p.position.lon)
                    tmp.push(p.state)
                    //console.log(p.positions)
                    //console.log(tmp)
                    return tmp //[[lat,lon, estado],[lat,lon, estado],[lat,lon, estado]...]
                    
                })
                trucks.push(new SupportTruck(truck.id, positions, state))
            })
    }

    function getStateTruck(state_id){
        //0 es estado disponible 
        if( state_id == 0 ) {
            return L.icon({iconUrl: '.././img/truck3.png', iconSize: [55,45], iconAnchor: [15,50],popupAnchor: [20,50]});
        }
        //1 es estado  en servicio
        else if( state_id == 1 ) {
            return L.icon({iconUrl: '.././img/truck1.png', iconSize: [50,30], iconAnchor: [15,50],popupAnchor: [20,50]});
        }
        //2 es estado no disponible  
        else if( state_id == 121 ) {
            return L.icon({iconUrl: '.././img/truck1.png', iconSize: [50,30], iconAnchor: [15,50],popupAnchor: [20,50]});
        }
    }

    function getDetalle(truck){
         var infoTruck = "<p>Movil: " + truck.id + " " 
                            + "<br>Estado: " + truck.states_id
                            + "</p>";
        return infoTruck;
    }

    function drawCardMovil{
        //tenemos que hacer el emtodo que dibuja las tarjetas en la pantalla con la lsita d emoviles
        //y abajo la referencia de que significa cada estado o color
    }

    getAllTrucks()


}
