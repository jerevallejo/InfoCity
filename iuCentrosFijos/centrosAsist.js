function bootstrap() {

  //var ungsLocation = ([-34.5221554, -58.7000067]);

  var map = L.map('mapid').setView([-34.5221554, -58.7000067], 15);

  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  //incio un conjunto de marcadores
  cluster = L.markerClusterGroup();
  
  //creo la constante para realizar el llamado asincrónico
  const xhttp = new XMLHttpRequest();
  //se realiza un get, del archivo .json y la variable booleana indica que va a se asincrónico
  xhttp.open('GET', 'datos.json', true);

  xhttp.send();

  xhttp.onreadystatechange = function(){

    if(this.readyState == 4 && this.status == 200){

      //console.log(this.responseText);
      let datos = JSON.parse(this.responseText);
      //console.log(datos);
      res.innerHTML = '';
      cluster.clearLayers();

    //dentro de el for vamos a cargar los datos que viene del archivo .json
    //para mostrar nombre, y descripcion y tambien dibujar los amrcadores correspondientes
      for(let item of datos){
        console.log(item.name);

        res.innerHTML +=`
        <li>
            <div class="card">
                <div class="card-body">
                  <h5 class="card-title">${item.name}</h5>
                  <p class="card-text">${item.description}</p>
                </div>
            </div>
        </li>
        `
        cluster.addLayer(L.marker([item.location[0], item.location[1]]).bindPopup("<b>" + item.name + "</b>" ));
        map.panTo(new L.LatLng(item.location[0], item.location[1]));
      }
      cluster.addTo(map);
    }
  }
  
}
