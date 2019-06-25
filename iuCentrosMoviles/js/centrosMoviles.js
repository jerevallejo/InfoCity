function movilesRun(){
    console.log("aca");
    const icono = L.icon({
        iconUrl: '.././img/truck3.png',
        iconSize: [20,30],
        iconAnchor: [15,50],
        popupAnchor: [20,50]
    
    })


    var mapa2 = createMap('map')

    var trucksLayer = L.layerGroup().addTo(mapa2);//crea capa
    mapa2.layersControl.addOverlay(trucksLayer, 'Ambulancias');


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
            // console.log(trucks[0])
            trucks.map(truck => {
                posiciones = truck.posiciones //[[lat,lon],[lat,lon]...]
                velocidades = posiciones.map(x => 1000) //[500,500...]
                var p = L.Marker.movingMarker(posiciones,velocidades,{autostart: true,loop:true, icon: icono})
                trucksLayer.addLayer(p)
            })
        })
    }

    function getAllTruckPositions(truck){
        return fetch(supportTrucksURL+`${truck.id}`+positionsURL)
            .then(r => r.json())
            .then(r => {
                var positions = r.positions.map(p => {
                    var tmp = []
                    tmp.push(p.position.lat)
                    tmp.push(p.position.lon)
                    return tmp //[[lat,lon],[lat,lon],[lat,lon]...]
                })
                trucks.push(new SupportTruck(truck.id, positions))
            })
    }

    getAllTrucks()


}
