function movilesRun(){

    var map = createMap('map')

    var recorrido = new Recorrido("1k", map);

    var drawer = new Drawer();

    var trucksLayer = L.layerGroup().addTo(map);//crea capa
    map.layersControl.addOverlay(trucksLayer, 'trucks');



    var Estados;
    var trucks = []
    const apiURL = 'https://assistanceservices.herokuapp.com/api'
    const supportTrucksURL = '/supporttrucks/'
    const positionsURL = /positions/
    const statesURL = /truckstates/

    
    function getAllTrucks(){
        return fetch(apiURL + supportTrucksURL)
        .then(r => r.json())
        .then(async tmp => {
            for (const truck of tmp.supportTrucks){
                await getAllTruckPositions(truck)
            }         
        })
    }

    function getAllTruckPositions(truck){
        return fetch(apiURL+supportTrucksURL+`${truck.id}`+positionsURL)
            .then(r => r.json())
            .then(r => { 
                var historyStates = r.positions.map(p => {
                    var res = []

                    res.push(p.state)
                    return res //va a retornar el estado por cada posicion
                })
                var historyPositions = r.positions.map(p => {
                    var tmp = []
                    //console.log(tmp)
                    tmp.push(p.position.lat)
                    tmp.push(p.position.lon)
                    tmp.push(p.state)
                    return tmp //[[lat,lon, estado],[lat,lon, estado],[lat,lon, estado]...]  
                })

                truck = new SupportTruck(truck.id, historyPositions, historyStates)
                trucks.push(truck) 
 
                recorrido.addTruck(truck);

                 //el 6 es por la cantidad de moviles que tiene cuando carga todas
                 //empieza a dibujarlos
                if(recorrido.tamano()===6){
                    console.log("COMENZAR");
                      recorrido.start();
                }
            })
    }

    var asyncQuery = function(url, callback){   
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
        // https://stackoverflow.com/questions/13293617/why-is-my-ajax-function-calling-the-callback-multiple-times
            if (this.readyState === 4){
                if (this.status === 200){
                    // parseamos el resultado para obtener el objeto JavaScript
                    resObj = JSON.parse(xhttp.responseText)
                    // llamamos a la funciÃ³n callback con el objeto parseado como parÃ¡metro.
                    callback(resObj);
                }
            }
        };
            xhttp.open("GET", url, true);
            var ret = xhttp.send();
            return ret;
    }

    var callback = function(response){
         Estados = response;
         drawer.drawStatesInList(response.states, 'states');   
       
    }
        
    asyncQuery(apiURL + statesURL, callback);// pedimos los estados al servidor
    getAllTrucks()

}



