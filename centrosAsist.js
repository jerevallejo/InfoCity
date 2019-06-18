function bootstrap() {

  var ungsLocation = ([-34.5221554, -58.7000067]);
  var locationUno = ([-34.532771, -58.701219]);
  var locationDos = ([-34.516181, -58.716625]);
  var locationTres = ([-34.525882, -58.693774]);
  var locationCuatro = ([-34.527935, -58.707952]);
  var locationCinco = ([-34.514451, -58.706641]);

  var map = L.map('mapid').setView(ungsLocation, 15);

  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

 // L.polygon([
  //  L.latLng(-34.515594, -58.705654),
  //  L.latLng(-34.523503, -58.714062),
  //  L.latLng(-34.519177, -58.719890),
  //  L.latLng(-34.511089, -58.711374),
  //  L.latLng(-34.514062, -58.707909),
  //  L.latLng(-34.513824, -58.707584)
//]).addTo(map);

  var id= 1;

  var ungsMarker=L.marker(ungsLocation);
  var centroUno = L.marker(locationUno);
  var centroDos = L.marker(locationDos);
  var centroTres = L.marker(locationTres);
  var centroCuatro = L.marker(locationCuatro);
  var centroCinco = L.marker(locationCinco);

  ungsMarker.id= id;


  var cluster = L.markerClusterGroup();
  cluster.addLayers([
      ungsMarker,
      centroUno,
      centroDos,
      centroTres,
      centroCuatro,
      centroCinco
    ])

  ungsMarker.bindPopup("Universidad Nacional General Sarmiento").openPopup();
  centroUno.bindPopup("centro 1").openPopup();
  centroCinco.bindPopup("cancha sm").openPopup();

  cluster.addTo(map);
  //map.addLayer(cluster);
  cluster.on("click", markerOnClick);

  function markerOnClick(e) {
   
    console.log("Clicked!!S");
    // do some stuff…
  }

  
  console.log("dentro de la fun");

  const xhttp = new XMLHttpRequest();

  xhttp.open('GET', 'datos.json', true);

  xhttp.send();

  xhttp.onreadystatechange = function(){

    if(this.readyState == 4 && this.status == 200){

      //console.log(this.responseText);
      let datos = JSON.parse(this.responseText);
      //console.log(datos);
      res.innerHTML = '';

      for(let item of datos){
        console.log(item.name);

        res.innerHTML +=`
        <li>
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">${item.name}</h5>
                  <p class="card-text">${item.description}</p>
                </div>
            </div>
        </li>
        
        `

      }
    }
  }
  


}

//https://www.youtube.com/watch?v=M4LaQ3KUGOM para hacer la lista con  los datos, solo falta el metodo apra dibujar los markets
   /*   <div class="card" style="width: 20rem;">
          <h2>Centros de Asistencia</h2>
          <ul id="states">
            <li id="mark1">
              <div class="card" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">Asistencia Medica</h5>
                  <p class="card-text">Personal capasitado para realizar primeros auxilios y resolver incidentes no muy graves.</p>
                </div>
              </div>
            </li>
            <li id="mark1">
              <div class="card" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">Asistencia Policial</h5>
                  <p class="card-text">Personal capasitado para realizar primeros auxilios y resolver incidentes no muy graves.</p>
                </div>
              </div>
            </li>
            <li id="mark1">
              <div class="card" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">Oficina de Informes</h5>
                  <p class="card-text">Personal capasitado para realizar primeros auxilios y resolver incidentes no muy graves.</p>
                </div>
              </div>
            </li>
            <li id="mark1">
              <div class="card" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">Oficina de Informes</h5>
                  <p class="card-text">Personal capasitado para realizar primeros auxilios y resolver incidentes no muy graves.</p>
                </div>
              </div>
            </li>
          
          <button type="button" class="btn btn-lg btn-primary btn-lg btn-block" onclick="location.href='./index.html'">Home</button>
          </ul>
      </div>

      */